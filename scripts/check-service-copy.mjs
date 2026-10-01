// Copy lint for src/content/service-pages.ts. Run: node --no-warnings scripts/check-service-copy.mjs
import { servicePages } from "../src/content/service-pages.ts";
import { slugFor } from "../src/lib/slug.ts";
import { readFileSync } from "node:fs";
import { caseStudies } from "../src/content/case-studies.ts";
import { pricingContent } from "../src/content/pricing-page.ts";
import { industryPages } from "../src/content/industry-pages.ts";

const words = (s) => s.trim().split(/\s+/).length;
const FORBIDDEN = [/—/, /–/, /\bbest\b/i, /\bleading\b/i, /number one/i, /guarantee/i, /\bcheap\b/i, /\baffordable\b/i, /PENDING_LINK/, /[₹$€£]\s?\d/, /\d\s?(INR|Rs)\b/i, /\bRs\.?\s?\d/];
const INDUSTRIES = new Set(["booking-and-scheduling-platforms","vendor-and-distribution-management","workforce-and-recruitment-systems","business-and-corporate-websites","ecommerce-websites-and-stores"]);
const PROJECTS = new Set(["turf-booking-platform","hr-recruitment-dashboard","enterprise-software-website","gym-trainer-app","dairy-vendor-management-app"]);
let bad = 0;
const fail = (slug, msg) => { console.error(`FAIL ${slug}: ${msg}`); bad++; };

const ALL_SERVICE_SLUGS = new Set(servicePages.map((p) => p.slug));
const seen = new Set();
for (const p of servicePages) {
  if (seen.has(p.slug)) fail(p.slug, "duplicate slug");
  seen.add(p.slug);
  if (slugFor(p.serviceName) !== p.slug) fail(p.slug, `slug does not match "${p.serviceName}"`);
  const title = p.metaTitle ?? `${p.serviceName.replace(/\s*\([^)]*\)\s*$/, "")} in Tamil Nadu and India | Collabrate`;
  if (title.length > 60) fail(p.slug, `title ${title.length} chars: ${title}`);
  if (p.description.length < 120 || p.description.length > 155) fail(p.slug, `description ${p.description.length} chars`);
  const a = words(p.answer);
  if (a < 40 || a > 60) fail(p.slug, `answer ${a} words`);
  if (p.included.length < 3) fail(p.slug, "fewer than 3 included items");
  if (p.howItWorks.length !== 4) fail(p.slug, "howItWorks is not 4 steps");
  if (p.faqs.length < 4 || p.faqs.length > 6) fail(p.slug, `${p.faqs.length} faqs`);
  for (const f of p.faqs) {
    const n = words(f.answer);
    if (n < 40 || n > 80) fail(p.slug, `faq "${f.question}" answer ${n} words`);
  }
  if (p.relatedServices.length !== 2) fail(p.slug, "relatedServices must be 2");
  if (p.relatedIndustries.length < 1 || p.relatedIndustries.length > 2) fail(p.slug, "relatedIndustries must be 1 to 2");
  for (const r of p.relatedServices) if (!servicePages.some((x) => x.slug === r) && !ALL_SERVICE_SLUGS.has(r)) fail(p.slug, `unknown related service ${r}`);
  for (const r of p.relatedIndustries) if (!INDUSTRIES.has(r)) fail(p.slug, `unknown industry ${r}`);
  for (const r of p.relatedProjects) if (!PROJECTS.has(r)) fail(p.slug, `unknown project ${r}`);
  const text = JSON.stringify(p);
  for (const re of FORBIDDEN) if (re.test(text)) fail(p.slug, `forbidden pattern ${re}`);
  if (/\d/.test(p.howItWorks.map((s) => s.title + s.text).join(" "))) fail(p.slug, "digits in howItWorks (no timeframes or numbers)");
  console.log(`${p.slug}: answer ${a}w, title ${title.length}c, desc ${p.description.length}c, ${p.faqs.length} faqs, published=${p.published}`);
}

console.log(`${servicePages.length} of 17 service pages written`);

