import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface RelatedLink {
  /** Descriptive anchor text, never "click here" or "read more". */
  label: string;
  href: string;
  /** One short line shown under the link. */
  description?: string;
}

/**
 * 2 to 4 internal links, plain server-rendered <a href>. Callers must pass only published
 * targets (filter with published() from @/lib/publish before building the list).
 */
export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: RelatedLink[];
}) {
  if (links.length === 0) return null;
  return (
    <section aria-labelledby="related-heading" className="mt-14">
      <h2 id="related-heading" className="text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.slice(0, 4).map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex h-full items-start justify-between gap-3 rounded-[12px] border border-black/10 bg-background p-4 transition-colors hover:bg-surface"
            >
              <span>
                <span className="block font-medium text-foreground">{link.label}</span>
                {link.description && (
                  <span className="mt-1 block text-sm text-muted-foreground">{link.description}</span>
                )}
              </span>
              <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-brand-violet" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
