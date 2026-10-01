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
  const tones = ["#7350BD", "#9470D6", "#B292E6", "#5E3AA6", "#CDB5F0", "#8360CC"];
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
  const palette = ["#FFB870", "#F7A1C8", "#FFFFFF", "#FFD9A0", "#F58FB0", "#EBDDFF"];
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
            <stop offset="0" stopColor="#A996E6" className="dark:[stop-color:#1c1236]" />
            <stop offset="0.5" stopColor="#D9C6F2" className="dark:[stop-color:#33204f]" />
            <stop offset="0.85" stopColor="#F8DCDD" className="dark:[stop-color:#553053]" />
            <stop offset="1" stopColor="#FFE9D2" className="dark:[stop-color:#6b3a52]" />
          </linearGradient>
          <radialGradient id="hs-sun" cx="0.28" cy="0.5" r="0.42">
            <stop offset="0" stopColor="#FFF6E2" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#FFE2C6" stopOpacity="0.4" />
            <stop offset="1" stopColor="#FFE2C6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hs-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#B4A2E4" />
            <stop offset="1" stopColor="#E3D3F1" />
          </linearGradient>
          <linearGradient id="hs-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9C82D8" />
            <stop offset="1" stopColor="#CDB6EA" />
          </linearGradient>
          <linearGradient id="hs-slope" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#CDB8F2" />
            <stop offset="0.4" stopColor="#A17FDE" />
            <stop offset="1" stopColor="#4E2A92" />
          </linearGradient>
          <linearGradient id="hs-vignette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.62" stopColor="#1A1433" stopOpacity="0" />
            <stop offset="1" stopColor="#1A1433" stopOpacity="0.78" />
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
          d="M0 420 L120 360 L230 410 L360 330 L520 400 L660 350 L800 420 L940 340 L1100 410 L1240 350 L1400 420 L1600 360 L1600 620 L0 620 Z"
          fill="url(#hs-far)"
          opacity="0.7"
        />
        <path
          d="M0 470 C160 420 320 470 480 440 C640 410 760 470 940 450 C1100 430 1240 400 1400 430 L1600 410 L1600 640 L0 640 Z"
          fill="url(#hs-mid)"
          opacity="0.85"
        />
        <rect y="470" width={W} height="90" fill="#F2E4F5" opacity="0.4" filter="url(#haze)" />

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
