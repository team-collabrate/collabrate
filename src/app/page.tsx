import { Hero } from "@/components/sections/hero";
import { WhatWeDo } from "@/components/sections/what-we-do";
import { TrustedBy } from "@/components/sections/trusted-by";
import { About } from "@/components/sections/about";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ServicesByGoal } from "@/components/sections/services-by-goal";
import { Industries } from "@/components/sections/industries";
import { TechStack } from "@/components/sections/tech-stack";
import { Portfolio } from "@/components/sections/portfolio";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Metrics } from "@/components/sections/metrics";
import { Testimonials } from "@/components/sections/testimonials";
import { ServicesFullList } from "@/components/sections/services-full-list";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { BlogPreview } from "@/components/sections/blog-preview";
import { CTABanner } from "@/components/sections/cta-banner";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeDo />
      <TrustedBy />
      <About />
      <ProcessTimeline />
      <ServicesByGoal />
      <Industries />
      <TechStack />
      <Portfolio />
      <WhyChooseUs />
      <Metrics />
      <Testimonials />
      <ServicesFullList />
      <Pricing />
      <FAQ />
      <BlogPreview />
      <CTABanner />
    </main>
  );
}
