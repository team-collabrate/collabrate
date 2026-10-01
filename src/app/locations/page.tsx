import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageCTA } from "@/components/shared/page-cta";
import {
  buildableDistrictPages,
  buildableTownPages,
  confirmedDistricts,
  districtPath,
  publishedDistrictPages,
  publishedTownPages,
  townPath,
} from "@/lib/locations";
import { isPublished } from "@/lib/publish";
import { collectionGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const pageMeta = {
  title: "Areas We Serve in South Tamil Nadu | Collabrate",
  description:
    "Collabrate builds websites, apps and digital marketing for businesses across South Tamil Nadu. See the districts and towns we work in.",
  path: "/locations",
};

// With no published location page the hub is empty, so it is noindex (and out of the
// sitemap) until the first one is published. With nothing buildable at all it is a 404.
export function generateMetadata(): Metadata {
  const live = publishedTownPages().length + publishedDistrictPages().length;
  return buildMetadata({ ...pageMeta, noindex: live === 0 });
}

export default function LocationsPage() {
  const towns = buildableTownPages();
  const districtPages = buildableDistrictPages();
  if (towns.length + districtPages.length === 0) notFound();

  const crumbs = [
    { name: "Home", path: "" },
    { name: "Locations", path: "/locations" },
  ];

  const groups = confirmedDistricts
    .map((district) => ({
      district,
      districtPage: districtPages.find((d) => d.slug === district.slug),
      towns: towns.filter((t) => t.districtSlug === district.slug),
    }))
    .filter((group) => group.districtPage || group.towns.length > 0);

  return (
    <main>
      <JsonLd
        data={collectionGraph({
          path: pageMeta.path,
          name: pageMeta.title,
          description: pageMeta.description,
          crumbs,
          items: [
            ...publishedDistrictPages().map((d) => ({ name: `${d.name} district`, path: districtPath(d.slug) })),
            ...publishedTownPages().map((t) => ({ name: t.name, path: townPath(t.slug) })),
          ],
        })}
      />
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-36 sm:pt-44">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">Areas we serve in South Tamil Nadu</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Collabrate is remote-first and based in Tamil Nadu. These are the districts and towns where we work.
        </p>

        <div className="mt-10 space-y-10">
          {groups.map(({ district, districtPage, towns: districtTowns }) => (
            <section key={district.slug} aria-labelledby={district.slug}>
              <h2 id={district.slug} className="text-2xl font-semibold tracking-tight">
                {districtPage && isPublished(districtPage.copy) ? (
                  <Link href={districtPath(district.slug)} className="underline-offset-4 hover:underline">
                    {district.name} district
                  </Link>
                ) : (
                  <span>
                    {district.name} district{districtPage ? " (draft, not linked)" : ""}
                  </span>
                )}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {districtTowns.map((town) => (
                  <li key={town.slug} className="rounded-[12px] border border-black/10 p-4">
                    {isPublished(town.copy) ? (
                      <Link href={townPath(town.slug)} className="font-medium text-brand-violet underline-offset-4 hover:underline">
                        {town.name}
                      </Link>
                    ) : (
                      <span className="font-medium">{town.name} (draft, not linked)</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <PageCTA />
      </section>
    </main>
  );
}
