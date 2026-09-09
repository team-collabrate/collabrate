"use client";

import { cn } from "@/lib/utils";

// A single, static, low-opacity wash rather than three animated rainbow
// blobs — enough to keep the page from feeling flat without reading as a
// template's stock "gradient mesh" background.
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute -top-1/2 left-1/2 h-[56rem] w-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.16),transparent_65%)] blur-3xl" />
    </div>
  );
}

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 grid-fade-mask opacity-[0.25] dark:opacity-[0.15]",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
      aria-hidden
    />
  );
}
