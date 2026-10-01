import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { districtCopy, townCopy, type DistrictCopy, type TownCopy } from "@/content/location-copy";
import { parseCsvObjects } from "@/lib/csv";
import { siteUrl } from "@/lib/content";
import { isPublished, SHOW_UNPUBLISHED } from "@/lib/publish";
import { slugify } from "@/lib/slug";

/**
 * South Tamil Nadu location pages. Two sources, both required for a page to exist:
 *   - SEO/locations-input.csv: the owner's truth source. Only rows with confirmed=yes count.
 *   - src/content/location-copy.ts: hand-written copy per town and district.
 * Only the public fields of a CSV row are used here. The private columns (service_delivered,
 * industry_type, review_permission, notes) are never read into anything that renders.
 *
 * If the CSV is missing (it is not part of the deployed source unless committed), there are
 * simply no locations: no hub, no sitemap entries, nothing broken.
 */

const CSV_PATH = join(process.cwd(), "SEO", "locations-input.csv");

export interface Town {
  slug: string;
  name: string;
  tamilName: string;
  aliases: string[];
  districtName: string;
  districtSlug: string;
}

export interface District {
  slug: string;
  name: string;
  towns: Town[];
}

export const districtSlugFor = (district: string) => `${slugify(district)}-district`;

function loadConfirmedTowns(): Town[] {
  if (!existsSync(CSV_PATH)) return [];
  const rows = parseCsvObjects(readFileSync(CSV_PATH, "utf8"));
  const towns: Town[] = [];
  for (const row of rows) {
    if (row.confirmed?.toLowerCase() !== "yes") continue;
    if (!row.town || !row.district) continue;
    towns.push({
      slug: slugify(row.town),
      name: row.town,
      tamilName: row.tamil_name ?? "",
      aliases: (row.aliases ?? "").split(";").map((a) => a.trim()).filter(Boolean),
      districtName: row.district,
      districtSlug: districtSlugFor(row.district),
    });
  }
  return towns;
}

export const confirmedTowns: Town[] = loadConfirmedTowns();

export const confirmedDistricts: District[] = (() => {
  const byDistrict = new Map<string, District>();
  for (const town of confirmedTowns) {
    const district = byDistrict.get(town.districtSlug) ?? { slug: town.districtSlug, name: town.districtName, towns: [] };
    district.towns.push(town);
    byDistrict.set(town.districtSlug, district);
  }
  return [...byDistrict.values()];
})();

// ---- Pages = confirmed + has copy ----

export interface TownPage extends Town {
  copy: TownCopy;
}
export interface DistrictPage extends District {
  copy: DistrictCopy;
}

const allTownPages = (): TownPage[] =>
  confirmedTowns.flatMap((town) => {
    const copy = townCopy.find((c) => c.slug === town.slug);
    return copy ? [{ ...town, copy }] : [];
  });

const allDistrictPages = (): DistrictPage[] =>
  confirmedDistricts.flatMap((district) => {
    const copy = districtCopy.find((c) => c.slug === district.slug);
    return copy ? [{ ...district, copy }] : [];
  });

export const townPath = (slug: string) => `/locations/${slug}`;
export const districtPath = (slug: string) => `/locations/${slug}`;
export const townUrl = (slug: string) => `${siteUrl}${townPath(slug)}`;

/** Pages that get a route in this build (published, plus drafts in preview builds). */
export const buildableTownPages = () => allTownPages().filter((t) => isPublished(t.copy) || SHOW_UNPUBLISHED);
export const buildableDistrictPages = () => allDistrictPages().filter((d) => isPublished(d.copy) || SHOW_UNPUBLISHED);

/** Pages that may be linked, listed and put in the sitemap. */
export const publishedTownPages = () => allTownPages().filter((t) => isPublished(t.copy));
export const publishedDistrictPages = () => allDistrictPages().filter((d) => isPublished(d.copy));

export const getTownPage = (slug: string) => allTownPages().find((t) => t.slug === slug);
export const getDistrictPage = (slug: string) => allDistrictPages().find((d) => d.slug === slug);

/** Slug resolves to a district page, a town page, or nothing. */
export function resolveLocation(slug: string): { kind: "town"; page: TownPage } | { kind: "district"; page: DistrictPage } | undefined {
  const town = getTownPage(slug);
  if (town) return { kind: "town", page: town };
  const district = getDistrictPage(slug);
  if (district) return { kind: "district", page: district };
  return undefined;
}
