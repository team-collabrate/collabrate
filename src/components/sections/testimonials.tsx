"use client";

import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading align="left" eyebrow="Client stories" title="What clients say" className="max-w-2xl" />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 sm:grid-cols-2" stagger={0.08}>
          {testimonials.map((t) => (
            <motion.figure key={t.quote} variants={staggerItem} className="flex flex-col gap-5 border-t border-border pt-6">
              <Quote className="size-5 text-brand-violet/60" />
              <blockquote className="text-balance text-lg leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{t.author}</span> — {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
