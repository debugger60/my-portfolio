"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Power, Search, Volume2, VolumeX } from "lucide-react";
import { APPS } from "@/lib/apps";
import { useOs } from "@/components/os/providers";
import { isSoundEnabled, setSoundEnabled, sfx } from "@/lib/sound";

/* ============================================================
   Dock — futuristic taskbar with running indicators.
   ============================================================ */

export function Dock({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { state, toggleApp, setPhase } = useOs();
  const [sound, setSound] = useState(() => isSoundEnabled());

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-50 flex justify-center px-3">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 22 }}
        className="glass pointer-events-auto flex items-end gap-1 rounded-2xl px-2 py-1.5"
      >
        {APPS.filter((a) => a.dock).map((app) => {
          const Icon = app.icon;
          const openWin = state.windows.find((w) => w.appId === app.id);
          const running = Boolean(openWin);
          const active = openWin
            ? !openWin.minimized && state.activeId === openWin.id
            : false;
          return (
            <motion.button
              key={app.id}
              onClick={() => {
                sfx.click();
                toggleApp(app.id);
              }}
              whileHover={{ y: -7, scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group relative flex flex-col items-center"
              aria-label={app.title}
            >
              <div
                className={`grid h-11 w-11 place-items-center rounded-xl border transition-all duration-200 sm:h-12 sm:w-12 ${
                  active
                    ? "border-cyan-300/50 bg-cyan-400/15 shadow-[0_0_24px_-4px_rgba(34,211,238,0.7)]"
                    : "border-white/10 bg-white/[0.05] group-hover:border-white/25 group-hover:bg-white/[0.1]"
                }`}
              >
                <Icon
                  size={22}
                  className={active ? "text-cyan-200" : "text-slate-300"}
                />
              </div>
              <span
                className={`mt-1 h-1 w-1 rounded-full transition-all ${
                  running ? "bg-cyan-300 shadow-[0_0_6px_#22d3ee]" : "bg-transparent"
                }`}
              />
            </motion.button>
          );
        })}

        {/* divider */}
        <div className="mx-1.5 h-10 w-px self-center bg-white/10" />

        {/* search */}
        <motion.button
          onClick={onOpenCommand}
          whileHover={{ y: -6, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="grid h-11 w-11 place-items-center self-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-colors hover:border-white/25 hover:text-cyan-200 sm:h-12 sm:w-12"
          aria-label="Open command center"
        >
          <Search size={20} />
        </motion.button>

        {/* sound */}
        <motion.button
          onClick={() => {
            const v = !sound;
            setSound(v);
            setSoundEnabled(v);
            if (v) sfx.click();
          }}
          whileHover={{ y: -6, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="grid h-11 w-11 place-items-center self-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-colors hover:border-white/25 hover:text-cyan-200 sm:h-12 sm:w-12"
          aria-label={sound ? "Mute sound effects" : "Enable sound effects"}
        >
          {sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </motion.button>

        {/* power */}
        <motion.button
          onClick={() => {
            sfx.close();
            setPhase("boot");
          }}
          whileHover={{ y: -6, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="grid h-11 w-11 place-items-center self-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 transition-colors hover:border-rose-400/40 hover:text-rose-300 sm:h-12 sm:w-12"
          aria-label="Restart the OS"
        >
          <Power size={20} />
        </motion.button>
      </motion.div>
    </div>
  );
}
