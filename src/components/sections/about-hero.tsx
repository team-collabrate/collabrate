import { Eyebrow } from "@/components/shared/eyebrow";
import { Reveal } from "@/components/shared/reveal";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";

interface AboutIntro {
  type: string;
  headline?: string;
  body?: string;
}

const intro = (content.pages as { about?: { sections: AboutIntro[] } }).about?.sections.find(
  (s) => s.type === "aboutIntro"
);

// The same four facts the page always showed, split into label + value. Nothing new is claimed.
const facts = [
  { label: "Founded", value: "2025", tint: "bg-tint-sky", wide: false },
  { label: "Working style", value: "Remote-first", tint: "bg-tint-lilac", wide: false },
  { label: "Based in", value: "Tamil Nadu, India", tint: "bg-tint-mint", wide: true },
  { label: "Serving clients across", value: "India, Singapore, Malaysia, and the Gulf countries", tint: "bg-tint-peach", wide: true },
];

export function AboutHero() {
  return (
    <section className="px-4 pb-14 pt-36 sm:pb-20 sm:pt-44">
      <div className="mx-auto grid max-w-[1344px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
        <Reveal className="flex flex-col items-start gap-6">
          <Eyebrow>About Collabrate</Eyebrow>
          <h1 className="display-1 text-balance">{intro?.headline ?? "One team, every part of your digital growth."}</h1>
          {intro?.body && <p className="max-w-[580px] text-lg leading-[1.5] text-muted-foreground">{intro.body}</p>}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="grid grid-cols-2 gap-3 lg:gap-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className={cn(
                  "relative flex min-h-[128px] flex-col justify-between gap-6 overflow-hidden rounded-[16px] border border-black/[0.08] p-5 dark:border-white/10",
                  fact.tint,
                  fact.wide && "col-span-2"
                )}
              >
                <div
                  aria-hidden
                  className="dot-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_top,black,transparent)]"
                />
                <dt className="relative text-sm text-muted-foreground">{fact.label}</dt>
                <dd className="card-title relative">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
