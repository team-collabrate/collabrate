import { isPending, site, siteUrl } from "@/lib/content";

/**
 * schema.org builders. One stable entity graph: every node has an @id so search and AI
 * engines can attach everything to the same Organization. Rules for this file:
 * no street address, phone, rating, review count, founder or legal name (none exist in
 * the content JSON), and no sameAs entry that is still a PENDING_LINK.
 */

export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;
export const SERVICE_PROVIDER_ID = `${siteUrl}/#service-provider`;

const CONTEXT = "https://schema.org";

// Gulf countries from the content JSON ("Gulf countries"), spelled out as the six GCC states.
const AREA_SERVED = [
  { "@type": "AdministrativeArea", name: "Tamil Nadu" },
  ...["India", "Singapore", "Malaysia", "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain"].map(
    (name) => ({ "@type": "Country", name })
  ),
];

const KNOWS_ABOUT = [
  "Web development",
  "Mobile app development",
  "SEO",
  "Performance marketing",
  "AI chatbots",
  "Workflow automation",
];

// Only real profile URLs; isPending() hides any PENDING_LINK, so adding the real LinkedIn
// URL to the content JSON extends this list automatically.
const sameAs = [site.social.linkedin, site.social.instagram].filter((url) => !isPending(url));

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: site.name,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/brand/icons/icon-512.png`,
    width: 512,
    height: 512,
  },
  email: site.email,
  foundingDate: site.founded,
  areaServed: AREA_SERVED,
  knowsAbout: KNOWS_ABOUT,
  ...(sameAs.length > 0 ? { sameAs } : {}),
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: siteUrl,
  name: site.name,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
};

const serviceProvider = {
  "@type": "ProfessionalService",
  "@id": SERVICE_PROVIDER_ID,
  name: site.name,
  url: siteUrl,
  parentOrganization: { "@id": ORG_ID },
  // Remote-first: region and country only, deliberately no street address.
  address: { "@type": "PostalAddress", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  areaServed: AREA_SERVED,
};

/** Home page only: the entity graph. */
export function homeGraph(description: string) {
  return {
    "@context": CONTEXT,
    "@graph": [
      { ...organization, description },
      website,
      serviceProvider,
    ],
  };
}

export type PageSchemaType = "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";

/** Every other page: page-level schema only (WebPage family + BreadcrumbList). */
export function pageGraph({
  type,
  path,
  name,
  description,
  crumb,
}: {
  type: PageSchemaType;
  path: string;
  name: string;
  description: string;
  /** Short label for the last breadcrumb, e.g. "Services". */
  crumb: string;
}) {
  const url = `${siteUrl}${path}`;
  return {
    "@context": CONTEXT,
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: crumb, item: url },
        ],
      },
    ],
  };
}
