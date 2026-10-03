"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/content";
import { track } from "@/lib/analytics";

export function FAQ({
  eyebrow = "FAQ",
  title = "Questions, answered",
  description,
  items,
  id = "faq",
  compact = false,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  id?: string;
  /** Tighter vertical rhythm, for pages where the FAQ follows a dense block (the Contact page). */
  compact?: boolean;
}) {
  return (
    <section id={id} className={compact ? "relative py-10 sm:py-14" : "relative py-24 sm:py-32"}>
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <Reveal delay={0.1} className={compact ? "mt-8" : "mt-16"}>
          <Accordion
            type="single"
            collapsible
            onValueChange={(question) => question && track("scroll_faq_open", { question })}
            className="rounded-3xl border border-border bg-card px-6 sm:px-8">
            {items.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
