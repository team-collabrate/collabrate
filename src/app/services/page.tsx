import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServicesExplorer } from "@/components/sections/services-explorer";
import { FAQ } from "@/components/sections/faq";
import { CTABanner } from "@/components/sections/cta-banner";
import { servicesFaq } from "@/lib/content";

const pageMeta = {
  title: "Web, Marketing and AI Services | Collabrate",
  description:
    "Website and app development, digital marketing and AI automation from one team. Pick the services you need and get a clear, scoped quote.",
  path: "/services",
};

export const metadata: Metadata = buildMetadata(pageMeta);

export default function ServicesPage() {
  return (
    <main>
      <PageJsonLd type="CollectionPage" meta={pageMeta} crumb="Services" />
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            as="h1"
            eyebrow="Services"
            title="Pick what you need. We handle the rest."
            description="Whether it's development, marketing, or AI automation, our services are organized around what you're actually trying to achieve."
          />
        </div>
      </section>

      <ServicesExplorer />

      <FAQ
        eyebrow="FAQ"
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
