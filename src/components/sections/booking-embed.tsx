import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { isPending, site } from "@/lib/content";

// Calendly inline booking, shown on the Contact page. A plain iframe (no Calendly script): the browser
// only fetches it when the section is near the viewport (loading="lazy"). embed_domain/embed_type are
// what Calendly asks for on inline embeds; the colour params match the site (brand violet).
const params = new URLSearchParams({
  embed_domain: "collabrate.digital",
  embed_type: "Inline",
  hide_gdpr_banner: "1",
  primary_color: "8a2be2",
  text_color: "1a1433",
  background_color: "ffffff",
});

export function BookingEmbed() {
  if (isPending(site.calendlyUrl)) return null;

  return (
    <section id="book" aria-labelledby="book-heading" className="relative scroll-mt-28 pb-16 sm:pb-20">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal className="overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-sm sm:p-4">
          <div className="px-4 pb-4 pt-5 sm:px-6">
            <h2 id="book-heading" className="text-xl font-semibold text-foreground sm:text-2xl">
              Pick a time
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Book a 30 minute call directly on our calendar.{" "}
              <a
                href={site.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-6 items-center gap-1 underline underline-offset-2 hover:text-foreground"
              >
                Open in a new tab <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </p>
          </div>
          <iframe
            src={`${site.calendlyUrl}?${params.toString()}`}
            title="Book a call with Collabrate"
            loading="lazy"
            className="block h-[900px] w-full rounded-2xl bg-white sm:h-[700px]"
          />
        </Reveal>
      </div>
    </section>
  );
}
