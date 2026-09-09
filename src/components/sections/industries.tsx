"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Industries"
          title="Industries we work with"
          description="From early-stage startups to large-scale enterprises, we build and manage digital infrastructure suited to the scale, complexity, and goals of every business we work with."
          className="max-w-2xl"
        />

        <StaggerGroup className="mt-14 flex flex-col border-t border-border" stagger={0.05}>
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              variants={staggerItem}
              className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-6 gap-y-2 border-b border-border py-8 transition-colors duration-300 hover:bg-surface/60 sm:grid-cols-[4.5rem_16rem_1fr] sm:items-start sm:px-4"
            >
              <span className="font-display text-2xl font-semibold text-muted-foreground/40 transition-colors duration-300 group-hover:text-brand-violet sm:text-3xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-foreground sm:pr-6">{industry.name}</h3>
              <p className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1">
                {industry.description}
              </p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
