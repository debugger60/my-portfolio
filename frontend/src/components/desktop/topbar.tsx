"use client";

import { useEffect, useState } from "react";
import { Wifi, BatteryFull, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { formatClock, formatDate } from "@/lib/utils";

/* ============================================================
   TopBar — status bar: brand, clock, indicators.
   ============================================================ */

export function TopBar({ onOpenCommand }: { onOpenCommand: () => void }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex h-12 items-center justify-between px-4">
      {/* brand */}
      <button
        onClick={onOpenCommand}
        className="glass-soft pointer-events-auto flex items-center gap-2 rounded-xl px-3 py-1.5 text-[12px] font-semibold tracking-wide text-slate-200 transition-colors hover:text-cyan-200"
        aria-label="Open command center"
      >
        <Sparkles size={14} className="text-cyan-300" />
        <span className="hidden sm:inline">KRP OS</span>
        <span className="text-slate-500">·</span>
        <span className="hidden text-slate-400 sm:inline">
          {profile.firstName} {profile.name.split(" ")[1] ?? ""}
        </span>
      </button>

      {/* right cluster */}
      <div className="glass-soft pointer-events-auto flex items-center gap-3 rounded-xl px-3.5 py-1.5 font-mono text-[11.5px] text-slate-300">
        <span className="hidden items-center gap-1 text-emerald-300 sm:flex">
          <Wifi size={13} />
        </span>
        <span className="hidden items-center gap-1 text-emerald-300 sm:flex">
          <BatteryFull size={14} />
        </span>
        <span className="hidden text-slate-400 md:inline">{formatDate(now)}</span>
        <span className="font-semibold tracking-wider text-cyan-200">
          {formatClock(now)}
        </span>
      </div>
    </div>
  );
}
