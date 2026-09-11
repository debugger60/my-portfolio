import { Router, type Request, type Response } from "express";

/* ============================================================
   GET /api/github — proxies public GitHub profile data so the
   GitHub app can show live public stats. No auth, no private data.
   ============================================================ */

export const githubRouter = Router();

const CACHE_TTL_MS = 60 * 60 * 1000; // 1h
let cache: { at: number; data: Record<string, unknown> } | null = null;

githubRouter.get("/", async (_req: Request, res: Response) => {
  const username = process.env.GITHUB_USERNAME || "debugger60";

  if (cache && Date.now() - cache.at < CACHE_TTL_MS) {
    res.json({ ok: true, ...cache.data });
    return;
  }

  try {
    const upstream = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!upstream.ok) throw new Error(`GitHub API ${upstream.status}`);
    const data = (await upstream.json()) as Record<string, unknown>;
    const slim = {
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      bio: data.bio,
    };
    cache = { at: Date.now(), data: slim };
    res.json({ ok: true, ...slim });
  } catch {
    res.json({ ok: false });
  }
});
