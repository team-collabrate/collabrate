import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { CoverflowCarousel, type CoverflowSlide } from "@/components/ui/coverflow-carousel";

export function ServicesCarousel({ slides }: { slides: CoverflowSlide[] }) {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Browse our services"
          title="Drag, click, or arrow through what we do."
        />
      </div>

      <Reveal delay={0.1} className="mt-14 w-full overflow-hidden">
        <CoverflowCarousel
          slides={slides}
          showCaption
          showPagination
          showNavigation
          label="Collabrate services"
        />
      </Reveal>
    </section>
  );
}
