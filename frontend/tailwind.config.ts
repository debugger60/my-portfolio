import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#04060e",
        abyss: "#070b16",
        panel: "#0b1120",
        line: "rgba(148,163,184,0.12)",
        accent: {
          DEFAULT: "#22d3ee",
          violet: "#8b5cf6",
          magenta: "#ec4899",
          emerald: "#34d399",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        scan: "scan 6s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(1200%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
