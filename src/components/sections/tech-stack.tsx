"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { techStack } from "@/data/site";

export function TechStack() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Technology"
          title="Modern tools. Production-grade choices."
          description="We pick technology based on what will hold up in production for years, not what's trending this week."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {techStack.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-border bg-card p-7">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-brand-violet">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="rounded-full border border-border bg-background px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-brand-purple/50"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
