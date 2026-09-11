/* ============================================================
   Shared helpers for the portfolio backend.
   ============================================================ */

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/** Strip tags / control chars and collapse whitespace. */
export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[`$]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function clampLen(input: string, max: number): string {
  return input.slice(0, max);
}
