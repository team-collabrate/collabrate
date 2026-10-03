"use client";

import { StaggerGroup } from "@/components/shared/reveal";

const pillars = [
  { title: "Founder-led, hands-on", body: "You work directly with the people building your project, not layers of account management." },
  { title: "One team, full capability", body: "Development, design, and marketing under one roof." },
  { title: "Built for where you're growing", body: "Serving businesses across India, Singapore, Malaysia, and the Gulf." },
];

export function AboutPillars() {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-3" stagger={0.08}>
      {pillars.map((pillar) => (
        <div
          key={pillar.title}
          className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-7 shadow-sm transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-brand-purple/40"
        >
          <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
        </div>
      ))}
    </StaggerGroup>
  );
}
