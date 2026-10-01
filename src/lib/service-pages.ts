import { servicePages, type ServicePage } from "@/content/service-pages";
import { serviceCategories, siteUrl, stripServiceParenthetical, type ServiceItem } from "@/lib/content";
import { buildable, published } from "@/lib/publish";

export const servicePath = (slug: string) => `/services/${slug}`;

export const getServicePage = (slug: string): ServicePage | undefined => servicePages.find((p) => p.slug === slug);

/** Short display name: "Performance Marketing (Paid Ads)" -> "Performance Marketing". */
export const serviceDisplayName = (page: ServicePage) => stripServiceParenthetical(page.serviceName);

export const servicePageTitle = (page: ServicePage) =>
  page.metaTitle ?? `${serviceDisplayName(page)} in Tamil Nadu and India | Collabrate`;

/** Pages that get a route in this build (published, plus drafts in dev). */
export const buildableServicePages = () => buildable(servicePages);

/** Pages that may be linked, listed and put in the sitemap. */
export const publishedServicePages = () => published(servicePages);

export function jsonServiceFor(page: ServicePage): ServiceItem {
  const item = serviceCategories.flatMap((c) => c.services).find((s) => s.name === page.serviceName);
  if (!item) throw new Error(`No service named "${page.serviceName}" in collabrate-content.json`);
  return item;
}

/** Service name -> page path, published pages only (used by the /services explorer). */
export function publishedServiceHrefs(): Record<string, string> {
  return Object.fromEntries(publishedServicePages().map((p) => [p.serviceName, servicePath(p.slug)]));
}

export const serviceUrl = (slug: string) => `${siteUrl}${servicePath(slug)}`;
