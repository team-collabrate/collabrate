"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { servicesFullListContent } from "@/data/site";

export function ServicesFullList() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={servicesFullListContent.eyebrow} title={servicesFullListContent.title} />

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {servicesFullListContent.categories.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-7">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-brand-violet">
                  {cat.category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <Button variant="gradient" size="lg" asChild>
            <a href={servicesFullListContent.cta.href}>
              {servicesFullListContent.cta.label} <ArrowUpRight className="size-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
