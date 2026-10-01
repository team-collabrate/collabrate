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

export interface Crumb {
  name: string;
  /** Route path starting with "/"; "" or "/" is the home page. */
  path: string;
}

const abs = (path: string) => (path === "" || path === "/" ? siteUrl : `${siteUrl}${path}`);

/** N-level BreadcrumbList. The last item is the current page. Keep it equal to the visible trail. */
export function breadcrumbList(pagePath: string, items: Crumb[]) {
  const url = abs(pagePath);
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

function webPage(type: PageSchemaType, path: string, name: string, description: string, extra: Record<string, unknown> = {}) {
  const url = abs(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...extra,
  };
}

export interface FaqEntry {
  question: string;
  answer: string;
}

/**
 * FAQPage node. Use only when the same questions and answers are visible on the page.
 * Answers are plain text (no markup).
 */
export function faqPage(pagePath: string, items: FaqEntry[]) {
  const url = abs(pagePath);
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Every other page: page-level schema only (WebPage family + BreadcrumbList, + FAQPage when `faqs` is given). */
export function pageGraph({
  type,
  path,
  name,
  description,
  crumb,
  faqs,
}: {
  type: PageSchemaType;
  path: string;
  name: string;
  description: string;
  /** Short label for the last breadcrumb, e.g. "Services". */
  crumb: string;
  /** Pass only when these questions and answers are visible on the page. */
  faqs?: FaqEntry[];
}) {
  return {
    "@context": CONTEXT,
    "@graph": [
      webPage(type, path, name, description),
      breadcrumbList(path, [{ name: "Home", path: "" }, { name: crumb, path }]),
      ...(faqs && faqs.length > 0 ? [faqPage(path, faqs)] : []),
    ] as Record<string, unknown>[],
  };
}

type Graph = { "@context": string; "@graph": Record<string, unknown>[] };

interface DeepPageInput {
  path: string;
  name: string;
  description: string;
  crumbs: Crumb[];
  faqs?: FaqEntry[];
}

function deepGraph(type: PageSchemaType, input: DeepPageInput, nodes: Record<string, unknown>[], webPageExtra?: Record<string, unknown>): Graph {
  return {
    "@context": CONTEXT,
    "@graph": [
      webPage(type, input.path, input.name, input.description, webPageExtra),
      breadcrumbList(input.path, input.crumbs),
      ...nodes,
      ...(input.faqs && input.faqs.length > 0 ? [faqPage(input.path, input.faqs)] : []),
    ],
  };
}

/**
 * /services/[slug]: a Service provided by the Organization. `serviceType` is the plain
 * service name. No offers, no price, no rating.
 */
export function serviceGraph(input: DeepPageInput & { serviceName: string }): Graph {
  const url = abs(input.path);
  return deepGraph(
    "WebPage",
    input,
    [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: input.serviceName,
        serviceType: input.serviceName,
        description: input.description,
        url,
        provider: { "@id": ORG_ID },
        areaServed: AREA_SERVED,
      },
    ],
    { mainEntity: { "@id": `${url}#service` } }
  );
}

/** Hub pages (/industries, /services lists): a CollectionPage with an ItemList of child URLs. */
export function collectionGraph(input: DeepPageInput & { items: { name: string; path: string }[] }): Graph {
  const url = abs(input.path);
  return deepGraph(
    "CollectionPage",
    input,
    [
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        itemListElement: input.items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          url: abs(item.path),
        })),
      },
    ],
    { mainEntity: { "@id": `${url}#list` } }
  );
}

/**
 * /portfolio/[slug]: an anonymised CreativeWork. No client name, no review, no rating.
 * Authored by the Organization.
 */
export function creativeWorkGraph(input: DeepPageInput & { headline: string; genre?: string }): Graph {
  const url = abs(input.path);
  return deepGraph(
    "WebPage",
    input,
    [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: input.headline,
        description: input.description,
        url,
        creator: { "@id": ORG_ID },
        ...(input.genre ? { genre: input.genre } : {}),
      },
    ],
    { mainEntity: { "@id": `${url}#work` } }
  );
}

/**
 * /locations/[slug]: Service with areaServed = City (or AdministrativeArea for a district).
 * Deliberately no street address and no geo coordinates.
 */
export function locationGraph(
  input: DeepPageInput & { serviceName: string; place: string; placeType: "City" | "AdministrativeArea" }
): Graph {
  const url = abs(input.path);
  return deepGraph(
    "WebPage",
    input,
    [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: input.serviceName,
        serviceType: input.serviceName,
        url,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": input.placeType, name: input.place },
      },
    ],
    { mainEntity: { "@id": `${url}#service` } }
  );
}
