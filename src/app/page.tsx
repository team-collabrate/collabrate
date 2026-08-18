import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { Industries } from "@/components/sections/industries";
import { Testimonials } from "@/components/sections/testimonials";
import { CTABanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesOverview />
      <Industries />
      <Testimonials />
      <CTABanner
        heading="Ready to build something that works?"
        body="Tell us what you're trying to achieve, and we'll come back with a clear plan and a quote."
        ctaLabel="Get a Quote"
        ctaHref="/contact"
      />
    </main>
  );
}
