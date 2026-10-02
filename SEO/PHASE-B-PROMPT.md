# Phase B (Phase 2): build pages that can rank

Spec for Claude Code. Source plan: SEO/SEO-PLAYBOOK.md section 5, SEO/SEO-LOCAL-SOUTH-TN.md (sections 0, 3, 4), SEO/LEAD-CAPTURE-PLAN.md (P1, P4). Phase A is finished locally (see SEO/phase-a-report.md). This file tells you exactly what to build on top of it.

## 0. Ground rules

1. Read first: AGENTS.md, CLAUDE.md, AUDIT.md, SEO/phase-a-report.md, SEO/SEO-PLAYBOOK.md sections 2, 5, 9, SEO/SEO-LOCAL-SOUTH-TN.md, this file. Next.js 16 has breaking changes: before writing code read the matching guide in `node_modules/next/dist/docs/` (dynamic routes, `generateStaticParams`, `dynamicParams`, metadata, `opengraph-image`, `manifest`, route handlers).
2. Reuse what Phase A built. Do not rewrite it:
   - `buildMetadata()` in `src/lib/seo.ts` (every page passes its title, description, path through it)
   - `PageJsonLd` in `src/components/seo/page-json-ld.tsx`, `JsonLd` in `src/components/seo/json-ld.tsx`
   - `ORG_ID`, `SERVICE_PROVIDER_ID`, `pageGraph()` in `src/lib/schema.ts` (it only does 2-level breadcrumbs, so extend it with a generic N-level breadcrumb builder)
   - `sitemapSources` in `src/lib/sitemap-sources.ts` (append one function per new section)
   - `content`, `serviceCategories`, `industries`, `portfolioProjects`, `stripServiceParenthetical`, `siteUrl` in `src/lib/content.ts`
   - `FAQ`, `CTABanner`, `SectionHeading`, existing UI primitives
3. Content rules (from `globalConstraints` in `src/content/collabrate-content.json`): no real client names, no invented metrics or revenue, **no numeric pricing**, founder unnamed, no team-size or team-structure claims, no phone number or street address that is not in the JSON, no `PENDING_LINK` values shown. No em dashes in site copy. Tone: corporate, trustworthy, plain language, full sentences, no hype. Do not use "best", "leading", "number one", "guaranteed" or time promises other than the existing "usually respond within one business day".
4. **Nothing goes live unreviewed.** All new copy lives in content files with a `published: false` flag. Pages whose flag is false must: render for me in dev, send `noindex`, stay out of the sitemap, nav, footer and internal links. I flip the flag after reviewing. Any sentence you are unsure is true gets a `TODO(verify)` comment next to it in the content file and is listed in your report.
5. Do not invent facts to fill length. Where the JSON gives only a summary and bullet points, expand with general, accurate, educational explanation (what the service is, how it is typically done, what to prepare), not with claims about Collabrate's results. If a page would be mostly filler, say so and keep it shorter.
6. Performance guard: the homepage LCP is still above target (see report A8). New pages must be server components, static (`generateStaticParams` + `dynamicParams = false`), no video, no heavy animation wrappers around main text (check `Reveal` does not leave text at opacity 0 in the raw HTML), images through `next/image` with width and height. Report Lighthouse mobile for one page of each template.
7. One commit per step, `npm run lint` and `npm run build` (and `npx tsc --noEmit`) before each commit. No push, no deploy, no env var changes. Stop after each step, show files changed, verification output, anything needed from me, and wait for "next". Write a running log to `SEO/phase-b-report.md`.

## 1. Steps

