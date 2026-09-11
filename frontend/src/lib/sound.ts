/* ============================================================
   Sound engine — tiny Web Audio synth (no audio files needed).
   Sound is OFF by default; toggle via the Command Center.
   ============================================================ */

let ctx: AudioContext | null = null;
let enabled = false;

export function setSoundEnabled(v: boolean) {
  enabled = v;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem("os.sound", v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }
}

export function isSoundEnabled(): boolean {
  if (typeof window !== "undefined") {
    try {
      return window.localStorage.getItem("os.sound") === "1";
    } catch {
      /* ignore */
    }
  }
  return enabled;
}

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.05,
  when = 0
) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + when;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

export const sfx = {
  click() {
    if (!isSoundEnabled()) return;
    tone(720, 0.07, "triangle", 0.05);
    tone(1080, 0.05, "sine", 0.03, 0.02);
  },
  open() {
    if (!isSoundEnabled()) return;
    tone(420, 0.1, "sine", 0.05);
    tone(620, 0.12, "sine", 0.045, 0.06);
  },
  close() {
    if (!isSoundEnabled()) return;
    tone(560, 0.1, "sine", 0.05);
    tone(360, 0.12, "sine", 0.04, 0.05);
  },
  boot() {
    if (!isSoundEnabled()) return;
    tone(180, 0.5, "sine", 0.04);
    tone(360, 0.4, "sine", 0.03, 0.15);
    tone(540, 0.6, "sine", 0.025, 0.35);
  },
  notify() {
    if (!isSoundEnabled()) return;
    tone(880, 0.09, "sine", 0.045);
    tone(1174, 0.12, "sine", 0.04, 0.09);
  },
};
