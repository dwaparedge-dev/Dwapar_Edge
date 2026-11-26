import { checkDemoFields } from "@/lib/demo-request";
import { UUID_RE } from "@/lib/analytics/config";

// Server-side relay: the browser posts here, this route posts to the CRM with the secret key. The key never reaches the browser.
const INTAKE_PATH = "/api/intake/demo-requests";
const TIMEOUT_MS = 8000;
const MAX_BODY_CHARS = 4000;
const TRY_LATER = "We could not record your request right now. Please try again in a few minutes.";

// Best-effort per-IP limit, kept in memory (each server instance counts on its own). The CRM has its own limiter as the real guard.
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return false;
}

const reply = (status: number, body: Record<string, unknown>) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const intakeUrl = (configured: string) => {
  const base = configured.trim().replace(/\/+$/, "");
  return base.endsWith(INTAKE_PATH) ? base : `${base}${INTAKE_PATH}`;
};

const label = (v: unknown) => (typeof v === "string" && /^[a-z0-9_-]{1,50}$/i.test(v.trim()) ? v.trim().toLowerCase() : undefined);

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for")?.split(",")[0] ?? request.headers.get("x-real-ip") ?? "unknown").trim().slice(0, 64);
  if (limited(ip)) return reply(429, { error: "Too many requests from your network. Please try again after some time." });

  const raw = await request.text();
  let body: Record<string, unknown>;
  try {
    if (raw.length > MAX_BODY_CHARS) throw new Error("too large");
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return reply(400, { error: "Invalid request." });
  }

  // Hidden field: only bots fill it. Answer as if it worked so the bot learns nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") return reply(201, { ok: true });

  const checked = checkDemoFields(body);
  if (!checked.ok) return reply(422, { error: Object.values(checked.errors)[0] ?? "Please check the form.", fields: checked.errors });

  const url = process.env.CRM_INTAKE_URL;
  const key = process.env.CRM_INTAKE_KEY;
  if (!url || !key) {
    console.error("Demo request cannot be sent: CRM_INTAKE_URL or CRM_INTAKE_KEY is not set");
    return reply(503, { error: "Booking is temporarily unavailable. Please email info@dwaparedge.com." });
  }

  const externalRef = typeof body.externalRef === "string" && /^[A-Za-z0-9_-]{8,100}$/.test(body.externalRef) ? body.externalRef : undefined;
  // Only present when the visitor accepted analytics: it lets staff see what they looked at before asking for a demo.
  const visitorId = typeof body.visitorId === "string" && UUID_RE.test(body.visitorId) ? body.visitorId.toLowerCase() : undefined;
  const payload = {
    ...checked.value,
    ...(visitorId ? { visitorId } : {}),
    source: "dwaparedge-site",
    entryPoint: label(body.entryPoint) ?? "form",
    ...(externalRef ? { externalRef } : {}),
    submitterIp: ip,
    userAgent: (request.headers.get("user-agent") ?? "").slice(0, 300),
  };

  let response: Response;
  try {
    response = await fetch(intakeUrl(url), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-key": key },
      body: JSON.stringify(payload),
      redirect: "manual", // a redirect means a wrong address (the CRM sends strangers to its login page): a failure, never followed
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Demo request: the CRM could not be reached", error instanceof Error ? error.message : error);
    return reply(502, { error: TRY_LATER });
  }

  const answer = (await response.json().catch(() => null)) as { id?: unknown } | null;
  if (response.ok && typeof answer?.id === "string") return reply(201, { ok: true });

  console.error("Demo request: the CRM did not accept the request", { crmStatus: response.status });
  return reply(response.status === 429 ? 503 : 502, { error: TRY_LATER });
}