### B0. Shared building blocks (do first)
- `src/lib/schema.ts`: add `breadcrumbList(items)` (N levels), `serviceGraph()` (Service with `provider: {@id: ORG_ID}`, `areaServed`, `serviceType`, `url`), `faqPage(items)` (only used when the same questions and answers are visible on the page), `collectionGraph()`, `creativeWorkGraph()` (anonymised project; no client name), `locationGraph()` (Service + `areaServed` City). Keep the Phase A rules: no `aggregateRating`, review, telephone, streetAddress, founder.
- `src/lib/slug.ts`: `slugify(name)`; must give stable slugs from the JSON names (see table in B1/B2). Add a unit-style script or test that slugs are unique.
- A `Breadcrumbs` UI component (links, `aria-label="Breadcrumb"`), used on every deep page.
- A `RelatedLinks` section component (2 to 4 internal links with descriptive anchor text, never "click here").
- A `PageCTA` component with the primary CTA (Get a Quote, `/contact`) and, only if WhatsApp is configured, a WhatsApp link (see LEAD-CAPTURE-PLAN.md P1). Do not invent a number.
- `src/lib/publish.ts`: `isPublished(entry)`; sitemap, nav, footer and related links all go through it.

### B1. Service pages (17), `/services/[slug]`
Source: `serviceCategories[].services[]` in the JSON. Slugs (stable, do not change later):

| Service name in JSON | Slug |
|---|---|
| Social Media Marketing | social-media-marketing |
| Performance Marketing (Paid Ads) | performance-marketing |
| Email Marketing and Campaigns | email-marketing |
| LinkedIn Outreach (Lead Generation) | linkedin-outreach |
| SEO | seo |
| Digital Marketing Strategy | digital-marketing-strategy |
| Website Development | website-development |
| Mobile Application Development | mobile-app-development |
| Landing Pages | landing-pages |
| Business Websites | business-websites |
| Dashboards and Admin Panels | dashboards-and-admin-panels |
| E-commerce Websites | ecommerce-websites |
| AI Chatbots | ai-chatbots |
| Workflow Automation | workflow-automation |
| AI-Powered Support Systems | ai-support-systems |
| AI Voice Assistants | ai-voice-assistants |
| Custom LLM Integration | custom-llm-integration |

