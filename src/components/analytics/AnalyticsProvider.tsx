"use client";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clearPendingForget, clearTrackingState, getChoice, pendingForget, readVisitorId, saveChoice, setPendingForget, type Choice } from "@/lib/analytics/consent";
import { startTracker, stopTracker, trackPageview } from "@/lib/analytics/tracker";

export const OPEN_PRIVACY_SETTINGS = "de:privacy-settings";

// The choice lives in localStorage, outside React. useSyncExternalStore reads it without a flash: the server and the first
// client render say "loading" (no banner), then the real value arrives.
const listeners = new Set<() => void>();
const notifyChoice = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => { listeners.delete(cb); window.removeEventListener("storage", cb); };
};
const snapshot = (): Choice | "loading" => getChoice();
const serverSnapshot = (): Choice | "loading" => "loading";

/** Asks the server to erase what it holds for this browser id. Resolves true when the server confirmed. */
async function eraseOnServer(visitorId: string): Promise<boolean> {
  try {
    const res = await fetch("/api/collect/forget", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ visitorId }), keepalive: true });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Owns the visitor's analytics choice. Nothing is measured, and nothing is written to the browser by the tracker, until the
 * visitor presses "Accept". Withdrawing stops tracking at once, deletes the browser id and asks the server to erase past data.
 */
export default function AnalyticsProvider() {
  const pathname = usePathname();
  const choice = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [panelOpen, setPanelOpen] = useState(false);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    // A withdrawal whose erasure request never arrived (offline, server down) is retried on the next visit.
    const stuck = pendingForget();
    if (stuck) void eraseOnServer(stuck).then((ok) => ok && clearPendingForget());
    const open = () => setPanelOpen(true);
    window.addEventListener(OPEN_PRIVACY_SETTINGS, open);
    return () => window.removeEventListener(OPEN_PRIVACY_SETTINGS, open);
  }, []);

  useEffect(() => {
    if (choice !== "accepted") return;
    startTracker();
    if (lastPath.current !== pathname) { lastPath.current = pathname; trackPageview(pathname); }
  }, [choice, pathname]);

  const accept = useCallback(() => {
    saveChoice(true);
    notifyChoice();
    setPanelOpen(false);
  }, []);

  const decline = useCallback(() => {
    const id = readVisitorId();
    stopTracker();
    lastPath.current = null;
    clearTrackingState();
    saveChoice(false);
    notifyChoice();
    setPanelOpen(false);
    if (id) {
      setPendingForget(id);
      void eraseOnServer(id).then((ok) => ok && clearPendingForget());
    }
  }, []);

  if (choice === "loading") return null;
  const show = choice === "undecided" || panelOpen;
  if (!show) return null;
  const decided = choice !== "undecided";

  const btn = "px-5 py-2.5 text-sm font-semibold border transition-colors";
  return (
    <div role="dialog" aria-modal="false" aria-labelledby="privacy-title" aria-describedby="privacy-text"
      className="fixed z-[60] bottom-4 left-4 right-4 sm:right-auto sm:max-w-md bg-ink border border-line shadow-2xl p-5">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold" />
      <p id="privacy-title" className="text-bone font-semibold">{decided ? "Privacy settings" : "Can we count your visit?"}</p>
      <p id="privacy-text" className="mt-2 text-sm text-muted leading-relaxed">
        {decided
          ? `Website analytics is currently ${choice === "accepted" ? "ON" : "OFF"} in this browser. Turning it off stops all measuring and erases the visit data we hold for this browser.`
          : "With your permission we record which pages you open, roughly where you are (city level), your browser type and how you found us, to learn what visitors need. We never keep your IP address, run ads, or sell or share this data. You can change your mind at any time from the footer."}{" "}
        <Link href="/privacy" className="text-gold hover:text-gold2 underline underline-offset-2">Privacy notice</Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {/* Both choices look the same on purpose: declining must be as easy as accepting. */}
        <button id="privacy-accept" type="button" onClick={accept} disabled={decided && choice === "accepted"} className={`${btn} border-line text-bone hover:border-gold disabled:opacity-40 disabled:cursor-default`}>
          {decided ? "Turn on analytics" : "Accept analytics"}
        </button>
        <button id="privacy-decline" type="button" onClick={decline} disabled={decided && choice === "declined"} className={`${btn} border-line text-bone hover:border-gold disabled:opacity-40 disabled:cursor-default`}>
          {decided ? "Turn off and erase my data" : "Decline"}
        </button>
        {decided && <button id="privacy-close" type="button" onClick={() => setPanelOpen(false)} className="px-3 py-2.5 text-sm text-dim hover:text-bone">Close</button>}
      </div>
    </div>
  );
}
