import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { PageCTA } from "@/components/shared/page-cta";
import {
  buildableIndustryPages,
  industryPath,
  jsonIndustryFor,
  publishedIndustryPages,
} from "@/lib/industry-pages";
import { isPublished } from "@/lib/publish";
import { collectionGraph } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const pageMeta = {
  title: "Industries We Build For | Collabrate",
  description:
    "Booking, vendor management, recruitment, corporate website and e-commerce platforms built by Collabrate for businesses across India and beyond.",
  path: "/industries",
};

// A hub with nothing published is empty, so it stays out of search until the first
// industry page is published (and out of the sitemap, see sitemap-sources.ts).
export function generateMetadata(): Metadata {
  return buildMetadata({ ...pageMeta, noindex: publishedIndustryPages().length === 0 });
}

export default function IndustriesPage() {
  // Drafts are listed only in preview builds, labelled, and the hub is then noindex.
  const pages = buildableIndustryPages();
  if (pages.length === 0) notFound();

  const crumbs = [
    { name: "Home", path: "" },
    { name: "Industries", path: "/industries" },
  ];

  return (
    <main>
      <JsonLd
        data={collectionGraph({
          path: pageMeta.path,
          name: pageMeta.title,
          description: pageMeta.description,
          crumbs,
          items: publishedIndustryPages().map((p) => ({ name: p.h1, path: industryPath(p.slug) })),
        })}
      />
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-36 sm:pt-44">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Industries we build for
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Our websites, apps and automation work is organized around a few kinds of business. Each page below explains
          the problem, what a platform needs, and which of our services apply.
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {pages.map((page) => (
            <li key={page.slug} className="rounded-[16px] border border-black/10 p-5">
              <h2 className="text-xl font-semibold">
                {isPublished(page) ? (
                  <Link href={industryPath(page.slug)} className="underline-offset-4 hover:underline">
                    {page.h1}
                  </Link>
                ) : (
                  <span>{page.h1} (draft, not linked)</span>
                )}
              </h2>
              <p className="mt-2 text-muted-foreground">{jsonIndustryFor(page).description}</p>
            </li>
          ))}
        </ul>

        <PageCTA />
      </section>
    </main>
  );
}
