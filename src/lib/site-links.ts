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
}

export function getSiteNavData(): SiteNavData {
  const servicePages = publishedServicePages();
  return {
    serviceHrefs: Object.fromEntries(servicePages.map((p) => [p.serviceName, servicePath(p.slug)])),
    services: servicePages.map((p) => ({ label: serviceDisplayName(p), href: servicePath(p.slug) })),
    industries: publishedIndustryPages().map((p) => ({ label: jsonIndustryFor(p).name, href: industryPath(p.slug) })),
  };
}
