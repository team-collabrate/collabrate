import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  /** Use "h1" for the single page-level heading; defaults to "h2" for section headings. */
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-violet",
              align === "center" && "justify-center"
            )}
          >
            <span className="h-px w-6 shrink-0 bg-brand-violet/50" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <Heading
          className={cn(
            "text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance",
            titleClassName
          )}
        >
          {title}
        </Heading>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "text-base sm:text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
