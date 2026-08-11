"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { whatWeDoContent } from "@/data/site";

export function WhatWeDo() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={whatWeDoContent.eyebrow} title={whatWeDoContent.title} />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3" stagger={0.1}>
          {whatWeDoContent.areas.map((area) => (
            <motion.div
              key={area.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-8 text-center items-center transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(138,43,226,0.35)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand-diagonal text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Icon name={area.icon} className="size-6" />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{area.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{area.description}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
