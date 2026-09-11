"use client";

import { motion } from "framer-motion";
import { TrendingUp, Sprout, PenLine } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/ui/app-shell";
import { growthAreas } from "@/data/weaknesses";

export function WeaknessesApp() {
  return (
    <AppShell
      env="growth"
      icon={TrendingUp}
      title="Current Development Areas"
      subtitle="Growth Diagnostics"
      accent="#a3e635"
    >
      <p className="mb-4 text-[12.5px] leading-relaxed text-slate-400">
        Honest, student-appropriate growth areas — framed as direction, not limitation.
      </p>

      <div className="space-y-3">
        {growthAreas.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-soft flex items-start gap-3.5 rounded-2xl p-4"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-lime-400/30 bg-lime-400/10">
              <Sprout size={18} className="text-lime-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-bold text-white">{g.title}</h3>
                {g.editable && (
                  <span className="inline-flex items-center gap-1 rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-slate-500 uppercase">
                    <PenLine size={9} /> editable
                  </span>
                )}
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-slate-300">{g.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5">
        <SectionTitle icon={TrendingUp}>Growth Path</SectionTitle>
        <p className="glass-soft rounded-xl px-4 py-3 text-[12px] leading-relaxed text-slate-400">
          These areas live in <span className="font-mono text-lime-300">src/data/weaknesses.ts</span> —
          update them as I level up. The goal: turn each into a strength.
        </p>
      </div>
    </AppShell>
  );
}
