/**
 * Hand-written copy for the South Tamil Nadu location pages (/locations/...).
 *
 * THIS FILE IS DELIBERATELY EMPTY. A location page exists only when BOTH hold:
 *   1. the town is confirmed (confirmed=yes) in SEO/locations-input.csv, and
 *   2. an entry for it exists below.
 * Copy must be unique per town (never a find-and-replace of one template) and drafted only
 * from what the owner supplies in the CSV (service_delivered, industry_type, notes) plus
 * the playbook hooks in SEO/SEO-LOCAL-SOUTH-TN.md, which are hypotheses. Every local claim
 * gets a TODO(verify) comment. No client names, no invented numbers, no phone or address.
 *
 * Why it is empty: the five confirmed towns in the CSV still have service_delivered,
 * industry_type and review_permission blank, so any copy written now would be generic and
 * near-identical across towns, which is a doorway page. Fill those columns first.
 *
 * Every entry ships with `published: false`; the owner flips it after review.
 */

export interface LocationFaq {
  question: string;
  answer: string;
}

export interface TownCopy {
  /** Town slug, the slugified town name in the CSV (for example "sivakasi"). */
  slug: string;
  published: boolean;
  /** ISO date of the last real content change; the sitemap lastModified. */
  updated: string;
  /** Meta description, 120 to 155 characters, written by hand. */
  description: string;
  /** 50 to 70 words: who you help in this town and what you do. Names the town once or twice. */
  intro: string;
  /** What businesses here commonly need, from the owner's real experience. */
  localNeeds: string[];
  /** 3 to 5 service slugs that fit this town. */
  services: string[];
  /** One industry page slug that fits this town. */
  industry?: string;
  /** One anonymised example from the area. Only if the CSV says a real one exists; otherwise omit. */
  example?: string;
  /** Short Tamil block. Only if the owner supplies the Tamil text. */
  tamilText?: string;
  /** 2 to 3 slugs of neighbouring confirmed towns. */
  neighbours: string[];
  /** Five questions owners in this town ask, answers 40 to 80 words. */
  faqs: LocationFaq[];
}

export interface DistrictCopy {
  /** District slug: the slugified district name plus "-district" (for example "tirunelveli-district"). */
  slug: string;
  published: boolean;
  updated: string;
  description: string;
  /** Overview paragraphs for the district. */
  overview: string[];
  /** Service slugs that fit the district. */
  services: string[];
}

export const townCopy: TownCopy[] = [];

export const districtCopy: DistrictCopy[] = [];
