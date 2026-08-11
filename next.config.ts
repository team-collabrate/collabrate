import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: this site has no API routes, dynamic segments, or server
  // actions, so it ships as plain HTML/CSS/JS that Cloudflare Pages can serve
  // directly from its CDN (no Workers runtime needed).
  output: "export",
  images: {
    // next/image's optimization API needs a server; unoptimized just serves
    // the original file as-is, which is fine since we only use it for the
    // small fixed-size logo mark.
    unoptimized: true,
  },
};

export default nextConfig;
