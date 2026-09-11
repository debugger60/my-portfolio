import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { config as loadEnv } from "dotenv";
import { contactRouter } from "./routes/contact.js";
import { githubRouter } from "./routes/github.js";

loadEnv();

const app = express();
const PORT = Number(process.env.PORT || 4000);

/* ---------- security ---------- */
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: "32kb" }));

/* ---------- CORS ---------- */
const origins = (process.env.CORS_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin || origins.includes(origin) || origins.includes("*")) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  })
);

/* ---------- routes ---------- */
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ ok: true, service: "kishore-portfolio-backend", ts: Date.now() });
});

app.use("/api/contact", contactRouter);
app.use("/api/github", githubRouter);

/* ---------- 404 + error handler ---------- */
app.use((_req: Request, res: Response) => {
  res.status(404).json({ ok: false, error: "Not found" });
});

app.use(
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: (e?: unknown) => void
  ) => {
    console.error("[API] Unhandled error:", err);
    res.status(500).json({ ok: false, error: "Internal server error" });
  }
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[API] listening on http://0.0.0.0:${PORT}`);
  console.log(`[API] contact endpoint : POST /api/contact`);
  console.log(`[API] github endpoint  : GET  /api/github`);
  console.log(`[API] health endpoint  : GET  /api/health`);
  console.log(`[API] CORS origins     : ${origins.join(", ")}`);
});
