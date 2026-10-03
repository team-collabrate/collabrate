"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-in entrances without any animation library.
 *
 * The server HTML is fully visible (no inline opacity:0), so crawlers, no-JS visitors and slow
 * hydration all see the content. After hydration, only elements that start below the fold are
 * hidden (data-reveal="hidden") and then played in once (data-reveal="in") when they scroll into
 * view. Elements already on screen at load are left alone: no flash and nothing delays first paint.
 * The animation itself is CSS (see "Scroll reveal" in globals.css); reduced motion gets a short fade.
 */

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor = (direction: Direction): CSSProperties => {
  switch (direction) {
    case "up":
      return { "--ry": "28px" } as CSSProperties;
    case "down":
      return { "--ry": "-28px" } as CSSProperties;
    case "left":
      return { "--rx": "28px" } as CSSProperties;
    case "right":
      return { "--rx": "-28px" } as CSSProperties;
    default:
      return {};
  }
};

function useRevealOnView<T extends HTMLElement>(once: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return; // already on screen: stay visible

    el.dataset.reveal = "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = "in";
          if (once) observer.disconnect();
        } else if (!once) {
          el.dataset.reveal = "hidden";
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  return ref;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className,
  style,
  once = true,
  // Plain fade/translate by default; a blur-in on every element is a generic "AI polish" tell.
  blur = false,
  ariaHidden,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  blur?: boolean;
  ariaHidden?: boolean;
}) {
  const ref = useRevealOnView<HTMLDivElement>(once);

  return (
    <div
      ref={ref}
      aria-hidden={ariaHidden}
      className={className}
      style={
        {
          ...offsetFor(direction),
          "--reveal-delay": `${delay}s`,
          "--reveal-duration": `${duration}s`,
          ...(blur ? { "--rblur": "8px" } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/**
 * Plays its direct children in one after another. Children need no props: the CSS targets
 * `[data-stagger] > *` and spaces them with `--stagger` (seconds).
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRevealOnView<HTMLDivElement>(true);

  return (
    <div
      ref={ref}
      data-stagger=""
      className={className}
      style={{ "--stagger": `${stagger}s`, "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
