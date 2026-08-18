"use client";

import { Check } from "lucide-react";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Reveal } from "@/components/shared/reveal";
import { motion } from "framer-motion";
import type { ServiceCategory } from "@/lib/content";

export function ServiceCategorySection({ category, index }: { category: ServiceCategory; index: number }) {
  return (
    <section id={category.id} className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{category.heading}</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{category.description}</p>
        </Reveal>

        {category.highlights && category.highlights.length > 0 && (
          <Reveal delay={0.08} className="mt-6 flex flex-wrap gap-2">
            {category.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </Reveal>
        )}

        <StaggerGroup className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.06}>
          {category.services.map((service) => (
            <motion.div
              key={service.name}
              variants={staggerItem}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7"
            >
              <h3 className="text-lg font-semibold text-foreground">{service.name}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
              <ul className="flex flex-col gap-2 border-t border-border pt-4">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" />
                    {point}
                  </li>
                ))}
              </ul>
              {service.note && <p className="text-xs italic text-muted-foreground/80">{service.note}</p>}
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
