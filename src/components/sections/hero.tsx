"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground, GridBackground } from "@/components/shared/aurora-background";
import { site } from "@/lib/content";

const heroSection = {
  headline: "Digital development and marketing that generates measurable business growth.",
  subline:
    "Collabrate designs, builds, and markets digital products for businesses that need one accountable team instead of multiple vendors.",
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <AuroraBackground />
      <GridBackground />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
        >
          {heroSection.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
        >
          {heroSection.subline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button variant="gradient" size="lg" asChild>
            <a href={site.primaryCTA.href}>
              {site.primaryCTA.label} <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={site.secondaryCTA.href}>
              <Compass className="size-4" /> {site.secondaryCTA.label}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
