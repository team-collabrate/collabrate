"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeferredVideo } from "@/components/shared/deferred-video";
import { site } from "@/lib/content";

const heroSection = {
  headline: "We build high-performance websites and apps for growth-focused businesses.",
  subline:
    "Collabrate is a digital agency for businesses that want to grow. We lead design, development, marketing, and AI automation, and deliver the website your customers trust and your team is proud to share, from first brief to launch.",
};

// Tool logos (never client marks: we don't display marks we can't back up).
const STRIP = [
  ["react.svg", "React"],
  ["shopify.svg", "Shopify"],
  ["wordpress.svg", "WordPress"],
  ["webflow.svg", "Webflow"],
  ["figma.svg", "Figma"],
  ["stripe.svg", "Stripe"],
  ["openai.svg", "OpenAI"],
  ["zapier.svg", "Zapier"],
  ["google-ads.svg", "Google Ads"],
] as const;

export function Hero() {
  return (
    <section className="px-4 pt-4">
      <div className="relative flex min-h-[680px] w-full flex-col overflow-hidden rounded-[16px] border border-black/10 bg-[#0A1022] lg:h-[800px]">
        {/* The poster is the LCP image: optimized, preloaded, painted first. The video mounts
            after load (DeferredVideo) and plays on top of it, untouched. */}
        <Image src="/video/hero-poster.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <DeferredVideo
          src="/video/hero.mp4"
          mobileSrc="/video/hero-mobile.mp4"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative mx-auto w-full max-w-[1408px] px-6 pb-44 pt-32 sm:px-12 lg:pt-[150px]">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="display-1 max-w-[1100px] text-balance !text-white [text-shadow:0_0_2px_rgba(0,0,0,0.35),0_2px_14px_rgba(0,0,0,0.4),0_10px_40px_rgba(0,0,0,0.3)]"
          >
            {heroSection.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-6 max-w-[760px] text-lg leading-[1.45] font-medium text-white [text-shadow:0_0_2px_rgba(0,0,0,0.4),0_2px_12px_rgba(0,0,0,0.45),0_8px_30px_rgba(0,0,0,0.3)] sm:text-xl"
          >
            {heroSection.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button variant="primary" asChild>
              <Link href={site.primaryCTA.href}>{site.primaryCTA.label}</Link>
            </Button>
            <Button variant="soft" asChild>
              <Link href={site.secondaryCTA.href}>
                {site.secondaryCTA.label} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Tool-logo strip along the bottom edge (desktop). */}
        <div
          className="absolute inset-x-0 bottom-9 hidden lg:block"
          aria-hidden
        >
          <div className="mx-auto max-w-[1408px] px-12">
            <div className="max-w-[calc(100%-380px)] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
              <div className="flex w-max animate-marquee items-center gap-16">
                {[...STRIP, ...STRIP].map(([file, label], i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    loading="lazy"
                    decoding="async"
                    key={i}
                    src={`/logos/${file}`}
                    alt=""
                    title={label}
                    className="h-9 w-auto shrink-0 opacity-90 brightness-0 invert"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating "Our work" card, bottom-right. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-4 right-4 hidden w-[320px] rounded-[16px] border border-white/40 bg-white/20 p-1.5 shadow-[0_8px_24px_rgba(32,32,32,0.18)] backdrop-blur-md lg:block"
        >
          <Link href="/portfolio" className="group block rounded-[10px] bg-background p-3">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <span className="size-2 rounded-full bg-brand-violet" aria-hidden /> Our work
            </div>
            <div className="relative h-[160px] overflow-hidden rounded-[10px] bg-gradient-to-br from-[#5B2A9E] to-[#8A2BE2]">
              <Image src="/video/work-poster.jpg" alt="" fill sizes="320px" className="object-cover" />
              <DeferredVideo
                src="/video/work.mp4"
                minWidth={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-violet text-white shadow-[0_6px_18px_rgba(106,29,184,0.55)] transition-transform group-hover:scale-110">
                <ArrowUpRight className="size-6" />
              </span>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
