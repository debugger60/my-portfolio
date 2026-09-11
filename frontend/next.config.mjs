/** @type {import('next').NextConfig} */

// Where the standalone Express API lives (see ../backend).
//   • Local dev (default):    http://localhost:4000
//   • Custom backend host:    set NEXT_PUBLIC_API_URL=https://your-api.onrender.com
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const IS_VERCEL = process.env.VERCEL === "1";

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * Routing strategy for /api/*:
   *
   *  1. NEXT_PUBLIC_API_URL is set  → proxy /api/* to that backend.
   *  2. Deploying on Vercel         → use the built-in serverless
   *     functions in src/app/api/* (contact + github). No rewrite.
   *  3. Local dev (default)         → proxy /api/* to the Express
   *     backend in ../backend running on localhost:4000.
   *
   * `beforeFiles` makes the proxy take priority over the built-in
   * serverless functions, which exist for the Vercel case only.
   */
  async rewrites() {
    const rules = [];
    if (API_URL) {
      rules.push({ source: "/api/:path*", destination: `${API_URL}/api/:path*` });
    } else if (!IS_VERCEL) {
      rules.push({
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      });
    }
    return { beforeFiles: rules };
  },
};

export default nextConfig;
