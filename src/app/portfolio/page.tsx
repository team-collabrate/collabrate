import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { publishedProjectHrefs } from "@/lib/case-studies";
import { CTABanner } from "@/components/sections/cta-banner";

const pageMeta = {
  title: "Our Work: Booking, HR and Vendor Platforms | Collabrate",
  description:
    "A look at the platforms and applications we've built across booking, HR, enterprise software, fitness, and vendor management.",
  path: "/portfolio",
};

export const metadata: Metadata = buildMetadata(pageMeta);

export default function PortfolioPage() {
  return (
    <main>
      <PageJsonLd type="CollectionPage" meta={pageMeta} crumb="Our Work" />
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <SectionHeading
            as="h1"
            eyebrow="Our work"
            title="Our Work"
            description="A look at the platforms and applications we've built across different industries."
          />
        </div>
      </section>

      <section className="relative pb-16 sm:pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <PortfolioGrid pageHrefs={publishedProjectHrefs()} />
        </div>
      </section>

      <CTABanner heading="Start your project." ctaLabel="Get a Quote" ctaHref="/contact" />
    </main>
  );
}
