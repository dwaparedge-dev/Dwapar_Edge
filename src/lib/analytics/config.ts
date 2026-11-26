// Shared by the browser tracker and the server relay. Change CONSENT_VERSION whenever the privacy notice changes in a way
// that matters (new data, new purpose): every visitor is then asked again, and the CRM keeps the version each one accepted.
export const CONSENT_VERSION = "2026-11-26";

/** localStorage keys. Everything the tracker keeps in the browser is listed here, so the notice can name it exactly. */
export const STORAGE = {
  consent: "de_consent", // the visitor's choice: { v, analytics, at }
  visitor: "de_vid", // random browser id (only while analytics is accepted)
  session: "de_sess", // { id, last, ref, utm }: the current visit (only while analytics is accepted)
  forget: "de_forget", // a withdrawal whose erasure request has not reached the server yet
} as const;

/** A visit ends after this much inactivity. */
export const SESSION_IDLE_MS = 30 * 60_000;

/** Home-page sections reported as "scrolled into view". Order is irrelevant; ids must match the page. */
export const TRACKED_SECTIONS = ["about", "products", "approach", "why", "founders", "contact"] as const;

/** Custom actions a component may report with trackEvent(). */
export const CUSTOM_EVENTS = ["form_start", "demo_request"] as const;

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
