import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/hero";
import { Belief } from "@/components/sections/belief";
import { ServicesBento } from "@/components/sections/services-bento";
import { WorkShowcase } from "@/components/sections/work-showcase";
import { Testimonials } from "@/components/sections/testimonials";
import { Comparison } from "@/components/sections/comparison";
import { Industries } from "@/components/sections/industries";
import { FaqSplit } from "@/components/sections/faq-split";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = buildMetadata({
  title: "Collabrate: Web, App, Marketing and AI Agency in India",
  description:
    "Collabrate is a web, app, marketing and AI agency based in Tamil Nadu, serving businesses in India, Singapore, Malaysia and the Gulf. Get a clear quote.",
  path: "/",
});

export default function Home() {
  return (
    <main>
      <Hero />
      <Belief />
      <ServicesBento />
      <WorkShowcase />
      <Testimonials />
      <Comparison />
      <Industries />
      <FaqSplit />
      <CTABanner
        heading="Ready to build something that works?"
        body="Tell us what you're trying to achieve, and we'll come back with a clear plan and a quote."
        ctaLabel="Get a Quote"
        ctaHref="/contact"
      />
    </main>
  );
}
