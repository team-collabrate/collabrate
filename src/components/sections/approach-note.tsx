"use client";

import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { approachNote, whyScheduleCall } from "@/data/contact-page";

export function ApproachNote() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <Badge variant="gradient" className="mb-6 uppercase tracking-wider">
            {approachNote.eyebrow}
          </Badge>
          <div className="flex flex-col gap-4">
            {approachNote.paragraphs.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-xl font-semibold text-foreground sm:text-2xl" : "leading-relaxed text-muted-foreground"}
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhyScheduleCall() {
  return (
    <section className="relative bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow={whyScheduleCall.eyebrow} title={whyScheduleCall.title} />

        <div className="mt-10">
          <Reveal>
            <p className="mb-4 font-medium text-foreground">{whyScheduleCall.intro}</p>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" stagger={0.06}>
            {whyScheduleCall.items.map((item) => (
              <motion.div key={item} variants={staggerItem} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" />
                <span className="text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </StaggerGroup>
          <Reveal delay={0.2}>
            <p className="mt-8 text-sm font-medium italic text-muted-foreground">{whyScheduleCall.closing}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
