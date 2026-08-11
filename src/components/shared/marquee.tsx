"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  className,
  reverse = false,
  speedClassName = "animate-marquee",
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  speedClassName?: string;
}) {
  return (
    <div className={cn("relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", className)}>
      <div className={cn("flex shrink-0 items-center gap-12 pr-12", speedClassName, reverse && "[animation-direction:reverse]")}>
        {children}
      </div>
      <div className={cn("flex shrink-0 items-center gap-12 pr-12", speedClassName, reverse && "[animation-direction:reverse]")} aria-hidden>
        {children}
      </div>
    </div>
  );
}
