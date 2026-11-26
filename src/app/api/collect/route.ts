import { devGeo, geoFromHeaders, sanitizeBatch, crmBase } from "@/lib/analytics/relay";
import { overLimit, requestIp } from "@/lib/analytics/limit";
import { isBot } from "@/lib/analytics/ua";

// First-party analytics relay. The browser tracker posts here (same origin, so no CORS and fewer ad-blocker misses); this route
// checks the batch, adds where the visit came from, reduces the User-Agent to browser / OS / device, and passes it to the CRM
// with the secret key. The visitor's IP address is read only to rate-limit and is never forwarded or stored.
const INTAKE_PATH = "/api/intake/analytics/events";
const TIMEOUT_MS = 5000;
const MAX_BODY_CHARS = 8000;
const MAX_BATCHES_PER_MINUTE = 60;

const quiet = (status: number) => new Response(null, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (overLimit("collect", requestIp(request.headers), MAX_BATCHES_PER_MINUTE)) return quiet(429);

  const userAgent = request.headers.get("user-agent") ?? "";
  // Crawlers and scripts are dropped without an error: they would only skew the numbers.
  if (isBot(userAgent)) return quiet(204);

  const raw = await request.text();
  if (raw.length > MAX_BODY_CHARS) return quiet(413);
  let body: unknown;
  try { body = JSON.parse(raw); } catch { return quiet(400); }

  const fromHost = geoFromHeaders(request.headers);
  const geo = fromHost.country ? fromHost : devGeo(process.env.ANALYTICS_DEV_GEO, process.env.NODE_ENV === "production");
  const checked = sanitizeBatch(body, { userAgent, geo, ownHost: new URL(request.url).hostname });
  if (!checked.ok) return quiet(400);

  const url = process.env.CRM_INTAKE_URL;
  const key = process.env.CRM_INTAKE_KEY;
  if (!url || !key) return quiet(204); // analytics is simply off until the CRM is configured; the visitor is never told

  try {
    const res = await fetch(`${crmBase(url)}${INTAKE_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-key": key },
      body: JSON.stringify(checked.value),
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (res.ok) return quiet(204);
    console.error("Analytics: the CRM did not accept a batch", { crmStatus: res.status });
    return quiet(502);
  } catch (error) {
    console.error("Analytics: the CRM could not be reached", error instanceof Error ? error.message : error);
    return quiet(502);
  }
}
