import type { MetadataRoute } from "next";
import { publishedBlogPosts } from "@/content/blog-posts";
import { siteUrl } from "@/lib/content";
import { industryPath, publishedIndustryPages } from "@/lib/industry-pages";
import { publishedServicePages, servicePath } from "@/lib/service-pages";

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

// One entry per published service page; lastModified is the content file's `updated` date.
const servicePagesSitemap = (): SitemapEntry[] =>
  publishedServicePages().map((page) => ({
    url: `${siteUrl}${servicePath(page.slug)}`,
    lastModified: new Date(page.updated),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

// The /industries hub is listed only once at least one industry page is published.
const industryPagesSitemap = (): SitemapEntry[] => {
  const pages = publishedIndustryPages();
  if (pages.length === 0) return [];
  const newest = pages.map((p) => p.updated).sort().at(-1)!;
  return [
    { url: `${siteUrl}/industries`, lastModified: new Date(newest), changeFrequency: "monthly", priority: 0.7 },
    ...pages.map((page) => ({
      url: `${siteUrl}${industryPath(page.slug)}`,
      lastModified: new Date(page.updated),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
};

/**
 * Later phases append here: service pages (B1), industry pages (B2), case studies (B3),
 * location pages. Each source is a function returning its own entries.
 */
export const sitemapSources: Array<() => SitemapEntry[]> = [staticEntries, servicePagesSitemap, industryPagesSitemap, blogEntries];
