/* ============================================================
   SETTINGS — global runtime configuration.
   Tweak timing, sound, and behaviors without touching components.
   ============================================================ */

export const settings = {
  // Boot sequence (ms)
  boot: {
    linesInterval: 620,
    holdAfterLines: 950,
    fadeOutMs: 700,
    skipAfterMs: 12000,
  },

  // Sound (off by default; toggle in the command center)
  sound: {
    defaultEnabled: false,
    bootChimeVolume: 0.4,
    clickVolume: 0.18,
  },

  // GitHub app — live public API with graceful fallback
  github: {
    username: "debugger60",
    apiUrl: "https://api.github.com/users/debugger60",
  },

  // Documents
  documents: {
    resumeUrl: "/resume/resume.pdf",
    cvUrl: "/cv/cv.pdf",
  },

  // Visual
  accent: "#22d3ee",
  accentSecondary: "#8b5cf6",
};
