"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

// Floating skeleton "screens" clipped at the card edges, echoing the reference's tilted previews.
const FLOATERS: { pos: string; tone: string }[] = [
  { pos: "-left-16 top-6 w-[300px] -rotate-6", tone: "from-[#8A2BE2] to-[#CF6CAD]" },
  { pos: "-left-24 top-[46%] w-[320px] rotate-3", tone: "from-[#FFC9A3] to-[#F7686F]" },
  { pos: "-left-14 bottom-2 w-[300px] -rotate-3", tone: "from-[#B98CF0] to-[#F6B5D6]" },
  { pos: "-right-16 top-6 w-[300px] rotate-6", tone: "from-[#1A1433] to-[#5B2A9E]" },
  { pos: "-right-24 top-[46%] w-[320px] -rotate-3", tone: "from-[#F6B5D6] to-[#FFE4CF]" },
  { pos: "-right-14 bottom-2 w-[300px] rotate-3", tone: "from-[#5B1FB0] to-[#B154B3]" },
];

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
    <section className="px-4 section-pad">
      <Reveal>
        <div className="dot-grid-host relative mx-auto flex min-h-[502px] max-w-[1312px] items-center justify-center overflow-hidden rounded-[24px] border border-[color-mix(in_srgb,var(--brand-violet)_40%,white)] bg-gradient-to-b from-background via-tint-sky to-[#C9B6F2] px-6 py-16 text-center shadow-[0_24px_60px_-24px_rgba(106,29,184,0.35)] dark:border-white/15 dark:to-[#3a2358]">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />
          {FLOATERS.map((f, i) => (
            <div
              key={i}
              aria-hidden
              className={cn(
                "absolute hidden aspect-[3/2] overflow-hidden rounded-[16px] border-2 border-white/70 bg-background p-3 shadow-[0_16px_40px_-12px_rgba(26,20,51,0.35)] lg:block",
                f.pos
              )}
            >
              <div className={`h-full rounded-xl bg-gradient-to-br ${f.tone}`} />
            </div>
          ))}
          <div className="relative mx-auto flex max-w-[560px] flex-col items-center gap-5">
            <h2 className="display-2 text-balance">{heading}</h2>
            <p className="text-lg leading-[1.45] text-muted-foreground">{body}</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" asChild>
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
              <Button variant="soft" asChild>
                <a href={`mailto:${site.email}`}>
                  Send a message <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
