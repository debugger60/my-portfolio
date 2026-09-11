import { NextResponse } from "next/server";

/* ============================================================
   GET /api/github — public GitHub profile proxy.
   Served as a Vercel serverless function in production.
   No auth, no private data.
   ============================================================ */

export const runtime = "nodejs";
export const revalidate = 3600; // 1h

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "debugger60";
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = (await res.json()) as Record<string, unknown>;
    return NextResponse.json({
      ok: true,
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      bio: data.bio,
    });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
