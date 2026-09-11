import nodemailer from "nodemailer";

/* ============================================================
   Contact backend logic (Vercel-serverless mirror of backend/).
   Runs inside a Next.js route handler on the server — works on
   Vercel Functions, never in the browser bundle.

   Behavior:
     • Message is always logged to the server console.
     • If SMTP_* env vars are set, the message is emailed too.
   ============================================================ */

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface SendResult {
  ok: boolean;
  emailed: boolean;
  id: string;
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });
}

export async function handleContact(
  payload: ContactPayload
): Promise<SendResult> {
  const id =
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

  const to = process.env.CONTACT_TO || "pandakishoreranjan@gmail.com";

  // 1) Always log server-side (safe fallback — nothing lost).
  console.log(
    `\n[CONTACT ${id}] ${payload.name} <${payload.email}>\n${payload.message}\n`
  );

  // 2) Email if SMTP is configured.
  let emailed = false;
  const transporter = getTransporter();
  if (transporter) {
    const from =
      process.env.SMTP_FROM || `"Portfolio OS" <${process.env.SMTP_USER}>`;
    try {
      await transporter.sendMail({
        from,
        to,
        replyTo: payload.email,
        subject: `[Portfolio] Message from ${payload.name}`,
        text:
          `New message from your portfolio site\n` +
          `----------------------------------------\n` +
          `Name:    ${payload.name}\n` +
          `Email:   ${payload.email}\n` +
          `----------------------------------------\n\n` +
          `${payload.message}\n`,
        html:
          `<h2 style="font-family:sans-serif">New portfolio message</h2>` +
          `<p style="font-family:sans-serif"><b>Name:</b> ${payload.name}<br/>` +
          `<b>Email:</b> ${payload.email}</p>` +
          `<p style="font-family:sans-serif;white-space:pre-wrap;background:#0b1120;color:#e2e8f0;padding:16px;border-radius:8px">${payload.message}</p>`,
      });
      emailed = true;
    } catch (err) {
      console.error("[CONTACT] SMTP send failed (logged anyway):", err);
    }
  }

  return { ok: true, emailed, id };
}
