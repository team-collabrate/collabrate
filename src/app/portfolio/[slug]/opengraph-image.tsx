import { notFound } from "next/navigation";
import { buildableCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Collabrate case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return buildableCaseStudies().map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  return renderOgImage({ eyebrow: "Case study", title: study.title });
}
