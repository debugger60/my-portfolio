"use client";

import { motion } from "framer-motion";
import { Linkedin, ExternalLink } from "lucide-react";
import { AppShell } from "@/components/ui/app-shell";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { LinkedInIcon } from "@/components/ui/icons";

export function LinkedInApp() {
  const li = socials.find((s) => s.id === "linkedin")!;

  return (
    <AppShell
      env="network"
      icon={Linkedin}
      title="LinkedIn"
      subtitle="Professional Network"
      accent="#0ea5e9"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="mx-auto mt-4 max-w-sm"
      >
        <div className="glass relative overflow-hidden rounded-2xl text-center">
          {/* banner */}
          <div className="h-20 bg-gradient-to-r from-sky-500/40 via-cyan-400/30 to-sky-600/40" />
          <div className="-mt-10 flex justify-center">
            <div className="relative h-20 w-20">
              <div className="absolute -inset-1 rounded-full bg-sky-400/40 blur-md" />
              <img
                src={profile.photo}
                alt={profile.name}
                className="relative h-20 w-20 rounded-full border-2 border-[#0a0f1d] object-cover"
              />
            </div>
          </div>

          <div className="px-6 pt-2 pb-6">
            <h3 className="text-lg font-bold text-white">{profile.name}</h3>
            <p className="mt-0.5 text-[13px] text-slate-400">
              {profile.role} · {profile.direction}
            </p>
            <p className="mt-0.5 text-[11.5px] text-slate-500">
              {profile.degree}, {profile.institutionShort}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3.5 py-1.5">
              <LinkedInIcon size={15} className="text-sky-300" />
              <span className="text-[12px] font-medium text-sky-200">{li.handle}</span>
            </div>

            <a
              href={li.url}
              target="_blank"
              rel="noreferrer"
              className="btn-accent mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold"
              style={{ background: "linear-gradient(100deg,#0369a1,#0ea5e9)" }}
            >
              <ExternalLink size={16} /> Open LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </AppShell>
  );
}
