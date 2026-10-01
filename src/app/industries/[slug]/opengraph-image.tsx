import { notFound } from "next/navigation";
import { buildableIndustryPages, getIndustryPage, jsonIndustryFor } from "@/lib/industry-pages";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Collabrate industry";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return buildableIndustryPages().map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) notFound();
  return renderOgImage({ eyebrow: "Industry", title: jsonIndustryFor(page).name });
}
