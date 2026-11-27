"use client";
import { OPEN_PRIVACY_SETTINGS } from "./AnalyticsProvider";

/** Footer link that reopens the analytics choice, so withdrawing consent is always one click away. */
export default function PrivacySettingsButton({ className }: { className?: string }) {
  return (
    <button id="open-privacy-settings" type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS))}>
      Cookie settings
    </button>
  );
}
