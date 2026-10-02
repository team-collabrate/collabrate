import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

// Qualitative only: no numbers, ratings, or claims about specific competitors.
// Collabrate column is grounded in the content JSON (one team across
// development, marketing and AI; scoped quote before work; project-based or
// ongoing engagement).
const others = ["Several vendors", "A freelancer"] as const;

const rows: { label: string; values: [boolean, boolean, boolean] }[] = [
  { label: "Development, marketing, and AI under one team", values: [true, false, false] },
  { label: "One point of accountability for the whole project", values: [true, false, true] },
  { label: "A scoped quote before any work starts", values: [true, true, true] },
  { label: "Project-based or ongoing engagements", values: [true, true, false] },
  { label: "What we build is backed by the marketing that follows", values: [true, false, false] },
];

const Mark = ({ yes, label }: { yes: boolean; label: string }) =>
  yes ? (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-violet text-white">
      <Check className="size-3" strokeWidth={3} aria-label={`${label}: yes`} />
    </span>
  ) : (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground/15 text-background dark:text-foreground">
      <X className="size-3" strokeWidth={3} aria-label={`${label}: not typically`} />
    </span>
  );

export function Comparison() {
  return (
    <section className="mx-auto w-full max-w-[1344px] px-4 section-pad">
      <Reveal className="mb-12 grid gap-8 lg:mb-[60px] lg:grid-cols-2 lg:items-start">
        <h2 className="display-2 max-w-[520px] text-balance">Several vendors, a freelancer, or Collabrate.</h2>
        <div className="flex flex-wrap gap-3 lg:pt-2">
          <Button variant="primary" asChild>
            <Link href={site.primaryCTA.href}>{site.primaryCTA.label}</Link>
          </Button>
          <Button variant="soft" asChild>
            <Link href="/services">See our services</Link>
          </Button>
        </div>
      </Reveal>

      {/* Phones: one card per capability, so nothing needs sideways scrolling. */}
      <Reveal delay={0.08} className="md:hidden">
        <ul className="flex flex-col gap-3">
          {rows.map((row) => (
            <li key={row.label} className="rounded-[16px] border border-border bg-background p-5">
              <p className="text-base font-medium leading-snug text-foreground">{row.label}</p>
              <dl className="mt-4 grid grid-cols-1 gap-2.5">
                {[["Collabrate", row.values[0]], [others[0], row.values[1]], [others[1], row.values[2]]].map(([label, yes], i) => (
                  <div
                    key={label as string}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-[10px] px-3 py-2.5",
                      i === 0 ? "border border-brand-violet/40 bg-tint-sky" : "bg-surface"
                    )}
                  >
                    <dt className={cn("text-sm", i === 0 ? "font-semibold text-foreground" : "text-muted-foreground")}>{label as string}</dt>
                    <dd>
                      <Mark yes={yes as boolean} label={label as string} />
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.08} className="hidden md:block">
        <div className="overflow-x-auto pb-2">
          <div
            role="table"
            aria-label="Comparison"
            className="grid min-w-[720px] grid-cols-[1.15fr_1fr_1fr_1fr] text-sm"
          >
            {/* Header row: column headers must sit inside a role="row" (display: contents keeps the grid layout). */}
            <div role="row" className="contents">
              <div role="columnheader" className="px-2 py-4">
                <span className="sr-only">Capability</span>
              </div>
              <div
                role="columnheader"
                className="flex items-center justify-center gap-2 rounded-t-[16px] border border-b-0 border-brand-violet/40 bg-tint-sky px-4 py-5"
              >
                <Image src="/logo-mark.png" alt="" width={28} height={28} className="size-7" />
                <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
                  Collabrate
                </span>
              </div>
              {others.map((o) => (
                <div
                  key={o}
                  role="columnheader"
                  className="mx-1.5 mt-1.5 flex items-center justify-center rounded-[16px] bg-surface px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-foreground"
                >
                  {o}
                </div>
              ))}
            </div>

            {rows.map((row, r) => {
              const last = r === rows.length - 1;
              return (
                <div key={row.label} role="row" className="contents">
                  <div
                    role="rowheader"
                    className={cn(
                      "flex items-center border-t border-border px-2 py-6 text-base font-medium leading-snug text-foreground",
                      r === 0 && "border-t-0"
                    )}
                  >
                    {row.label}
                  </div>
                  {row.values.map((yes, i) => (
                    <div
                      key={i}
                      role="cell"
                      className={cn(
                        "flex items-center justify-center border-t border-border px-4 py-6",
                        r === 0 && "border-t-0",
                        i === 0 && "border-x border-x-brand-violet/40 bg-tint-sky",
                        i === 0 && last && "rounded-b-[16px] border-b border-b-brand-violet/40"
                      )}
                    >
                      <Mark yes={yes} label={i === 0 ? "Collabrate" : others[i - 1]} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
