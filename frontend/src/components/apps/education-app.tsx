"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Route, MapPin } from "lucide-react";
import { AppShell, SectionTitle, Chip } from "@/components/ui/app-shell";
import { education, coursework, learningJourney } from "@/data/education";

export function EducationApp() {
  return (
    <AppShell
      env="academic"
      icon={GraduationCap}
      title="Study / Education"
      subtitle="Academic"
      accent="#34d399"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* timeline */}
        <div>
          <SectionTitle icon={GraduationCap}>Education Timeline</SectionTitle>
          <div className="relative ml-3 border-l border-emerald-400/20 pl-6">
            {education.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className="relative pb-6 last:pb-0"
              >
                <span className="absolute top-1 -left-[31px] h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                <div className="glass-soft rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-semibold text-white">{e.degree}</p>
                      <p className="mt-0.5 text-[12.5px] text-slate-400">
                        {e.institution}
                        {e.location && (
                          <span className="inline-flex items-center gap-1 text-slate-500">
                            {" · "}
                            <MapPin size={11} />
                            {e.location}
                          </span>
                        )}
                      </p>
                    </div>
                    {e.period && (
                      <span className="shrink-0 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 font-mono text-[10.5px] text-emerald-300">
                        {e.period}
                      </span>
                    )}
                  </div>
                  {e.detail && (
                    <p className="mt-2 text-[12.5px] font-medium text-emerald-300">{e.detail}</p>
                  )}
                  {e.highlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {e.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[12.5px] text-slate-300">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* right column */}
        <div className="space-y-6">
          <div>
            <SectionTitle icon={BookOpen}>Relevant Coursework</SectionTitle>
            <div className="grid grid-cols-2 gap-2.5">
              {coursework.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-soft rounded-xl p-3.5"
                >
                  <p className="text-[12.5px] font-semibold leading-snug text-slate-200">
                    {c.name}
                  </p>
                  <div className="mt-2">
                    <Chip color="#34d399">{c.note}</Chip>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle icon={Route}>Learning Journey</SectionTitle>
            <div className="space-y-2.5">
              {learningJourney.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/15 font-mono text-[11px] font-bold text-emerald-300">
                    {i + 1}
                  </span>
                  <span className="text-[12.5px] text-slate-300">{step}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
