"use client";

import { useEffect } from "react";
import Link from "next/link";
import { StatusPage } from "@/components/shared/status-page";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/content";

// Next.js 16.3 passes `retry` (not `reset`) to error boundaries.
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main>
      <StatusPage code="500" title="That didn't load as expected.">
        <p className="mt-5 max-w-xl text-lg leading-[1.45] text-muted-foreground">
          An error happened on our side while loading this page. Please try again. If it keeps happening, email us at{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-foreground underline underline-offset-4">
            {site.email}
          </a>{" "}
          and we will look into it.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" onClick={() => retry()}>
            Try again
          </Button>
          <Button variant="soft" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </div>
        {error.digest && <p className="mt-8 text-xs text-muted-foreground">Reference: {error.digest}</p>}
      </StatusPage>
    </main>
  );
}
