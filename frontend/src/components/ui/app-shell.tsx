"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ParticleField } from "@/components/3d/particle-field";
import type { EnvKey } from "@/lib/apps";

/* ============================================================
   AppShell — shared window layout: unique animated environment
   per app + a sticky header + scrollable content.
   ============================================================ */

export function AppShell({
  env,
  icon: Icon,
  title,
  subtitle,
  accent = "#22d3ee",
  children,
  headerExtra,
}: {
  env: EnvKey;
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  accent?: string;
  children: ReactNode;
  headerExtra?: ReactNode;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#070b16]">
      {/* environment */}
      <ParticleField variant={env} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, ${accent}14, transparent 55%)`,
        }}
      />

      <div className="absolute inset-0 flex flex-col">
        {/* header */}
        <div className="glass-soft sticky top-0 z-10 flex items-center gap-3 border-b border-white/[0.06] px-5 py-3 backdrop-blur-xl">
          <div
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10"
            style={{ background: `${accent}1a`, boxShadow: `0 0 18px -6px ${accent}80` }}
          >
            <Icon size={17} style={{ color: accent }} />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-[15px] font-semibold tracking-wide text-slate-100">
              {title}
            </h2>
            {subtitle && (
              <p className="truncate text-[11px] font-medium tracking-[0.14em] text-slate-400 uppercase">
                {subtitle}
              </p>
            )}
          </div>
          {headerExtra}
        </div>

        {/* content */}
        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
          <div className="p-5 sm:p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Chip({
  children,
  color = "#22d3ee",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium"
      style={{
        borderColor: `${color}40`,
        background: `${color}14`,
        color,
      }}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  icon: Icon,
}: {
  children: ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <div className="mb-3 flex items-center gap-2">
      {Icon && <Icon size={15} className="text-cyan-300" />}
      <h3 className="text-[12px] font-semibold tracking-[0.18em] text-slate-300 uppercase">
        {children}
      </h3>
      <div className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
    </div>
  );
}
