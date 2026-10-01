import { districtPath, publishedDistrictPages, publishedTownPages, townPath } from "@/lib/locations";
import { publishedIndustryPages, industryPath, jsonIndustryFor } from "@/lib/industry-pages";
import { publishedServicePages, serviceDisplayName, servicePath } from "@/lib/service-pages";

/**
 * Links for the header and footer. Everything here goes through the publish gate, so a
 * draft page can never appear in navigation. With nothing published, every list is empty
 * and the header and footer render exactly as before.
 */

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface SiteNavData {
  /** Service name in collabrate-content.json -> page path (published pages only). */
  serviceHrefs: Record<string, string>;
  /** Every published service page, in content order. */
  services: NavLinkItem[];
  /** Every published industry page. */
  industries: NavLinkItem[];
  /** "Areas we serve": published towns grouped by district (the district link only if its page is published). */
  areas: { district: NavLinkItem | null; name: string; towns: NavLinkItem[] }[];
}

function getAreas(): SiteNavData["areas"] {
  const towns = publishedTownPages();
  const districts = publishedDistrictPages();
  const names = [...new Set(towns.map((t) => t.districtSlug))];
  return names.map((slug) => {
    const first = towns.find((t) => t.districtSlug === slug)!;
    const districtPage = districts.find((d) => d.slug === slug);
    return {
      name: first.districtName,
      district: districtPage ? { label: `${districtPage.name} district`, href: districtPath(districtPage.slug) } : null,
      towns: towns.filter((t) => t.districtSlug === slug).map((t) => ({ label: t.name, href: townPath(t.slug) })),
    };
  });
}

export function getSiteNavData(): SiteNavData {
  const servicePages = publishedServicePages();
  return {
    serviceHrefs: Object.fromEntries(servicePages.map((p) => [p.serviceName, servicePath(p.slug)])),
    services: servicePages.map((p) => ({ label: serviceDisplayName(p), href: servicePath(p.slug) })),
    industries: publishedIndustryPages().map((p) => ({ label: jsonIndustryFor(p).name, href: industryPath(p.slug) })),
    areas: getAreas(),
  };
}
