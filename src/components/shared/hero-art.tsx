import { cn } from "@/lib/utils";

/**
 * Generated landscape standing in for a hero photograph: dawn sky and sun haze,
 * hazy far mountains, a long grassy slope built from thousands of tonal blade
 * strokes, and a depth-blurred blossom meadow in the foreground. Everything is
 * procedural SVG (deterministic, no external assets), tinted to the brand
 * violet palette. Decorative only.
 */

// Small deterministic PRNG so server and client render identically.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const W = 1600;
const H = 900;

// Slope ridge (right side): y as a function of x, descending from right to left.
const slopeY = (x: number) => 400 + (1 - x / W) * 360 + Math.sin(x / 90) * 8;

function buildGrass() {
  const r = rng(7);
  const blades: string[] = [];
  const tones = ["#4F8A33", "#6BA544", "#86BD5A", "#3E7428", "#A3CF72", "#5C9A3A"];
  for (let i = 0; i < 2600; i++) {
    const x = r() * W;
    const top = slopeY(x);
    // Denser and taller toward the viewer.
    const t = Math.pow(r(), 0.8);
    const y = top + t * (H - top);
    const near = (y - top) / (H - top);
    const len = 5 + near * 20 + r() * 8;
    const lean = 2 + r() * 4;
    blades.push(
      `<path d="M${x.toFixed(1)} ${y.toFixed(1)} q${(lean * 0.3).toFixed(1)} ${(-len * 0.55).toFixed(1)} ${lean.toFixed(
        1
      )} ${(-len).toFixed(1)}" stroke="${tones[Math.floor(r() * tones.length)]}" stroke-width="${(
        1 +
        near * 1.6 +
        r() * 0.6
      ).toFixed(2)}" stroke-linecap="round" fill="none" opacity="${(0.3 + r() * 0.5).toFixed(2)}"/>`
    );
  }
  return blades.join("");
}

function buildBlossoms() {
  const r = rng(21);
  const palette = ["#FFB347", "#FF8FA3", "#FFFFFF", "#FFD27A", "#F7C5D5", "#FFE9A8"];
  const out: string[] = [];
  for (let i = 0; i < 170; i++) {
    const x = Math.pow(r(), 1.3) * W * 0.8;
    const yMin = slopeY(x) + 60;
    const yMax = H * 0.84;
    if (yMin >= yMax) continue;
    const depth = r(); // 0 far .. 1 near
    const y = yMin + depth * (yMax - yMin);
    const size = 1.2 + depth * depth * 6.5;
    const blur = depth > 0.8 ? 1 : 0;
    const c = palette[Math.floor(r() * palette.length)];
    out.push(
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${size.toFixed(1)}" fill="${c}"${
        blur ? ' filter="url(#b1)"' : ""
      } opacity="${(0.6 + depth * 0.4).toFixed(2)}"/>`
    );
  }
  return out.join("");
}

const GRASS = buildGrass();
const BLOSSOMS = buildBlossoms();

export function HeroArt({ className }: { className?: string }) {
  const slopePath = (() => {
    const pts: string[] = [];
    for (let x = 0; x <= W; x += 20) pts.push(`${x} ${slopeY(x).toFixed(1)}`);
    return `M${pts.join(" L")} L${W} ${H} L0 ${H} Z`;
  })();

  return (
    <div aria-hidden className={cn("grain pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        role="presentation"
      >
        <defs>
          <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7DB9EE" className="dark:[stop-color:#0f2236]" />
            <stop offset="0.5" stopColor="#BFE0F7" className="dark:[stop-color:#1a3550]" />
            <stop offset="0.85" stopColor="#EAF3F4" className="dark:[stop-color:#2c4a63]" />
            <stop offset="1" stopColor="#FBF1DC" className="dark:[stop-color:#3d5a6e]" />
          </linearGradient>
          <radialGradient id="hs-sun" cx="0.28" cy="0.5" r="0.42">
            <stop offset="0" stopColor="#FFF6E2" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#FFE2C6" stopOpacity="0.4" />
            <stop offset="1" stopColor="#FFE2C6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hs-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8FB0D4" />
            <stop offset="1" stopColor="#D3E3EE" />
          </linearGradient>
          <linearGradient id="hs-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7FA39A" />
            <stop offset="1" stopColor="#C2D6C6" />
          </linearGradient>
          <linearGradient id="hs-slope" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#BFD98F" />
            <stop offset="0.4" stopColor="#7FB04F" />
            <stop offset="1" stopColor="#2F6A2A" />
          </linearGradient>
          <linearGradient id="hs-vignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.62" stopColor="#0B1426" stopOpacity="0" />
            <stop offset="1" stopColor="#0B1426" stopOpacity="0.7" />
          </linearGradient>
          <filter id="b1"><feGaussianBlur stdDeviation="1.2" /></filter>
          <filter id="b2"><feGaussianBlur stdDeviation="2.6" /></filter>
          <filter id="b3"><feGaussianBlur stdDeviation="4.6" /></filter>
          <filter id="haze"><feGaussianBlur stdDeviation="14" /></filter>
        </defs>

        <rect width={W} height={H} fill="url(#hs-sky)" />
        <rect width={W} height={H} fill="url(#hs-sun)" />

        {/* Far mountains */}
        <path
          d="M0 420 L120 360 L230 410 L360 330 L520 400 L660 350 L800 420 L940 340 L1100 410 L1240 350 L1400 420 L1600 360 L1600 900 L0 900 Z"
          fill="url(#hs-far)"
          opacity="0.7"
        />
        <path
          d="M0 470 C160 420 320 470 480 440 C640 410 760 470 940 450 C1100 430 1240 400 1400 430 L1600 410 L1600 900 L0 900 Z"
          fill="url(#hs-mid)"
          opacity="0.85"
        />
        <rect y="470" width={W} height="90" fill="#EEF5F2" opacity="0.45" filter="url(#haze)" />

        {/* Grassy slope */}
        <path d={slopePath} fill="url(#hs-slope)" />
        <g dangerouslySetInnerHTML={{ __html: GRASS }} />

        {/* Blossom meadow */}
        <g dangerouslySetInnerHTML={{ __html: BLOSSOMS }} />

        <rect width={W} height={H} fill="url(#hs-vignette)" />
      </svg>
    </div>
  );
}
