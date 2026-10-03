"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CLARITY_ID, GA_ID } from "@/lib/analytics";
import { onOpenConsentSettings, useConsent, writeConsent } from "@/lib/consent";

/**
 * Opt-in analytics notice. Shown only when an analytics ID is configured and the visitor has not
 * chosen yet (or reopened it from "Cookie settings" in the footer). Nothing is tracked until
 * "Accept" is clicked; see components/analytics/analytics.tsx.
 */
export function ConsentBanner() {
  const consent = useConsent();
  // False during server render and hydration, true afterwards, so the banner never flashes for
  // visitors who have already chosen.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    return onOpenConsentSettings(() => setReopened(true));
  }, []);

  if (!GA_ID && !CLARITY_ID) return null;
  if (!mounted || (consent !== null && !reopened)) return null;

  const choose = (value: "granted" | "denied") => {
    const wasGranted = consent === "granted";
    writeConsent(value);
    setReopened(false);
    // Scripts that already loaded cannot be unloaded, so a withdrawal restarts the page clean.
    if (wasGranted && value === "denied") window.location.reload();
  };

  return (
    <div
      role="dialog"
      aria-label="Analytics cookies"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-[520px] rounded-[18px] border border-white/60 bg-white/80 p-4 shadow-[0_10px_32px_-8px_rgba(60,30,120,0.35)] backdrop-blur-2xl sm:left-4 sm:right-auto sm:mx-0"
    >
      <p className="text-sm leading-relaxed text-foreground/80">
        We use analytics cookies to see which pages help visitors, so we can improve the site. They stay off unless
        you accept. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <Button variant="primary" size="sm" className="h-11 flex-1" onClick={() => choose("granted")}>
          Accept
        </Button>
        <Button variant="soft" size="sm" className="h-11 flex-1" onClick={() => choose("denied")}>
          Decline
        </Button>
      </div>
    </div>
  );
}
