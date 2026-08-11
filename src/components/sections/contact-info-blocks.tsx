"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem, Reveal } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { directContactMethods, responseGuarantee, whatHappensAfter } from "@/data/contact-page";

export function DirectContactMethods() {
  return (
    <section className="relative bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow={directContactMethods.eyebrow} title={directContactMethods.title} />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.08}>
          {directContactMethods.methods.map((method) => (
            <motion.div
              key={method.label}
              variants={staggerItem}
              className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand-diagonal text-white">
                <Icon name={method.icon} className="size-4.5" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{method.label}</p>
              <p className="text-sm font-medium text-foreground">{method.value}</p>
              <p className="text-xs text-muted-foreground">{method.note}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

export function ResponseGuarantee() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="rounded-3xl bg-gradient-brand-diagonal p-8 text-white sm:p-10">
            <h3 className="mb-6 text-xl font-semibold sm:text-2xl">{responseGuarantee.title}</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {responseGuarantee.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhatHappensAfter() {
  return (
    <section className="relative bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow={whatHappensAfter.eyebrow} title={whatHappensAfter.title} />

        <StaggerGroup className="mt-16 flex flex-col gap-4" stagger={0.08}>
          {whatHappensAfter.steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={staggerItem}
              className="flex items-start gap-5 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-brand-diagonal text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-foreground">{step.title}</p>
                  {step.timeframe && (
                    <span className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] text-muted-foreground">
                      {step.timeframe}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