// ---- Industry pages ----
const SERVICE_SLUGS = new Set(servicePages.map((p) => p.slug));
for (const p of industryPages) {
  const slug = `industry:${p.slug}`;
  if (slugFor(p.industryName) !== p.slug) fail(slug, `slug does not match "${p.industryName}"`);
  if (p.title.length > 60) fail(slug, `title ${p.title.length} chars`);
  if (p.description.length < 120 || p.description.length > 155) fail(slug, `description ${p.description.length} chars`);
  const a = words(p.answer);
  if (a < 40 || a > 60) fail(slug, `answer ${a} words`);
  if (p.faqs.length < 4 || p.faqs.length > 6) fail(slug, `${p.faqs.length} faqs`);
  for (const f of p.faqs) {
    const n = words(f.answer);
    if (n < 40 || n > 80) fail(slug, `faq "${f.question}" answer ${n} words`);
  }
  for (const s of p.services) if (!SERVICE_SLUGS.has(s.slug)) fail(slug, `unknown service ${s.slug}`);
  for (const r of p.projects) if (!PROJECTS.has(r)) fail(slug, `unknown project ${r}`);
  const text = JSON.stringify(p);
  for (const re of FORBIDDEN) if (re.test(text)) fail(slug, `forbidden pattern ${re}`);
  console.log(`${slug}: answer ${a}w, title ${p.title.length}c, desc ${p.description.length}c, ${p.faqs.length} faqs, ${p.services.length} services, ${p.projects.length} projects, published=${p.published}`);
}
// Every service page's relatedIndustries must be a real industry page.
for (const sp of servicePages) for (const r of sp.relatedIndustries) if (!industryPages.some((i) => i.slug === r)) fail(sp.slug, `relatedIndustries ${r} has no industry page`);

// ---- Case studies ----
const json = JSON.parse(readFileSync(new URL("../src/content/collabrate-content.json", import.meta.url), "utf8"));
const covered = new Set();
for (const c of caseStudies) {
  const slug = `case:${c.slug}`;
  if (c.metaTitle.length > 60) fail(slug, `title ${c.metaTitle.length} chars`);
  if (c.description.length < 120 || c.description.length > 155) fail(slug, `description ${c.description.length} chars`);
  if (!industryPages.some((i) => i.slug === c.industrySlug)) fail(slug, `unknown industry ${c.industrySlug}`);
  for (const s of c.services) if (!SERVICE_SLUGS.has(s)) fail(slug, `unknown service ${s}`);
  c.sourceTitles.forEach((title, i) => {
    covered.add(title);
    const src = json.portfolioProjects.find((p) => p.title === title);
    if (!src) return fail(slug, `no JSON project titled "${title}"`);
    const part = c.parts[i];
    if (!part) return fail(slug, `no part for "${title}"`);
    if (part.problem !== src.problem) fail(slug, `problem text differs from JSON for "${title}"`);
    if (part.built !== src.solution) fail(slug, `built text differs from JSON solution for "${title}"`);
    if (part.outcome !== src.outcome) fail(slug, `outcome text differs from JSON for "${title}"`);
    if (c.industryLabel !== src.industry) fail(slug, `industryLabel differs from JSON for "${title}"`);
  });
  if (c.parts.length !== c.sourceTitles.length) fail(slug, "parts and sourceTitles differ in length");
  const text = JSON.stringify({ ...c, parts: undefined });
  for (const re of FORBIDDEN) if (re.test(text)) fail(slug, `forbidden pattern ${re}`);
  if (/\d/.test(c.howItWorks.join(" ") + c.highlights.join(" "))) fail(slug, "digits in howItWorks or highlights (no metrics)");
  console.log(`${slug}: title ${c.metaTitle.length}c, desc ${c.description.length}c, ${c.parts.length} part(s), published=${c.published}`);
}
for (const p of json.portfolioProjects) if (!covered.has(p.title)) fail("case", `JSON project "${p.title}" has no case study`);
for (const i of industryPages) for (const r of i.projects) if (!caseStudies.some((c) => c.slug === r)) fail(`industry:${i.slug}`, `project ${r} has no case study`);
for (const sp of servicePages) for (const r of sp.relatedProjects) if (!caseStudies.some((c) => c.slug === r)) fail(sp.slug, `relatedProjects ${r} has no case study`);

// ---- Pricing page: quote-only, no numbers at all ----
{
  const text = JSON.stringify({ ...pricingContent, published: undefined, updated: undefined });
  for (const re of [...FORBIDDEN, /\d/, /from/i, /starting at/i, /per (month|hour|page)/i, /discount/i, /free/i]) {
    if (re.test(text)) fail("pricing", `forbidden pattern ${re}`);
  }
  if (pricingContent.faqs.length !== 6) fail("pricing", `${pricingContent.faqs.length} faqs, expected 6`);
  for (const f of pricingContent.faqs) {
    const n = words(f.answer);
    if (n < 40 || n > 80) fail("pricing", `faq "${f.question}" answer ${n} words`);
  }
  if (pricingContent.scopingSteps.length < 3 || pricingContent.scopingSteps.length > 4) fail("pricing", "scoping steps must be 3 to 4");
  console.log(`pricing: ${pricingContent.costFactors.length} cost factors, ${pricingContent.faqs.length} faqs, published=${pricingContent.published}`);
}
process.exit(bad ? 1 : 0);
