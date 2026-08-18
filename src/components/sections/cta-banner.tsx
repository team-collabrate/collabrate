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
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(120deg,#8A2BE2,#B154B3_35%,#CF6CAD_55%,#F7686F_75%,#FF9F43)] bg-[length:200%_auto] animate-gradient-move px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
            <div className="relative flex flex-col items-center gap-8">
              <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                {heading}
              </h2>
              <p className="max-w-xl text-balance text-white/85">{body}</p>
              <Button variant="glass" size="lg" asChild>
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
