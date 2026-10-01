// Blog source of truth for the sitemap (and, later, the blog routes).
// Empty on purpose: the blog stays out of the sitemap and noindex until at least one
// non-draft post exists. Add posts here; no dummy content.
export interface BlogPostMeta {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-11-04". */
  published: string;
  /** ISO date of the last substantive edit; falls back to `published`. */
  updated?: string;
  draft?: boolean;
}

export const blogPosts: BlogPostMeta[] = [];

export const publishedBlogPosts = blogPosts.filter((post) => !post.draft);
