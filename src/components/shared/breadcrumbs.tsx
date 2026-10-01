import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/lib/schema";

/**
 * Visible breadcrumb trail. Pass the same `items` to the page's schema builder so the
 * BreadcrumbList JSON-LD always matches what is on screen. The last item is the current
 * page and is not a link.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path || "home"} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path || "/"} className="underline-offset-4 hover:text-foreground hover:underline">
                  {item.name}
                </Link>
              )}
              {!last && <ChevronRight className="size-3.5 shrink-0" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
