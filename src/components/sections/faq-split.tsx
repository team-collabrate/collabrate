"use client";

import Link from "next/link";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { contactFaq, servicesFaq, site } from "@/lib/content";
import { track } from "@/lib/analytics";

// Merge both FAQ sets, dropping the duplicate "outside India" question.
const items = [
  ...servicesFaq,
  ...contactFaq.filter((f) => !f.question.toLowerCase().includes("outside india")),
];

export function FaqSplit() {
  return (
    <section id="faq" className="mx-auto w-full max-w-[1344px] px-4 section-pad">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_728px] lg:gap-20">
        <Reveal className="flex flex-col items-start gap-5 lg:sticky lg:top-32 lg:self-start lg:pt-8">
          <h2 className="display-2 text-balance">Frequently asked questions</h2>
          <p className="max-w-sm text-lg leading-[1.45] text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Tell us what you&apos;re trying to achieve and we&apos;ll
            point you in the right direction.
          </p>
          <Button variant="primary" asChild>
            <Link href={site.primaryCTA.href}>{site.primaryCTA.label}</Link>
          </Button>
        </Reveal>

        <Reveal delay={0.08}>
          <AccordionPrimitive.Root
            type="single"
            collapsible
            defaultValue={items[0]?.question}
            onValueChange={(question) => question && track("scroll_faq_open", { question })}
            className="flex flex-col gap-4 rounded-[24px] border border-black/10 bg-panel p-4 dark:border-white/15"
          >
            {items.map((faq) => (
              <AccordionPrimitive.Item
                key={faq.question}
                value={faq.question}
                className="group rounded-[16px] bg-background px-6 transition-shadow data-[state=open]:shadow-[0_2px_12px_rgba(26,20,51,0.06)]"
              >
                <AccordionPrimitive.Header>
                  <AccordionPrimitive.Trigger className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl leading-snug text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet group-data-[state=open]:text-foreground [&[data-state=open]>.plus]:hidden [&[data-state=closed]>.minus]:hidden">
                    {faq.question}
                    <Plus className="plus size-5 shrink-0 text-brand-violet" aria-hidden />
                    <Minus className="minus size-5 shrink-0 text-muted-foreground" aria-hidden />
                  </AccordionPrimitive.Trigger>
                </AccordionPrimitive.Header>
                <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-6 pr-10 text-base leading-[1.5] text-muted-foreground">{faq.answer}</p>
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            ))}
          </AccordionPrimitive.Root>
        </Reveal>
      </div>
    </section>
  );
}
