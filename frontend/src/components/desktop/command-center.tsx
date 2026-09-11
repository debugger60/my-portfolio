"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Power, Volume2, VolumeX } from "lucide-react";
import { APPS, type AppId } from "@/lib/apps";
import { useOs } from "@/components/os/providers";
import { isSoundEnabled, setSoundEnabled, sfx } from "@/lib/sound";

/* ============================================================
   CommandCenter — ⌘K / Ctrl+K palette: search & launch.
   ============================================================ */

interface Item {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  run: () => void;
}

export function CommandCenter({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { openApp, setPhase } = useOs();
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const [sound, setSound] = useState(() => isSoundEnabled());
  const inputRef = useRef<HTMLInputElement | null>(null);

  const items = useMemo<Item[]>(() => {
    const apps: Item[] = APPS.map((a) => {
      const Icon = a.icon;
      return {
        id: `app-${a.id}`,
        label: a.title,
        hint: "open application",
        icon: <Icon size={15} className="text-cyan-300" />,
        run: () => {
          sfx.open();
          openApp(a.id as AppId);
          onClose();
        },
      };
    });

    const actions: Item[] = [
      {
        id: "sound",
        label: sound ? "Mute sound effects" : "Enable sound effects",
        hint: "toggle",
        icon: sound ? (
          <Volume2 size={15} className="text-emerald-300" />
        ) : (
          <VolumeX size={15} className="text-slate-400" />
        ),
        run: () => {
          const v = !sound;
          setSound(v);
          setSoundEnabled(v);
          if (v) sfx.click();
        },
      },
      {
        id: "reboot",
        label: "Restart the OS",
        hint: "back to boot",
        icon: <Power size={15} className="text-rose-300" />,
        run: () => {
          setPhase("boot");
          onClose();
        },
      },
    ];

    const all = [...apps, ...actions];
    if (!q.trim()) return all;
    const ql = q.toLowerCase();
    return all.filter(
      (i) =>
        i.label.toLowerCase().includes(ql) || i.hint.toLowerCase().includes(ql)
    );
  }, [q, sound, openApp, onClose, setPhase]);

  useEffect(() => {
    if (open) {
      setQ("");
      setIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setIdx(0);
  }, [q]);

  function runItem(i: Item) {
    i.run();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[100] flex items-start justify-center bg-black/50 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="glass win-shadow w-[min(92vw,520px)] overflow-hidden rounded-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Command center"
          >
            <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-3">
              <Command size={16} className="text-cyan-300" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setIdx((i) => Math.min(items.length - 1, i + 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setIdx((i) => Math.max(0, i - 1));
                  } else if (e.key === "Enter" && items[idx]) {
                    runItem(items[idx]);
                  } else if (e.key === "Escape") {
                    onClose();
                  }
                }}
                placeholder="Search apps & actions…"
                className="w-full bg-transparent text-[14px] text-slate-100 placeholder-slate-500 outline-none"
              />
              <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                esc
              </kbd>
            </div>

            <div className="scroll-thin max-h-[46vh] overflow-y-auto p-2">
              {items.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-slate-500">
                  No results for “{q}”
                </p>
              )}
              {items.map((it, i) => (
                <button
                  key={it.id}
                  onClick={() => runItem(it)}
                  onMouseEnter={() => setIdx(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    i === idx ? "bg-cyan-400/10" : "hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04]">
                    {it.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] font-medium text-slate-200">
                      {it.label}
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      {it.hint}
                    </span>
                  </span>
                  {i === idx && (
                    <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
                      ↵
                    </kbd>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
