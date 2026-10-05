"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * Liquid-glass surface + metal button, adapted from a shadcn-style button pack to this site:
 * brand-violet metal variant, the site's `.dark` class, and a real keyboard focus ring.
 */

/**
 * SVG refraction filter used by <LiquidGlassSurface>. Render ONE of these per page (the id is
 * shared). Chromium applies it to the backdrop; Safari and Firefox ignore `url()` backdrop
 * filters and fall back to the plain blur on the surface, so the bar still reads as glass.
 */
export function GlassFilter({ scale = 30 }: { scale?: number }) {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="pointer-events-none absolute">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          {/* Noise to distort with, softened a little. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          {/* Bend whatever is behind the surface with the noise. */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

// Inner lensing edges + soft outer glow. Full class strings so Tailwind can see them.
const EDGE_LIGHT =
  "shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.06),inset_0_0_2px_2px_rgba(0,0,0,0.04),0_0_12px_rgba(255,255,255,0.15)]";
const EDGE_DARK =
  "dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]";

/**
 * Decorative glass layer. Put it inside a `relative` box that has a border-radius class; it
 * inherits that radius. It sits apart from the box's content so the blur can never touch text.
 */
export function LiquidGlassSurface({
  className,
  tint = "bg-white/80 dark:bg-white/[0.07]",
}: {
  className?: string;
  /** Background tint classes. Raise the opacity for surfaces that carry a lot of small text. */
  tint?: string;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}>
      <div
        className={cn("absolute inset-0 rounded-[inherit] backdrop-blur-xl backdrop-saturate-150", tint)}
        style={{ backdropFilter: "url(#container-glass) blur(10px) saturate(1.5)" }}
      />
      <div className={cn("absolute inset-0 rounded-[inherit]", EDGE_LIGHT, EDGE_DARK)} />
    </div>
  );
}

// ---------------------------------------------------------------------------------------------
// Metal button
// ---------------------------------------------------------------------------------------------

type MetalVariant = "violet" | "default";

const colorVariants: Record<
  MetalVariant,
  { outer: string; inner: string; button: string; textColor: string; textShadow: string }
> = {
  // Brand violet (#8A2BE2). Gradient kept dark enough for white 14px text to pass contrast.
  violet: {
    outer: "bg-gradient-to-b from-[#2A0B52] to-[#B58CE8]",
    inner: "bg-gradient-to-b from-[#EBDDFB] via-[#4A1590] to-[#D9C2F7]",
    button: "bg-gradient-to-b from-[#9B4FE8] to-[#6C1DB5]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(60_20_110_/_100%)]",
  },
  default: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]",
    button: "bg-gradient-to-b from-[#7A7A7A] to-[#4A4A4A]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]",
  },
};

const TRANSITION = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)";

function metalStyles(variant: MetalVariant, isPressed: boolean, isHovered: boolean, isTouch: boolean) {
  const colors = colorVariants[variant];
  const lifted = isHovered && !isPressed && !isTouch;
  return {
    wrapper: cn("relative inline-flex transform-gpu rounded-[12px] p-[1.25px] will-change-transform", colors.outer),
    wrapperStyle: {
      transform: isPressed ? "translateY(2.5px) scale(0.99)" : "translateY(0) scale(1)",
      boxShadow: isPressed
        ? "0 1px 2px rgba(0, 0, 0, 0.15)"
        : isHovered && !isTouch
          ? "0 4px 12px rgba(0, 0, 0, 0.12)"
          : "0 3px 8px rgba(0, 0, 0, 0.08)",
      transition: TRANSITION,
      transformOrigin: "center center",
    } satisfies React.CSSProperties,
    inner: cn("absolute inset-[1px] transform-gpu rounded-[11px] will-change-transform", colors.inner),
    innerStyle: {
      transition: TRANSITION,
      transformOrigin: "center center",
      filter: lifted ? "brightness(1.05)" : "none",
    } satisfies React.CSSProperties,
    button: cn(
      "relative z-10 m-[1px] inline-flex h-11 transform-gpu cursor-pointer items-center justify-center overflow-hidden rounded-[10px] px-6 py-2 text-sm font-semibold leading-none no-underline will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-violet",
      colors.button,
      colors.textColor,
      colors.textShadow
    ),
    buttonStyle: {
      transform: isPressed ? "scale(0.97)" : "scale(1)",
      transition: TRANSITION,
      transformOrigin: "center center",
      filter: lifted ? "brightness(1.02)" : "none",
    } satisfies React.CSSProperties,
  };
}

function ShineEffect({ isPressed }: { isPressed: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300",
        isPressed ? "opacity-20" : "opacity-0"
      )}
    >
      <div className="absolute inset-0 rounded-[10px] bg-gradient-to-r from-transparent via-neutral-100 to-transparent" />
    </div>
  );
}

// Touch devices skip the hover lift. Read through useSyncExternalStore so the server render
// (false) and the first client render agree, with no setState-in-effect.
const noopSubscribe = () => () => {};
const readIsTouch = () => "ontouchstart" in window || navigator.maxTouchPoints > 0;

export interface MetalButtonProps {
  variant?: MetalVariant;
  /** Renders a Next <Link> instead of a <button>. */
  href?: string;
  className?: string;
  /** Classes for the outer metal frame (e.g. `flex w-full` for a full-width button). */
  wrapperClassName?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
}

export function MetalButton({
  variant = "violet",
  href,
  className,
  wrapperClassName,
  children,
  onClick,
  type = "button",
}: MetalButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const isTouch = React.useSyncExternalStore(noopSubscribe, readIsTouch, () => false);

  const styles = metalStyles(variant, isPressed, isHovered, isTouch);

  const shared = {
    className: cn(styles.button, className),
    style: styles.buttonStyle,
    onClick,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onMouseEnter: () => {
      if (!isTouch) setIsHovered(true);
    },
    onMouseLeave: () => {
      setIsPressed(false);
      setIsHovered(false);
    },
    onTouchStart: () => setIsPressed(true),
    onTouchEnd: () => setIsPressed(false),
    onTouchCancel: () => setIsPressed(false),
  };

  const content = (
    <>
      <ShineEffect isPressed={isPressed} />
      {children}
      {isHovered && !isPressed && !isTouch && (
        <div className="pointer-events-none absolute inset-0 rounded-[10px] bg-gradient-to-t from-transparent to-white/5" />
      )}
    </>
  );

  return (
    <div className={cn(styles.wrapper, wrapperClassName)} style={styles.wrapperStyle}>
      <div className={styles.inner} style={styles.innerStyle} />
      {href ? (
        <Link href={href} {...shared}>
          {content}
        </Link>
      ) : (
        <button type={type} {...shared}>
          {content}
        </button>
      )}
    </div>
  );
}
