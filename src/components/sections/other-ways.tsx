"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Icon } from "@/components/shared/icon-map";
import { otherWaysToLearn } from "@/data/contact-page";

export function OtherWays() {
  return (
    <section className="relative bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          {otherWaysToLearn.title}
        </h2>

        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3" stagger={0.08}>
          {otherWaysToLearn.links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-brand-purple/40"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface text-brand-violet">
                <Icon name={link.icon} className="size-4" />
              </span>
              <p className="flex items-center gap-1 font-semibold text-foreground">
                {link.label}
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </p>
              <p className="text-xs text-muted-foreground">{link.description}</p>
            </motion.a>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
