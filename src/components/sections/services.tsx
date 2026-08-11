"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { services } from "@/data/site";

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What we do"
          title="One partner. Every capability you need to ship."
          description="From AI agents to brand identity, our pods cover the full stack of building and growing a modern product, so you're not stitching together five vendors."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group flex flex-col gap-5 rounded-3xl border border-border bg-card p-7 transition-all duration-500 hover:border-brand-purple/30 hover:shadow-[0_24px_60px_-24px_rgba(138,43,226,0.35)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-brand-violet transition-colors duration-500 group-hover:bg-gradient-brand-diagonal group-hover:text-white">
                  <Icon name={service.icon} className="size-5.5" />
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {service.category}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>

              <ul className="flex flex-wrap gap-1.5">
                {service.features.slice(0, 4).map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground"
                  >
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-auto flex items-center gap-1 text-sm font-medium text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                Learn more <ArrowUpRight className="size-3.5" />
              </a>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
