// Browser-only tracker. It runs only while the visitor has accepted analytics (see AnalyticsProvider).
// What it sends: the page path (no query string), time the page was visible, how far it was scrolled, which home-page
// sections were seen, and the visit's source (referrer host + utm_* tags). It never reads form fields, clicks or keystrokes.
import { CONSENT_VERSION, SESSION_IDLE_MS, STORAGE, TRACKED_SECTIONS, type CUSTOM_EVENTS } from "./config";

type EventType = "pageview" | "engagement" | "custom";
interface QueuedEvent { eventId: string; type: EventType; name?: string; path: string; durationS?: number; scrollPct?: number; at: number }
interface Session { id: string; last: number; ref?: string; utm?: { source?: string; medium?: string; campaign?: string } }

const uuid = (): string => {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  // randomUUID needs a secure context; getRandomValues works on plain http (local network demos).
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6]! & 0x0f) | 0x40; b[8] = (b[8]! & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
};

const get = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const set = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } };

let running = false;
let queue: QueuedEvent[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;
let currentPath: string | null = null;
let visibleSince: number | null = null;
let visibleMs = 0;
let maxScroll = 0;
let observer: IntersectionObserver | undefined;
let seenSections = new Set<string>();
const cleanups: (() => void)[] = [];

function visitorId(): string {
  let id = get(STORAGE.visitor);
  if (!id) { id = uuid(); set(STORAGE.visitor, id); }
  return id;
}

/** The current visit, or a fresh one after 30 idle minutes. Source tags are read once, on the visit's first page. */
function session(): Session {
  const now = Date.now();
  try {
    const s = JSON.parse(get(STORAGE.session) ?? "null") as Session | null;
    if (s && typeof s.id === "string" && now - s.last < SESSION_IDLE_MS) { s.last = now; set(STORAGE.session, JSON.stringify(s)); return s; }
  } catch { /* start a new visit */ }
  const q = new URLSearchParams(location.search);
  const tag = (k: string) => q.get(k)?.slice(0, 100) || undefined;
  let ref: string | undefined;
  try { const h = new URL(document.referrer).hostname; if (document.referrer && h !== location.hostname) ref = h; } catch { /* no usable referrer */ }
  const s: Session = { id: uuid(), last: now, ref, utm: { source: tag("utm_source"), medium: tag("utm_medium"), campaign: tag("utm_campaign") } };
  set(STORAGE.session, JSON.stringify(s));
  seenSections = new Set();
  return s;
}

function push(e: Omit<QueuedEvent, "eventId" | "at">) {
  if (!running) return;
  queue.push({ ...e, eventId: uuid(), at: Date.now() });
  if (queue.length >= 20) void flush();
  else if (!timer) timer = setTimeout(() => void flush(), 2000);
}

/** Sends everything queued. `final` (page is closing) uses sendBeacon, which survives unload; otherwise fetch with keepalive. */
export function flush(final = false): Promise<void> {
  if (timer) { clearTimeout(timer); timer = undefined; }
  if (!queue.length) return Promise.resolve();
  const s = session();
  const now = Date.now();
  const events = queue.splice(0, 20).map(({ at, ...e }) => ({ ...e, ageMs: Math.min(Math.max(now - at, 0), 600_000) }));
  const body = JSON.stringify({
    visitorId: visitorId(), sessionId: s.id, consentVersion: CONSENT_VERSION, language: navigator.language,
    referrerHost: s.ref, utmSource: s.utm?.source, utmMedium: s.utm?.medium, utmCampaign: s.utm?.campaign, events,
  });
  if (queue.length) timer = setTimeout(() => void flush(final), 0);
  if (final && "sendBeacon" in navigator && navigator.sendBeacon("/api/collect", new Blob([body], { type: "text/plain" }))) return Promise.resolve();
  return fetch("/api/collect", { method: "POST", headers: { "Content-Type": "text/plain" }, body, keepalive: true }).then(() => undefined, () => undefined);
}

const scrollPct = () => {
  const el = document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  return max <= 0 ? 100 : Math.min(100, Math.round(((window.scrollY + el.clientHeight) / el.scrollHeight) * 100));
};

/** Closes out the time-on-page of the page being left. */
function reportEngagement() {
  if (visibleSince !== null) { visibleMs += Date.now() - visibleSince; visibleSince = document.visibilityState === "visible" ? Date.now() : null; }
  const s = Math.round(visibleMs / 1000);
  if (currentPath && s >= 1) push({ type: "engagement", path: currentPath, durationS: Math.min(s, 3600), scrollPct: Math.max(maxScroll, scrollPct()) });
  visibleMs = 0; maxScroll = scrollPct();
}

function watchSections() {
  observer?.disconnect();
  if (!("IntersectionObserver" in window) || currentPath !== "/") return;
  observer = new IntersectionObserver((entries) => {
    for (const en of entries) {
      const id = en.target.id;
      if (en.isIntersecting && !seenSections.has(id)) { seenSections.add(id); push({ type: "custom", name: `section_${id}`, path: "/" }); }
    }
  }, { threshold: 0.4 });
  for (const id of TRACKED_SECTIONS) { const el = document.getElementById(id); if (el) observer.observe(el); }
}

/** Call on first load and on every route change. */
export function trackPageview(path: string) {
  if (!running) return;
  if (currentPath !== null) reportEngagement();
  currentPath = path;
  maxScroll = 0;
  session(); // starts or renews the visit before the first event
  push({ type: "pageview", path });
  // Sections render after the route does; look for them on the next frame.
  requestAnimationFrame(() => requestAnimationFrame(watchSections));
}

/** A named action (form_start, demo_request). */
export function trackEvent(name: (typeof CUSTOM_EVENTS)[number]) {
  if (running && currentPath) push({ type: "custom", name, path: currentPath });
}

/** The browser id to attach to a form, or null when analytics is off. Stitching a visit to a lead only ever happens with consent. */
export function currentVisitorId(): string | null {
  return running ? get(STORAGE.visitor) : null;
}

export function startTracker() {
  if (running || typeof window === "undefined") return;
  running = true;
  visitorId();
  visibleSince = document.visibilityState === "visible" ? Date.now() : null;
  const onVisibility = () => {
    if (document.visibilityState === "hidden") { reportEngagement(); visibleSince = null; void flush(true); }
    else visibleSince = Date.now();
  };
  const onScroll = () => { maxScroll = Math.max(maxScroll, scrollPct()); };
  const onHide = () => { reportEngagement(); void flush(true); };
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onHide);
  window.addEventListener("scroll", onScroll, { passive: true });
  cleanups.push(
    () => document.removeEventListener("visibilitychange", onVisibility),
    () => window.removeEventListener("pagehide", onHide),
    () => window.removeEventListener("scroll", onScroll),
  );
}

/** Stops tracking and throws away anything not yet sent (used on withdrawal: nothing more may leave the browser). */
export function stopTracker() {
  running = false;
  queue = [];
  if (timer) { clearTimeout(timer); timer = undefined; }
  observer?.disconnect(); observer = undefined;
  cleanups.splice(0).forEach((c) => c());
  currentPath = null; visibleSince = null; visibleMs = 0; maxScroll = 0;
}
