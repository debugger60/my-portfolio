import { Router, type Request, type Response } from "express";
import { handleContact } from "../services/contact.js";
import { isValidEmail, sanitizeText, clampLen } from "../lib/validate.js";

/* ============================================================
   POST /api/contact — validated, sanitized, rate-limited.
   ============================================================ */

export const contactRouter = Router();

const WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 600000);
const MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);

// In-memory rate limiting (resets when the server restarts).
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (arr.length >= MAX) {
    hits.set(ip, arr);
    return true;
  }
  arr.push(now);
  hits.set(ip, arr);
  return false;
}

function clientIp(req: Request): string {
  const fwd = req.headers["x-forwarded-for"];
  const first = Array.isArray(fwd) ? fwd[0] : fwd?.split(",")[0]?.trim();
  return first || req.socket.remoteAddress || "unknown";
}

contactRouter.post("/", async (req: Request, res: Response) => {
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({
      ok: false,
      error: "Too many messages. Please wait a few minutes.",
    });
    return;
  }

  const body = (req.body || {}) as Record<string, unknown>;
  const name = clampLen(sanitizeText(String(body.name ?? "")), 80);
  const email = clampLen(sanitizeText(String(body.email ?? "")), 120);
  const message = clampLen(sanitizeText(String(body.message ?? "")), 5000);

  if (!name || name.length < 2) {
    res
      .status(400)
      .json({ ok: false, error: "Please enter your name (2–80 characters)." });
    return;
  }
  if (!email || !isValidEmail(email)) {
    res
      .status(400)
      .json({ ok: false, error: "Please enter a valid email address." });
    return;
  }
  if (!message || message.length < 5) {
    res
      .status(400)
      .json({ ok: false, error: "Message must be between 5 and 5000 characters." });
    return;
  }

  const result = await handleContact({ name, email, message });
  res.json({ ok: result.ok, emailed: result.emailed, id: result.id });
});
