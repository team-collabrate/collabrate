import Image from "next/image";

/**
 * Shared layout for the 404 and error pages: logo mark, a large faint code behind the
 * heading, display type, and two actions. Plain markup (no animation wrapper), so the text
 * is in the HTML at full opacity. Used by not-found.tsx, error.tsx and global-error.tsx.
 */
export function StatusPage({
  code,
  eyebrow,
  title,
  children,
}: {
  /** Large decorative code behind the heading, for example "404". */
  code: string;
  eyebrow: string;
  title: string;
  /** Body text, actions and links. */
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden px-6 pb-24 pt-40 sm:pt-48">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-display)] text-[clamp(9rem,34vw,26rem)] font-semibold leading-none tracking-tighter text-tint-violet"
      >
        {code}
      </span>

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <Image src="/brand/png/collabrate-mark-color-256w.png" alt="" width={56} height={56} className="size-14" priority />
        <span className="mt-6 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-violet">
          <span className="h-px w-6 bg-brand-violet/50" aria-hidden />
          {eyebrow}
          <span className="h-px w-6 bg-brand-violet/50" aria-hidden />
        </span>
        <h1 className="display-1 mt-4 text-balance">{title}</h1>
        {children}
      </div>
    </section>
  );
}
