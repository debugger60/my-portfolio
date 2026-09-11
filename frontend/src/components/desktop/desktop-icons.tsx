"use client";

import { motion } from "framer-motion";
import { APPS } from "@/lib/apps";
import { useOs } from "@/components/os/providers";
import { sfx } from "@/lib/sound";

/* ============================================================
   DesktopIcons — physical, alive icons on the desktop.
   ============================================================ */

export function DesktopIcons() {
  const { openApp } = useOs();

  return (
    <div className="absolute top-16 left-3 flex flex-col gap-3 sm:left-4">
      {APPS.map((app, i) => {
        const Icon = app.icon;
        return (
          <motion.button
            key={app.id}
            onClick={() => {
              sfx.click();
              openApp(app.id);
            }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
            whileHover={{ scale: 1.08, x: 6 }}
            whileTap={{ scale: 0.92 }}
            className="desktop-icon group flex w-[76px] flex-col items-center gap-1.5"
            aria-label={`Open ${app.title}`}
          >
            <div
              className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-300 group-hover:border-cyan-300/40 group-hover:shadow-[0_0_28px_-4px_rgba(34,211,238,0.6)]"
              style={{ transform: "perspective(600px) rotateY(0deg)" }}
            >
              <Icon size={26} className="text-cyan-200 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
              <span className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-300/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <span className="max-w-full truncate rounded-md px-1 text-center text-[10.5px] font-medium text-slate-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
              {app.title}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
