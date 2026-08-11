"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { caseStudies } from "@/data/site";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Recent work"
          title="Real results, not portfolio fluff."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.08}>
          {caseStudies.map((study) => (
            <motion.article
              key={study.client}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-500 hover:shadow-[0_30px_70px_-24px_rgba(138,43,226,0.4)]"
            >
              <div className={`relative flex h-44 flex-col justify-between bg-gradient-to-br ${study.color} p-6`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.25),transparent_50%)]" />
                <div className="relative flex items-start justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/80">
                    {study.industry}
                  </span>
                  <ArrowUpRight className="size-5 text-white/80 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <h3 className="relative font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                  {study.client}
                </h3>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-7">
                <div className="flex flex-wrap gap-1.5">
                  {study.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-surface px-2.5 py-1 text-[11px] text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Challenge: </span>
                  {study.challenge}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Solution: </span>
                  {study.solution}
                </p>

                <div className="mt-auto grid grid-cols-1 gap-3 border-t border-border pt-5 sm:grid-cols-2">
                  {study.results.map((r) => (
                    <div key={r.label}>
                      <p className="text-sm font-semibold leading-snug text-foreground">{r.value}</p>
                      <p className="text-[11px] leading-tight text-muted-foreground">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
