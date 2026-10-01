import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageCTA } from "@/components/shared/page-cta";
import { buildableCaseStudies, caseStudyPath, getCaseStudy } from "@/lib/case-studies";
import { getIndustryPage, industryPath } from "@/lib/industry-pages";
import { getServicePage, serviceDisplayName, servicePath } from "@/lib/service-pages";
import { SHOW_UNPUBLISHED, isPublished } from "@/lib/publish";
import { creativeWorkGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

// Only slugs returned below exist; anything else is a 404. Drafts are built only in dev
// (or with SHOW_UNPUBLISHED=1), see src/lib/publish.ts.
export const dynamicParams = false;

export function generateStaticParams() {
  return buildableCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.metaTitle,
    description: study.description,
    path: caseStudyPath(study.slug),
    noindex: !isPublished(study),
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const path = caseStudyPath(study.slug);
  const crumbs = [
    { name: "Home", path: "" },
    { name: "Our Work", path: "/portfolio" },
    { name: study.title, path },
  ];
  const multi = study.parts.length > 1;

  // Links go to published pages only. A draft is plain text, and only in preview builds.
  const industry = getIndustryPage(study.industrySlug);
  const services = study.services
    .map((s) => getServicePage(s))
    .filter((s) => s !== undefined && (isPublished(s) || SHOW_UNPUBLISHED))
    .map((s) => s!);

  return (
    <main>
      <JsonLd
        data={creativeWorkGraph({
          path,
          name: study.metaTitle,
          description: study.description,
          crumbs,
          headline: study.title,
          genre: study.industryLabel,
        })}
      />
      <article className="mx-auto max-w-4xl px-6 pb-20 pt-36 sm:pt-44">
        {!isPublished(study) && (
          <p className="mb-6 rounded-[10px] border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            Draft preview. This page is not published: it is noindex and is not linked or listed anywhere.
          </p>
        )}
        <Breadcrumbs items={crumbs} />

        <header className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-violet">
            Case study · {study.industryLabel}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{study.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">{study.summary}</p>
        </header>

        <section aria-labelledby="problem" className="mt-14">
          <h2 id="problem" className="text-2xl font-semibold tracking-tight">
            What was the problem?
          </h2>
          <div className="mt-5 max-w-3xl space-y-4">
            {study.parts.map((part) => (
              <div key={part.problem}>
                {multi && part.label && <h3 className="text-lg font-semibold">{part.label}</h3>}
                <p className="text-muted-foreground">{part.problem}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="built" className="mt-14">
          <h2 id="built" className="text-2xl font-semibold tracking-tight">
            What did we build?
          </h2>
          <div className="mt-5 max-w-3xl space-y-4">
            {study.parts.map((part) => (
              <div key={part.built}>
                {multi && part.label && <h3 className="text-lg font-semibold">{part.label}</h3>}
                <p className="text-muted-foreground">{part.built}</p>
              </div>
            ))}
          </div>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {study.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 rounded-[12px] border border-black/10 p-4">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="how" className="mt-14">
          <h2 id="how" className="text-2xl font-semibold tracking-tight">
            How does this kind of system work?
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">A general explanation, not a walkthrough of the client&apos;s system.</p>
          <ol className="mt-5 max-w-3xl list-decimal space-y-3 pl-5 text-muted-foreground marker:font-semibold marker:text-brand-violet">
            {study.howItWorks.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </section>

        {study.screenshots && study.screenshots.length > 0 && (
          <section aria-labelledby="screens" className="mt-14">
            <h2 id="screens" className="text-2xl font-semibold tracking-tight">
              Screenshots
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {study.screenshots.map((shot) => (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full rounded-[12px] border border-black/10"
                />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="outcome" className="mt-14">
          <h2 id="outcome" className="text-2xl font-semibold tracking-tight">
            What was the outcome?
          </h2>
          <div className="mt-5 max-w-3xl space-y-4">
            {study.parts.map((part) => (
              <div key={part.outcome}>
                {multi && part.label && <h3 className="text-lg font-semibold">{part.label}</h3>}
                <p className="text-muted-foreground">{part.outcome}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="related" className="mt-14">
          <h2 id="related" className="text-2xl font-semibold tracking-tight">
            Services and industry
          </h2>
          <ul className="mt-5 space-y-2">
            {services.map((service) => (
              <li key={service.slug}>
                Service:{" "}
                {isPublished(service) ? (
                  <Link href={servicePath(service.slug)} className="font-medium text-brand-violet underline-offset-4 hover:underline">
                    {serviceDisplayName(service)}
                  </Link>
                ) : (
                  <span className="font-medium">{serviceDisplayName(service)} (draft, not linked)</span>
                )}
              </li>
            ))}
            {industry && (isPublished(industry) || SHOW_UNPUBLISHED) && (
              <li>
                Industry:{" "}
                {isPublished(industry) ? (
                  <Link href={industryPath(industry.slug)} className="font-medium text-brand-violet underline-offset-4 hover:underline">
                    {industry.h1}
                  </Link>
                ) : (
                  <span className="font-medium">{industry.h1} (draft, not linked)</span>
                )}
              </li>
            )}
          </ul>
        </section>

        <PageCTA
          heading="Have something similar in mind?"
          whatsappMessage={`Hi Collabrate, I saw the ${study.title} case study and would like to talk about a similar project.`}
        />
      </article>
    </main>
  );
}
