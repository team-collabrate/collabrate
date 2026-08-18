import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Every business is different, so we don't force projects into fixed packages. Pricing is based on scope, complexity, and what you actually need.",
  alternates: { canonical: "/pricing" },
};

const factors = [
  "Type of service (development, marketing, AI, or a combination)",
  "Project complexity and timeline",
  "Ongoing support vs. one-time delivery",
  "Scale of the business and its goals",
];

const engagementTypes: Step[] = [
  {
    title: "Project-based",
    description: "A defined scope with a fixed quote, suited to websites, apps, or one-off campaigns.",
    colorTheme: "orange",
  },
  {
    title: "Ongoing engagement",
    description: "Continuous marketing, development, or AI support billed on a recurring basis.",
    colorTheme: "blue",
  },
  {
    title: "Custom / Enterprise",
    description: "Multi-service engagements scoped around larger, more complex requirements.",
    colorTheme: "purple",
  },
];

export default function PricingPage() {
  return (
    <main>
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="Pricing"
            description="Every business is different, so we don't force projects into fixed packages. Pricing is based on scope, complexity, and what you actually need."
          />
        </div>
      </section>

      <section className="relative pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
              <h2 className="text-lg font-semibold text-foreground">How it works</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We start with a conversation about your goals, then scope the right mix of development,
                marketing, or AI work. You get a clear quote before anything begins, no hidden costs, no
                locked-in retainers you don&apos;t need.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-lg font-semibold text-foreground">What affects your quote</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {factors.map((factor) => (
                <li
                  key={factor}
                  className="rounded-2xl border border-border bg-surface px-5 py-4 text-sm text-muted-foreground"
                >
                  {factor}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-8 sm:pb-12">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center">
            <h2 className="text-lg font-semibold text-foreground">How you can work with us</h2>
          </Reveal>
        </div>
        <HowItWorks features={engagementTypes} />
      </section>

      <CTABanner
        heading="Tell us what you're building."
        body="We'll come back with a clear quote, no obligation."
        ctaLabel="Get a Quote"
        ctaHref="/contact"
      />
    </main>
  );
}
