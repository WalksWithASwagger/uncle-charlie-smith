// Tiny in-memory IP rate limiter + input cap. Enough to stop a public hit from
// running up Claude cost on a single instance. For multi-region scale, swap for
// Upstash/Vercel KV. Resets per rolling window.

const WINDOW_MS = 60_000;
const MAX_HITS = 12;
const buckets = new Map<string, number[]>();

export function rateLimit(req: Request): { ok: boolean; retryAfter?: number } {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const now = Date.now();
  const hits = (buckets.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_HITS) {
    return { ok: false, retryAfter: Math.ceil((WINDOW_MS - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(ip, hits);
  // opportunistic cleanup so the map can't grow unbounded
  if (buckets.size > 5000) for (const [k, v] of buckets) if (!v.some((t) => now - t < WINDOW_MS)) buckets.delete(k);
  return { ok: true };
}

export const MAX_INPUT_CHARS = 4000;
