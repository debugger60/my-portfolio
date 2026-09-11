"use client";

import { useEffect, useRef } from "react";
import type { EnvKey } from "@/lib/apps";

/* ============================================================
   ParticleField — canvas live-wallpaper engine.
   Slow, elegant data/AI particles with connecting "neural"
   lines, depth parallax and mouse interaction. Each app
   environment gets its own palette & behavior.
   ============================================================ */

interface VariantCfg {
  colors: string[];
  link: number;
  speed: number;
  size: number;
  countPerArea: number;
  flow: boolean;
}

const VARIANTS: Record<EnvKey, VariantCfg> = {
  space: { colors: ["#22d3ee", "#8b5cf6", "#38bdf8", "#a78bfa"], link: 130, speed: 0.16, size: 1.6, countPerArea: 16000, flow: true },
  profile: { colors: ["#22d3ee", "#67e8f9", "#38bdf8"], link: 120, speed: 0.14, size: 1.6, countPerArea: 17000, flow: false },
  academic: { colors: ["#34d399", "#22d3ee", "#6ee7b7"], link: 120, speed: 0.15, size: 1.7, countPerArea: 17000, flow: false },
  neural: { colors: ["#a78bfa", "#ec4899", "#22d3ee", "#f0abfc"], link: 150, speed: 0.2, size: 1.8, countPerArea: 14000, flow: true },
  workstation: { colors: ["#38bdf8", "#22d3ee", "#818cf8"], link: 120, speed: 0.15, size: 1.6, countPerArea: 17000, flow: false },
  lab: { colors: ["#22d3ee", "#f472b6", "#a78bfa", "#34d399"], link: 130, speed: 0.18, size: 1.7, countPerArea: 15000, flow: true },
  document: { colors: ["#94a3b8", "#67e8f9", "#a5b4fc"], link: 110, speed: 0.12, size: 1.4, countPerArea: 19000, flow: false },
  network: { colors: ["#0ea5e9", "#38bdf8", "#67e8f9"], link: 140, speed: 0.16, size: 1.6, countPerArea: 15000, flow: true },
  code: { colors: ["#34d399", "#22d3ee", "#6ee7b7"], link: 120, speed: 0.15, size: 1.6, countPerArea: 16000, flow: false },
  social: { colors: ["#ec4899", "#f472b6", "#a78bfa", "#fb7185"], link: 130, speed: 0.18, size: 1.7, countPerArea: 15000, flow: true },
  diagnostics: { colors: ["#34d399", "#22d3ee", "#fbbf24", "#4ade80"], link: 130, speed: 0.16, size: 1.7, countPerArea: 15000, flow: false },
  growth: { colors: ["#34d399", "#fbbf24", "#6ee7b7", "#a3e635"], link: 120, speed: 0.15, size: 1.7, countPerArea: 16000, flow: false },
  contact: { colors: ["#22d3ee", "#67e8f9", "#818cf8"], link: 120, speed: 0.15, size: 1.6, countPerArea: 16000, flow: false },
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  depth: number;
  hue: string;
  tw: number;
  tws: number;
}

export function ParticleField({
  variant = "space",
  className = "",
}: {
  variant?: EnvKey;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cfgRef = useRef(VARIANTS[variant]);
  cfgRef.current = VARIANTS[variant];

  const mouseRef = useRef({ x: 0.5, y: 0.5, active: false });
  const burstRef = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let running = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function buildParticles() {
      const cfg = cfgRef.current;
      const count = Math.max(
        36,
        Math.min(150, Math.round((w * h) / cfg.countPerArea))
      );
      particles = new Array(count).fill(0).map(() => {
        const depth = 0.35 + Math.random() * 0.65;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * cfg.speed * depth,
          vy: (Math.random() - 0.5) * cfg.speed * depth,
          r: cfg.size * depth * (0.7 + Math.random() * 0.6),
          depth,
          hue: cfg.colors[(Math.random() * cfg.colors.length) | 0],
          tw: Math.random() * Math.PI * 2,
          tws: 0.008 + Math.random() * 0.02,
        };
      });
    }

    function resize() {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles();
      if (reduced) draw();
    }

    function draw() {
      if (!ctx) return;
      const cfg = cfgRef.current;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current;
      const px = (mx.x - 0.5) * 26;
      const py = (mx.y - 0.5) * 26;

      // faint radial glow
      const glow = ctx.createRadialGradient(
        w * mx.x,
        h * mx.y,
        0,
        w * mx.x,
        h * mx.y,
        Math.max(w, h) * 0.5
      );
      glow.addColorStop(0, "rgba(34,211,238,0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // links (neural connections)
      const linkDist = cfg.link;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const a = (1 - Math.sqrt(d2) / linkDist) * 0.16;
            ctx.strokeStyle = `rgba(148,163,184,${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      // particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += p.tws;

        const burst = burstRef.current;
        if (burst) {
          const dx = p.x - burst.x;
          const dy = p.y - burst.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 1 - d / 240);
          if (force > 0 && d > 0.01) {
            p.x += (dx / d) * force * 3;
            p.y += (dy / d) * force * 3;
          }
        }

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        const ox = px * p.depth;
        const oy = py * p.depth;
        const alpha = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(p.tw));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.hue;
        ctx.shadowColor = p.hue;
        ctx.shadowBlur = 6 * p.depth;
        ctx.beginPath();
        ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      // data stream streaks
      if (cfg.flow) {
        ctx.globalAlpha = 0.05;
        for (let i = 0; i < 3; i++) {
          const sx = (Math.sin(Date.now() * 0.00012 + i * 2.1) * 0.5 + 0.5) * w;
          const sy = ((Date.now() * 0.02 + i * 977) % (h + 200)) - 100;
          const g = ctx.createLinearGradient(sx - 60, sy, sx + 60, sy + 120);
          g.addColorStop(0, "rgba(34,211,238,0)");
          g.addColorStop(1, "rgba(34,211,238,0.35)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(sx - 30, sy - 60);
          ctx.lineTo(sx + 30, sy + 60);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    }

    function loop() {
      if (!running) return;
      if (!reduced) draw();
      raf = requestAnimationFrame(loop);
    }

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        active: true,
      };
    };

    const onClick = (e: MouseEvent) => {
      burstRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
      setTimeout(() => {
        if (burstRef.current && Date.now() - burstRef.current.t > 600) {
          burstRef.current = null;
        }
      }, 700);
    };

    const onVis = () => {
      running = !document.hidden;
      if (running) loop();
    };

    resize();
    loop();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
