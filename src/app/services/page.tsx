import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCategorySection } from "@/components/sections/service-category-section";
import { FAQ } from "@/components/sections/faq";
import { CTABanner } from "@/components/sections/cta-banner";
import { serviceCategories, servicesFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Whether it's development, marketing, or AI automation, our services are organized around what you're actually trying to achieve.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
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

      {serviceCategories.map((category, i) => (
        <ServiceCategorySection key={category.id} category={category} index={i} />
      ))}

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
