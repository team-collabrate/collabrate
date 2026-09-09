"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { site } from "@/lib/content";

const heroSection = {
  headline: "Digital development and marketing that generates measurable business growth.",
  subline:
    "Collabrate designs, builds, and markets digital products for businesses that need one accountable team instead of multiple vendors.",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-28">
      <AuroraBackground />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-violet"
          >
            <span className="h-px w-6 shrink-0 bg-brand-violet/50" aria-hidden />
            Development · Marketing · AI
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl md:text-[4.5rem]"
          >
            {heroSection.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground"
          >
            {heroSection.subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-10 flex flex-col items-center gap-6 sm:flex-row"
          >
            <Button variant="gradient" size="lg" asChild>
              <a href={site.primaryCTA.href}>
                {site.primaryCTA.label} <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <a
              href={site.secondaryCTA.href}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
            >
              {site.secondaryCTA.label}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
