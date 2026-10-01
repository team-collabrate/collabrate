import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageCTA } from "@/components/shared/page-cta";
import { buildableIndustryPages, getIndustryPage, industryPath, jsonIndustryFor } from "@/lib/industry-pages";
import { getServicePage, serviceDisplayName, servicePath } from "@/lib/service-pages";
import { SHOW_UNPUBLISHED, isPublished } from "@/lib/publish";
import { buildMetadata } from "@/lib/seo";
import { serviceGraph } from "@/lib/schema";

// Only slugs returned below exist; anything else is a 404. Drafts are built only in dev
// (or with SHOW_UNPUBLISHED=1), see src/lib/publish.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return buildableIndustryPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: industryPath(page.slug),
    noindex: !isPublished(page),
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getIndustryPage(slug);
  if (!page) notFound();

  const path = industryPath(page.slug);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Industries", path: "/industries" },
    { name: jsonIndustryFor(page).name, path },
  ];

  // Services this industry uses. A published service is a link. A draft is shown as plain
  // text, and only in preview builds, so the owner can see the intent without a draft ever
  // being linked.
  const services = page.services
    .map(({ slug: s, why }) => ({ service: getServicePage(s), why }))
    .filter((x) => x.service !== undefined)
    .map(({ service, why }) => ({ service: service!, why }))
    .filter(({ service }) => isPublished(service) || SHOW_UNPUBLISHED);

  return (
    <main>
      <JsonLd
        data={serviceGraph({
          path,
          name: page.title,
          description: page.description,
          crumbs,
          faqs: page.faqs,
          serviceName: page.h1,
        })}
      />
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-36 sm:pt-44">
        {!isPublished(page) && (
          <p className="mb-6 rounded-[10px] border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            Draft preview. This page is not published: it is noindex and is not linked or listed anywhere.
          </p>
        )}
        <Breadcrumbs items={crumbs} />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{page.h1}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{page.answer}</p>
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">{jsonIndustryFor(page).description}</p>

        <section aria-labelledby="problem" className="mt-14">
          <h2 id="problem" className="text-2xl font-semibold tracking-tight">
            What problem does this solve?
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 text-muted-foreground">
            {page.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section aria-labelledby="needs" className="mt-14">
          <h2 id="needs" className="text-2xl font-semibold tracking-tight">
            What does the platform need?
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.platformNeeds.map((item) => (
              <li key={item} className="flex items-start gap-2.5 rounded-[12px] border border-black/10 p-4">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {services.length > 0 && (
          <section aria-labelledby="services" className="mt-14">
            <h2 id="services" className="text-2xl font-semibold tracking-tight">
              Which services apply?
            </h2>
            <ul className="mt-5 space-y-3">
              {services.map(({ service, why }) => (
                <li key={service.slug} className="rounded-[12px] border border-black/10 p-4">
                  {isPublished(service) ? (
                    <Link href={servicePath(service.slug)} className="font-medium text-brand-violet underline-offset-4 hover:underline">
                      {serviceDisplayName(service)}
                    </Link>
                  ) : (
                    <span className="font-medium">{serviceDisplayName(service)} (draft, not linked)</span>
                  )}
                  <p className="mt-1 text-muted-foreground">{why}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="faq" className="mt-14">
          <h2 id="faq" className="text-2xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-5 divide-y divide-black/10 rounded-[12px] border border-black/10">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="p-5">
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <PageCTA whatsappMessage={`Hi Collabrate, I am interested in ${page.h1.toLowerCase()}.`} />
      </article>
    </main>
  );
}
