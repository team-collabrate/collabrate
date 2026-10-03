"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup } from "@/components/shared/reveal";
import { industries, site } from "@/lib/content";
import { cn } from "@/lib/utils";

// Bento arrangement for five industries: two tall cards flanking a stacked pair, then one wide card.
const LAYOUT = [
  "lg:col-span-4 lg:row-span-2 bg-tint-sky",
  "lg:col-span-4 bg-tint-lilac",
  "lg:col-span-4 lg:row-span-2 bg-tint-lime",
  "lg:col-span-4 bg-tint-cream",
  "lg:col-span-12 bg-tint-cream",
];

export function Industries() {
  return (
    <section className="mx-auto w-full max-w-[1344px] px-4 section-pad">
      <Reveal className="mb-12 grid gap-8 lg:mb-[60px] lg:grid-cols-2 lg:items-start">
        <h2 className="display-2 max-w-[520px] text-balance">Industries We Work With</h2>
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-[560px] text-lg leading-[1.45] text-muted-foreground">
            From early-stage startups to large-scale enterprises, we build and manage digital infrastructure
            suited to the scale, complexity, and goals of every business we work with.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" asChild>
              <Link href={site.primaryCTA.href}>{site.primaryCTA.label}</Link>
            </Button>
            <Button variant="soft" asChild>
              <Link href={site.secondaryCTA.href}>
                {site.secondaryCTA.label} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[220px]" stagger={0.06}>
        {industries.map((industry, i) => {
          const tall = LAYOUT[i]?.includes("row-span-2");
          const wide = LAYOUT[i]?.includes("col-span-12");
          return (
            <article
              key={industry.name}
              className={cn(
                "group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-[16px] border border-black/[0.08] p-6 dark:border-white/10",
                LAYOUT[i],
                wide && "md:col-span-2"
              )}
            >
              <div className="dot-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_top,black,transparent)]" />
              <span className="relative flex size-11 items-center justify-center rounded-[10px] border border-brand-violet/25 bg-background font-[family-name:var(--font-display)] text-base text-brand-violet">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={cn("relative flex flex-col gap-2", tall && "lg:mt-auto")}>
                <h3 className="card-title">{industry.name}</h3>
                <p className="max-w-[560px] text-base leading-[1.4] text-muted-foreground">{industry.description}</p>
              </div>
            </article>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
