import { Marquee } from "@/components/shared/marquee";
import { Reveal } from "@/components/shared/reveal";
import { trustedByLogos } from "@/data/site";

export function TrustedBy() {
  return (
    <section className="relative border-y border-border bg-surface/60 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by teams building the future
          </p>
        </Reveal>
        <Marquee>
          {trustedByLogos.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold tracking-tight text-muted-foreground/60 font-[family-name:var(--font-display)] whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
