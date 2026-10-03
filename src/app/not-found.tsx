import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StatusPage } from "@/components/shared/status-page";
import { Button } from "@/components/ui/button";
import { nav } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Collabrate" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main>
      <StatusPage code="404" title="This page doesn't exist.">
        <p className="mt-5 max-w-xl text-lg leading-[1.45] text-muted-foreground">
          The link may be out of date, or the page may have moved. Head back to the homepage, or jump to one of the
          main sections below.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button variant="soft" asChild>
            <Link href="/contact">
              Contact us <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <nav aria-label="Main sections" className="mt-10">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {nav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex h-9 items-center rounded-full border border-black/10 bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-surface dark:border-white/15"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </StatusPage>
    </main>
  );
}
