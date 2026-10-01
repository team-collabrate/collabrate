import { publishedCaseStudies, caseStudyPath } from "@/lib/case-studies";
import { districtPath, publishedDistrictPages, publishedTownPages, townPath } from "@/lib/locations";
import { industryPath, jsonIndustryFor, publishedIndustryPages } from "@/lib/industry-pages";
import { publishedServicePages, serviceDisplayName, servicePath } from "@/lib/service-pages";
import { serviceCategories, site, siteUrl } from "@/lib/content";

/**
 * /llms.txt: a short plain-text map of the site for AI crawlers and assistants. Generated
 * from the same content files as the pages, and only from published entries, so it can
 * never list a draft or drift from the site. No search engine has confirmed a ranking
 * benefit from this file; it is a low-cost convention.
 */

// Prerendered at build time; the content never depends on the request.
export const dynamic = "force-static";

const url = (path: string) => `${siteUrl}${path}`;
const line = (label: string, path: string, note?: string) => `- [${label}](${url(path)})${note ? `: ${note}` : ""}`;

export function GET() {
  const regions = `${site.serviceRegions.slice(0, -1).join(", ")} and the ${site.serviceRegions.at(-1)}`;
  const services = publishedServicePages();
  const industries = publishedIndustryPages();
  const studies = publishedCaseStudies();

  const sections: string[] = [
    `# ${site.name}`,
    `> ${site.name} is a digital development, marketing and AI agency founded in ${site.founded}. It is remote-first and based in Tamil Nadu, India, and works with businesses across ${regions}.`,
    `${site.name} builds websites and mobile apps, runs digital marketing (SEO, paid ads, social media, email, LinkedIn outreach) and builds AI solutions (chatbots, workflow automation, support systems, voice assistants, LLM integration). Pricing is quote-only: there are no fixed packages and no published prices.`,
    [
      "## Main pages",
      line("Services", "/services", "everything we offer, by category"),
      line("Our work", "/portfolio", "anonymised projects across booking, HR, enterprise software, fitness and vendor management"),
      line("Pricing", "/pricing", "how quotes work"),
      line("About", "/about"),
      line("Contact", "/contact", `or email ${site.email}`),
    ].join("\n"),
  ];

  // Service pages when published; otherwise nothing beyond the hub above.
  if (services.length > 0) {
    const byCategory = serviceCategories
      .map((category) => {
        const items = category.services
          .map((s) => services.find((p) => p.serviceName === s.name))
          .filter((p) => p !== undefined);
        return items.length === 0
          ? null
          : [`### ${category.heading}`, ...items.map((p) => line(serviceDisplayName(p!), servicePath(p!.slug), p!.description))].join("\n");
      })
      .filter(Boolean);
    sections.push(["## Services", ...byCategory].join("\n\n"));
  }

  if (industries.length > 0) {
    sections.push(
      ["## Industries", ...industries.map((p) => line(jsonIndustryFor(p).name, industryPath(p.slug), p.description))].join("\n")
    );
  }

  if (studies.length > 0) {
    sections.push(["## Case studies", ...studies.map((s) => line(s.title, caseStudyPath(s.slug), s.description))].join("\n"));
  }

  const districts = publishedDistrictPages();
  const towns = publishedTownPages();
  if (districts.length + towns.length > 0) {
    sections.push(
      [
        "## Areas we serve",
        ...districts.map((d) => line(`${d.name} district`, districtPath(d.slug), d.copy.description)),
        ...towns.map((t) => line(t.name, townPath(t.slug), t.copy.description)),
      ].join("\n")
    );
  }

  return new Response(sections.join("\n\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
