import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutPillars } from "@/components/sections/about-pillars";
import { AboutDetails } from "@/components/sections/about-details";
import { ScrollWordHero } from "@/components/sections/scroll-word-hero";
import { CTABanner } from "@/components/sections/cta-banner";
import { aboutContent } from "@/content/about-page";
import { isPending, serviceCategories, site, stripServiceParenthetical } from "@/lib/content";
import { SHOW_UNPUBLISHED } from "@/lib/publish";
import { publishedServicePages, servicePath } from "@/lib/service-pages";

const pageMeta = {
  title: "About Collabrate, a Tamil Nadu Digital Agency",
  description:
    "Collabrate is a digital development and marketing company founded in 2025 and based in Tamil Nadu, working with businesses across India and beyond.",
  path: "/about",
};

export const metadata: Metadata = buildMetadata(pageMeta);

// The extra sections are live only once aboutContent.published is true (or in a preview build).
const showNew = aboutContent.published || SHOW_UNPUBLISHED;

export default function AboutPage() {
  const liveServices = new Map(publishedServicePages().map((p) => [p.serviceName, p.slug]));
  const profiles = [
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "Instagram", href: site.social.instagram },
    { label: "X", href: site.social.x },
  ].filter((p) => !isPending(p.href));

  const categories = serviceCategories.map((category) => ({
    id: category.id,
    heading: category.heading,
    services: category.services.map((service) => {
      const slug = liveServices.get(service.name);
      return slug
        ? { label: stripServiceParenthetical(service.name), href: servicePath(slug) }
        : { label: service.name };
    }),
  }));

  return (
    <main>
      <PageJsonLd type="AboutPage" meta={pageMeta} crumb="About" />

      <AboutHero />

      {/* Each word maps to something we do: UI/UX design and web/app builds, store deployment,
          marketing, and workflow/AI automation (see the service lists on /services). */}
      <ScrollWordHero
        lead="We help you"
        words={["design.", "build.", "launch.", "market.", "automate."]}
        summary="We help you design, build, launch, market, and automate."
        statement="Development, marketing, and AI, from one accountable team."
        ctaLabel="Tell us what you're building"
        ctaHref="/contact"
      />

      <AboutPillars />

      {showNew && (
        <AboutDetails
          published={aboutContent.published}
          whyWeExist={aboutContent.whyWeExist}
          howProjectRuns={aboutContent.howProjectRuns}
          categories={categories}
          toolsLine={aboutContent.toolsLine}
          whereWeOperate={aboutContent.whereWeOperate}
          locationLine={aboutContent.locationLine}
          email={site.email}
          profiles={profiles}
        />
      )}

      <CTABanner heading="Want to work with us?" body="Let's talk about what you're building." ctaLabel="Get a Quote" ctaHref="/contact" />
    </main>
  );
}
