"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Muted looping background video that never competes with first paint. The poster image
 * (rendered by the parent, underneath) is what the browser paints and measures for LCP;
 * the <video> is only mounted after the page has loaded and the browser is idle.
 * Skipped entirely for reduced-motion visitors and, optionally, below a breakpoint.
 */
export function DeferredVideo({
  src,
  mobileSrc,
  minWidth,
  className,
}: {
  src: string;
  /** Lighter file for narrow screens (under 768px). */
  mobileSrc?: string;
  /** Only mount at or above this viewport width in px (e.g. 1024 for desktop-only art). */
  minWidth?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [chosen, setChosen] = useState<string | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    if (minWidth && !window.matchMedia(`(min-width: ${minWidth}px)`).matches) return;
    const pick = () =>
      setChosen(mobileSrc && window.matchMedia("(max-width: 767px)").matches ? mobileSrc : src);

    const schedule = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(pick, { timeout: 2500 });
      else setTimeout(pick, 800);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => window.removeEventListener("load", schedule);
  }, [reduceMotion, minWidth, src, mobileSrc]);

  if (reduceMotion || !chosen) return null;
  return (
    <video className={className} src={chosen} autoPlay muted loop playsInline preload="auto" aria-hidden />
  );
}
