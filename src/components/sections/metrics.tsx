"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { AuroraBackground } from "@/components/shared/aurora-background";
import { Icon } from "@/components/shared/icon-map";
import { metrics } from "@/data/site";

export function Metrics() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <AuroraBackground className="opacity-60" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The numbers"
          title="What our clients see."
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.06}>
              <div className="flex h-full flex-col items-center gap-3 rounded-3xl border border-border bg-card p-6 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand-diagonal text-white">
                  <Icon name={metric.icon} className="size-4.5" />
                </span>
                <div className="text-2xl font-semibold text-foreground sm:text-3xl">
                  {metric.value !== undefined ? (
                    <AnimatedCounter
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals ?? 0}
                    />
                  ) : (
                    metric.display
                  )}
                </div>
                <p className="text-xs leading-tight text-muted-foreground">{metric.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
