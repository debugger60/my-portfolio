"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { settings } from "@/data/settings";
import { ParticleField } from "@/components/3d/particle-field";
import { sfx } from "@/lib/sound";

/* ============================================================
   BootScreen — cinematic OS startup sequence.
   ============================================================ */

const LINES = [
  "KRP OS v1.0 — cold boot",
  "mounting /dev/kernel ................ OK",
  "loading neural core ................. OK",
  "starting python runtime ............. OK",
  "spinning up data streams ............ OK",
  "loading creative modules ............ OK",
  "identity resolved",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0);
  const [brand, setBrand] = useState(false);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    sfx.boot();

    // Type the boot lines
    LINES.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => setVisible(i + 1), 500 + i * settings.boot.linesInterval)
      );
    });

    // Show the brand block
    timers.current.push(
      setTimeout(
        () => setBrand(true),
        500 + LINES.length * settings.boot.linesInterval + 260
      )
    );

    // Fade out and continue
    timers.current.push(
      setTimeout(
        () => {
          setExiting(true);
          timers.current.push(setTimeout(() => finish(), 750));
        },
        500 +
          LINES.length * settings.boot.linesInterval +
          settings.boot.holdAfterLines +
          2200
      )
    );

    // Hard skip safety net
    timers.current.push(setTimeout(() => finish(), settings.boot.skipAfterMs));

    return () => {
      timers.current.forEach(clearTimeout);
    };

    function finish() {
      if (doneRef.current) return;
      doneRef.current = true;
      setExiting(true);
      timers.current.push(setTimeout(onDone, 700));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="scanlines relative flex h-full w-full items-center justify-center overflow-hidden bg-[#02030a]"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      {/* faint particle space that "boots up" with the system */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: brand ? 0.55 : 0.15 }}
        transition={{ duration: 2.4 }}
      >
        <ParticleField variant="space" />
      </motion.div>

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(34,211,238,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-6">
        {/* Terminal lines */}
        <div className="w-full max-w-xl font-mono text-[12px] leading-6 text-cyan-300/80 sm:text-[13px]">
          {LINES.slice(0, visible).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="whitespace-pre"
            >
              <span className="text-cyan-500/60">&gt; </span>
              {l}
            </motion.div>
          ))}
          {!brand && <span className="cursor-blink text-cyan-400">▌</span>}
        </div>

        {/* Branding */}
        <AnimatePresence>
          {brand && (
            <motion.div
              className="mt-10 flex flex-col items-center text-center"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.28 } } }}
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="text-gradient text-glow text-3xl font-bold tracking-[0.08em] sm:text-5xl md:text-6xl"
              >
                {profile.name}
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-3 text-sm font-medium tracking-[0.4em] text-slate-300 uppercase"
              >
                Creative Developer
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
                  show: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mt-2 text-xs font-medium tracking-[0.5em] text-cyan-300/90 uppercase"
              >
                Data Science &amp; AI
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip */}
      {!exiting && (
        <button
          onClick={() => finishEarly()}
          className="absolute right-5 bottom-5 rounded-lg border border-slate-700/60 px-3 py-1.5 font-mono text-[11px] text-slate-500 transition-colors hover:border-cyan-500/50 hover:text-cyan-300"
        >
          skip boot ↵
        </button>
      )}

      <div className="scanbar" />
      <div className="crt-vignette pointer-events-none absolute inset-0" />
    </motion.div>
  );

  function finishEarly() {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    timers.current.forEach(clearTimeout);
    timers.current.push(setTimeout(onDone, 600));
  }
}
