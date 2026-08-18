import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Collabrate is a digital development and marketing company founded in 2025, working with businesses across India, Singapore, Malaysia, and the Gulf.",
  alternates: { canonical: "/about" },
};

const pillars = [
  { title: "Founder-led, hands-on", body: "You work directly with the people building your project, not layers of account management." },
  { title: "One team, full capability", body: "Development, design, and marketing under one roof." },
  { title: "Built for where you're growing", body: "Serving businesses across India, Singapore, Malaysia, and the Gulf." },
];

const facts = [
  "Founded 2025",
  "Remote-first, based in Tamil Nadu, India",
  "Serving clients across India, Singapore, Malaysia, and the Gulf countries",
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
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

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3" stagger={0.08}>
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-8"
              >
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
              </div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-around sm:p-10">
              {facts.map((fact) => (
                <p key={fact} className="text-center text-sm font-medium text-foreground">
                  {fact}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

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
