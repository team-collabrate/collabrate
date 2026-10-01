import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// Colours match src/app/globals.css: --background (#FEFFFF) and --brand-violet (#8A2BE2).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: `${site.name} is a web, app, marketing and AI agency based in Tamil Nadu, India.`,
    start_url: "/",
    display: "browser",
    background_color: "#FEFFFF",
    theme_color: "#8A2BE2",
    icons: [
      { src: "/brand/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
