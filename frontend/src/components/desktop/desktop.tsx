"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOs } from "@/components/os/providers";
import { ParticleField } from "@/components/3d/particle-field";
import { Window } from "./window";
import { DesktopIcons } from "./desktop-icons";
import { Dock } from "./dock";
import { TopBar } from "./topbar";
import { CommandCenter } from "./command-center";

/* ============================================================
   Desktop — the main OS environment.
   ============================================================ */

export function Desktop() {
  const { state, closeWindow } = useOs();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") {
        if (commandOpen) {
          setCommandOpen(false);
        } else if (state.activeId) {
          closeWindow(state.activeId);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commandOpen, state.activeId, closeWindow]);

  return (
    <motion.div
      key="desktop"
      className="relative h-full w-full overflow-hidden"
      initial={{ opacity: 0, filter: "blur(14px)", scale: 1.04 }}
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* ---------- Live wallpaper ---------- */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070f] via-[#070b16] to-[#04060e]" />
      <ParticleField variant="space" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 18% 0%, rgba(34,211,238,0.06), transparent 45%), radial-gradient(ellipse at 85% 100%, rgba(139,92,246,0.07), transparent 50%)",
        }}
      />
      <div className="crt-vignette pointer-events-none absolute inset-0" />

      {/* ---------- Windows ---------- */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {state.windows.map((w) => (
            <Window key={w.id} win={w} />
          ))}
        </AnimatePresence>
      </div>

      {/* ---------- Desktop icons ---------- */}
      <DesktopIcons />

      {/* ---------- Top status bar ---------- */}
      <TopBar onOpenCommand={() => setCommandOpen(true)} />

      {/* ---------- Dock ---------- */}
      <Dock onOpenCommand={() => setCommandOpen(true)} />

      {/* ---------- Command center ---------- */}
      <CommandCenter open={commandOpen} onClose={() => setCommandOpen(false)} />
    </motion.div>
  );
}
