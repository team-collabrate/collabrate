import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

// Single source of truth for the canonical host: site.domain in the content JSON
// (read directly because next.config.ts runs before the app's module graph exists).
const { site } = JSON.parse(
  readFileSync(join(process.cwd(), "src/content/collabrate-content.json"), "utf8")
) as { site: { domain: string } };

const CANONICAL_ORIGIN = `https://${site.domain}`;

// Matches every Vercel-issued hostname: collabrate.vercel.app, per-deployment URLs
// (collabrate-<hash>-<team>.vercel.app) and branch preview URLs.
const VERCEL_HOST = ".*\\.vercel\\.app";

// VERCEL_ENV is "production" only for production builds; it is unset locally, so
// local dev and `next start` are never redirected.
const isProductionBuild = process.env.VERCEL_ENV === "production";

// ---- Security headers ----
// Third parties the site loads (each only when its env var is set, see src/components/analytics and
// contact-options): GA4 (googletagmanager.com, google-analytics.com), Microsoft Clarity (clarity.ms,
// c.bing.com), Cloudflare Turnstile (challenges.cloudflare.com) and the Calendly booking iframe (calendly.com). Add a host here when adding a
// new third-party script, embed or API, or the browser will block it.
//
// 'unsafe-inline' for scripts and styles is deliberate: Next.js emits inline bootstrap scripts and
// the UI uses inline styles. A nonce-based CSP would force every page to render per request, which
// would cost the static performance this site relies on.
const isDev = process.env.NODE_ENV !== "production";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.clarity.ms https://scripts.clarity.ms https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com",
  "font-src 'self' data:",
  "media-src 'self'",
  `connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.clarity.ms https://c.bing.com https://challenges.cloudflare.com${isDev ? " ws: wss:" : ""}`,
  "frame-src https://challenges.cloudflare.com https://calendly.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // The whole stylesheet is about 22 KB (Tailwind), so inline it: the CSS link no longer blocks first paint.
  experimental: { inlineCss: true },

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Never let a *.vercel.app host be indexed, in any environment. Preview
        // deployments stay fully usable; the real domain does not match this rule.
        source: "/:path*",
        has: [{ type: "host", value: VERCEL_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async redirects() {
    // Production builds only: the vercel.app copy of the site 308-redirects to the
    // canonical domain, same path and query. Preview builds skip this so previews
    // remain reachable on their own URLs.
    if (!isProductionBuild) return [];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: VERCEL_HOST }],
        destination: `${CANONICAL_ORIGIN}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
