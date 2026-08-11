"use client";

import { Check, Clock, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { ServiceGoalGroup } from "@/data/services-page";

export function ServiceGoalSection({ group, index }: { group: ServiceGoalGroup; index: number }) {
  return (
    <section className={`relative py-16 sm:py-20 ${index % 2 === 1 ? "bg-surface" : ""}`}>
      <div className="mx-auto max-w-4xl px-6">
        <Reveal className="mb-10 flex items-start gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand-diagonal text-2xl text-white shadow-lg">
            <Icon name={group.icon} className="size-6" />
          </span>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{group.heading}</h2>
            <p className="mt-1 text-muted-foreground">{group.subheading}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="multiple" className="rounded-3xl border border-border bg-card px-6 sm:px-8">
            {group.services.map((service) => (
              <AccordionItem key={service.title} value={service.title}>
                <AccordionTrigger>
                  <span className="flex flex-1 flex-wrap items-center justify-between gap-3 pr-4">
                    <span>{service.title}</span>
                    <Badge variant="outline" className="shrink-0 whitespace-nowrap font-normal">
                      <Clock className="size-3" /> {service.timeline}
                    </Badge>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-5">
                    <p className="leading-relaxed">{service.whatItIs}</p>

                    <div>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                        What&apos;s included
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {service.included.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {service.examples.map((example, i) => (
                      <div
                        key={i}
                        className="flex gap-3 rounded-2xl border border-border bg-background p-4"
                      >
                        <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand-orange" />
                        <div>
                          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-foreground">
                            {service.examples.length > 1 ? `Real example ${i + 1}` : "Real example"}
                          </p>
                          <p className="text-sm leading-relaxed">{example}</p>
                        </div>
                      </div>
                    ))}

                    {service.extraLabel && service.extraItems && (
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                          {service.extraLabel}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {service.extraItems.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
