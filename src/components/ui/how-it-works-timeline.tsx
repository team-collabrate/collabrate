import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Vertical How It Works Timeline, from 21st.dev (ln-dev7 "how-it-works-02", id 26902): a dashed
 * rail with numbered nodes and an icon + text card per step. Adapted here to take its steps as
 * props (the original hard-coded four) and to leave the section heading to the page, so it can
 * sit beside the page's own heading. Server component: plain markup, no animation.
 */

export interface TimelineStep {
  icon: LucideIcon;
  title: string;
  body: string;
}

export function HowItWorksTimeline({ steps, className }: { steps: TimelineStep[]; className?: string }) {
  return (
    <ol className={cn("relative flex flex-col gap-6 border-l border-dashed border-border pl-10 sm:pl-12", className)}>
      {steps.map((step, i) => (
        <li key={step.title} className="relative">
          <span className="absolute -left-[3.65rem] top-1 grid size-9 place-items-center rounded-full border border-border bg-card text-xs font-semibold tabular-nums text-foreground shadow-sm shadow-black/5 sm:-left-[4.15rem]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 sm:p-5">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-foreground/5 text-foreground">
              <step.icon className="size-4" aria-hidden />
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold tracking-tight text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
