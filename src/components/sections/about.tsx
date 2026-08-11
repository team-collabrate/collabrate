"use client";

import { CheckCircle2 } from "lucide-react";
import { Reveal, StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { aboutContent, siteConfig } from "@/data/site";

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <Reveal>
            <Badge variant="gradient" className="w-fit uppercase tracking-wider">
              {aboutContent.eyebrow}
            </Badge>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              {aboutContent.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {aboutContent.body}
            </p>
          </Reveal>

          <StaggerGroup className="mt-4 flex flex-col gap-4" stagger={0.1} delay={0.2}>
            {aboutContent.pillars.map((pillar) => (
              <motion.div key={pillar.title} variants={staggerItem} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-violet" />
                <div>
                  <p className="font-semibold text-foreground">{pillar.title}</p>
                  <p className="text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>

        <Reveal direction="left" delay={0.1} className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border bg-card">
            <div className="absolute inset-0 bg-gradient-brand-diagonal opacity-90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
            <div className="relative flex h-full flex-col justify-end gap-4 p-8 text-white">
              <div className="glass rounded-2xl border-white/25 p-5">
                <p className="text-sm font-medium text-white/80">Founded</p>
                <p className="text-3xl font-semibold">{siteConfig.founded}</p>
              </div>
              <div className="glass grid grid-cols-2 gap-4 rounded-2xl border-white/25 p-5">
                <div>
                  <p className="text-2xl font-semibold">40+</p>
                  <p className="text-xs text-white/80">Senior specialists</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold">22+</p>
                  <p className="text-xs text-white/80">Countries served</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
