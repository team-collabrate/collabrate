/**
 * Stable URL slugs for content that comes from collabrate-content.json.
 *
 * Dependency-free on purpose so scripts/check-slugs.mjs can import it directly.
 * Slugs are part of the public URL: never change an existing one. Names whose natural
 * slug would be long or awkward are pinned in SLUG_OVERRIDES; everything else goes
 * through slugify().
 */

/** "Performance Marketing (Paid Ads)" -> "performance-marketing". Drops a trailing parenthetical. */
export function slugify(name: string): string {
  return name
    .replace(/\s*\([^)]*\)\s*$/, "")
    .replace(/&/g, " and ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Pinned slugs (the table in SEO/PHASE-B-PROMPT.md). Key is the exact name in the JSON. */
export const SLUG_OVERRIDES: Record<string, string> = {
  // Services
  "Email Marketing and Campaigns": "email-marketing",
  "LinkedIn Outreach (Lead Generation)": "linkedin-outreach",
  "Mobile Application Development": "mobile-app-development",
  "AI-Powered Support Systems": "ai-support-systems",
  "E-commerce Websites": "ecommerce-websites",
  // Industries
  "E-commerce Websites and Online Stores": "ecommerce-websites-and-stores",
  // Projects
  "Enterprise Software Business Website": "enterprise-software-website",
  "HR & Recruitment Dashboard": "hr-recruitment-dashboard",
  // The second dairy entry is merged into the first on one page (see case-studies.ts), so it
  // intentionally shares the first entry's slug.
  "Dairy Vendor Management App (2)": "dairy-vendor-management-app",
};

export function slugFor(name: string): string {
  return SLUG_OVERRIDES[name] ?? slugify(name);
}
