"use client";

import { useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FlaskConical,
  ExternalLink,
  X,
  CheckCircle2,
  Rocket,
  Eye,
  Layers,
} from "lucide-react";
import { AppShell, Chip } from "@/components/ui/app-shell";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import { sfx } from "@/lib/sound";

function TiltCard({ children }: { children: ReactNode }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

function ProjectCard({
  p,
  onDetails,
}: {
  p: Project;
  onDetails: () => void;
}) {
  return (
    <TiltCard>
      <div className="glass flex h-full flex-col overflow-hidden rounded-2xl">
        {/* header */}
        <div
          className="relative overflow-hidden px-5 py-6"
          style={{
            background: `linear-gradient(120deg, ${p.gradient[0]}26, ${p.gradient[1]}33)`,
          }}
        >
          <div
            className="absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-30 blur-2xl"
            style={{ background: p.accent }}
          />
          <div className="flex items-center justify-between">
            <span
              className="rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase"
              style={{ borderColor: `${p.accent}55`, color: p.accent }}
            >
              {p.category}
            </span>
            <Layers size={16} style={{ color: p.accent }} />
          </div>
          <h3 className="mt-3 text-xl font-bold text-white">{p.title}</h3>
          <p className="mt-0.5 text-[12.5px] text-slate-300/90">{p.subtitle}</p>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col gap-3.5 p-5">
          <p className="text-[12.5px] leading-relaxed text-slate-300">{p.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {p.tech.map((t) => (
              <Chip key={t} color={p.accent}>{t}</Chip>
            ))}
          </div>

          <ul className="grid gap-1.5">
            {p.features.slice(0, 3).map((f) => (
              <li key={f} className="flex items-start gap-2 text-[11.5px] text-slate-400">
                <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: p.accent }} />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex gap-2.5 pt-1">
            <a
              href={p.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sfx.open()}
              className="btn-accent flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12.5px] font-semibold"
            >
              <Rocket size={14} /> Live Demo
            </a>
            <button
              onClick={onDetails}
              className="btn-ghost flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12.5px] font-medium"
            >
              <Eye size={14} /> View Details
            </button>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export function ProjectsApp() {
  const [detail, setDetail] = useState<Project | null>(null);

  return (
    <AppShell
      env="lab"
      icon={FlaskConical}
      title="Project Lab"
      subtitle="Selected Work"
      accent="#f472b6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 200, damping: 22 }}
          >
            <ProjectCard p={p} onDetails={() => setDetail(p)} />
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-[10.5px] text-slate-500">
        projects are editable in <span className="text-slate-300">src/data/projects.ts</span>
      </p>

      {/* detail modal */}
      <AnimatePresence>
        {detail && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDetail(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 14 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="glass win-shadow relative max-h-[86%] w-[min(94%,540px)] overflow-y-auto rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label={`${detail.title} details`}
            >
              <button
                onClick={() => setDetail(null)}
                className="traffic absolute top-3 right-3 bg-white/10"
                aria-label="Close"
              >
                <X size={12} className="text-slate-300" />
              </button>

              <div
                className="rounded-xl px-4 py-3"
                style={{
                  background: `linear-gradient(120deg, ${detail.gradient[0]}26, ${detail.gradient[1]}33)`,
                }}
              >
                <p className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: detail.accent }}>
                  {detail.category}
                </p>
                <h3 className="mt-1 text-lg font-bold text-white">{detail.title}</h3>
                <p className="text-[12.5px] text-slate-300">{detail.subtitle}</p>
              </div>

              <p className="mt-4 text-[13px] leading-relaxed text-slate-300">{detail.description}</p>

              <div className="mt-4">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">Purpose</p>
                <p className="mt-1 text-[12.5px] text-slate-300">{detail.purpose}</p>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">Features</p>
                <ul className="mt-2 grid gap-1.5">
                  {detail.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[12.5px] text-slate-300">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0" style={{ color: detail.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {detail.tech.map((t) => (
                  <Chip key={t} color={detail.accent}>{t}</Chip>
                ))}
              </div>

              <div className="mt-6 flex gap-2.5">
                <a
                  href={detail.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sfx.open()}
                  className="btn-accent flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-semibold"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
                <button
                  onClick={() => setDetail(null)}
                  className="btn-ghost rounded-xl px-5 py-2.5 text-[13px]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
