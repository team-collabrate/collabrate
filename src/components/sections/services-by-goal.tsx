"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { servicesByGoalContent } from "@/data/site";

export function ServicesByGoal() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={servicesByGoalContent.eyebrow} title={servicesByGoalContent.title} />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {servicesByGoalContent.groups.map((group) => (
            <motion.div
              key={group.goal}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(138,43,226,0.35)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-brand-violet">
                <Icon name={group.icon} className="size-5" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{group.goal}</h3>
              <ul className="flex flex-col gap-2.5">
                {group.items.map((item) => (
                  <li key={item.name} className="text-xs leading-relaxed text-balance">
                    <span className="font-semibold text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">: {item.description}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
