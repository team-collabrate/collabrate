import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServicesExplorer } from "@/components/sections/services-explorer";
import { FAQ } from "@/components/sections/faq";
import { CTABanner } from "@/components/sections/cta-banner";
import { servicesFaq } from "@/lib/content";
import { jsonServiceFor, publishedServiceHrefs, publishedServicePages, serviceDisplayName, servicePath } from "@/lib/service-pages";

const pageMeta = {
  title: "Web, Marketing and AI Services | Collabrate",
  description:
    "Website and app development, digital marketing and AI automation from one team. Pick the services you need and get a clear, scoped quote.",
  path: "/services",
};

export const metadata: Metadata = buildMetadata(pageMeta);

export default function ServicesPage() {
  // Published service pages only. Drafts never appear here.
  const pages = publishedServicePages();
  return (
    <main>
      <PageJsonLd type="CollectionPage" meta={pageMeta} crumb="Services" />
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            as="h1"
            title="Pick what you need. We handle the rest."
            description="Whether it's development, marketing, or AI automation, our services are organized around what you're actually trying to achieve."
          />
        </div>
      </section>

      <ServicesExplorer pageHrefs={publishedServiceHrefs()} />

      {pages.length > 0 && (
        <section aria-labelledby="all-services" className="mx-auto max-w-6xl px-6 pb-16">
          <h2 id="all-services" className="text-2xl font-semibold tracking-tight">
            All services
          </h2>
          <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={servicePath(page.slug)} className="font-medium text-foreground underline-offset-4 hover:underline">
                  {serviceDisplayName(page)}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">{jsonServiceFor(page).tagline ?? page.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <FAQ
        title="Common questions"
        items={servicesFaq}
        id="faq"
      />

      <CTABanner
        heading="Not sure where to start?"
        body="Tell us what you're trying to achieve, and we'll recommend the right mix of services for your business, whether that's one service or all three."
        ctaLabel="Get a Quote"
        ctaHref="/contact"
      />
    </main>
  );
}
