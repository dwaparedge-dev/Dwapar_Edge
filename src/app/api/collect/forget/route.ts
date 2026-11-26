import { crmBase } from "@/lib/analytics/relay";
import { overLimit, requestIp } from "@/lib/analytics/limit";
import { UUID_RE } from "@/lib/analytics/config";

// A visitor withdrew consent: ask the CRM to erase everything stored under their browser id (right to erasure).
const FORGET_PATH = "/api/intake/analytics/forget";
const reply = (status: number, body: Record<string, unknown> = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  if (overLimit("forget", requestIp(request.headers), 10)) return reply(429);
  let visitorId: unknown;
  try {
    const body: unknown = JSON.parse((await request.text()).slice(0, 500));
    visitorId = typeof body === "object" && body !== null ? (body as { visitorId?: unknown }).visitorId : undefined;
  } catch { return reply(400); }
  if (typeof visitorId !== "string" || !UUID_RE.test(visitorId)) return reply(400);

  const url = process.env.CRM_INTAKE_URL;
  const key = process.env.CRM_INTAKE_KEY;
  if (!url || !key) return reply(200, { ok: true }); // nothing could have been stored

  try {
    const res = await fetch(`${crmBase(url)}${FORGET_PATH}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-key": key },
      body: JSON.stringify({ visitorId: visitorId.toLowerCase() }),
      redirect: "manual",
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    return res.ok ? reply(200, { ok: true }) : reply(502);
  } catch {
    return reply(502);
  }
}
