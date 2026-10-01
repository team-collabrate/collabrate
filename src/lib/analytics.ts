/**
 * Analytics helpers. Nothing loads unless the matching env var is set, so local dev,
 * previews and any deploy without IDs send no data.
 *
 * Events (mark generate_lead as a key event in GA4 yourself):
 *   generate_lead        real contact-form submission accepted by /api/contact
 *   click_email          any mailto: link
 *   click_calendly       any calendly.com link (none exist until the real URL is set)
 *   view_portfolio_item  a portfolio card scrolled into view (once per card)
 *   scroll_faq_open      an FAQ question opened
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export type AnalyticsEvent =
  | "generate_lead"
  | "click_email"
  | "click_calendly"
  | "view_portfolio_item"
  | "scroll_faq_open";

type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || !GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
