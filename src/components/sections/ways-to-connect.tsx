"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { waysToConnect } from "@/data/contact-page";
import { calendlyUrl } from "@/data/site";

export function WaysToConnect() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow={waysToConnect.eyebrow} title={waysToConnect.title} />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2" stagger={0.12}>
          {waysToConnect.options.map((option) => {
            const href = option.isCalendly ? calendlyUrl : option.href ?? "#";
            return (
              <motion.div
                key={option.title}
                variants={staggerItem}
                className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{option.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{option.subtitle}</p>
                </div>

                {option.items.length > 0 && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-foreground">{option.intro}</p>
                    <ul className="flex flex-col gap-1.5">
                      {option.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button variant="gradient" className="mt-auto w-full" asChild>
                  <a href={href} target={option.isCalendly ? "_blank" : undefined} rel="noopener noreferrer">
                    {option.cta} <ArrowUpRight className="size-4" />
                  </a>
                </Button>
                {option.note && <p className="text-center text-xs text-muted-foreground">{option.note}</p>}
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
