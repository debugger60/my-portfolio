"use client";

import { motion } from "framer-motion";
import { Brain, Cpu, Database, Network } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/ui/app-shell";
import { skills } from "@/data/skills";

const skillIcons: Record<string, typeof Brain> = {
  python: Cpu,
  sql: Database,
  aiml: Brain,
  genai: Network,
};

export function SkillsApp() {
  return (
    <AppShell env="neural" icon={Brain} title="Technical Skills" subtitle="Neural Core" accent="#a78bfa">
      {/* neural core */}
      <div className="mb-6 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative h-36 w-36"
        >
          {/* orbiting rings */}
          <div className="absolute inset-0 animate-[orbit_16s_linear_infinite]">
            {skills.map((s, i) => {
              const angle = (i / skills.length) * Math.PI * 2;
              const x = 50 + 42 * Math.cos(angle);
              const y = 50 + 42 * Math.sin(angle);
              return (
                <span
                  key={s.id}
                  className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    background: s.color,
                    boxShadow: `0 0 10px ${s.color}`,
                  }}
                />
              );
            })}
          </div>
          <div className="absolute inset-0 animate-[orbit_24s_linear_infinite_reverse]">
            {skills.map((s, i) => {
              const angle = (i / skills.length) * Math.PI * 2 + 0.8;
              const x = 50 + 30 * Math.cos(angle);
              const y = 50 + 30 * Math.sin(angle);
              return (
                <span
                  key={`i-${s.id}`}
                  className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-400/70"
                  style={{ left: `${x}%`, top: `${y}%` }}
                />
              );
            })}
          </div>
          <div className="absolute inset-4 rounded-full border border-violet-400/20" />
          <div className="absolute inset-8 rounded-full border border-cyan-400/15" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <Brain size={26} className="text-violet-300" />
            </div>
          </div>
        </motion.div>
      </div>

      <SectionTitle icon={Brain}>Skill Domains</SectionTitle>

      {/* skill cards */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        {skills.map((s, i) => {
          const Ico = skillIcons[s.id] ?? Brain;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 180, damping: 20 }}
              whileHover={{ y: -4 }}
              className="glass-soft group relative overflow-hidden rounded-2xl p-4 transition-shadow"
              style={{ borderColor: `${s.color}33` }}
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                style={{ background: s.color }}
              />
              <div className="flex items-center gap-3">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
                  style={{ borderColor: `${s.color}44`, background: `${s.color}16`, color: s.color }}
                >
                  <Ico size={19} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-bold text-white">{s.name}</h3>
                  <p className="text-[11px] text-slate-400">{s.levelNote}</p>
                </div>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase"
                  style={{ borderColor: `${s.color}44`, background: `${s.color}14`, color: s.color }}
                >
                  {s.level}
                </span>
              </div>

              <p className="mt-3 text-[12.5px] leading-relaxed text-slate-300">{s.summary}</p>

              <ul className="mt-3 space-y-1.5">
                {s.facts.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[11.5px] text-slate-400">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: s.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-4 text-center font-mono text-[10.5px] text-slate-500">
        Proficiency levels are qualitative &amp; editable in <span className="text-slate-300">src/data/skills.ts</span>
      </p>
    </AppShell>
  );
}
