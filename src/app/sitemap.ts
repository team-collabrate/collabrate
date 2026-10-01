import type { MetadataRoute } from "next";
import { sitemapSources } from "@/lib/sitemap-sources";

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapSources.flatMap((source) => source());
}
