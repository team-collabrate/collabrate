"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { industries } from "@/data/site";

export function Industries() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Industries"
          title="Domain expertise where it matters most"
          description="Every industry has its own compliance requirements, edge cases, and users. We've shipped production software across all of these."
        />

        <StaggerGroup className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4" stagger={0.05}>
          {industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-brand-purple/40"
            >
              <Icon name={industry.icon} className="size-6 text-brand-violet" />
              <h3 className="font-semibold text-foreground">{industry.name}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{industry.description}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
