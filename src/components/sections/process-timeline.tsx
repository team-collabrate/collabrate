"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { processSteps } from "@/data/site";

export function ProcessTimeline() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="No lengthy process. No disappearing act."
          description="Just straightforward execution."
        />

        <div className="relative mt-20">
          <div className="absolute left-6 top-2 hidden h-[calc(100%-2rem)] w-px bg-border lg:left-1/2 lg:block" />

          <div className="flex flex-col gap-4 lg:gap-0">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={`relative flex items-start gap-5 py-4 lg:items-center lg:gap-0 lg:py-8 ${
                  i % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background bg-gradient-brand-diagonal text-white shadow-lg lg:absolute lg:left-1/2 lg:-translate-x-1/2">
                  <Icon name={step.icon} className="size-5" />
                </span>

                <div className={`flex-1 lg:w-1/2 ${i % 2 === 1 ? "lg:pl-16" : "lg:pr-16 lg:text-right"}`}>
                  <Reveal direction={i % 2 === 1 ? "right" : "left"}>
                    <div className={`flex items-center gap-3 ${i % 2 === 1 ? "" : "lg:justify-end"}`}>
                      <span className="text-sm font-mono text-muted-foreground">{step.step}</span>
                      <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {step.description}
                    </p>
                  </Reveal>
                </div>

                <div className="hidden lg:block lg:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
