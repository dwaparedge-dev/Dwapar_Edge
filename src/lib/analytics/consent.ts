// Browser-only. The visitor's analytics choice, kept in localStorage, plus the signals that mean "do not track me".
import { CONSENT_VERSION, STORAGE } from "./config";

export type Choice = "accepted" | "declined" | "undecided";

const read = (k: string): string | null => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* storage blocked: the choice just is not remembered */ } };
const drop = (k: string) => { try { localStorage.removeItem(k); } catch { /* ignore */ } };

/** Browser-level opt-out signals (Global Privacy Control, Do Not Track). With one set and no explicit choice we treat it as "declined". */
export function privacySignal(): boolean {
  const n = navigator as Navigator & { globalPrivacyControl?: boolean };
  return n.globalPrivacyControl === true || n.doNotTrack === "1" || (window as Window & { doNotTrack?: string }).doNotTrack === "1";
}

export function getChoice(): Choice {
  const raw = read(STORAGE.consent);
  if (raw) {
    try {
      const c = JSON.parse(raw) as { v?: string; analytics?: boolean };
      // A choice made under an older notice is void: ask again (a declined choice stays declined, we never nag for it).
      if (c.analytics === false) return "declined";
      if (c.analytics === true && c.v === CONSENT_VERSION) return "accepted";
    } catch { /* fall through to undecided */ }
  }
  return privacySignal() ? "declined" : "undecided";
}

export function saveChoice(analytics: boolean): void {
  write(STORAGE.consent, JSON.stringify({ v: CONSENT_VERSION, analytics, at: new Date().toISOString() }));
}

export const readVisitorId = (): string | null => read(STORAGE.visitor);
export const pendingForget = (): string | null => read(STORAGE.forget);
export const setPendingForget = (id: string) => write(STORAGE.forget, id);
export const clearPendingForget = () => drop(STORAGE.forget);

/** Removes the browser id and visit state. Called on withdrawal. */
export function clearTrackingState(): void {
  drop(STORAGE.visitor);
  drop(STORAGE.session);
}
