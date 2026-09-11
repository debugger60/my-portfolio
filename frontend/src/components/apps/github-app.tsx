"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2, Users, Eye } from "lucide-react";
import { AppShell } from "@/components/ui/app-shell";
import { settings } from "@/data/settings";
import { socials } from "@/data/socials";
import { GithubIcon } from "@/components/ui/icons";

interface GhData {
  ok: boolean;
  login?: string;
  name?: string;
  avatar_url?: string;
  html_url?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  bio?: string;
}

export function GithubApp() {
  const [data, setData] = useState<GhData | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const gh = socials.find((s) => s.id === "github")!;

  useEffect(() => {
    let alive = true;
    fetch("/api/github")
      .then((r) => r.json())
      .then((d: GhData) => {
        if (!alive) return;
        setData(d);
        setFailed(!d.ok);
      })
      .catch(() => {
        if (alive) setFailed(true);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  const stats = [
    { label: "Repos", value: data?.public_repos, icon: FolderGit2 },
    { label: "Followers", value: data?.followers, icon: Users },
    { label: "Following", value: data?.following, icon: Eye },
  ];

  return (
    <AppShell env="code" icon={Github} title="GitHub" subtitle="Code & Repositories" accent="#34d399">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        className="mx-auto mt-3 max-w-md"
      >
        <div className="glass rounded-2xl p-6 text-center">
          {/* avatar */}
          <div className="relative mx-auto h-20 w-20">
            <div className="absolute -inset-1 rounded-full bg-emerald-400/30 blur-md" />
            {loading ? (
              <div className="shimmer relative h-20 w-20 rounded-full border-2 border-white/10" />
            ) : data?.avatar_url ? (
              <img
                src={data.avatar_url}
                alt="GitHub avatar"
                className="relative h-20 w-20 rounded-full border-2 border-white/10 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="relative grid h-20 w-20 place-items-center rounded-full border-2 border-white/10 bg-white/[0.05]">
                <GithubIcon size={34} className="text-slate-300" />
              </div>
            )}
          </div>

          <h3 className="mt-4 text-lg font-bold text-white">
            {loading ? "…" : data?.name || settings.github.username}
          </h3>
          <p className="mt-0.5 font-mono text-[13px] text-emerald-300">@{settings.github.username}</p>

          {!loading && failed && (
            <p className="mt-3 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 text-[12px] text-amber-200">
              Live stats unavailable right now — public profile is one click away.
            </p>
          )}

          {/* stats */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {stats.map((s) => {
              const Ico = s.icon;
              return (
                <div key={s.label} className="glass-soft rounded-xl px-2 py-3">
                  <Ico size={14} className="mx-auto text-emerald-300" />
                  <p className="mt-1.5 text-[16px] font-bold text-white">
                    {loading ? (
                      <span className="shimmer inline-block h-4 w-6 rounded align-middle" />
                    ) : (
                      s.value ?? "—"
                    )}
                  </p>
                  <p className="text-[10px] tracking-wide text-slate-500 uppercase">{s.label}</p>
                </div>
              );
            })}
          </div>

          <a
            href={gh.url}
            target="_blank"
            rel="noreferrer"
            className="btn-accent mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold"
            style={{ background: "linear-gradient(100deg,#065f46,#10b981)" }}
          >
            <GithubIcon size={16} /> Open GitHub
          </a>
          <a
            href={gh.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-[12px] text-slate-400 transition-colors hover:text-emerald-300"
          >
            <ExternalLink size={12} /> github.com/debugger60
          </a>
        </div>
      </motion.div>
    </AppShell>
  );
}
