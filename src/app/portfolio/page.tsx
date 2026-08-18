import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { PortfolioGrid } from "@/components/sections/portfolio-grid";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A look at the platforms and applications we've built across booking, HR, enterprise software, fitness, and vendor management.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <main>
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
          <PortfolioGrid />
        </div>
      </section>

      <CTABanner heading="Start your project." ctaLabel="Get a Quote" ctaHref="/contact" />
    </main>
  );
}
