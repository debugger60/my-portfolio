"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { getApp, type AppId } from "@/lib/apps";
import { sfx } from "@/lib/sound";
import { uid } from "@/lib/utils";

/* ============================================================
   OS store — window manager state (open / close / minimize /
   maximize / focus / drag). Applications behave like real
   desktop windows.
   ============================================================ */

export interface WindowRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface WindowState extends WindowRect {
  id: string; // instance id
  appId: AppId;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prev: WindowRect | null;
}

interface OsState {
  phase: "boot" | "login" | "desktop";
  windows: WindowState[];
  activeId: string | null;
  zTop: number;
}

type Action =
  | { type: "SET_PHASE"; phase: OsState["phase"] }
  | { type: "OPEN"; appId: AppId; rect: WindowRect }
  | { type: "CLOSE"; id: string }
  | { type: "MINIMIZE"; id: string }
  | { type: "RESTORE"; id: string }
  | { type: "MAXIMIZE"; id: string }
  | { type: "FOCUS"; id: string }
  | { type: "MOVE"; id: string; x: number; y: number }
  | { type: "RESIZE"; id: string; w: number; h: number };

const initialState: OsState = {
  phase: "boot",
  windows: [],
  activeId: null,
  zTop: 10,
};

function reducer(state: OsState, action: Action): OsState {
  switch (action.type) {
    case "SET_PHASE":
      return { ...state, phase: action.phase };

    case "OPEN": {
      const z = 10 + (state.zTop % 30);
      const win: WindowState = {
        id: uid(),
        appId: action.appId,
        x: action.rect.x,
        y: action.rect.y,
        w: action.rect.w,
        h: action.rect.h,
        z,
        minimized: false,
        maximized: false,
        prev: null,
      };
      return {
        ...state,
        windows: [...state.windows, win],
        activeId: win.id,
        zTop: state.zTop + 1,
      };
    }

    case "CLOSE":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
        activeId:
          state.activeId === action.id
            ? state.windows.filter((w) => w.id !== action.id).at(-1)?.id ?? null
            : state.activeId,
      };

    case "MINIMIZE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
        activeId: state.activeId === action.id ? null : state.activeId,
      };

    case "RESTORE": {
      const z = 10 + (state.zTop % 30);
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: false, z } : w
        ),
        activeId: action.id,
        zTop: state.zTop + 1,
      };
    }

    case "MAXIMIZE": {
      const z = 10 + (state.zTop % 30);
      return {
        ...state,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (w.maximized && w.prev) {
            return { ...w, maximized: false, ...w.prev, prev: null, z };
          }
          return {
            ...w,
            maximized: true,
            prev: { x: w.x, y: w.y, w: w.w, h: w.h },
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            z,
          };
        }),
        activeId: action.id,
        zTop: state.zTop + 1,
      };
    }

    case "FOCUS": {
      if (state.activeId === action.id) return state;
      const z = 10 + (state.zTop % 30);
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, z } : w
        ),
        activeId: action.id,
        zTop: state.zTop + 1,
      };
    }

    case "MOVE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w
        ),
      };

    case "RESIZE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, w: action.w, h: action.h } : w
        ),
      };

    default:
      return state;
  }
}

interface OsContextValue {
  state: OsState;
  setPhase: (p: OsState["phase"]) => void;
  openApp: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  resizeWindow: (id: string, w: number, h: number) => void;
  toggleApp: (appId: AppId) => void;
}

const OsContext = createContext<OsContextValue | null>(null);

export function OsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setPhase = useCallback((phase: OsState["phase"]) => {
    dispatch({ type: "SET_PHASE", phase });
  }, []);

  const openApp = useCallback((appId: AppId) => {
    if (typeof window === "undefined") return;
    const def = getApp(appId);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w = Math.min(def.w, vw - 24);
    const h = Math.min(def.h, vh - 120);
    // Cascade from top-left with a slight stagger per open window.
    const cascade = (document.querySelectorAll("[data-win]").length % 6) * 26;
    const x = Math.max(12, (vw - w) / 2 - 60 + cascade);
    const y = Math.max(48, (vh - h) / 2 - 40 + cascade);
    sfx.open();
    dispatch({ type: "OPEN", appId, rect: { x, y, w, h } });
  }, []);

  const toggleApp = useCallback(
    (appId: AppId) => {
      const open = state.windows.find((w) => w.appId === appId);
      if (!open) {
        openApp(appId);
      } else if (open.minimized) {
        sfx.open();
        dispatch({ type: "RESTORE", id: open.id });
      } else if (state.activeId === open.id) {
        sfx.close();
        dispatch({ type: "MINIMIZE", id: open.id });
      } else {
        dispatch({ type: "FOCUS", id: open.id });
      }
    },
    [state.windows, state.activeId, openApp]
  );

  const closeWindow = useCallback((id: string) => {
    sfx.close();
    dispatch({ type: "CLOSE", id });
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    sfx.close();
    dispatch({ type: "MINIMIZE", id });
  }, []);

  const restoreWindow = useCallback((id: string) => {
    sfx.open();
    dispatch({ type: "RESTORE", id });
  }, []);

  const toggleMaximize = useCallback((id: string) => {
    dispatch({ type: "MAXIMIZE", id });
  }, []);

  const focusWindow = useCallback((id: string) => {
    dispatch({ type: "FOCUS", id });
  }, []);

  const moveWindow = useCallback((id: string, x: number, y: number) => {
    dispatch({ type: "MOVE", id, x, y });
  }, []);

  const resizeWindow = useCallback((id: string, w: number, h: number) => {
    dispatch({ type: "RESIZE", id, w, h });
  }, []);

  const value = useMemo<OsContextValue>(
    () => ({
      state,
      setPhase,
      openApp,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      toggleMaximize,
      focusWindow,
      moveWindow,
      resizeWindow,
      toggleApp,
    }),
    [
      state,
      setPhase,
      openApp,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      toggleMaximize,
      focusWindow,
      moveWindow,
      resizeWindow,
      toggleApp,
    ]
  );

  return <OsContext.Provider value={value}>{children}</OsContext.Provider>;
}

export function useOs(): OsContextValue {
  const ctx = useContext(OsContext);
  if (!ctx) throw new Error("useOs must be used within OsProvider");
  return ctx;
}
