"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, MapPin, Phone, Copy, Check } from "lucide-react";
import { AppShell, SectionTitle } from "@/components/ui/app-shell";
import { contact } from "@/data/profile";
import { socials } from "@/data/socials";
import { GithubIcon, InstagramIcon, LinkedInIcon } from "@/components/ui/icons";

type Status = "idle" | "loading" | "success" | "error";

export function ContactApp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Please enter your name (at least 2 characters).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (message.trim().length < 5) {
      setError("Message must be at least 5 characters.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error — please try again.");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  const brandIcon = (id: string) => {
    if (id === "github") return <GithubIcon size={15} />;
    if (id === "instagram") return <InstagramIcon size={15} />;
    return <LinkedInIcon size={15} />;
  };

  return (
    <AppShell env="contact" icon={Mail} title="Contact" subtitle="Open a Channel" accent="#67e8f9">
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        {/* info column */}
        <div className="space-y-2.5">
          <button
            onClick={copyEmail}
            className="glass-soft flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors hover:border-cyan-400/30"
          >
            <Mail size={16} className="shrink-0 text-cyan-300" />
            <span className="min-w-0 flex-1">
              <span className="block text-[10px] tracking-wide text-slate-500 uppercase">Email</span>
              <span className="block truncate text-[12px] text-slate-200">{contact.email}</span>
            </span>
            {copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} className="text-slate-500" />
            )}
          </button>

          <div className="glass-soft flex items-center gap-3 rounded-xl px-3.5 py-3">
            <Phone size={16} className="shrink-0 text-cyan-300" />
            <span>
              <span className="block text-[10px] tracking-wide text-slate-500 uppercase">Phone</span>
              <span className="block text-[12px] text-slate-200">{contact.phone}</span>
            </span>
          </div>

          <div className="glass-soft flex items-center gap-3 rounded-xl px-3.5 py-3">
            <MapPin size={16} className="shrink-0 text-cyan-300" />
            <span>
              <span className="block text-[10px] tracking-wide text-slate-500 uppercase">Location</span>
              <span className="block text-[12px] text-slate-200">{contact.location}</span>
            </span>
          </div>

          <div className="glass-soft rounded-xl p-3.5">
            <p className="mb-2.5 text-[10px] tracking-wide text-slate-500 uppercase">Profiles</p>
            <div className="space-y-1.5">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12px] text-slate-300 transition-colors hover:bg-white/[0.05] hover:text-cyan-200"
                >
                  <span style={{ color: s.color }}>{brandIcon(s.id)}</span>
                  {s.label}
                  <span className="ml-auto text-[10.5px] text-slate-500">{s.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* form column */}
        <div>
          <SectionTitle icon={Mail}>Send a Message</SectionTitle>
          <form onSubmit={onSubmit} className="glass-soft space-y-3 rounded-2xl p-4" noValidate>
            <div>
              <label htmlFor="c-name" className="mb-1 block text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                Name
              </label>
              <input
                id="c-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={80}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-[13.5px] text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-cyan-400/50"
              />
            </div>
            <div>
              <label htmlFor="c-email" className="mb-1 block text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                Email
              </label>
              <input
                id="c-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={120}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-[13.5px] text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-cyan-400/50"
              />
            </div>
            <div>
              <label htmlFor="c-msg" className="mb-1 block text-[11px] font-medium tracking-wide text-slate-400 uppercase">
                Message
              </label>
              <textarea
                id="c-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={5000}
                rows={5}
                placeholder="Tell me what's on your mind…"
                className="scroll-thin w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-[13.5px] text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-cyan-400/50"
              />
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-400/10 px-3.5 py-2.5 text-[12.5px] text-rose-200"
                >
                  <AlertCircle size={15} /> {error}
                </motion.p>
              )}
              {status === "success" && (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2.5 text-[12.5px] text-emerald-200"
                >
                  <CheckCircle2 size={15} /> Message sent — thanks for reaching out!
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-accent flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  <Send size={15} /> Send Message
                </>
              )}
            </button>
            <p className="text-center font-mono text-[10px] text-slate-600">
              validated &amp; rate-limited server-side
            </p>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
