"use client";

import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { howWePrice } from "@/data/services-page";

export function HowWePrice() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow={howWePrice.eyebrow} title={howWePrice.title} />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3" stagger={0.1}>
          {howWePrice.models.map((model) => (
            <motion.div
              key={model.name}
              variants={staggerItem}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-7"
            >
              <h3 className="text-base font-semibold text-foreground">{model.name}</h3>
              <p className="text-sm text-muted-foreground">{model.description}</p>
              <p className="mt-auto pt-4 text-sm font-medium text-brand-violet">{model.price}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
