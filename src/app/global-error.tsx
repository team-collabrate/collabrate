"use client";

import "@fontsource-variable/geist";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";
import { StatusPage } from "@/components/shared/status-page";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

// Last-resort boundary: replaces the whole document (root layout, navbar and footer included),
// so it must render its own <html> and <body>. It reuses the global styles and the shared
// status layout so it still looks like Collabrate.
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main>
          <StatusPage code="500" eyebrow="Something went wrong" title="We hit an unexpected error.">
            <p className="mt-5 max-w-xl text-lg leading-[1.45] text-muted-foreground">
              Please reload the page. If it keeps happening, email us at{" "}
              <a href={`mailto:${site.email}`} className="font-medium text-foreground underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" onClick={() => retry()}>
                Try again
              </Button>
              <Button variant="soft" asChild>
                {/* A plain link on purpose: this boundary replaces the whole document, so a full reload is the safe way home. */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/">Back to home</a>
              </Button>
            </div>
            {error.digest && <p className="mt-8 text-xs text-muted-foreground">Reference: {error.digest}</p>}
          </StatusPage>
        </main>
      </body>
    </html>
  );
}
