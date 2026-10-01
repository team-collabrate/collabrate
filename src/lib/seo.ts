import type { Metadata } from "next";
import { site } from "@/lib/content";

/**
 * Per-page metadata builder.
 *
 * Next.js replaces (never deep-merges) `openGraph` and `twitter` when a page defines its
 * own, and a page that defines none inherits the root layout's values, including `url`.
 * To avoid every page sharing the homepage's og:title and og:url, every page.tsx passes
 * its full set through this helper, and the root layout keeps defaults only.
 */

// OG locale for the market (India first). <html lang> stays "en"; no hreflang until real
// regional pages exist.
export const OG_LOCALE = "en_IN";

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${site.name}: web, app, marketing and AI agency`,
};

interface BuildMetadataInput {
  /** Final <title>, brand included. Keep under 60 characters. */
  title: string;
  /** 120 to 155 characters. */
  description: string;
  /** Route path starting with "/". Resolved against metadataBase in the root layout. */
  path: string;
  /**
   * Social image. Omit for the default site image. Pass `null` when the route has its own
   * opengraph-image file (services, industries, case studies): Next then adds og:image and
   * twitter:image from that file, and this helper adds none, so there is only ever one.
   */
  image?: { url: string; width?: number; height?: number; alt?: string } | null;
  /** Use for pages that must stay out of search (e.g. /blog while it has no posts). */
  noindex?: boolean;
}

export function buildMetadata({ title, description, path, image, noindex }: BuildMetadataInput): Metadata {
  const ogImage = image === null ? null : (image ?? DEFAULT_OG_IMAGE);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: OG_LOCALE,
      type: "website",
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage.url] } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
