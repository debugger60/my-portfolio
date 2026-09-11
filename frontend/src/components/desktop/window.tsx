"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Minus, Square, X, Copy } from "lucide-react";
import { useOs, type WindowState } from "@/components/os/providers";
import { getApp } from "@/lib/apps";

/* ============================================================
   Window — draggable, resizable, focusable desktop window.
   ============================================================ */

export function Window({ win }: { win: WindowState }) {
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, moveWindow, resizeWindow, state } =
    useOs();
  const app = getApp(win.appId);
  const Icon = app.icon;
  const focused = state.activeId === win.id;

  const dragRef = useRef<{ dx: number; dy: number } | null>(null);
  const resizeRef = useRef<{
    startX: number;
    startY: number;
    w: number;
    h: number;
  } | null>(null);

  function onTitleDown(e: PointerEvent<HTMLDivElement>) {
    if (win.maximized) return;
    focusWindow(win.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { dx: e.clientX - win.x, dy: e.clientY - win.y };
  }

  function onTitleMove(e: PointerEvent<HTMLDivElement>) {
    if (!dragRef.current) return;
    const x = e.clientX - dragRef.current.dx;
    const y = Math.max(46, e.clientY - dragRef.current.dy);
    moveWindow(win.id, x, y);
  }

  function onTitleUp() {
    dragRef.current = null;
  }

  function onResizeDown(e: PointerEvent<HTMLDivElement>) {
    e.stopPropagation();
    focusWindow(win.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      w: win.w,
      h: win.h,
    };
  }

  function onResizeMove(e: PointerEvent<HTMLDivElement>) {
    if (!resizeRef.current) return;
    const r = resizeRef.current;
    const w = Math.max(340, r.w + (e.clientX - r.startX));
    const h = Math.max(240, r.h + (e.clientY - r.startY));
    resizeWindow(win.id, w, h);
  }

  function onResizeUp() {
    resizeRef.current = null;
  }

  const style = win.maximized
    ? {
        left: 0,
        top: 46,
        width: "100vw",
        height: "calc(100dvh - 46px - 60px)",
        zIndex: win.z,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z,
      };

  return (
    <motion.div
      data-win
      className="absolute"
      style={style as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.82, y: 40 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        ...(win.minimized
          ? { opacity: 0, scale: 0.6, y: window.innerHeight }
          : {}),
      }}
      exit={{ opacity: 0, scale: 0.85, y: 60 }}
      transition={{ type: "spring", stiffness: 320, damping: 30 }}
      onPointerDownCapture={() => focusWindow(win.id)}
      role="dialog"
      aria-label={app.title}
    >
      <div
        className={`glass win-shadow flex h-full w-full flex-col overflow-hidden rounded-xl transition-shadow ${
          focused ? "" : "opacity-[0.97]"
        }`}
        style={{
          boxShadow: focused
            ? "0 0 0 1px rgba(103,232,249,0.28), 0 30px 90px -20px rgba(0,0,0,0.9), 0 0 140px -30px rgba(34,211,238,0.4)"
            : undefined,
        }}
      >
        {/* Title bar */}
        <div
          className="no-select relative flex h-11 shrink-0 cursor-grab items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-3 active:cursor-grabbing"
          onPointerDown={onTitleDown}
          onPointerMove={onTitleMove}
          onPointerUp={onTitleUp}
          onDoubleClick={() => toggleMaximize(win.id)}
        >
          <div className="flex items-center gap-1.5">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(win.id);
              }}
              className="traffic bg-[#ff5f57]"
              aria-label="Close window"
              style={{ color: "rgba(0,0,0,0.55)" }}
            >
              <X size={8} strokeWidth={3} />
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(win.id);
              }}
              className="traffic bg-[#febc2e]"
              aria-label="Minimize window"
            >
              <Minus size={8} strokeWidth={3} />
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize(win.id);
              }}
              className="traffic bg-[#28c840]"
              aria-label="Maximize window"
            >
              {win.maximized ? (
                <Copy size={8} strokeWidth={3} />
              ) : (
                <Square size={7} strokeWidth={3} />
              )}
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 mx-auto flex w-max items-center gap-2 text-[12.5px] font-medium text-slate-300/90">
            <Icon size={13} className="text-cyan-300" />
            {app.title}
          </div>
        </div>

        {/* Content */}
        <div className="relative min-h-0 flex-1">
          <app.component />
        </div>

        {/* Resize handle */}
        {!win.maximized && (
          <div
            className="absolute right-0 bottom-0 h-4 w-4 cursor-nwse-resize"
            onPointerDown={onResizeDown}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
            aria-hidden="true"
          />
        )}
      </div>
    </motion.div>
  );
}
