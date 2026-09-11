"use client";

import { motion } from "framer-motion";
import { Activity, ShieldCheck } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/ui/app-shell";
import { strengths } from "@/data/strengths";

export function StrengthsApp() {
  return (
    <AppShell
      env="diagnostics"
      icon={Activity}
      title="Strengths"
      subtitle="Developer Profile Diagnostics"
      accent="#34d399"
    >
      <div className="grid gap-3.5 sm:grid-cols-2">
        {strengths.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 22 }}
            whileHover={{ y: -3 }}
            className="glass-soft relative overflow-hidden rounded-2xl p-4"
          >
            <div className="flex items-start gap-3">
              <div className="relative mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-emerald-400/30 bg-emerald-400/10">
                <ShieldCheck size={17} className="text-emerald-300" />
                <span className="absolute -inset-1 rounded-xl border border-emerald-400/20 animate-ping opacity-40" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[14px] font-bold text-white">{s.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-300">{s.detail}</p>
                <span className="mt-2.5 inline-block rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[9.5px] text-slate-500">
                  {s.source}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-5">
        <SectionTitle icon={Activity}>Signal Integrity</SectionTitle>
        <p className="glass-soft rounded-xl px-4 py-3 text-[12px] leading-relaxed text-slate-400">
          Every diagnostic above is drawn from my uploaded resume &amp; CV — no fabricated
          claims. Edit this section anytime in{" "}
          <span className="font-mono text-emerald-300">src/data/strengths.ts</span>.
        </p>
      </div>
    </AppShell>
  );
}
