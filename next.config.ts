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

const nextConfig: NextConfig = {
  async headers() {
    return [
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
