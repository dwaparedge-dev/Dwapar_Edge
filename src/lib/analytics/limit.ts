// Best-effort per-address limit kept in memory (each server instance counts alone). The CRM has its own limits as the real guard.
// The address is used only as this map's key for a minute; it is never logged, forwarded or stored anywhere else.
const hits = new Map<string, { n: number; resetAt: number }>();

export function overLimit(bucket: string, ip: string, max: number, windowMs = 60_000): boolean {
  const now = Date.now();
  const key = `${bucket}:${ip}`;
  if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
  const h = hits.get(key);
  if (!h || h.resetAt < now) {
    hits.set(key, { n: 1, resetAt: now + windowMs });
    return false;
  }
  return ++h.n > max;
}

export const requestIp = (h: Pick<Headers, "get">) => (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "unknown").trim().slice(0, 64);
