import type { MetadataRoute } from "next";
import { publishedBlogPosts } from "@/content/blog-posts";
import { siteUrl } from "@/lib/content";

export type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Static routes with a real lastModified: the date of the last commit that changed the
 * page (or its content). These are constants on purpose; `new Date()` would stamp every
 * build as "modified" and teach crawlers to ignore the field. Update the date when a
 * page's content really changes.
 */
const STATIC_ROUTES: { path: string; lastModified: string; changeFrequency: SitemapEntry["changeFrequency"]; priority: number }[] = [
  { path: "", lastModified: "2026-10-01", changeFrequency: "weekly", priority: 1 },
  { path: "/services", lastModified: "2026-08-19", changeFrequency: "monthly", priority: 0.9 },
  { path: "/portfolio", lastModified: "2026-08-18", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", lastModified: "2026-08-18", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pricing", lastModified: "2026-08-18", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", lastModified: "2026-08-18", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy", lastModified: "2026-08-18", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", lastModified: "2026-08-18", changeFrequency: "yearly", priority: 0.2 },
];

const staticEntries = (): SitemapEntry[] =>
  STATIC_ROUTES.map(({ path, lastModified, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency,
    priority,
  }));

// /blog and every post appear only once a non-draft post exists.
const blogEntries = (): SitemapEntry[] => {
  if (publishedBlogPosts.length === 0) return [];
  const newest = publishedBlogPosts
    .map((post) => post.updated ?? post.published)
    .sort()
    .at(-1)!;
  return [
    { url: `${siteUrl}/blog`, lastModified: new Date(newest), changeFrequency: "weekly", priority: 0.6 },
    ...publishedBlogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.published),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
};

/**
 * Later phases append here: service pages (B1), industry pages (B2), case studies (B3),
 * location pages. Each source is a function returning its own entries.
 */
export const sitemapSources: Array<() => SitemapEntry[]> = [staticEntries, blogEntries];
