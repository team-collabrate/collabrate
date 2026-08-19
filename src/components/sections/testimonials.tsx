"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [index]
  );

  // Auto-advance pauses on hover/focus and never runs at all when the user
  // has requested reduced motion — an auto-playing carousel that can't be
  // stopped is a real accessibility failure, not just a nicety.
  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = setInterval(() => go(index + 1), 6000);
    return () => clearInterval(id);
  }, [index, go, paused, reducedMotion]);

  const t = testimonials[index];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="Client stories" title="What clients say" />

        <div
          className="relative mt-16 min-h-[280px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: reducedMotion ? 0 : direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: reducedMotion ? 0 : -direction * 40 }}
              transition={{ duration: reducedMotion ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-8 shadow-sm text-center sm:p-12"
            >
              <Quote className="size-8 text-brand-violet/50" />
              <p className="text-balance text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">{t.author}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-purple hover:text-brand-purple"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-brand-violet" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>

          <button
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-purple hover:text-brand-purple"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
