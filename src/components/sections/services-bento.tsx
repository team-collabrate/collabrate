"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { ServiceVisual } from "@/components/shared/service-visuals";
import { serviceCategories, site } from "@/lib/content";
import { cn } from "@/lib/utils";

// Seven services, one visual each, laid out wide/narrow, narrow/wide, then three narrow.
const CARDS: { name: string; tint: string; wide?: boolean; cover?: string }[] = [
  { name: "Website Development", tint: "bg-tint-sky", wide: true, cover: "/services/website-development-card.png" },
  { name: "Mobile Application Development", tint: "bg-tint-lilac" },
  { name: "SEO", tint: "bg-tint-cream" },
  { name: "Performance Marketing (Paid Ads)", tint: "bg-tint-lime", wide: true },
  { name: "AI Chatbots", tint: "bg-tint-sky" },
  { name: "Workflow Automation", tint: "bg-tint-cream" },
  { name: "AI Voice Assistants", tint: "bg-tint-lilac" },
];

const allServices = serviceCategories.flatMap((c) => c.services);

export function ServicesBento() {
  return (
    <section id="services" className="mx-auto w-full max-w-[1344px] px-4 section-pad">
      <Reveal className="mb-12 grid gap-8 lg:mb-[60px] lg:grid-cols-2 lg:items-start">
        <h2 className="display-2 max-w-[520px] text-balance">Pick what you need. We handle the rest.</h2>
        <div className="flex flex-col items-start gap-6">
          <p className="max-w-[560px] text-lg leading-[1.45] text-muted-foreground">
            Whether it&apos;s development, marketing, or AI automation, our services are organized around what
            you&apos;re actually trying to achieve.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" asChild>
              <Link href={site.primaryCTA.href}>{site.primaryCTA.label}</Link>
            </Button>
            <Button variant="soft" asChild>
              <Link href="/services">
                All services <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Reveal>

      <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
        {CARDS.map((card) => {
          const service = allServices.find((s) => s.name === card.name);
          if (!service) return null;
          const title = service.name.replace(/\s*\([^)]*\)\s*$/, "");
          return (
            <motion.article
              key={card.name}
              variants={staggerItem}
              className={cn(
                "group relative h-[410px] overflow-hidden rounded-[16px] border border-[color-mix(in_srgb,var(--brand-violet)_22%,white)] shadow-[0_1px_2px_rgba(26,20,51,0.04)] dark:border-white/10",
                card.tint,
                card.wide && "md:col-span-2"
              )}
            >
              {card.cover ? (
                // Full-card artwork (it carries its own headline and button), so the live text is screen-reader only.
                <Link href="/services" className="absolute inset-0 z-20" aria-label={`${title}: learn more`}>
                  <Image
                    src={card.cover}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 867px, 100vw"
                    className="object-cover object-left"
                  />
                </Link>
              ) : null}
              {card.cover ? (
                // The full-card artwork covers the built-in visual, so float the tool logos on top of it.
                <div className="pointer-events-none absolute inset-0 z-30">
                  <ServiceVisual name={card.name} wide={card.wide} chipsOnly />
                </div>
              ) : null}
              <div className={cn("relative z-10 flex flex-col items-start gap-2 p-6", card.cover && "sr-only")}>
                <h3 className="card-title">{title}</h3>
                <p className={cn("line-clamp-3 text-base leading-[1.4] text-muted-foreground", card.wide ? "max-w-[380px]" : "max-w-[460px]")}>
                  {service.summary}
                </p>
                <Button variant="soft" size="sm" className="mt-3 h-9 px-4 text-sm" asChild>
                  <Link href="/services">
                    Learn more <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </div>
              <div className="dot-grid pointer-events-none absolute bottom-0 left-0 h-1/2 w-1/2 [mask-image:radial-gradient(ellipse_at_bottom_left,black,transparent_70%)]" aria-hidden />
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 bottom-0 transition-transform duration-500 ease-out group-hover:-translate-y-1.5",
                  card.wide ? "top-0" : "top-[190px]"
                )}
              >
                <ServiceVisual name={card.name} wide={card.wide} />
              </div>
            </motion.article>
          );
        })}
      </StaggerGroup>
    </section>
  );
}
