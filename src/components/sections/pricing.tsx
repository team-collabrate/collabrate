"use client";

import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { pricingTiers } from "@/data/site";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="What it costs"
          title="No one-size-fits-all pricing. Here's what to expect."
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className={cn(
                "relative flex flex-col gap-6 rounded-3xl border p-8",
                tier.highlighted
                  ? "border-transparent bg-[linear-gradient(160deg,#8A2BE2,#B154B3_45%,#1a1025)] text-white shadow-[0_30px_80px_-24px_rgba(138,43,226,0.55)] lg:-translate-y-4"
                  : "border-border bg-card"
              )}
            >
              {tier.highlighted && (
                <Badge variant="glass" className="absolute -top-3 left-1/2 -translate-x-1/2 border-white/30 text-white">
                  Most popular
                </Badge>
              )}

              <div>
                <h3 className={cn("text-lg font-semibold", tier.highlighted ? "text-white" : "text-foreground")}>
                  {tier.name}
                </h3>
                <p className={cn("mt-1 text-sm", tier.highlighted ? "text-white/70" : "text-muted-foreground")}>
                  {tier.description}
                </p>
              </div>

              <div className="flex items-baseline gap-2">
                <span className={cn("text-4xl font-semibold tracking-tight", tier.highlighted ? "text-white" : "text-foreground")}>
                  {tier.price}
                </span>
                <span className={cn("text-sm", tier.highlighted ? "text-white/70" : "text-muted-foreground")}>
                  {tier.cadence}
                </span>
              </div>

              <Button variant={tier.highlighted ? "glass" : "outline"} className="w-full" asChild>
                <a href="/contact">
                  {tier.cta} <ArrowUpRight className="size-4" />
                </a>
              </Button>

              {tier.features.length > 0 && (
                <ul className="flex flex-col gap-3 border-t pt-6" style={{ borderColor: tier.highlighted ? "rgba(255,255,255,0.2)" : "var(--border)" }}>
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={cn("mt-0.5 size-4 shrink-0", tier.highlighted ? "text-white" : "text-brand-violet")} />
                      <span className={tier.highlighted ? "text-white/90" : "text-muted-foreground"}>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
