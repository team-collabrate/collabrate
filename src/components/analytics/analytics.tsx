"use client";

import { useEffect } from "react";
import Script from "next/script";
import { CLARITY_ID, GA_ID, track } from "@/lib/analytics";
import { useConsent } from "@/lib/consent";

/**
 * GA4 + Microsoft Clarity via next/script, each only when its env var is set AND the visitor has
 * accepted analytics (see lib/consent.ts and consent-banner.tsx). Both load at lazyOnload so they
 * never compete with first paint. Also delegates mailto: and calendly.com link clicks so no
 * component needs changing for those two events.
 */
export function Analytics() {
  const consent = useConsent();
  const granted = consent === "granted";

  useEffect(() => {
    if (!GA_ID || !granted) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) track("click_email", { link_url: href.slice(7) });
      else if (/^https?:\/\/([^/]*\.)?calendly\.com\//i.test(href)) track("click_calendly", { link_url: href });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [granted]);

  if (!granted) return null;

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
          <Script id="ga4-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}
