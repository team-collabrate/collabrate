"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import DottedMap from "dotted-map";
import { cn } from "@/lib/utils";

/*
 * World Map, from 21st.dev (Aceternity "World Map", id 999): a dotted map with animated arcs
 * between locations. Adapted for this site:
 *  - `next-themes` removed. Dot colour comes from Tailwind classes, so the site's `.dark` class
 *    works with no theme hook.
 *  - A `region` crop (the original always drew the whole world) and an equirectangular projection,
 *    so a crop's width:height equals its longitude:latitude span.
 *  - Pins and labels are HTML laid over the SVG, positioned in percentages, so their text stays
 *    one readable size whether the map fills a phone or a wide card.
 *  - Arcs bulge sideways in proportion to their length, soft edge fades, a `clearZone` where the
 *    dots are knocked out so text can sit on the map, arcs that draw when scrolled into view,
 *    and reduced-motion support.
 */

export interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
  labelPosition?: "top" | "bottom" | "left" | "right";
}

export interface Region {
  lat: { min: number; max: number };
  lng: { min: number; max: number };
}

export interface WorldMapProps {
  dots: { start: MapPoint; end: MapPoint; bulge?: number }[];
  /** Part of the world to draw. Defaults to South and South-East Asia plus the Gulf. */
  region?: Region;
  /** Dot rows. More rows = finer dots (and a bigger SVG). */
  rows?: number;
  /** An ellipse (fractions of the map) where land dots fade out, so text can sit on the map. */
  clearZone?: { x: number; y: number; rx: number; ry: number };
  lineColor?: string;
  className?: string;
  ariaLabel: string;
}

// Equirectangular (the library defaults to Mercator): a crop's width:height then equals its
// longitude:latitude span, so the map fits a card of a known shape.
const PROJECTION = { name: "equirectangular" } as const;

export const ASIA_REGION: Region = { lat: { min: -4, max: 36 }, lng: { min: 44, max: 115 } };

// Where a label pill sits relative to its pin. Full class strings so Tailwind can see them.
const LABEL_POSITION = {
  top: "bottom-full left-0 mb-2.5 -translate-x-1/2",
  bottom: "top-full left-0 mt-2.5 -translate-x-1/2",
  left: "right-full top-0 mr-3 -translate-y-1/2",
  right: "left-full top-0 ml-3 -translate-y-1/2",
} as const;

type Pt = { x: number; y: number };

/** A quadratic arc that bulges sideways (upward where possible) by `bulge` x its length. */
function arcPath(a: Pt, b: Pt, bulge = 0.25) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  let nx = dy / len;
  let ny = -dx / len;
  if (ny > 0 || (Math.abs(ny) < 0.2 && nx < 0)) {
    nx = -nx;
    ny = -ny;
  }
  const mx = (a.x + b.x) / 2 + nx * len * bulge;
  const my = (a.y + b.y) / 2 + ny * len * bulge;
  return `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`;
}

export function WorldMap({
  dots,
  region = ASIA_REGION,
  rows = 64,
  clearZone,
  lineColor = "#8A2BE2",
  className,
  ariaLabel,
}: WorldMapProps) {
  const reduceMotion = useReducedMotion();
  const gradientId = useId();
  const fadeHId = useId();
  const fadeVId = useId();
  const holeId = useId();
  const maskHId = useId();
  const maskVId = useId();
  const maskCId = useId();

  const model = useMemo(() => {
    const map = new DottedMap({ height: rows, region, grid: "diagonal", projection: PROJECTION });
    // Read the land dots first: pins added afterwards would otherwise join them.
    const land = map.getPoints();
    const { width, height } = map.image;

    const pin = (p: MapPoint) => {
      const { x, y } = map.addPin({ lat: p.lat, lng: p.lng });
      return { x, y, label: p.label, labelPosition: p.labelPosition };
    };

    const connections = dots.map((d) => ({ start: pin(d.start), end: pin(d.end), bulge: d.bulge }));

    // One entry per distinct place, so a shared hub is drawn and labelled once.
    const places = new Map<string, (typeof connections)[number]["start"]>();
    for (const c of connections) {
      for (const p of [c.start, c.end]) places.set(`${p.x}:${p.y}`, places.get(`${p.x}:${p.y}`) ?? p);
    }

    return {
      width,
      height,
      landPath: land.map((p) => `M${p.x} ${p.y}h0`).join(""),
      connections,
      places: Array.from(places.values()),
    };
  }, [dots, region, rows]);

  return (
    <div role="img" aria-label={ariaLabel} className={cn("relative w-full select-none", className)}>
      <svg viewBox={`0 0 ${model.width} ${model.height}`} aria-hidden="true" className="block h-auto w-full">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={lineColor} stopOpacity="0" />
            <stop offset="8%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="92%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
          </linearGradient>

          {/* Soft edge fades (left/right and top/bottom, applied one inside the other so they
              multiply) so the land dots dissolve at every side instead of ending on a hard line. */}
          <linearGradient id={fadeHId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.05" stopColor="#fff" />
            <stop offset="0.9" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <linearGradient id={fadeVId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.08" stopColor="#fff" />
            <stop offset="0.9" stopColor="#fff" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <mask id={maskHId}>
            <rect width={model.width} height={model.height} fill={`url(#${fadeHId})`} />
          </mask>
          <mask id={maskVId}>
            <rect width={model.width} height={model.height} fill={`url(#${fadeVId})`} />
          </mask>

          {/* A soft hole in the dots where text sits. */}
          {clearZone && (
            <>
              <radialGradient id={holeId}>
                <stop offset="0.5" stopColor="#000" />
                <stop offset="1" stopColor="#fff" />
              </radialGradient>
              <mask id={maskCId}>
                <rect width={model.width} height={model.height} fill="#fff" />
                <ellipse
                  cx={clearZone.x * model.width}
                  cy={clearZone.y * model.height}
                  rx={clearZone.rx * model.width}
                  ry={clearZone.ry * model.height}
                  fill={`url(#${holeId})`}
                />
              </mask>
            </>
          )}
        </defs>

        {/* Land: one path of zero-length round-capped segments = one dot each. */}
        <g mask={`url(#${maskHId})`}>
          <g mask={clearZone ? `url(#${maskCId})` : undefined}>
            <path
              d={model.landPath}
              mask={`url(#${maskVId})`}
              strokeLinecap="round"
              fill="none"
              className="stroke-foreground/25 stroke-[0.5] max-sm:stroke-[0.9]"
            />
          </g>
        </g>

        {model.connections.map((c, i) => (
          <motion.path
            key={i}
            d={arcPath(c.start, c.end, c.bulge)}
            fill="none"
            stroke={`url(#${gradientId})`}
            className="stroke-[0.3] max-sm:stroke-[1]"
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={reduceMotion ? undefined : { pathLength: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.3 * i, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* Pins and labels, in the same percentage coordinates as the SVG above. */}
      {model.places.map((p) => (
        <div
          key={`${p.x}:${p.y}`}
          className="absolute"
          style={{ left: `${(p.x / model.width) * 100}%`, top: `${(p.y / model.height) * 100}%` }}
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 block size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: lineColor }}
          />
          {p.label && (
            <span
              className={cn(
                "absolute hidden whitespace-nowrap rounded-full border border-border bg-background px-2.5 py-1 text-[13px] leading-none text-foreground shadow-sm sm:block",
                LABEL_POSITION[p.labelPosition ?? "top"]
              )}
            >
              {p.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
