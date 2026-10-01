import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageCTA } from "@/components/shared/page-cta";
import { RelatedLinks, type RelatedLink } from "@/components/shared/related-links";
import { getIndustryPage, industryPath } from "@/lib/industry-pages";
import {
  buildableDistrictPages,
  buildableTownPages,
  districtPath,
  getDistrictPage,
  getTownPage,
  publishedTownPages,
  resolveLocation,
  townPath,
  type DistrictPage,
  type TownPage,
} from "@/lib/locations";
import { SHOW_UNPUBLISHED, isPublished } from "@/lib/publish";
import { locationGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { getServicePage, serviceDisplayName, servicePath } from "@/lib/service-pages";

// Only slugs returned below exist; anything else is a 404. A page needs a confirmed town
// in SEO/locations-input.csv AND an entry in src/content/location-copy.ts. Drafts are
// built only in dev or with SHOW_UNPUBLISHED=1.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...buildableTownPages(), ...buildableDistrictPages()].map((page) => ({ slug: page.slug }));
}

const townTitle = (town: TownPage) => `Website Development in ${town.name} | Collabrate`;
const districtTitle = (district: DistrictPage) => `Digital Services in ${district.name} District | Collabrate`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = resolveLocation(slug);
  if (!found) return {};
  const common = { image: null, noindex: !isPublished(found.page.copy) } as const; // opengraph-image file supplies the image
  return found.kind === "town"
    ? buildMetadata({ ...common, title: townTitle(found.page), description: found.page.copy.description, path: townPath(slug) })
    : buildMetadata({ ...common, title: districtTitle(found.page), description: found.page.copy.description, path: districtPath(slug) });
}

function DraftBanner() {
  return (
    <p className="mb-6 rounded-[10px] border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
      Draft preview. This page is not published: it is noindex and is not linked or listed anywhere.
    </p>
  );
}

/** Published service pages are links; drafts are plain text and only in preview builds. */
function ServiceList({ slugs, heading, id }: { slugs: string[]; heading: string; id: string }) {
  const services = slugs
    .map((s) => getServicePage(s))
    .filter((s) => s !== undefined && (isPublished(s) || SHOW_UNPUBLISHED))
    .map((s) => s!);
  if (services.length === 0) return null;
  return (
    <section aria-labelledby={id} className="mt-14">
      <h2 id={id} className="text-2xl font-semibold tracking-tight">
        {heading}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service.slug} className="rounded-[12px] border border-black/10 p-4">
            {isPublished(service) ? (
              <Link href={servicePath(service.slug)} className="font-medium text-brand-violet underline-offset-4 hover:underline">
                {serviceDisplayName(service)}
              </Link>
            ) : (
              <span className="font-medium">{serviceDisplayName(service)} (draft, not linked)</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function TownView({ town }: { town: TownPage }) {
  const { copy } = town;
  const district = getDistrictPage(town.districtSlug);
  const districtLive = district && isPublished(district.copy) ? district : undefined;
  const path = townPath(town.slug);

  const crumbs = [
    { name: "Home", path: "" },
    { name: "Locations", path: "/locations" },
    ...(districtLive ? [{ name: `${districtLive.name} District`, path: districtPath(districtLive.slug) }] : []),
    { name: town.name, path },
  ];

  const industry = copy.industry ? getIndustryPage(copy.industry) : undefined;
  const nearby: RelatedLink[] = [
    ...(districtLive ? [{ label: `${districtLive.name} District`, href: districtPath(districtLive.slug) }] : []),
    ...copy.neighbours
      .map((s) => getTownPage(s))
      .filter((t) => t !== undefined && isPublished(t.copy))
      .map((t) => ({ label: `Businesses in ${t!.name}`, href: townPath(t!.slug) })),
    ...(industry && isPublished(industry) ? [{ label: industry.h1, href: industryPath(industry.slug) }] : []),
  ];

  return (
    <main>
      <JsonLd
        data={locationGraph({
          path,
          name: townTitle(town),
          description: copy.description,
          crumbs,
          faqs: copy.faqs,
          serviceName: "Website development and digital marketing",
          place: town.name,
          placeType: "City",
        })}
      />
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-36 sm:pt-44">
        {!isPublished(copy) && <DraftBanner />}
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Website development and digital marketing for businesses in {town.name}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{copy.intro}</p>

        {copy.tamilText && (
          <p lang="ta" className="mt-6 max-w-3xl text-lg leading-relaxed">
            {copy.tamilText}
          </p>
        )}

        <section aria-labelledby="local" className="mt-14">
          <h2 id="local" className="text-2xl font-semibold tracking-tight">
            What do businesses in {town.name} usually need?
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 text-muted-foreground">
            {copy.localNeeds.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <ServiceList slugs={copy.services} heading={`Services for businesses in ${town.name}`} id="services" />

        {copy.example && (
          <section aria-labelledby="example" className="mt-14">
            <h2 id="example" className="text-2xl font-semibold tracking-tight">
              An example from the area
            </h2>
            <p className="mt-5 max-w-3xl text-muted-foreground">{copy.example}</p>
          </section>
        )}

        <section aria-labelledby="faq" className="mt-14">
          <h2 id="faq" className="text-2xl font-semibold tracking-tight">
            Questions from business owners in {town.name}
          </h2>
          <div className="mt-5 divide-y divide-black/10 rounded-[12px] border border-black/10">
            {copy.faqs.map((faq) => (
              <div key={faq.question} className="p-5">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <RelatedLinks title="Nearby and related" links={nearby} />
        <PageCTA whatsappMessage={`Hi Collabrate, I am interested in website development in ${town.name}.`} />
      </article>
    </main>
  );
}

function DistrictView({ district }: { district: DistrictPage }) {
  const { copy } = district;
  const path = districtPath(district.slug);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Locations", path: "/locations" },
    { name: `${district.name} District`, path },
  ];
  const towns = publishedTownPages().filter((t) => t.districtSlug === district.slug);

  return (
    <main>
      <JsonLd
        data={locationGraph({
          path,
          name: districtTitle(district),
          description: copy.description,
          crumbs,
          serviceName: "Website development and digital marketing",
          place: `${district.name} district`,
          placeType: "AdministrativeArea",
        })}
      />
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-36 sm:pt-44">
        {!isPublished(copy) && <DraftBanner />}
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Website development and digital marketing in {district.name} district
        </h1>
        <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
          {copy.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {towns.length > 0 && (
          <section aria-labelledby="towns" className="mt-14">
            <h2 id="towns" className="text-2xl font-semibold tracking-tight">
              Towns we work in around {district.name}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {towns.map((town) => (
                <li key={town.slug} className="rounded-[12px] border border-black/10 p-4">
                  <Link href={townPath(town.slug)} className="font-medium text-brand-violet underline-offset-4 hover:underline">
                    {town.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ServiceList slugs={copy.services} heading={`Services for businesses in ${district.name} district`} id="services" />
        <PageCTA whatsappMessage={`Hi Collabrate, I am interested in your services in ${district.name} district.`} />
      </article>
    </main>
  );
}

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = resolveLocation(slug);
  if (!found) notFound();
  return found.kind === "town" ? <TownView town={found.page} /> : <DistrictView district={found.page} />;
}
