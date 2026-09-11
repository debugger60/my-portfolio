/**
 * Installs dependencies for backend/ and frontend/ automatically.
 * Runs as the root `postinstall`, so a single `npm install` at the
 * project root sets up everything. Cross-platform (works on Windows,
 * macOS and Linux).
 */
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

for (const dir of ["backend", "frontend"]) {
  console.log(`\n[setup] installing ${dir}/ ...`);
  try {
    execSync("npm install --no-audit --no-fund", {
      cwd: join(root, dir),
      stdio: "inherit",
    });
  } catch (err) {
    console.error(`\n[setup] failed to install ${dir}/ — run it manually:`);
    console.error(`        cd ${dir} && npm install\n`);
    process.exit(1);
  }
}

console.log("\n[setup] done. Start everything with:  npm run dev\n");