Build:
- `src/content/service-pages.ts`: per slug `{ slug, published, h1, answer (40 to 60 words, directly answers "what is X and who is it for"), whoItsFor[], included[] (start from the JSON `points`), howItWorks[] (4 steps, plain, no timeframes or numbers), toolsWeUse[] (only tools already listed in `service-logos.ts`/JSON), faqs[] (4 to 6, each answer 40 to 80 words, no prices, no promises), relatedServices[] (2), relatedIndustries[] (1 to 2), relatedProjects[] (slugs of `portfolioProjects`) }`.
- `src/app/services/[slug]/page.tsx`: `generateStaticParams` over all slugs, `dynamicParams = false`, `generateMetadata` using `buildMetadata` (title `"<Service> in Tamil Nadu and India | Collabrate"` under 60 characters, description 120 to 155), `notFound()` or `noindex` when not published.
- Page structure, all content in server-rendered HTML: Breadcrumbs, H1, the 40 to 60 word answer, "What is included", "How it works", "Tools we use", "Who it is for", FAQ (answers in the HTML), RelatedLinks (services, industries, projects), PageCTA. Only one H1; H2 for sections, phrased as questions where natural.
- Schema: `serviceGraph` + 3-level breadcrumbs + `faqPage` (only if the FAQ is rendered on the page).
- Update `/services` (hub): keep the explorer, add a plain crawlable list of every published service page with a one-line description (real `<a href>` links, not buttons or JS navigation). Link each explorer card to its page where published.
- Add `servicePagesSitemap` to `sitemapSources` (published only, fixed `lastModified` from the content file's `updated` field).
- Do not create thin pages: if a service has fewer than 3 `included` items or you cannot write a useful FAQ without inventing facts, keep it `published: false` and list it in the report.

### B2. Industry pages (5), `/industries/[slug]` plus `/industries` hub
Source: `industries[]` and `portfolioProjects[]` in the JSON.

| Industry in JSON | Slug |
|---|---|
| Booking & Scheduling Platforms | booking-and-scheduling-platforms |
| Vendor & Distribution Management | vendor-and-distribution-management |
| Workforce & Recruitment Systems | workforce-and-recruitment-systems |
| Business & Corporate Websites | business-and-corporate-websites |
| E-commerce Websites and Online Stores | ecommerce-websites-and-stores |

Each page: the real problem this industry has, what such a platform needs (feature checklist, general and accurate), which of our services apply (links), the matching anonymised projects (links to B3), a short FAQ, PageCTA. Example H1: "Booking and scheduling platform development". Map projects to industries from the JSON `industry` fields (turf booking and gym trainer app to booking, HR dashboard to workforce, enterprise software website to business websites, dairy apps to vendor management); report your mapping.
Schema: `collectionGraph` or `Service` with `serviceType`, breadcrumbs, FAQ. Add `industryPagesSitemap`.

### B3. Case-study pages, `/portfolio/[slug]`
Source: `portfolioProjects[]` (6 entries, anonymised). Slugs from titles: turf-booking-platform, hr-recruitment-dashboard, enterprise-software-website, gym-trainer-app, dairy-vendor-management-app, and for the second dairy entry decide after reading both: if the content differs, give it its own distinct slug and title (not a number suffix); if it is the same app in a different setting, merge into one page and say so in the report.
Template: Problem, What we built, How it works (general), Outcome (**only the JSON `outcome` text; no numbers**), Services used (links), Industry (link), PageCTA. No client name, no logos, no fake screenshots. Use a clean typographic header or a simple diagram, not gradient placeholders that imply missing images. Leave a clearly marked slot (`screenshots?: {src, alt, width, height}[]`) in the content type so real images can be added later without a code change. Schema: `creativeWorkGraph` (anonymised) + breadcrumbs. Link each project card on `/portfolio` to its page. Add `caseStudySitemap`.

### B4. Pricing page: answer the real questions, no numbers
Keep quote-only. Add sections (server-rendered): "What affects the cost" (scope, features, integrations, design depth, content, timeline, ongoing support: each with one explanatory sentence), "What is included in a quote", "How a project is scoped" (3 to 4 steps, no durations), "Which engagement fits" (project, ongoing, custom), a 6-question FAQ with FAQ schema. No ranges, no "from", no "affordable", no "cheap". Link to `/services` and `/contact`.

### B5. About page
Keep founder and team unnamed. Add: why Collabrate exists (JSON only), how a project runs, services and tools, where we operate (remote-first, Tamil Nadu), regions served, links to LinkedIn and Instagram if real, contact email. Include a visible location line "Collabrate, Tamil Nadu, India" matching the schema.

### B6. Navigation and internal links
- Header: keep the 5 items from the JSON. Make the Services item open a menu with the three categories and the published service pages. Add Industries to the footer and the services menu. No new top-level items unless I approve.
- Footer: `solutions` labels become real links to the industry pages (published only). Add an "All services" block that links to every published service page. Add "Areas we serve" only when B7 has published locations.
- Every service page links to 2 services, 1 to 2 industries, 1 to 2 projects. Every industry page links to its services and projects. Every project links back to its services and industry. All via `<Link>` with descriptive anchor text.
- Write `scripts/check-links.mjs`: crawl the production build output (or run against `next start`) and fail on broken internal links, orphan pages (published pages with no inbound link), and links to unpublished pages.

### B7. South Tamil Nadu location pages (scaffold only; content needs my input)
Read SEO/SEO-LOCAL-SOUTH-TN.md sections 0, 3, 4 first. Build the machinery, but **do not create any town or district page that is not confirmed by me.**
- **Anti-spam rules for every location page (from the competitor scan in SEO/SEO-LOCAL-SOUTH-TN.md section 13):** never stack town + service keywords in the title or in hidden or visible keyword blocks; one short title (under 60 characters) with one service and one town; no footer or sidebar dump of 50+ city or country links (link only to the district, 2 to 3 neighbour towns and the services that fit); no "[city]" style find-and-replace copy, no sentence that would still be true if the town name were swapped for another; no "best", "top 10" or "leading" claims; no fake client counts; every town page needs a meta description, one H1, FAQ with schema matching the visible FAQ, and genuinely local content from my CSV. If a page cannot meet this, leave it unpublished.
- Create `SEO/locations-input.csv` (template is already in the repo). Only rows with `confirmed=yes` count.
- `src/content/locations.ts` loads confirmed rows into districts and towns. Fields: slug, name, tamilName, aliases, district, neighbours, industriesCommon, bestServices, localNotes, faqs, `published`.
- Routes: `/locations` (hub, grouped by district), `/locations/[slug]` (one template for districts, one for towns). `generateStaticParams` over confirmed and published entries only. With zero entries the hub must not exist in the sitemap and must return `noindex` (never an empty page that is indexable).
- Town page: unique body copy per town, never a find-and-replace. For each town draft copy only from my CSV notes (`service_delivered`, `industry_type`, `notes`) and the playbook hooks marked as hypotheses; list every local claim as `TODO(verify)`. Include title pattern `"Website Development in <Town> | Collabrate"`, H1, local FAQ (5), services (links), industry (link), one anonymised example only if my CSV says one exists, a short Tamil block using `tamilName` only if I supply the Tamil text, PageCTA, links to the district and 2 to 3 neighbour towns.
- Schema: `locationGraph` (Service + `areaServed` City) + breadcrumbs (Home > Locations > District > Town). Do not add a street address or geo. Extend the Organization `areaServed` only with published towns.
- Add `locationSitemap`. Add "Areas we serve" to the footer grouped by district, published towns only.
- Stop and ask me if the CSV has fewer than 4 confirmed towns or if two towns would get near-identical copy.

### B8. Supporting files
- `src/app/llms.txt/route.ts` generating `/llms.txt` from the content files (company summary, services, industries, projects, locations; published only) so it never drifts. Plain text, short.
- `src/app/manifest.ts` (name, short_name, icons from `/brand/icons`, theme and background colours from `globals.css`).
- `opengraph-image.tsx` for `/services/[slug]`, `/industries/[slug]`, `/portfolio/[slug]`, `/locations/[slug]` using `ImageResponse`: text-only, brand colours and logo, readable at 1200x630, the page title as the headline. Register the matching `images` in `buildMetadata` or rely on the file convention, but do not end up with two competing og:image tags. Test one URL per template.

### B9. Verification (run all, paste results into the report)
1. `npm run lint`, `npx tsc --noEmit`, `npm run build` clean; build output shows every new route as static.
2. For each template, fetch the production-build HTML of one page: one `<h1>`, unique `<title>` under 60 characters, description 120 to 155, canonical equals its own URL, `og:url` equals its own URL, exactly one `og:image`, valid JSON-LD (parse it; no forbidden fields), breadcrumb matches the visible trail, FAQ schema matches visible FAQ text.
3. Sitemap: lists only published pages, no duplicates, no noindex pages.
4. `scripts/check-links.mjs`: zero broken links, zero orphans.
5. Text uniqueness script: compute 5-word shingle overlap between every pair of published pages of the same template; flag any pair above 50 percent.
6. Forbidden-content scan across `src` content files: em dashes, digits next to currency symbols or "INR", "Rs", "$", client-style names, "best", "leading", "guarantee", "PENDING_LINK" rendered.
7. Lighthouse mobile (local production build) for one page per template: report performance, SEO, accessibility, LCP, TBT.
8. A table of every `TODO(verify)` and every page still `published: false`, with what I must supply.

## 2. What I (the owner) must provide or decide

| Item | Needed for | Default if I do not answer |
|---|---|---|
| Review and set `published: true` per page | everything | stays unpublished |
| Real screenshots (and alt text) per project, one verifiable outcome each | B3 | text-only case studies |
| Confirmed towns in `SEO/locations-input.csv` | B7 | no location pages |
| WhatsApp number to publish (D6) | PageCTA | no WhatsApp button |
| Tamil text for town pages (D11) | B7 | English only |
| LinkedIn and booking URLs (A11) | schema `sameAs`, CTAs | hidden |
| Whether to name an author or founder (D2) | later blog | stay unnamed |

## 3. Order and stops
B0 -> B1 (marketing 6 first, then web 6, then AI 5; stop after the first 3 for my copy review) -> B2 -> B3 -> B4 -> B5 -> B6 -> B8 -> B7 (when the CSV is filled) -> B9. Finish with `SEO/phase-b-report.md`.
