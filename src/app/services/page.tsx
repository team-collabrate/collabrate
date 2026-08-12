import type { Metadata } from "next";
import { ServicesHero } from "@/components/sections/services-hero";
import { ServicesCarousel } from "@/components/sections/services-carousel";
import { ServiceGoalSection } from "@/components/sections/service-goal-section";
import { ServiceComparison } from "@/components/sections/service-comparison";
import { TypicalCombinations } from "@/components/sections/typical-combinations";
import { HowWePrice } from "@/components/sections/how-we-price";
import { FAQ } from "@/components/sections/faq";
import { CTABanner } from "@/components/sections/cta-banner";
import {
  servicesPageMeta,
  serviceGoalGroups,
  serviceCoverSlides,
  servicesFaq,
  servicesNextSteps,
} from "@/data/services-page";

export const metadata: Metadata = {
  title: { absolute: servicesPageMeta.title },
  description: servicesPageMeta.description,
  openGraph: {
    title: servicesPageMeta.title,
    description: servicesPageMeta.description,
  },
  twitter: {
    title: servicesPageMeta.title,
    description: servicesPageMeta.description,
  },
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  // Icon + gradient cards now, no photos, so every service can appear here
  // instead of only the ones with an uploaded image.
  const serviceCards = serviceCoverSlides.map((service) => ({
    slug: service.slug,
    title: service.title,
    category: service.category,
    value: service.value,
  }));

  return (
    <main>
      <ServicesHero />
      <ServicesCarousel services={serviceCards} />
      {serviceGoalGroups.map((group, i) => (
        <ServiceGoalSection key={group.heading} group={group} index={i} />
      ))}
      <ServiceComparison />
      <TypicalCombinations />
      <HowWePrice />
      <CTABanner title={servicesNextSteps.title} options={servicesNextSteps.options} />
      <FAQ eyebrow="FAQ" title="Common questions" items={servicesFaq} id="faq" />
    </main>
  );
}
