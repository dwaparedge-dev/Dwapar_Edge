// Pure helpers for the /api/collect relay: shape checking and location headers. Kept free of Next.js so they can be tested alone.
import { CUSTOM_EVENTS, UUID_RE } from "./config";
import { parseDevice } from "./ua";

type Json = Record<string, unknown>;
const isObj = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "");
const uuid = (v: unknown) => (typeof v === "string" && UUID_RE.test(v) ? v.toLowerCase() : null);

/** A path only: no origin, no query string, no fragment. Anything else is rejected, not trimmed, so a bug upstream is visible. */
const pathOf = (v: unknown) => (typeof v === "string" && /^\/[^?#\s]{0,299}$/.test(v) ? v : null);
const int = (v: unknown, min: number, max: number) => (typeof v === "number" && Number.isInteger(v) && v >= min && v <= max ? v : undefined);
const tag = (v: unknown) => clean(v, 100).toLowerCase() || undefined;

export interface Geo { country?: string; region?: string; city?: string }

// Vercel sends the state as an ISO 3166-2 code ("GJ"), Cloudflare as a name. The report should read "Gujarat", so Indian codes are spelled out.
const INDIA_STATES: Record<string, string> = {
  AN: "Andaman and Nicobar Islands", AP: "Andhra Pradesh", AR: "Arunachal Pradesh", AS: "Assam", BR: "Bihar", CH: "Chandigarh", CG: "Chhattisgarh",
  DD: "Dadra and Nagar Haveli and Daman and Diu", DN: "Dadra and Nagar Haveli and Daman and Diu", DH: "Dadra and Nagar Haveli and Daman and Diu",
  DL: "Delhi", GA: "Goa", GJ: "Gujarat", HP: "Himachal Pradesh", HR: "Haryana", JH: "Jharkhand", JK: "Jammu and Kashmir", KA: "Karnataka", KL: "Kerala",
  LA: "Ladakh", LD: "Lakshadweep", MH: "Maharashtra", ML: "Meghalaya", MN: "Manipur", MP: "Madhya Pradesh", MZ: "Mizoram", NL: "Nagaland",
  OD: "Odisha", OR: "Odisha", PB: "Punjab", PY: "Puducherry", RJ: "Rajasthan", SK: "Sikkim", TN: "Tamil Nadu", TG: "Telangana", TS: "Telangana",
  TR: "Tripura", UP: "Uttar Pradesh", UK: "Uttarakhand", UT: "Uttarakhand", WB: "West Bengal",
};
export const indiaStateName = (code: string): string | undefined => INDIA_STATES[code.toUpperCase()];

/**
 * Where the request came from, as the hosting platform worked it out from the address. The address itself is not
 * read here, not forwarded and not stored. Vercel and Cloudflare headers are supported; with neither (local dev) there is no location.
 */
export function geoFromHeaders(h: Pick<Headers, "get">): Geo {
  const decode = (v: string | null) => {
    if (!v) return undefined;
    try { return clean(decodeURIComponent(v), 100) || undefined; } catch { return clean(v, 100) || undefined; }
  };
  const country = (h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? "").trim().toUpperCase();
  const region = decode(h.get("x-vercel-ip-country-region")) ?? decode(h.get("cf-region"));
  return {
    ...(/^[A-Z]{2}$/.test(country) && country !== "XX" && country !== "T1" ? { country } : {}),
    region: country === "IN" && region && /^[A-Za-z]{2,3}$/.test(region) ? (indiaStateName(region) ?? region) : region,
    city: decode(h.get("x-vercel-ip-city")) ?? decode(h.get("cf-ipcity")),
  };
}

/**
 * Local testing only: "IN|Gujarat|Ahmedabad" (country|region|city) used when the host sends no location headers, which is
 * always the case on localhost. Ignored in production, so a stray setting can never put every real visitor in one city.
 */
export function devGeo(raw: string | undefined, production: boolean): Geo {
  if (production || !raw) return {};
  const [country, region, city] = raw.split("|").map((v) => clean(v, 100));
  return /^[A-Za-z]{2}$/.test(country ?? "") ? { country: country!.toUpperCase(), ...(region ? { region } : {}), ...(city ? { city } : {}) } : {};
}

/** The referrer's host if it is another site; undefined for no referrer, our own host, or anything unparsable. */
export function referrerHost(v: unknown, ownHost: string): string | undefined {
  if (typeof v !== "string" || !v) return undefined;
  const host = v.trim().toLowerCase();
  return /^[a-z0-9.-]{1,253}$/.test(host) && host !== ownHost.toLowerCase() ? host : undefined;
}

export type Sanitized = { ok: true; value: Json } | { ok: false };

/** Rebuilds the batch from known fields only. Unknown fields are dropped; anything malformed rejects the whole batch. */
export function sanitizeBatch(body: unknown, ctx: { userAgent: string; geo: Geo; ownHost: string }): Sanitized {
  if (!isObj(body)) return { ok: false };
  const visitorId = uuid(body.visitorId);
  const sessionId = uuid(body.sessionId);
  const consentVersion = typeof body.consentVersion === "string" && /^[A-Za-z0-9._-]{1,20}$/.test(body.consentVersion) ? body.consentVersion : null;
  if (!visitorId || !sessionId || !consentVersion || !Array.isArray(body.events) || body.events.length < 1 || body.events.length > 20) return { ok: false };

  const events: Json[] = [];
  for (const e of body.events) {
    if (!isObj(e)) return { ok: false };
    const eventId = uuid(e.eventId);
    const path = pathOf(e.path);
    if (!eventId || !path) return { ok: false };
    const ageMs = int(e.ageMs, 0, 600_000) ?? 0;
    if (e.type === "pageview") events.push({ eventId, type: "pageview", path, ageMs });
    else if (e.type === "engagement") events.push({ eventId, type: "engagement", path, ageMs, durationS: int(e.durationS, 0, 3600) ?? 0, ...(int(e.scrollPct, 0, 100) !== undefined ? { scrollPct: int(e.scrollPct, 0, 100) } : {}) });
    else if (e.type === "custom") {
      const name = typeof e.name === "string" ? e.name : "";
      const known = (CUSTOM_EVENTS as readonly string[]).includes(name) || /^section_[a-z]{2,20}$/.test(name);
      if (!known) return { ok: false };
      events.push({ eventId, type: "custom", name, path, ageMs });
    } else return { ok: false };
  }

  const device = parseDevice(ctx.userAgent);
  return {
    ok: true,
    value: {
      visitorId, sessionId, consentVersion, ...ctx.geo, ...device,
      language: clean(body.language, 20) || undefined,
      referrerHost: referrerHost(body.referrerHost, ctx.ownHost),
      utmSource: tag(body.utmSource), utmMedium: tag(body.utmMedium), utmCampaign: tag(body.utmCampaign),
      events,
    },
  };
}

/** CRM_INTAKE_URL may be the CRM's base address or the full demo-request endpoint; analytics routes hang off the base. */
export function crmBase(configured: string): string {
  return configured.trim().replace(/\/+$/, "").replace(/\/api\/intake\/.*$/, "");
}
