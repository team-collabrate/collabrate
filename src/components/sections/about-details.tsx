import Link from "next/link";
import { BadgeCheck, ClipboardList, MessagesSquare, PencilRuler, Rocket } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { HowItWorksTimeline } from "@/components/ui/how-it-works-timeline";
import { cn } from "@/lib/utils";

export interface AboutDetailsProps {
  /** false = draft preview: the banner shows and the live page does not render this block at all. */
  published: boolean;
  whyWeExist: string[];
  howProjectRuns: { title: string; text: string }[];
  categories: { id: string; heading: string; services: { label: string; href?: string }[] }[];
  toolsLine: string;
  whereWeOperate: string[];
  locationLine: string;
  email: string;
  profiles: { label: string; href: string }[];
}

const STEP_ICONS = [MessagesSquare, ClipboardList, BadgeCheck, PencilRuler, Rocket];
const CATEGORY_TINTS = ["bg-tint-violet", "bg-tint-peach", "bg-tint-mint"];

const heading = "text-3xl font-medium leading-tight tracking-tight text-balance sm:text-4xl";
const split = "grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16";
const rowTop = "border-t border-border pt-14";
const linkCls = "text-brand-violet underline-offset-4 hover:underline";

export function AboutDetails(props: AboutDetailsProps) {
  const { published, whyWeExist, howProjectRuns, categories, toolsLine, whereWeOperate, locationLine, email, profiles } = props;

  return (
    <section className="mx-auto w-full max-w-[1344px] px-4 py-14 sm:py-20">
      <div className="space-y-14">
        {!published && (
          <p className="rounded-[10px] border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            Draft preview. The sections below are not published yet; the live page shows the original copy.
          </p>
        )}

        <Reveal>
          <div role="group" aria-labelledby="why" className={split}>
            <h2 id="why" className={cn(heading, "lg:sticky lg:top-32 lg:self-start")}>
              Why does Collabrate exist?
            </h2>
            <div className="max-w-[62ch] space-y-5 text-lg leading-[1.55] text-muted-foreground">
              {whyWeExist.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div role="group" aria-labelledby="runs" className={cn(split, rowTop)}>
            <h2 id="runs" className={cn(heading, "lg:sticky lg:top-32 lg:self-start")}>
              How does a project run?
            </h2>
            <HowItWorksTimeline
              steps={howProjectRuns.map((step, i) => ({
                icon: STEP_ICONS[i % STEP_ICONS.length],
                title: step.title,
                body: step.text,
              }))}
            />
          </div>
        </Reveal>

        <Reveal>
          <div role="group" aria-labelledby="what" className={rowTop}>
            <h2 id="what" className={cn(heading, "max-w-[22ch]")}>
              What do we do, and with which tools?
            </h2>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {categories.map((category, i) => (
                <li
                  key={category.id}
                  className={cn(
                    "rounded-[16px] border border-black/[0.08] p-7 dark:border-white/10",
                    CATEGORY_TINTS[i % CATEGORY_TINTS.length]
                  )}
                >
                  <h3 className="card-title">{category.heading}</h3>
                  <ul className="mt-5 space-y-2 text-[15px] text-muted-foreground">
                    {category.services.map((service) => (
                      <li key={service.label}>
                        {service.href ? (
                          <Link href={service.href} className="underline-offset-4 hover:text-foreground hover:underline">
                            {service.label}
                          </Link>
                        ) : (
                          service.label
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[70ch] text-lg leading-[1.5] text-muted-foreground">{toolsLine}</p>
            <p className="mt-3 text-muted-foreground">
              See{" "}
              <Link href="/services" className={cn(linkCls, "font-medium")}>
                all services
              </Link>
              , the{" "}
              <Link href="/portfolio" className={cn(linkCls, "font-medium")}>
                work we have built
              </Link>
              , and{" "}
              <Link href="/pricing" className={cn(linkCls, "font-medium")}>
                how pricing works
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div role="group" aria-labelledby="where" className={cn(split, rowTop)}>
            <h2 id="where" className={cn(heading, "lg:sticky lg:top-32 lg:self-start")}>
              Where do we operate?
            </h2>
            <div className="max-w-[62ch] space-y-4 text-lg leading-[1.55] text-muted-foreground">
              {whereWeOperate.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div role="group" aria-labelledby="reach" className={cn(split, rowTop)}>
            <h2 id="reach" className={cn(heading, "lg:sticky lg:top-32 lg:self-start")}>
              How can you reach us?
            </h2>
            <address className="not-italic">
              <div className="rounded-[16px] border border-black/[0.08] bg-tint-lilac p-7 sm:p-9 dark:border-white/10">
                <p className="card-title">{locationLine}</p>
                <p className="mt-4 text-lg">
                  <a href={`mailto:${email}`} className={linkCls}>
                    {email}
                  </a>
                </p>
                {profiles.length > 0 && (
                  <p className="mt-2 text-muted-foreground">
                    {profiles.map((profile, i) => (
                      <span key={profile.label}>
                        {i > 0 && " · "}
                        <a href={profile.href} rel="noopener noreferrer" className={linkCls}>
                          {profile.label}
                        </a>
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </address>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
