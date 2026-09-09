"use client";

import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

export function CTABanner({
  heading = "Ready to build something that works?",
  body = "Tell us what you're trying to achieve, and we'll come back with a clear plan and a quote.",
  ctaLabel = "Get a Quote",
  ctaHref = "/contact",
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-foreground px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="absolute -top-1/2 right-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,159,67,0.18),transparent_65%)] blur-3xl" />
            <div className="relative flex flex-col items-center gap-8">
              <span className="h-1 w-16 rounded-full bg-[linear-gradient(90deg,#8A2BE2,#FF9F43)]" aria-hidden />
              {/* !text-background: globals.css sets a color on every h1-h6 that
                  otherwise beats this utility at equal specificity. */}
              <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight !text-background sm:text-4xl md:text-5xl">
                {heading}
              </h2>
              <p className="max-w-xl text-balance text-background/70">{body}</p>
              <Button variant="gradient" size="lg" asChild>
                <a href={ctaHref}>
                  {ctaLabel} <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
