"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { serviceCategories } from "@/lib/content";
import { cn } from "@/lib/utils";

const firstCategory = serviceCategories[0];
const firstService = firstCategory?.services[0];

export function ServicesOverview() {
  const [active, setActive] = useState<{ categoryId: string; serviceIndex: number }>({
    categoryId: firstCategory?.id ?? "",
    serviceIndex: 0,
  });

  const activeCategory = serviceCategories.find((c) => c.id === active.categoryId) ?? firstCategory;
  const activeService = activeCategory?.services[active.serviceIndex] ?? firstService;

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Pick what you need. We handle the rest."
          description="Whether it's development, marketing, or AI automation, our services are organized around what you're actually trying to achieve."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: three-category scroll list */}
          <Reveal direction="left" className="flex flex-col gap-8">
            {serviceCategories.map((category) => (
              <div key={category.id} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  {category.heading}
                </h3>
                <ul className="flex flex-col gap-1 border-l border-border pl-4">
                  {category.services.map((service, i) => {
                    const isActive =
                      activeCategory?.id === category.id && active.serviceIndex === i;
                    return (
                      <li key={service.name}>
                        <button
                          type="button"
                          onMouseEnter={() => setActive({ categoryId: category.id, serviceIndex: i })}
                          onClick={() => setActive({ categoryId: category.id, serviceIndex: i })}
                          className={cn(
                            "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors duration-200",
                            isActive
                              ? "bg-surface text-foreground"
                              : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
                          )}
                        >
                          {service.name}
                          <ArrowRight
                            className={cn(
                              "size-3.5 shrink-0 transition-all duration-200",
                              isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                            )}
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </Reveal>

          {/* Right: hover-revealed detail panel */}
          <Reveal direction="right" delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              {activeService && (
                <motion.div
                  key={activeService.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-8"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
                      {activeCategory?.heading}
                    </span>
                    <h4 className="mt-2 text-2xl font-semibold text-foreground">{activeService.name}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{activeService.summary}</p>
                  <ul className="flex flex-col gap-2.5 border-t border-border pt-5">
                    {activeService.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  {activeService.note && (
                    <p className="text-xs italic text-muted-foreground/80">{activeService.note}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
