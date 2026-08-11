"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { whyChooseUs } from "@/data/site";

export function WhyChooseUs() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Why startups choose us"
          title="Real reasons, not marketing BS."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {whyChooseUs.map((item) => (
            <motion.div
              key={item.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative flex flex-col gap-4 rounded-3xl border border-border bg-card p-7 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(138,43,226,0.35)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand-diagonal text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Icon name={item.icon} className="size-5.5" />
              </span>
              <h3 className="text-lg font-semibold text-foreground text-balance">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-balance">{item.description}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
