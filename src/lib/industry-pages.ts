import { industryPages, getIndustryPage, type IndustryPage } from "@/content/industry-pages";
import { industries, siteUrl } from "@/lib/content";
import { buildable, published } from "@/lib/publish";

export { getIndustryPage };

export const industryPath = (slug: string) => `/industries/${slug}`;
export const industryUrl = (slug: string) => `${siteUrl}${industryPath(slug)}`;

/** Pages that get a route in this build (published, plus drafts in dev). */
export const buildableIndustryPages = () => buildable(industryPages);

/** Pages that may be linked, listed and put in the sitemap. */
export const publishedIndustryPages = () => published(industryPages);

/** The industry's one-line description from collabrate-content.json. */
export function jsonIndustryFor(page: IndustryPage) {
  const item = industries.find((i) => i.name === page.industryName);
  if (!item) throw new Error(`No industry named "${page.industryName}" in collabrate-content.json`);
  return item;
}
