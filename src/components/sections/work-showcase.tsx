"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal, StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { content, portfolioProjects } from "@/lib/content";

interface PortfolioIntro {
  type: string;
  heading?: string;
  intro?: string;
}

const intro = (content.pages as { portfolio?: { sections: PortfolioIntro[] } }).portfolio?.sections.find(
  (s) => s.type === "portfolioIntro"
);

// Generated covers only: there are no real project screenshots to show yet.
const COVERS = [
  "from-[#8A2BE2] via-[#B154B3] to-[#CF6CAD]",
  "from-[#F7686F] via-[#FF9F43] to-[#FFC9A3]",
  "from-[#B154B3] via-[#CF6CAD] to-[#E29AB4]",
  "from-[#5B1FB0] via-[#8A2BE2] to-[#B154B3]",
  "from-[#CF6CAD] via-[#F7686F] to-[#FF9F43]",
  "from-[#8A2BE2] via-[#F7686F] to-[#FF9F43]",
];

function CoverMock({ variant }: { variant: number }) {
  return (
    <div className="absolute inset-x-[12%] top-[14%] bottom-0 overflow-hidden rounded-t-[14px] border border-b-0 border-white/50 bg-background shadow-[0_18px_40px_-12px_rgba(26,20,51,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <i className="size-2 rounded-full bg-[#F7686F]" />
        <i className="size-2 rounded-full bg-[#FFC94A]" />
        <i className="size-2 rounded-full bg-[#5CD08A]" />
      </div>
      <div className="grid grid-cols-[1.2fr_1fr] gap-4 p-5">
        <div className="flex flex-col gap-2.5 pt-3">
          <i className="block h-3.5 w-4/5 rounded-full bg-foreground/25" />
          <i className="block h-3.5 w-1/2 rounded-full bg-foreground/25" />
          <i className="mt-2 block h-2 w-full rounded-full bg-foreground/10" />
          <i className="block h-2 w-11/12 rounded-full bg-foreground/10" />
          <i className="mt-2 block h-7 w-24 rounded-md bg-brand-violet" />
        </div>
        <div
          className={`h-32 rounded-xl bg-gradient-to-br ${COVERS[(variant + 2) % COVERS.length]}`}
          aria-hidden
        />
        <div className="col-span-2 grid grid-cols-4 gap-2">
          {[0, 1, 2, 3].map((n) => (
            <i key={n} className="block h-12 rounded-lg bg-surface" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkShowcase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-panel to-background section-pad">
      <div className="mx-auto w-full max-w-[1344px] px-4">
        <Reveal className="mx-auto mb-14 flex max-w-[640px] flex-col items-center gap-5 text-center lg:mb-[76px]">
          <h2 className="display-2 text-balance">{intro?.heading ?? "Our Work"}</h2>
          {intro?.intro && <p className="text-lg leading-[1.45] text-muted-foreground">{intro.intro}</p>}
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.06}>
          {portfolioProjects.map((project, i) => (
            <motion.div key={`${project.title}-${i}`} variants={staggerItem}>
              <Link
                href="/portfolio"
                className="group block rounded-[28px] border border-[color-mix(in_srgb,var(--brand-violet)_30%,white)] p-px transition-shadow duration-300 hover:shadow-[0_24px_48px_-20px_rgba(106,29,184,0.35)] dark:border-white/15"
              >
                <article className="flex h-full min-h-[623px] flex-col overflow-hidden rounded-[27px] bg-background">
                  <div
                    className={`grain relative h-[387px] shrink-0 overflow-hidden bg-gradient-to-br ${COVERS[i % COVERS.length]}`}
                  >
                    <span className="absolute left-0 top-0 z-10 rounded-br-2xl border-b border-r border-[color-mix(in_srgb,var(--brand-violet)_35%,white)] bg-background px-4 py-2.5 text-sm font-medium uppercase text-foreground">
                      {project.industry}
                    </span>
                    <div className="transition-transform duration-500 group-hover:-translate-y-2">
                      <CoverMock variant={i} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <h3 className="card-title">{project.title}</h3>
                    <p className="line-clamp-3 text-base leading-[1.45] text-muted-foreground">{project.outcome}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-[color-mix(in_srgb,var(--brand-violet)_25%,white)] pt-4 text-sm font-medium text-foreground dark:border-white/15">
                      View project
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
