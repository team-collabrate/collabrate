import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { pricingContent } from "@/content/pricing-page";
import { SHOW_UNPUBLISHED } from "@/lib/publish";
import { pageGraph } from "@/lib/schema";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { CTABanner } from "@/components/sections/cta-banner";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";

const pageMeta = {
  title: "How Collabrate Pricing Works | Collabrate",
  description:
    "Collabrate prices by scope, complexity, timeline and ongoing support, not fixed packages. See what affects your quote and how engagements work.",
  path: "/pricing",
};

export const metadata: Metadata = buildMetadata(pageMeta);

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

// The new sections are live only once pricingContent.published is true (or in a preview build).
const showNew = pricingContent.published || SHOW_UNPUBLISHED;

export default function PricingPage() {
  const faqs = pricingContent.faqs;
  return (
    <main>
      {/* FAQPage schema only when the FAQ is visible, i.e. when the new content is shown. */}
      <JsonLd
        data={pageGraph({
          type: "WebPage",
          path: pageMeta.path,
          name: pageMeta.title,
          description: pageMeta.description,
          crumb: "Pricing",
          faqs: showNew ? faqs : undefined,
        })}
      />
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

      {showNew ? (
        <section aria-labelledby="cost-factors" className="relative pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl px-6">
            {!pricingContent.published && (
              <p className="mb-6 rounded-[10px] border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
                Draft preview. The sections below are not published yet; the live page shows the original copy.
              </p>
            )}
            <h2 id="cost-factors" className="text-2xl font-semibold tracking-tight">What affects the cost?</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {pricingContent.costFactors.map((factor) => (
                <li key={factor.title} className="rounded-2xl border border-border bg-surface p-5">
                  <h3 className="font-semibold text-foreground">{factor.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{factor.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
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
      )}

      <section className="relative pb-8 sm:pb-12">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center">
            <h2 className="text-lg font-semibold text-foreground">How you can work with us</h2>
          </Reveal>
        </div>
        <HowItWorks features={engagementTypes} />
      </section>

      {showNew && (
        <section className="relative pb-16 sm:pb-20">
          <div className="mx-auto max-w-4xl space-y-14 px-6">
            <div aria-labelledby="engagement-fit" role="group">
              <h2 id="engagement-fit" className="text-2xl font-semibold tracking-tight">Which engagement fits?</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {pricingContent.engagementFit.map((item) => (
                  <li key={item.title} className="rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div aria-labelledby="in-quote" role="group">
              <h2 id="in-quote" className="text-2xl font-semibold tracking-tight">What is included in a quote?</h2>
              <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground marker:text-brand-violet">
                {pricingContent.includedInQuote.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>

            <div aria-labelledby="scoping" role="group">
              <h2 id="scoping" className="text-2xl font-semibold tracking-tight">How is a project scoped?</h2>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {pricingContent.scopingSteps.map((step, i) => (
                  <li key={step.title} className="rounded-2xl border border-border p-5">
                    <span className="text-sm font-semibold text-brand-violet">Step {i + 1}</span>
                    <h3 className="mt-1 font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div aria-labelledby="pricing-faq" role="group">
              <h2 id="pricing-faq" className="text-2xl font-semibold tracking-tight">Pricing questions</h2>
              <div className="mt-5 divide-y divide-black/10 rounded-2xl border border-border">
                {faqs.map((faq) => (
                  <div key={faq.question} className="p-5">
                    <h3 className="text-lg font-semibold">{faq.question}</h3>
                    <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground">
              Not sure which services you need?{" "}
              <Link href="/services" className="font-medium text-brand-violet underline-offset-4 hover:underline">
                Browse our services
              </Link>{" "}
              or{" "}
              <Link href="/contact" className="font-medium text-brand-violet underline-offset-4 hover:underline">
                contact us for a quote
              </Link>
              .
            </p>
          </div>
        </section>
      )}

      <CTABanner
        heading="Tell us what you're building."
        body="We'll come back with a clear quote, no obligation."
        ctaLabel="Get a Quote"
        ctaHref="/contact"
      />
    </main>
  );
}
