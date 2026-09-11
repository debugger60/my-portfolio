import { NextRequest, NextResponse } from "next/server";
import { handleContact } from "@/server/contact";
import { isValidEmail, sanitizeText } from "@/lib/utils";

/* ============================================================
   POST /api/contact — validated, sanitized, rate-limited.
   Served as a Vercel serverless function in production; the
   Express backend handles it during local dev (via proxy).
   ============================================================ */

export const runtime = "nodejs";

const WINDOW_MS = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 600000);
const MAX = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);

// In-memory rate limiting (per function instance).
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

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please wait a few minutes." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const raw = (body || {}) as Record<string, unknown>;
  const name = sanitizeText(String(raw.name ?? "")).slice(0, 80);
  const email = sanitizeText(String(raw.email ?? "")).slice(0, 120);
  const message = sanitizeText(String(raw.message ?? "")).slice(0, 5000);

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name (2–80 characters)." },
      { status: 400 }
    );
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (!message || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Message must be between 5 and 5000 characters." },
      { status: 400 }
    );
  }

  const result = await handleContact({ name, email, message });

  return NextResponse.json({
    ok: result.ok,
    emailed: result.emailed,
    id: result.id,
  });
}
