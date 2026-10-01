import { caseStudies, getCaseStudy, type CaseStudy } from "@/content/case-studies";
import { siteUrl } from "@/lib/content";
import { buildable, published } from "@/lib/publish";

export { getCaseStudy };

export const caseStudyPath = (slug: string) => `/portfolio/${slug}`;
export const caseStudyUrl = (slug: string) => `${siteUrl}${caseStudyPath(slug)}`;

/** Case studies that get a route in this build (published, plus drafts in dev). */
export const buildableCaseStudies = () => buildable(caseStudies);

/** Case studies that may be linked and put in the sitemap. */
export const publishedCaseStudies = () => published(caseStudies);

/** JSON project title -> case-study path, published only (used by the /portfolio grid). */
export function publishedProjectHrefs(): Record<string, string> {
  const hrefs: Record<string, string> = {};
  for (const study of publishedCaseStudies()) {
    for (const title of study.sourceTitles) hrefs[title] = caseStudyPath(study.slug);
  }
  return hrefs;
}

export type { CaseStudy };
