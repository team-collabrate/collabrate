"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (cb: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", cb);
  return () => query.removeEventListener("change", cb);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

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
  poster,
  className,
}: {
  src: string;
  /** Lighter file for narrow screens (under 768px). */
  mobileSrc?: string;
  /** Only mount at or above this viewport width in px (e.g. 1024 for desktop-only art). */
  minWidth?: number;
  /**
   * Poster image URL. When given, the <video> element is rendered in the server HTML with this
   * poster and no source, and the source is attached later. The same element then paints the
   * poster first and the video's first frame later, with identical area, so the first frame never
   * becomes a new, later Largest Contentful Paint candidate (a video mounted after load did).
   */
  poster?: string;
  className?: string;
}) {
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
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

  if (poster) {
    // Reduced motion: no source is ever attached, so it stays a still poster.
    return (
      <video
        className={className}
        src={chosen ?? undefined}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={chosen ? "auto" : "none"}
        aria-hidden
      />
    );
  }
  if (reduceMotion || !chosen) return null;
  return (
    <video className={className} src={chosen} autoPlay muted loop playsInline preload="auto" aria-hidden />
  );
}
