"use client";

import { motion } from "framer-motion";
import { User, MapPin, GraduationCap, Target, Sparkles, Gamepad2, Brain, Hammer } from "lucide-react";
import { AppShell, Chip, SectionTitle } from "@/components/ui/app-shell";
import { profile } from "@/data/profile";

const interestIcons: Record<string, typeof Sparkles> = {
  gamepad: Gamepad2,
  brain: Brain,
  hammer: Hammer,
};

export function AboutApp() {
  return (
    <AppShell
      env="profile"
      icon={User}
      title="About Me"
      subtitle="Profile"
      accent="#22d3ee"
    >
      <div className="grid gap-5 md:grid-cols-[220px_1fr]">
        {/* photo card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass relative h-fit overflow-hidden rounded-2xl p-4 text-center"
        >
          <div className="relative mx-auto mt-1 h-36 w-36">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400/60 via-violet-500/40 to-pink-500/50 blur-lg" />
            <img
              src={profile.photo}
              alt={profile.name}
              className="relative h-36 w-36 rounded-full border-2 border-white/10 object-cover"
              draggable={false}
            />
          </div>
          <p className="mt-4 text-[15px] font-bold text-white">{profile.name}</p>
          <p className="mt-0.5 text-[11px] font-medium tracking-[0.2em] text-cyan-300 uppercase">
            {profile.role}
          </p>
          <p className="text-[10.5px] font-medium tracking-[0.18em] text-slate-400 uppercase">
            {profile.direction}
          </p>
          <div className="my-3 h-px bg-white/10" />
          <div className="space-y-1.5 text-left text-[11.5px] text-slate-400">
            <p className="flex items-center gap-1.5">
              <GraduationCap size={13} className="shrink-0 text-cyan-300" />
              {profile.degree}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={13} className="shrink-0 text-cyan-300" />
              {profile.institutionLocation}
            </p>
          </div>
        </motion.div>

        {/* identity + bio */}
        <div className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <p className="text-[11px] font-semibold tracking-[0.2em] text-cyan-300 uppercase">
              {profile.degree} · {profile.batch}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-white">{profile.institution}</h1>
            <p className="mt-0.5 text-sm text-slate-400">
              Computer Science &amp; Engineering — AI &amp; ML
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip color="#34d399">{profile.academicStanding}</Chip>
              <Chip color="#22d3ee">Batch 2027</Chip>
            </div>
          </motion.div>

          <div>
            <SectionTitle icon={Sparkles}>Introduction</SectionTitle>
            <ul className="space-y-2.5">
              {profile.bio.map((line, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                  {line}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <SectionTitle icon={Target}>Current Focus</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {profile.currentFocus.map((f) => (
                <Chip key={f} color="#a78bfa">{f}</Chip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* interests & languages */}
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <div>
          <SectionTitle icon={Sparkles}>Interests</SectionTitle>
          <div className="grid grid-cols-3 gap-2.5">
            {profile.interests.map((it, i) => {
              const Ico = interestIcons[it.icon] ?? Sparkles;
              return (
                <motion.div
                  key={it.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="glass-soft rounded-xl p-3 text-center"
                >
                  <Ico size={18} className="mx-auto text-cyan-300" />
                  <p className="mt-2 text-[11.5px] font-medium text-slate-300">{it.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div>
          <SectionTitle icon={User}>Languages</SectionTitle>
          <div className="space-y-2">
            {profile.languages.map((l) => (
              <div
                key={l.name}
                className="glass-soft flex items-center justify-between rounded-xl px-4 py-2.5"
              >
                <span className="text-[13px] font-medium text-slate-200">{l.name}</span>
                <span className="text-[11px] font-semibold tracking-wide text-cyan-300 uppercase">
                  {l.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
