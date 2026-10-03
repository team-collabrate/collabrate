"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * "On this page" list for long legal documents. Desktop: sticky side list that highlights the
 * section being read. Mobile: a collapsed card above the document. Plain anchor links, so it
 * works without JavaScript; the highlight is progressive enhancement.
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const list = (
    <ol className="flex flex-col">
      {items.map((item, i) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            className={cn(
              "flex min-h-11 items-start gap-3 rounded-xl px-3 py-2 text-sm leading-snug transition-colors lg:min-h-0 lg:py-1.5",
              active === item.id
                ? "bg-tint-violet font-medium text-brand-violet"
                : "text-muted-foreground hover:bg-surface hover:text-foreground"
            )}
          >
            <span className="mt-px w-5 shrink-0 tabular-nums text-xs opacity-70">{String(i + 1).padStart(2, "0")}</span>
            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="group rounded-2xl border border-border bg-card lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 text-sm font-semibold text-foreground">
          On this page
          <span aria-hidden className="text-muted-foreground transition-transform group-open:rotate-180">
            ▾
          </span>
        </summary>
        <div className="border-t border-border p-2">{list}</div>
      </details>

      <nav aria-label="On this page" className="sticky top-28 hidden max-h-[calc(100svh-9rem)] overflow-y-auto lg:block">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[1.5px] text-foreground/55">On this page</p>
        {list}
      </nav>
    </>
  );
}
