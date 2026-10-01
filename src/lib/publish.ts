/**
 * Publish gate for Phase B pages. All new copy lives in content files with a
 * `published` flag; the owner flips it after review. Sitemap, nav, footer, hub lists and
 * related links must all go through isPublished()/published() so an unreviewed page is
 * never linked or listed.
 */

export interface Publishable {
  published: boolean;
}

export function isPublished(entry: Publishable | undefined | null): boolean {
  return entry?.published === true;
}

export function published<T extends Publishable>(entries: readonly T[]): T[] {
  return entries.filter(isPublished);
}

/**
 * Unpublished pages are built (so the owner can review them) only in dev, or in a
 * production build made with SHOW_UNPUBLISHED=1. A normal production build contains
 * published pages only, so an unreviewed page is a 404 on the live site.
 */
export const SHOW_UNPUBLISHED = process.env.NODE_ENV !== "production" || process.env.SHOW_UNPUBLISHED === "1";

/** Entries that should get a route in this build. Never use this for links, sitemap or nav. */
export function buildable<T extends Publishable>(entries: readonly T[]): T[] {
  return SHOW_UNPUBLISHED ? [...entries] : published(entries);
}
