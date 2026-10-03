"use client";

import { Reveal, StaggerGroup } from "@/components/shared/reveal";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

// Placeholder names in the source content ("[Client Name]") are never rendered.
const isPlaceholder = (value: string) => value.trim().startsWith("[");

export function Testimonials() {
  const quotes = testimonials.slice(0, 4);
  // Three columns: outer columns hold one tall card, the middle holds two shorter ones.
  const columns = [[0], [1, 3], [2]].map((idxs) => idxs.map((i) => quotes[i]).filter(Boolean));

  return (
    <section className="mx-auto w-full max-w-[1344px] px-4 section-pad">
      <Reveal className="mb-14 max-w-[600px] lg:mb-[64px]">
        <h2 className="display-2 text-balance">What clients say</h2>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch" stagger={0.08}>
        {columns.map((col, c) => (
          <div key={c} className="flex flex-col gap-6">
            {col.map((t) => {
              const tall = col.length === 1;
              return (
                <figure
                  key={t.quote}
                  className={cn(
                    "flex flex-col justify-between gap-8 rounded-[20px] border border-black/10 p-6 dark:border-white/15",
                    tall
                      ? "flex-1 bg-gradient-to-b from-background to-tint-sky md:min-h-[380px]"
                      : "bg-background md:min-h-[250px]"
                  )}
                >
                  <blockquote className="text-xl leading-[1.35] text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  {(!isPlaceholder(t.author) || !isPlaceholder(t.role)) && (
                    <figcaption className="border-t border-border pt-4 text-sm">
                      {!isPlaceholder(t.author) && (
                        <span className="block font-medium text-foreground">{t.author}</span>
                      )}
                      {!isPlaceholder(t.role) && <span className="block text-muted-foreground">{t.role}</span>}
                    </figcaption>
                  )}
                </figure>
              );
            })}
          </div>
        ))}
      </StaggerGroup>
    </section>
  );
}
