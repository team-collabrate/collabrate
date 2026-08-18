"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { industries } from "@/lib/content";

export function Industries() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Industries We Work With"
          description="From early-stage startups to large-scale enterprises, we build and manage digital infrastructure suited to the scale, complexity, and goals of every business we work with."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-7 shadow-sm transition-colors duration-300 hover:border-brand-purple/40"
            >
              <span className="text-xs font-semibold text-brand-violet">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-semibold text-foreground">{industry.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-balance">{industry.description}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
