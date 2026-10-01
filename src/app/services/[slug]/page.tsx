import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageCTA } from "@/components/shared/page-cta";
import { RelatedLinks, type RelatedLink } from "@/components/shared/related-links";
import {
  buildableServicePages,
  getServicePage,
  jsonServiceFor,
  serviceDisplayName,
  servicePageTitle,
  servicePath,
} from "@/lib/service-pages";
import { caseStudyPath, getCaseStudy } from "@/lib/case-studies";
import { getIndustryPage, industryPath } from "@/lib/industry-pages";
import { isPublished } from "@/lib/publish";
import { buildMetadata } from "@/lib/seo";
import { serviceGraph } from "@/lib/schema";

// Only slugs returned below exist; anything else is a 404. Drafts are built only in dev
// (or with SHOW_UNPUBLISHED=1), see src/lib/publish.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return buildableServicePages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  return buildMetadata({
    title: servicePageTitle(page),
    description: page.description,
    path: servicePath(page.slug),
    image: null, // the opengraph-image file next to this page supplies og:image and twitter:image
    noindex: !isPublished(page),
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const name = serviceDisplayName(page);
  const path = servicePath(page.slug);
  const jsonService = jsonServiceFor(page);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Services", path: "/services" },
    { name, path },
  ];

  // Related links only ever point at published pages. Industry and project targets listed in
  // the content file are resolved once those pages exist (B2, B3).
  const relatedServices: RelatedLink[] = page.relatedServices
    .map((s) => getServicePage(s))
    .filter((p) => p !== undefined && isPublished(p))
    .map((p) => ({
      label: serviceDisplayName(p!),
      href: servicePath(p!.slug),
      description: jsonServiceFor(p!).tagline,
    }));

  const relatedIndustries: RelatedLink[] = page.relatedIndustries
    .map((s) => getIndustryPage(s))
    .filter((p) => p !== undefined && isPublished(p))
    .map((p) => ({ label: p!.h1, href: industryPath(p!.slug) }));

  const relatedProjects: RelatedLink[] = page.relatedProjects
    .map((s) => getCaseStudy(s))
    .filter((p) => p !== undefined && isPublished(p))
    .map((p) => ({ label: p!.title, href: caseStudyPath(p!.slug), description: p!.summary }));

  return (
    <main>
      <JsonLd
        data={serviceGraph({
          path,
          name: servicePageTitle(page),
          description: page.description,
          crumbs,
          faqs: page.faqs,
          serviceName: name,
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
        <p className="mt-4 max-w-3xl text-base text-muted-foreground">{jsonService.summary}</p>

        <section aria-labelledby="included" className="mt-14">
          <h2 id="included" className="text-2xl font-semibold tracking-tight">
            What is included?
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {page.included.map((item) => (
              <li key={item} className="flex items-start gap-2.5 rounded-[12px] border border-black/10 p-4">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="how" className="mt-14">
          <h2 id="how" className="text-2xl font-semibold tracking-tight">
            How does it work?
          </h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2">
            {page.howItWorks.map((step, i) => (
              <li key={step.title} className="rounded-[12px] border border-black/10 p-5">
                <span className="text-sm font-semibold text-brand-violet">Step {i + 1}</span>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="tools" className="mt-14">
          <h2 id="tools" className="text-2xl font-semibold tracking-tight">
            Which tools do we use?
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {page.toolsWeUse.map((tool) => (
              <li key={tool} className="rounded-full border border-black/10 bg-surface px-4 py-1.5 text-sm font-medium">
                {tool}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="who" className="mt-14">
          <h2 id="who" className="text-2xl font-semibold tracking-tight">
            Who is it for?
          </h2>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground marker:text-brand-violet">
            {page.whoItsFor.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

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

        <RelatedLinks title="Related services" links={relatedServices} />
        <RelatedLinks title="Industries we build for" links={relatedIndustries} />
        <RelatedLinks title="Related work" links={relatedProjects} />

        <PageCTA whatsappMessage={`Hi Collabrate, I am interested in ${name}.`} />
      </article>
    </main>
  );
}
