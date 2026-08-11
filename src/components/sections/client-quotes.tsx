"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { contactTestimonials } from "@/data/contact-page";

export function ClientQuotes() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Client stories" title="What our recent clients say" />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3" stagger={0.1}>
          {contactTestimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7"
            >
              <Quote className="size-6 text-brand-violet/50" />
              <p className="text-sm leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-auto text-sm font-medium text-muted-foreground">
                {t.name}, {t.title}
              </p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
