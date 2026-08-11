"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { typicalCombinations } from "@/data/services-page";

export function TypicalCombinations() {
  return (
    <section className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow={typicalCombinations.eyebrow} title={typicalCombinations.title} />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2" stagger={0.08}>
          {typicalCombinations.combos.map((combo) => (
            <motion.div
              key={combo.scenario}
              variants={staggerItem}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-brand-violet">
                <Layers className="size-4" />
              </span>
              <p className="text-sm font-semibold text-foreground">{combo.scenario}</p>
              <p className="text-sm text-muted-foreground">{combo.stack}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
