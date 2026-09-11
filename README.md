# Kishore Ranjan Panda — Portfolio OS 🖥️

An immersive, futuristic **personal-computer / operating-system** portfolio for
**Kishore Ranjan Panda** — Creative Developer, Data Science & AI.

Boot → Login → Desktop → Live wallpaper → Applications. Everything runs in the
browser like a real OS: draggable windows, a dock, a command center, animated
environments, and a working contact backend.

> **Monorepo layout** — frontend and backend are separated:

```
portfolio-os/
├── package.json   ← root launcher (npm install / npm run dev)
├── scripts/       ← auto-install helper
├── frontend/      → Next.js app (the OS UI)
└── backend/       → Express API (contact form, GitHub proxy)
```

---

## ✨ Experience flow

```
Power on (boot animation) → Login screen → Desktop
   └─ live wallpaper · desktop icons · windows · dock · command center (⌘K)
```

## 🗂️ Applications

About Me · Study/Education · Technical Skills · Tools I Know · Project Lab ·
Resume · CV · LinkedIn · GitHub · Instagram · Strengths · Development Areas ·
Contact

---

## 🚀 Run locally — the easy way (recommended)

Extract the zip, open the **`portfolio-os`** folder in VS Code, and run **two
commands in the terminal** (from the project root):

```bash
npm install      # installs root + backend/ + frontend/ automatically
npm run dev      # starts BOTH the API (:4000) and the UI (:3000)
```

Then open **http://localhost:3000** in your browser.

> ⚠️ Make sure your terminal is in the **project root** — the folder that
> contains `frontend/`, `backend/` and `package.json` — NOT inside `frontend/`
> or `backend/`. In VS Code, `Terminal → New Terminal` opens at the folder you
> opened.
>
> **Requires Node.js v18.17 or newer** — check with `node -v`.

### The manual way (two terminals)

```bash
# 1) Backend (API on http://localhost:4000)
cd backend
npm install
npm run dev

# 2) Frontend (UI on http://localhost:3000)
cd frontend
npm install
npm run dev
```

The frontend proxies `/api/*` to the backend automatically (see
`frontend/next.config.mjs`).

### Production builds

```bash
npm run build   # builds backend + frontend
npm run start   # runs both from their production builds
```

---

## 🔧 Backend (Express)

`backend/` is a small, hardened Express API:

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/health` | GET | health check |
| `/api/contact` | POST | contact form — validated, sanitized, rate-limited |
| `/api/github` | GET | public GitHub profile proxy (cached, no auth) |

**Contact behavior:** messages are always **logged to the server console**.
To have them emailed to you, copy `backend/.env.example` → `backend/.env` and
fill in SMTP details:

```env
CONTACT_TO=pandakishoreranjan@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
```

> Secrets live only in `backend/.env` (git-ignored) — never in client code.
> CORS is allow-listed via `CORS_ORIGINS`.

---

## ✏️ Editing content (no code changes needed)

All factual content lives in `frontend/src/data/`:

| File | What it controls |
| --- | --- |
| `profile.ts` | name, role, bio, photo, interests, languages |
| `education.ts` | education timeline & coursework |
| `skills.ts` | the 4 skill domains (qualitative levels) |
| `tools.ts` | the 8 tools |
| `projects.ts` | Project Lab entries & live URLs |
| `socials.ts` | LinkedIn / GitHub / Instagram |
| `strengths.ts` | strength diagnostics |
| `weaknesses.ts` | growth/development areas |
| `settings.ts` | boot timings, sound, document paths |

Replace `frontend/public/images/profile.jpg`,
`frontend/public/resume/resume.pdf`, and `frontend/public/cv/cv.pdf` to swap in
updated files.

---

## ☁️ Deploy to Vercel (recommended — one project, zero backend config)

The frontend ships with built-in **serverless API functions** (`src/app/api/*`)
that run the contact form + GitHub stats directly on Vercel — you do **not**
need to deploy the Express backend to go live.

**Steps:**

1. Push the repo to GitHub (any name).
2. Go to **vercel.com → Add New… → Project** and import the repo.
3. **⚠️ The critical setting — Root Directory:**
   In the import screen (or later in *Settings → General → Root Directory*),
   set it to **`frontend`**.
   > If you leave it as the repo root, Vercel builds the wrong folder and the
   > site shows a **404: NOT_FOUND**.
4. Framework preset should auto-detect as **Next.js** (pinned by
   `frontend/vercel.json`). Leave build/install commands as-is.
5. **Leave `NEXT_PUBLIC_API_URL` empty** — on Vercel the built-in functions are
   used automatically (the config detects `VERCEL=1`).
6. Click **Deploy**. ✅

**Optional — receive contact messages by email:**
In *Project → Settings → Environment Variables*, add:

```env
CONTACT_TO=pandakishoreranjan@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
```

Then redeploy. Without these, messages are logged to the Vercel function logs
(*Deployment → Functions → Logs*) — nothing is lost.

### Deploying the Express backend (optional)

If you prefer hosting the API yourself, deploy `backend/` to Render, Railway,
Fly.io or any Node host, then set `NEXT_PUBLIC_API_URL` to its URL on Vercel and
`CORS_ORIGINS` to your Vercel domain in `backend/.env`. The frontend will proxy
`/api/*` to it automatically.

---

## 🏗️ Tech stack

- **Frontend:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS ·
  Framer Motion · custom canvas particle engine · Web Audio SFX
- **Backend:** Node.js · Express · TypeScript · Helmet · CORS · Nodemailer

---

*Built as a personal portfolio — all personal/professional claims come from the
uploaded resume & CV. No fabricated experience, companies, or certifications.*
