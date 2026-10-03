"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { site } from "@/lib/content";

// Six preview cards clipped at the card edges. Each frames one of our own illustrations.
// On entry they rise in one by one; on hover the whole banner "wakes up": tiles straighten
// and slide toward the centre.
interface Floater {
  img: string;
  /** Position + size of the wrapper inside the banner. */
  box: React.CSSProperties;
  rot: number;
  rotHover: number;
  tx: number;
  ty: number;
  delay: number;
}

const FLOATERS: Floater[] = [
  { img: "/services/web-development.jpg", box: { width: 275, height: 185, left: "-10%", top: -51 }, rot: -8, rotHover: 2.8, tx: 90, ty: 16, delay: 0 },
  { img: "/services/seo.jpg", box: { width: 307, height: 204, left: "-16%", top: "50%", marginTop: -110 }, rot: -4, rotHover: 1.4, tx: 90, ty: 0, delay: 0.08 },
  { img: "/services/ecommerce.jpg", box: { width: 298, height: 200, left: "-10.5%", bottom: -56 }, rot: 6, rotHover: -2.1, tx: 90, ty: -16, delay: 0.16 },
  { img: "/services/ai-chatbots.jpg", box: { width: 275, height: 185, right: "-10%", top: -51 }, rot: 8, rotHover: -2.8, tx: -90, ty: 16, delay: 0.04 },
  { img: "/services/paid-ads.jpg", box: { width: 307, height: 204, right: "-16%", top: "50%", marginTop: -110 }, rot: 4, rotHover: -1.4, tx: -90, ty: 0, delay: 0.12 },
  { img: "/services/mobile-app.jpg", box: { width: 298, height: 200, right: "-10.5%", bottom: -56 }, rot: -6, rotHover: 2.1, tx: -90, ty: -16, delay: 0.2 },
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
        <div className="group relative mx-auto flex min-h-[502px] max-w-[1312px] items-center justify-center overflow-hidden rounded-[24px] border border-black/10 bg-gradient-to-b from-background via-tint-sky to-[#CFE6FA] px-6 py-16 text-center shadow-[0_24px_60px_-24px_rgba(20,50,100,0.28)] dark:border-white/15 dark:to-[#1d3550]">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-70" aria-hidden />

          {FLOATERS.map((f, i) => (
            <Reveal
              key={i}
              ariaHidden
              delay={f.delay}
              duration={0.7}
              className="pointer-events-none absolute z-0 hidden md:block"
              style={f.box}
            >
              <div
                className="size-full rounded-[16px] border border-black/[0.06] bg-white p-1.5 shadow-[0_18px_44px_-14px_rgba(20,40,90,0.35)] [transform:rotate(var(--rot))] [transition:transform_500ms_cubic-bezier(0.23,1,0.32,1)] lg:group-hover:[transform:rotate(var(--rot-hover))_translateX(var(--tx))_translateY(var(--ty))] motion-reduce:transition-none"
                style={
                  {
                    "--rot": `${f.rot}deg`,
                    "--rot-hover": `${f.rotHover}deg`,
                    "--tx": `${f.tx}px`,
                    "--ty": `${f.ty}px`,
                  } as React.CSSProperties
                }
              >
                <div className="relative size-full overflow-hidden rounded-[11px] bg-white">
                  <Image src={f.img} alt="" fill sizes="310px" className="object-cover" />
                </div>
              </div>
            </Reveal>
          ))}

          <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center gap-5">
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
