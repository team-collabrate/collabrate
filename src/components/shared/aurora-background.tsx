"use client";

import { cn } from "@/lib/utils";

export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute -top-1/3 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.35),transparent_60%)] blur-3xl animate-aurora" />
      <div className="absolute top-1/4 -left-1/4 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,159,67,0.28),transparent_60%)] blur-3xl animate-aurora [animation-delay:-6s]" />
      <div className="absolute top-1/3 -right-1/4 h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(247,104,111,0.25),transparent_60%)] blur-3xl animate-aurora [animation-delay:-11s]" />
    </div>
  );
}

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 grid-fade-mask opacity-[0.4] dark:opacity-[0.25]",
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
