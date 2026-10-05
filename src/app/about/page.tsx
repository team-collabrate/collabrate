import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { AboutPillars } from "@/components/sections/about-pillars";
import { ScrollWordHero } from "@/components/sections/scroll-word-hero";
import { aboutContent } from "@/content/about-page";
import { isPending, serviceCategories, site, stripServiceParenthetical } from "@/lib/content";
import { SHOW_UNPUBLISHED } from "@/lib/publish";
import { publishedServicePages, servicePath } from "@/lib/service-pages";

const pageMeta = {
  title: "About Collabrate, a Tamil Nadu Digital Agency",
  description:
    "Collabrate is a digital development and marketing company founded in 2025 and based in Tamil Nadu, working with businesses across India and beyond.",
  path: "/about",
};

export const metadata: Metadata = buildMetadata(pageMeta);

const facts = [
  "Founded 2025",
  "Remote-first, based in Tamil Nadu, India",
  "Serving clients across India, Singapore, Malaysia, and the Gulf countries",
];

// The new sections are live only once aboutContent.published is true (or in a preview build).
const showNew = aboutContent.published || SHOW_UNPUBLISHED;

export default function AboutPage() {
  const liveServices = new Map(publishedServicePages().map((p) => [p.serviceName, p.slug]));
  const profiles = [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "Instagram", href: site.social.instagram },
    { label: "X", href: site.social.x },
  ].filter((p) => !isPending(p.href));
  return (
    <main>
      <PageJsonLd type="AboutPage" meta={pageMeta} crumb="About" />
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
              About Collabrate
            </span>
            <h1 className="mt-3 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              One team, every part of your digital growth.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground">
              Collabrate is a digital development and marketing company founded in 2025, working with
              businesses across India, Singapore, Malaysia, and the Gulf. We were built on a simple idea:
              businesses shouldn&apos;t have to manage separate vendors for development and marketing. Our
              team handles both, so what we build is designed to perform, and what we market is backed by
              something solid.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Each word maps to something we do: UI/UX design and web/app builds, store deployment,
          marketing, and workflow/AI automation (see the service lists on /services). */}
      <ScrollWordHero
        lead="We help you"
        words={["design.", "build.", "launch.", "market.", "automate."]}
        summary="We help you design, build, launch, market, and automate."
        statement="Development, marketing, and AI, from one accountable team."
        ctaLabel="Tell us what you're building"
        ctaHref="/contact"
      />

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <AboutPillars />
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-8 shadow-sm sm:flex-row sm:items-center sm:justify-around sm:p-10">
              {facts.map((fact) => (
                <p key={fact} className="text-center text-sm font-medium text-foreground">
                  {fact}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {showNew && (
        <section className="relative pb-16 sm:pb-24">
          <div className="mx-auto max-w-4xl space-y-14 px-6">
            {!aboutContent.published && (
              <p className="rounded-[10px] border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
                Draft preview. The sections below are not published yet; the live page shows the original copy.
              </p>
            )}

            <div role="group" aria-labelledby="why">
              <h2 id="why" className="text-2xl font-semibold tracking-tight">Why does Collabrate exist?</h2>
              <div className="mt-5 max-w-3xl space-y-4 text-muted-foreground">
                {aboutContent.whyWeExist.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div role="group" aria-labelledby="runs">
              <h2 id="runs" className="text-2xl font-semibold tracking-tight">How does a project run?</h2>
              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {aboutContent.howProjectRuns.map((step, i) => (
                  <li key={step.title} className="rounded-2xl border border-border p-5">
                    <span className="text-sm font-semibold text-brand-violet">Step {i + 1}</span>
                    <h3 className="mt-1 font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div role="group" aria-labelledby="what">
              <h2 id="what" className="text-2xl font-semibold tracking-tight">What do we do, and with which tools?</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {serviceCategories.map((category) => (
                  <li key={category.id} className="rounded-2xl border border-border p-5">
                    <h3 className="font-semibold text-foreground">{category.heading}</h3>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {category.services.map((service) => {
                        const slug = liveServices.get(service.name);
                        return (
                          <li key={service.name}>
                            {slug ? (
                              <Link href={servicePath(slug)} className="underline-offset-4 hover:text-foreground hover:underline">
                                {stripServiceParenthetical(service.name)}
                              </Link>
                            ) : (
                              service.name
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-muted-foreground">{aboutContent.toolsLine}</p>
              <p className="mt-2 text-muted-foreground">
                See{" "}
                <Link href="/services" className="font-medium text-brand-violet underline-offset-4 hover:underline">all services</Link>
                , the{" "}
                <Link href="/portfolio" className="font-medium text-brand-violet underline-offset-4 hover:underline">work we have built</Link>
                , and{" "}
                <Link href="/pricing" className="font-medium text-brand-violet underline-offset-4 hover:underline">how pricing works</Link>
                .
              </p>
            </div>

            <div role="group" aria-labelledby="where">
              <h2 id="where" className="text-2xl font-semibold tracking-tight">Where do we operate?</h2>
              <div className="mt-5 max-w-3xl space-y-3 text-muted-foreground">
                {aboutContent.whereWeOperate.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div role="group" aria-labelledby="reach">
              <h2 id="reach" className="text-2xl font-semibold tracking-tight">How can you reach us?</h2>
              <address className="mt-5 not-italic text-muted-foreground">
                <p className="font-medium text-foreground">{aboutContent.locationLine}</p>
                <p className="mt-1">
                  <a href={`mailto:${site.email}`} className="text-brand-violet underline-offset-4 hover:underline">
                    {site.email}
                  </a>
                </p>
                {profiles.length > 0 && (
                  <p className="mt-1">
                    {profiles.map((profile, i) => (
                      <span key={profile.label}>
                        {i > 0 && " · "}
                        <a href={profile.href} rel="noopener noreferrer" className="text-brand-violet underline-offset-4 hover:underline">
                          {profile.label}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </address>
            </div>
          </div>
        </section>
      )}

      <section className="relative py-16 sm:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <SectionHeading title="Want to work with us? Let's talk about what you're building." />
          <Button variant="gradient" size="lg" asChild>
            <a href="/contact">
              Get a Quote <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
