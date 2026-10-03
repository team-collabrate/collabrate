"use client";

import { useSyncExternalStore } from "react";

/**
 * Visitor consent for analytics (GA4, Clarity). Stored in localStorage; "granted" is the only
 * value that lets any analytics script load. Unknown (null) behaves like "denied".
 */
export type Consent = "granted" | "denied" | null;

const KEY = "collabrate-consent";
const CHANGE_EVENT = "collabrate:consent";
const OPEN_EVENT = "collabrate:open-consent";

export function readConsent(): Consent {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked: the choice only lasts for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenConsentSettings(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Current consent. Null on the server and before the first client render. */
export function useConsent(): Consent {
  return useSyncExternalStore(subscribe, readConsent, () => null);
}
