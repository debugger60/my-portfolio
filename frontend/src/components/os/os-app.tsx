"use client";

import { AnimatePresence } from "framer-motion";
import { useOs } from "./providers";
import { BootScreen } from "./boot-screen";
import { LoginScreen } from "./login-screen";
import { Desktop } from "@/components/desktop/desktop";

/* ============================================================
   OsApp — top-level state machine: boot → login → desktop.
   ============================================================ */

export function OsApp() {
  const { state, setPhase } = useOs();

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-[#04060e]">
      <AnimatePresence mode="wait">
        {state.phase === "boot" && (
          <BootScreen key="boot" onDone={() => setPhase("login")} />
        )}
        {state.phase === "login" && (
          <LoginScreen key="login" onEnter={() => setPhase("desktop")} />
        )}
        {state.phase === "desktop" && <Desktop key="desktop" />}
      </AnimatePresence>
    </div>
  );
}
