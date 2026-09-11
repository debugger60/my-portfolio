"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wrench,
  Terminal,
  Code2,
  Layers,
  Package,
  NotebookPen,
  FlaskConical,
  GitBranch,
  X,
  Github as GithubLucide,
} from "lucide-react";
import { AppShell, SectionTitle } from "@/components/ui/app-shell";
import { tools } from "@/data/tools";
import type { Tool } from "@/data/types";
import { sfx } from "@/lib/sound";

const toolIcons: Record<string, typeof Terminal> = {
  terminal: Terminal,
  github: GithubLucide,
  code: Code2,
  layers: Layers,
  prompt: Terminal,
  package: Package,
  notebook: NotebookPen,
  flask: FlaskConical,
  "git-bash": GitBranch,
};

export function ToolsApp() {
  const [selected, setSelected] = useState<Tool | null>(null);

  return (
    <AppShell
      env="workstation"
      icon={Wrench}
      title="Tools I Know"
      subtitle="Developer Workstation"
      accent="#38bdf8"
    >
      {/* terminal header */}
      <div className="mb-5 overflow-hidden rounded-xl border border-white/[0.07] bg-black/50 font-mono text-[11.5px] leading-6">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-slate-500">kishore@workstation</span>
        </div>
        <div className="px-3 py-2 text-slate-400">
          <p>
            <span className="text-emerald-400">➜</span> <span className="text-sky-400">~</span>{" "}
            ls tools
          </p>
          <p className="text-slate-300">{tools.map((t) => t.name).join("  ·  ")}</p>
        </div>
      </div>

      <SectionTitle icon={Wrench}>Toolbox</SectionTitle>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map((t, i) => {
          const Ico = toolIcons[t.icon] ?? Terminal;
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 16, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 220, damping: 20 }}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sfx.click();
                setSelected(t);
              }}
              className="glass-soft group flex flex-col items-start gap-2 rounded-2xl p-3.5 text-left transition-colors hover:border-sky-400/30"
              aria-label={`${t.name} — details`}
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-sky-300 transition-all group-hover:border-sky-400/40 group-hover:shadow-[0_0_18px_-4px_rgba(56,189,248,0.6)]">
                <Ico size={19} />
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-slate-100">{t.name}</p>
                <p className="text-[10px] tracking-wide text-slate-500 uppercase">{t.category}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-4 text-center font-mono text-[10.5px] text-slate-500">
        click a tool to inspect it
      </p>

      {/* tool modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="glass win-shadow relative w-[min(92%,360px)] rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={selected.name}
            >
              <button
                onClick={() => setSelected(null)}
                className="traffic absolute top-3 right-3 bg-white/10"
                aria-label="Close"
              >
                <X size={12} className="text-slate-300" />
              </button>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-sky-400/30 bg-sky-400/10 text-sky-300">
                  {(() => {
                    const Ico = toolIcons[selected.icon] ?? Terminal;
                    return <Ico size={22} />;
                  })()}
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-white">{selected.name}</h3>
                  <p className="text-[11px] tracking-wide text-slate-400 uppercase">
                    {selected.category}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-slate-300">{selected.blurb}</p>
              <button
                onClick={() => setSelected(null)}
                className="btn-ghost mt-5 w-full rounded-xl py-2.5 text-[13px] font-medium"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
