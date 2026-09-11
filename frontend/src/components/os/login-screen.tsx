"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { formatClock, formatDate } from "@/lib/utils";
import { ParticleField } from "@/components/3d/particle-field";
import { Magnetic } from "@/components/ui/magnetic";
import { sfx } from "@/lib/sound";

/* ============================================================
   LoginScreen — premium glass login with one-click entry.
   ============================================================ */

export function LoginScreen({ onEnter }: { onEnter: () => void }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      key="login"
      className="scanlines relative flex h-full w-full items-center justify-center overflow-hidden bg-[#03050d]"
      initial={{ opacity: 0, filter: "blur(14px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.06, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <ParticleField variant="profile" />

      {/* ambient glows */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(34,211,238,0.10), transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(139,92,246,0.10), transparent 55%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="relative z-10 w-[min(92vw,420px)]"
      >
        <div className="glass rounded-3xl p-8 text-center sm:p-10">
          {/* profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto h-28 w-28"
          >
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-400 via-violet-500 to-pink-500 opacity-80 blur-md" />
            <div className="absolute -inset-3 rounded-full border border-cyan-400/20" />
            <img
              src={profile.photo}
              alt={`${profile.name} profile`}
              className="relative h-28 w-28 rounded-full border-2 border-white/10 object-cover"
              draggable={false}
            />
            <span className="absolute right-1 bottom-1 h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          </motion.div>

          <h1 className="mt-6 text-2xl font-bold tracking-wide text-white">
            {profile.name}
          </h1>
          <p className="mt-1.5 text-sm font-medium tracking-[0.3em] text-slate-300 uppercase">
            {profile.role}
          </p>
          <p className="mt-1 text-xs font-medium tracking-[0.35em] text-cyan-300 uppercase">
            {profile.direction}
          </p>

          <div className="my-6 h-px bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />

          <Magnetic strength={0.3} className="w-full">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                sfx.open();
                onEnter();
              }}
              className="btn-accent w-full rounded-xl px-6 py-3.5 text-[15px] font-semibold tracking-[0.2em] uppercase"
            >
              Enter Desktop
            </motion.button>
          </Magnetic>

          <p className="mt-5 font-mono text-[11px] text-slate-500">
            {formatClock(now)} · {formatDate(now)}
          </p>
        </div>
      </motion.div>

      <div className="scanbar" />
      <div className="crt-vignette pointer-events-none absolute inset-0" />
    </motion.div>
  );
}
