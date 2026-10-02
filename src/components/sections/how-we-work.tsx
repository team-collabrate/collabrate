import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homeProcess } from "@/content/home-process";
import { site } from "@/lib/content";

// One soft tint per step, from the existing tint palette (same family the Industries cards use).
const TINTS = ["bg-tint-sky", "bg-tint-lilac", "bg-tint-mint", "bg-tint-cream", "bg-tint-peach"];

/**
 * Homepage "How we work": five plain steps in the site's own wording (see content/home-process.ts).
 * Server component with plain markup (no animation wrapper) so the text is in the HTML at full
 * opacity for crawlers and for readers with reduced motion.
 */
export function HowWeWork() {
  const { heading, intro, steps } = homeProcess;

  return (
    <section id="how-we-work" aria-labelledby="how-we-work-heading" className="mx-auto w-full max-w-[1344px] px-4 section-pad">
      <div className="mb-12 grid gap-8 lg:mb-[60px] lg:grid-cols-2 lg:items-start">
        <h2 id="how-we-work-heading" className="display-2 max-w-[520px] text-balance">
          {heading}
        </h2>
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-[560px] text-lg leading-[1.45] text-muted-foreground">{intro}</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" asChild>
              <Link href={site.primaryCTA.href}>{site.primaryCTA.label}</Link>
            </Button>
            <Button variant="soft" asChild>
              <Link href="/pricing">
                How pricing works <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={`relative flex min-h-[170px] flex-col justify-between gap-6 sm:min-h-[220px] lg:min-h-[260px] lg:gap-8 overflow-hidden rounded-[16px] border border-black/[0.08] p-6 dark:border-white/10 ${TINTS[i % TINTS.length]} ${
              i === steps.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div
              aria-hidden
              className="dot-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_top,black,transparent)]"
            />
            <span className="relative flex size-11 items-center justify-center rounded-[10px] border border-brand-violet/25 bg-background font-[family-name:var(--font-display)] text-base text-brand-violet">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="relative flex flex-col gap-2">
              <h3 className="card-title">{step.title}</h3>
              <p className="text-base leading-[1.4] text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
