"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { serviceComparison } from "@/data/services-page";

export function ServiceComparison() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading eyebrow={serviceComparison.eyebrow} title={serviceComparison.title} />

        <Reveal delay={0.1} className="mt-16 overflow-x-auto rounded-3xl border border-border">
          <table className="w-full min-w-[560px] border-collapse text-sm">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-5 py-4 font-semibold text-foreground">Service</th>
                <th className="px-5 py-4 font-semibold text-foreground">Timeline</th>
                <th className="px-5 py-4 font-semibold text-foreground">Best For</th>
                <th className="px-5 py-4 font-semibold text-foreground">Complexity</th>
              </tr>
            </thead>
            <tbody>
              {serviceComparison.rows.map((row, i) => (
                <tr
                  key={row.service}
                  className={i % 2 === 1 ? "bg-surface/50" : ""}
                >
                  <td className="border-t border-border px-5 py-3.5 font-medium text-foreground">{row.service}</td>
                  <td className="border-t border-border px-5 py-3.5 text-muted-foreground">{row.timeline}</td>
                  <td className="border-t border-border px-5 py-3.5 text-muted-foreground">{row.bestFor}</td>
                  <td className="border-t border-border px-5 py-3.5 text-muted-foreground">{row.complexity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
