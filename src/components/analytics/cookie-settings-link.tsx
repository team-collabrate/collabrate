"use client";

import { CLARITY_ID, GA_ID } from "@/lib/analytics";
import { openConsentSettings } from "@/lib/consent";

/** Footer link that reopens the analytics choice. Hidden when no analytics is configured. */
export function CookieSettingsLink({ className }: { className?: string }) {
  if (!GA_ID && !CLARITY_ID) return null;
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
