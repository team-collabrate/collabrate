import { notFound } from "next/navigation";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";
import { buildableServicePages, getServicePage, serviceDisplayName } from "@/lib/service-pages";

export const alt = "Collabrate service";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Same set as the page itself: published pages, plus drafts in preview builds.
export function generateStaticParams() {
  return buildableServicePages().map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  return renderOgImage({ eyebrow: "Service", title: serviceDisplayName(page) });
}
