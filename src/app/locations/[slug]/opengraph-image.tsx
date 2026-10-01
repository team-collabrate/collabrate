import { notFound } from "next/navigation";
import { buildableDistrictPages, buildableTownPages, resolveLocation } from "@/lib/locations";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = "Collabrate location";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return [...buildableTownPages(), ...buildableDistrictPages()].map((page) => ({ slug: page.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = resolveLocation(slug);
  if (!found) notFound();
  return found.kind === "town"
    ? renderOgImage({ eyebrow: "Location", title: found.page.name })
    : renderOgImage({ eyebrow: "District", title: `${found.page.name} district` });
}
