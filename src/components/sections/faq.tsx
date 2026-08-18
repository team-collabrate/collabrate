"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/content";

export function FAQ({
  eyebrow = "FAQ",
  title = "Questions, answered",
  description,
  items,
  id = "faq",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
  id?: string;
}) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <Reveal delay={0.1} className="mt-16">
          <Accordion type="single" collapsible className="rounded-3xl border border-border bg-card px-6 sm:px-8">
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
