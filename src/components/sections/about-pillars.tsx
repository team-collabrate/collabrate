import { Reveal } from "@/components/shared/reveal";
import { WorldMap, type MapPoint, type Region } from "@/components/ui/world-map";
import { cn } from "@/lib/utils";

// Same three pillars as the JSON (pages.about "pillars"). The first two are cards; the third is
// about where we work, so it becomes the regions panel below them.
const pillars = [
  { title: "Founder-led, hands-on", body: "You work directly with the people building your project, not layers of account management." },
  { title: "One team, full capability", body: "Development, design, and marketing under one roof." },
  { title: "Built for where you're growing", body: "Serving businesses across India, Singapore, Malaysia, and the Gulf." },
];

const CARD_TINTS = ["bg-tint-sky", "bg-tint-lilac"];

// Where we are based and the places we connect to, for the imported World Map.
// Stable module-level values so the map's dot layout is computed once.
// The crop is ~2.7:1 so the map fills the panel at its usual height and still holds the UK and Singapore.
const MAP_REGION: Region = { lat: { min: -2, max: 55 }, lng: { min: -30, max: 126 } };
const HOME: MapPoint = { lat: 11.13, lng: 78.66, label: "Tamil Nadu, India", labelPosition: "left" };
// Every place we connect to, each with a line straight from Tamil Nadu.
const PLACES: MapPoint[] = [
  { lat: 51.5, lng: -0.12, label: "UK", labelPosition: "left" },
  { lat: 24.7, lng: 46.7, label: "Saudi Arabia", labelPosition: "left" },
  { lat: 25.3, lng: 51.5, label: "Qatar", labelPosition: "top" },
  { lat: 25.2, lng: 55.3, label: "UAE", labelPosition: "bottom" },
  { lat: 6.93, lng: 79.85, label: "Sri Lanka", labelPosition: "bottom" },
  { lat: 3.14, lng: 101.69, label: "Malaysia", labelPosition: "top" },
  { lat: 1.35, lng: 103.82, label: "Singapore", labelPosition: "right" },
];
// Different curve heights so the three Gulf lines (and the two to Malaysia and Singapore) fan out
// instead of lying on top of each other.
const BULGE: Record<string, number> = { UK: 0.2, "Saudi Arabia": 0.1, Qatar: 0.2, UAE: 0.3, "Sri Lanka": 0.4, Malaysia: 0.2, Singapore: 0.3 };
const CONNECTIONS = PLACES.map((end) => ({ start: HOME, end, bulge: BULGE[end.label ?? ""] ?? 0.2 }));

// Every place, for the small-screen legend (the map's name labels are desktop-only).
const LEGEND = ["Tamil Nadu, India", ...PLACES.map((p) => p.label as string)];

export function AboutPillars() {
  const [first, second, third] = pillars;

  return (
    <section className="mx-auto w-full max-w-[1344px] px-4 py-10 sm:py-14">
      <Reveal className="grid gap-4 md:grid-cols-2 lg:gap-5">
        {[first, second].map((pillar, i) => (
          <article
            key={pillar.title}
            className={cn(
              "relative flex min-h-[240px] flex-col justify-end gap-10 overflow-hidden rounded-[16px] border border-black/[0.08] p-7 dark:border-white/10 lg:min-h-[280px] lg:p-9",
              CARD_TINTS[i]
            )}
          >
            <div
              aria-hidden
              className="dot-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_top,black,transparent)]"
            />
            <div className="relative flex flex-col gap-3">
              <h2 className="display-2 text-balance">{pillar.title}</h2>
              {/* Two lines tall on desktop so both card titles sit on the same line. */}
              <p className="max-w-[44ch] text-lg leading-[1.45] text-muted-foreground md:min-h-[2.9em]">{pillar.body}</p>
            </div>
          </article>
        ))}
      </Reveal>

      <Reveal delay={0.08} className="mt-4 lg:mt-5">
        {/* The map fills the whole card; on desktop the text sits over its empty top-right
            corner (Russia and the north-east). On small screens the text stacks above the map. */}
        <article className="relative overflow-hidden rounded-[24px] border border-black/[0.08] bg-tint-mint dark:border-white/10 lg:flex lg:min-h-[480px] lg:items-center">
          <div className="relative z-10 flex flex-col gap-6 p-7 sm:p-10 lg:absolute lg:right-0 lg:top-0 lg:w-[40%] lg:max-w-[540px] lg:gap-4 lg:p-8">
            <div className="flex flex-col gap-4">
              <h2 className="display-2 text-balance lg:!text-[2.25rem]">{third.title}</h2>
              <p className="max-w-[44ch] text-lg leading-[1.45] text-muted-foreground lg:text-base">{third.body}</p>
            </div>
          </div>

          <div className="relative w-full px-2 pb-4 sm:px-4 lg:p-0">
            <WorldMap
              dots={CONNECTIONS}
              region={MAP_REGION}
              rows={80}
              clearZone={{ x: 0.8, y: 0.17, rx: 0.27, ry: 0.34 }}
              ariaLabel="World map. Collabrate is based in Tamil Nadu, India, and connects to Saudi Arabia, the UAE, Qatar, the UK, Malaysia, Singapore, and Sri Lanka."
            />
          </div>

          {/* The map's name labels are hidden on small screens, so list the places here instead. */}
          <ul className="flex flex-wrap gap-2 px-7 pb-8 sm:hidden">
            {LEGEND.map((name) => (
              <li
                key={name}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground"
              >
                {name}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </section>
  );
}
