/**
 * Publish gate for Phase B pages. All new copy lives in content files with a
 * `published` flag; the owner flips it after review. Sitemap, nav, footer, hub lists and
 * related links must all go through isPublished()/published() so an unreviewed page is
 * never linked or listed.
 */

export interface Publishable {
  published: boolean;
}

export function isPublished(entry: Publishable | undefined | null): entry is Publishable {
  return entry?.published === true;
}

export function published<T extends Publishable>(entries: readonly T[]): T[] {
  return entries.filter(isPublished);
}
