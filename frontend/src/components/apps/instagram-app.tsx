"use client";

import { motion } from "framer-motion";
import { Instagram, ExternalLink, Camera, Heart, MessageCircle } from "lucide-react";
import { AppShell } from "@/components/ui/app-shell";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { InstagramIcon } from "@/components/ui/icons";

export function InstagramApp() {
  const ig = socials.find((s) => s.id === "instagram")!;

  return (
    <AppShell env="social" icon={Instagram} title="Instagram" subtitle="Visual / Social" accent="#ec4899">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="mx-auto mt-4 max-w-sm"
      >
        <div className="glass rounded-2xl p-6 text-center">
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-amber-400 via-pink-500 to-violet-500 opacity-90 blur-[3px]" />
            <div className="absolute -inset-2.5 rounded-full border border-pink-400/30" />
            <img
              src={profile.photo}
              alt={profile.name}
              className="relative h-24 w-24 rounded-full border-[3px] border-[#0a0f1d] object-cover"
            />
          </div>

          <h3 className="mt-4 text-lg font-bold text-white">
            <span className="text-pink-300">@</span>kishore.root
          </h3>
          <p className="mt-0.5 text-[13px] text-slate-400">
            {profile.role} · {profile.direction}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { icon: Camera, label: "Visual" },
              { icon: Heart, label: "Creative" },
              { icon: MessageCircle, label: "Connect" },
            ].map((s) => {
              const Ico = s.icon;
              return (
                <div key={s.label} className="glass-soft rounded-xl px-2 py-3">
                  <Ico size={15} className="mx-auto text-pink-300" />
                  <p className="mt-1.5 text-[10.5px] tracking-wide text-slate-500 uppercase">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>

          <a
            href={ig.url}
            target="_blank"
            rel="noreferrer"
            className="btn-accent mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold"
            style={{ background: "linear-gradient(100deg,#be185d,#ec4899,#a21caf)" }}
          >
            <InstagramIcon size={16} /> Open Instagram
          </a>
          <a
            href={ig.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-[12px] text-slate-400 transition-colors hover:text-pink-300"
          >
            <ExternalLink size={12} /> instagram.com/kishore.root
          </a>
        </div>
      </motion.div>
    </AppShell>
  );
}
