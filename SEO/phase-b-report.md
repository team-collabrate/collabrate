# Phase B report (running log)

Spec: SEO/PHASE-B-PROMPT.md. One section per step. Nothing is pushed or deployed.

## B0. Shared building blocks (done)

Added:
- `src/lib/slug.ts`: `slugify()`, pinned `SLUG_OVERRIDES`, `slugFor()`. Dependency-free so the check script can import it.
- `scripts/check-slugs.mjs` (`node --no-warnings scripts/check-slugs.mjs`): asserts all 17 service slugs and 5 industry slugs equal the table in the spec, and that service, industry and project slugs are unique.
- `src/lib/publish.ts`: `isPublished()`, `published()`.
- `src/lib/schema.ts`: `breadcrumbList()` (N levels), `faqPage()`, `serviceGraph()`, `collectionGraph()`, `creativeWorkGraph()`, `locationGraph()`. `pageGraph()` now uses the generic breadcrumb and produces the same output as before. No rating, review, telephone, address, geo or founder fields anywhere.
- `src/components/shared/breadcrumbs.tsx`, `related-links.tsx`, `page-cta.tsx` (all server components, no animation wrappers).

Decisions and notes:
- The slug rule `slugify()` alone does not reproduce the spec table (for example "E-commerce Websites" would become `e-commerce-websites`), so those names are pinned in `SLUG_OVERRIDES`. The check script caught this.
- The second dairy project ("Dairy Vendor Management App (2)") has a placeholder slug `dairy-vendor-management-app-2` only so slugs stay unique. B3 reads both entries and sets the real slug or merges them. Do not publish that URL.
- WhatsApp: `PageCTA` shows a WhatsApp button only if `NEXT_PUBLIC_WHATSAPP_NUMBER` is set at build time. It is not set, so no WhatsApp button exists. No `click_whatsapp` analytics event yet; add it when the number is decided (D6).
- No new routes yet, so the build output is unchanged.

Verification: `npx tsc --noEmit` clean, `npm run lint` 0 errors (1 existing warning in `ui/social-media.tsx`), `npm run build` clean, `check-slugs` passes.

## B1. Service pages: first 3 of 17 (marketing), awaiting copy review

Built the full template and the first three pages. The other 14 are not written yet; I stopped for your copy review as the spec says.

Files: `src/content/service-pages.ts` (copy, all `published: false`), `src/lib/service-pages.ts` (helpers), `src/app/services/[slug]/page.tsx` (template), `src/lib/publish.ts` (`buildable`, `SHOW_UNPUBLISHED`), `src/lib/sitemap-sources.ts` (`servicePagesSitemap`, published only, `lastModified` from `updated`), `/services` hub (crawlable "All services" list of published pages, plus a "Read more" link in each explorer card when published), `scripts/check-service-copy.mjs`.

How the publish gate works:
- Unpublished pages exist only in `next dev`, or in a production build made with `SHOW_UNPUBLISHED=1`. A normal production build has no draft pages (they 404). Drafts that are rendered send `noindex`, show a "Draft preview" banner, and are in no sitemap, hub list, explorer link or related link.
- To publish: set `published: true` on the entry in `src/content/service-pages.ts`.
- To review now: `npm run dev`, then open `/services/social-media-marketing`, `/services/performance-marketing`, `/services/email-marketing`.

Pages: social-media-marketing, performance-marketing, email-marketing. Email uses `metaTitle` "Email Marketing in Tamil Nadu and India | Collabrate" because the full JSON name would push the title past 60 characters.

Verification (production build with SHOW_UNPUBLISHED=1, fetched from `next start`):
- Each page: 1 H1, title 52 to 59 chars, description 133 to 141 chars, canonical and og:url equal to the page's own URL, exactly 1 og:image, robots `noindex, nofollow`.
- JSON-LD parses: WebPage, BreadcrumbList (Home > Services > name, matching the visible trail), Service (provider = Organization @id), FAQPage. FAQ schema text equals the visible FAQ text. No forbidden fields.
- No `opacity:0` in the raw HTML (template uses no animation wrappers).
- Sitemap contains 0 service URLs and the hub lists no drafts. Unknown slug returns 404.
- `check-service-copy.mjs`: answers 50 to 53 words, FAQ answers 40 to 80 words, no em dashes, no forbidden words, no digits in the steps.
- Normal production build: `/services/[slug]` is SSG with zero pages; lint, tsc, build clean.

TODO(verify) items in these three pages (all marked in the content file):
1. Social: clients approve posts before they go out (not stated, so the copy does not claim it); the hand-off for messages that need the client; regular review of platform analytics.
2. Performance: conversion tracking set up as part of the service; ad spend paid by the client directly to the platform.
3. Email: ongoing review and refinement; client review of copy before sending.
4. Related industries and projects (my mapping, not in the JSON). They are not rendered yet; B2 and B3 resolve them.

Needed from you: read the three pages, correct anything untrue, then reply "next" (I write the web 6) or tell me what to change. Say which pages you want flipped to `published: true`.

## B1 (continued). Remaining 14 service pages written, all still drafts

All 17 service pages now exist in `src/content/service-pages.ts` with `published: false`. Order written: marketing (linkedin-outreach, seo, digital-marketing-strategy), web (website-development, mobile-app-development, landing-pages, business-websites, dashboards-and-admin-panels, ecommerce-websites), AI (ai-chatbots, workflow-automation, ai-support-systems, ai-voice-assistants, custom-llm-integration).

Changes in this step:
- Spelling normalised to the JSON's American style (optimize, inquiry, behavior) across all 17 pages, including the first three you reviewed (word swap only, no meaning change).
- `scripts/check-service-copy.mjs` now also checks that related services, industries and projects point at real slugs.
- Extra `metaTitle` overrides where the default title would exceed 60 characters: digital-marketing-strategy, mobile-app-development, dashboards-and-admin-panels, ai-support-systems.

Verification: all 17 pages, production build with SHOW_UNPUBLISHED=1: 1 H1, title at most 60, description 120 to 155, own canonical, exactly 1 og:image, no opacity:0, FAQ schema text equals visible text, copy lint clean. A normal build still produces zero service pages (all unpublished). lint, tsc, build clean.

Thin-page check: every page has at least 3 included items and 4 or more FAQs. None needed to stay hidden for being thin, but the thinnest are digital-marketing-strategy, landing-pages, mobile-app-development and AI voice assistants (3 included items each, general FAQs). They are shorter than the rest; I did not pad them.

TODO(verify) items, by page (all marked in the content file):
- linkedin-outreach: who sends the messages and how; client review of messages; follow-up and hand-off process.
- seo: ongoing review as part of the service.
- digital-marketing-strategy: reporting format and cadence.
- website-development: launch-stage tasks; "same people" wording in the design FAQ (team-structure implication, reword if unsure).
- mobile-app-development: store account ownership; confirm the gym and dairy projects were mobile apps.
- business-websites, ecommerce-websites: handover and training; post-launch refinement; the turf project as an e-commerce example (it has food ordering listings; drop if unfair).
- dashboards-and-admin-panels: feedback and refinement stage.
- ai-chatbots: human hand-over capability; post-launch improvement.
- workflow-automation: monitoring and error notification approach.
- ai-support-systems: integration with Zendesk, Intercom and Freshdesk (their logos are listed, integration is not stated in the JSON).
- ai-voice-assistants: phone and calendar integration scope; data retention and access.
- custom-llm-integration: evaluation method; data-handling statements (kept deliberately mild).
- All pages: related industry and project mapping is my judgement (not rendered until B2 and B3).

## B2. Industry pages (5) and /industries hub (done, all drafts)

Files: `src/content/industry-pages.ts` (copy, all `published: false`), `src/lib/industry-pages.ts`, `src/app/industries/[slug]/page.tsx`, `src/app/industries/page.tsx` (hub), `industryPagesSitemap` in `src/lib/sitemap-sources.ts`, and `scripts/check-service-copy.mjs` (now also lints industry pages and cross-checks service related industries).

Pages: booking-and-scheduling-platforms, vendor-and-distribution-management, workforce-and-recruitment-systems, business-and-corporate-websites, ecommerce-websites-and-stores. Each has: H1, a 40 to 60 word answer, the JSON description, "What problem does this solve?", a general feature checklist, "Which services apply?" (one sentence each on why), a 4-question FAQ, PageCTA. Schema: Service + 3-level breadcrumbs + FAQPage.

Project to industry mapping (from the JSON `industry` field; for your review):
| Industry | Projects |
|---|---|
| Booking and scheduling | Turf Booking Platform (Sports & Recreation), Gym Trainer App (Fitness & Wellness) |
| Vendor and distribution | Dairy Vendor Management App (Food & Dairy); the second dairy entry joins once B3 decides to merge or split it |
| Workforce and recruitment | HR & Recruitment Dashboard |
| Business and corporate | Enterprise Software Business Website |
| E-commerce | none: the JSON has no e-commerce project, so the page has no proof section |

Project links are not rendered yet; B3 creates those pages.

Publish gate (same as services):
- A normal build has no industry pages and `/industries` returns 404 (nothing published). Verified: `/industries` 404, industry URL 404, 0 industry URLs in the sitemap.
- Preview build (`SHOW_UNPUBLISHED=1`): all 5 pages pass the template checks (1 H1, title at most 60, description 120 to 155, own canonical, 1 og:image, FAQ schema equals visible text, noindex, no opacity:0). The hub is noindex and labels each draft "(draft, not linked)".
- Publish test (temporary, reverted): with one industry and one service published, the sitemap listed the hub, that industry and that service; the hub became indexable and linked only the published industry; the industry page linked only the published service (not drafts); the service page linked only the published industry; `/services` listed the published service. Nothing is published now.
- The hub only appears in the sitemap and becomes indexable once at least one industry page is published.

Cross-links added: service pages now show "Industries we build for" (published industries only). Industry pages link their services (published only; in preview builds drafts show as plain text "(draft, not linked)" so you can see the intent).

TODO(verify) / for you:
1. workforce page: the services list suggests custom-llm-integration ("AI can help with tasks such as summarizing applications"). AI in hiring has fairness and legal angles; keep, reword or drop.
2. vendor page: migration approach in the last FAQ ("design around how your team already works", moving off spreadsheets).
3. business page: CMS handover wording.
4. e-commerce page has no project proof; add one when you have a real example.
5. The general feature checklists and "problem" paragraphs are educational and mine, not from the JSON; skim them for accuracy about your market.

## B3. Case-study pages, /portfolio/[slug] (done, all drafts)

Files: `src/content/case-studies.ts`, `src/lib/case-studies.ts`, `src/app/portfolio/[slug]/page.tsx`, `caseStudySitemap`, `/portfolio` grid (adds a "Read the case study" link per card when published), industry pages (new "Examples of our work" section), service pages (new "Related work" section, published only), `scripts/check-slugs.mjs` and `scripts/check-service-copy.mjs` (case-study checks).

Pages (5 for the 6 JSON projects): turf-booking-platform, hr-recruitment-dashboard, enterprise-software-website, gym-trainer-app, dairy-vendor-management-app.

Dairy decision: MERGED into one page with two parts. Both JSON entries are a dairy distribution business with a near-identical problem (manual coordination), solution (a vendor management app) and outcome (smoother operations). Two pages would be near-duplicates and fail the 50 percent overlap rule in B9, and nothing in the JSON separates them. The page shows "First dairy distribution business" and "Second dairy distribution business" as two parts, with each part's problem, solution and outcome from the JSON. The placeholder slug is gone; the "(2)" entry now maps to the same slug. If you can tell me what really differs (a different workflow, platform, scale), I can split them.

Template: typographic header (case study label, JSON industry string, title, summary), "What was the problem?", "What did we build?" (JSON text plus a short highlights list taken from it), "How does this kind of system work?" (clearly labelled as a general explanation), optional Screenshots, "What was the outcome?", services and industry links, PageCTA. No client name, no logo, no fake images, no stack section.
- Outcome, problem and solution text is the JSON text word for word. The lint script fails if any differs, so no number or claim can slip in.
- Screenshot slot: `screenshots?: {src, alt, width, height}[]` in the content type. Add images to `public/` and list them there; the page renders them through `next/image` with no code change. Until then, no gallery appears.
- Schema: WebPage + BreadcrumbList (Home > Our Work > title) + CreativeWork (creator = the Organization). No rating, review, client or founder fields.

Verification:
- Preview build (`SHOW_UNPUBLISHED=1`), all 5 pages: 1 H1, title at most 60, description 120 to 155, own canonical and og:url, exactly 1 og:image, noindex, no opacity:0, no forbidden schema fields.
- Normal build: no case-study pages exist (404); the sitemap has none.
- Publish test (temporary, reverted): with one case study and its industry published, the sitemap listed both; the `/portfolio` grid and the industry page linked only the published case study (not the drafts); the case study linked its industry but not the draft service; it is indexable. Nothing is published now.
- Copy lint: all 6 JSON projects are covered, every JSON text matches, no digits in the added lines.
- lint, tsc, build clean.

Project to industry to service mapping (for your review; mapping is mine, the industry comes from the JSON):
| Case study | Industry page | Services |
|---|---|---|
| turf-booking-platform | booking-and-scheduling-platforms | website-development |
| hr-recruitment-dashboard | workforce-and-recruitment-systems | dashboards-and-admin-panels |
| enterprise-software-website | business-and-corporate-websites | business-websites, website-development |
| gym-trainer-app | booking-and-scheduling-platforms | mobile-app-development (the JSON says Android app) |
| dairy-vendor-management-app | vendor-and-distribution-management | dashboards-and-admin-panels, mobile-app-development |

TODO(verify) and notes:
1. The "How does this kind of system work?" lines are general descriptions; confirm each matches how the delivered system works, or reword.
2. Dairy: the JSON does not say whether the apps are mobile or web. The mobile-app-development link is a guess.
3. Gym app: the JSON says scheduling and engagement; the problem also mentions progress tracking. Confirm what the app actually does.
4. These pages are short because the JSON gives one sentence each for problem, solution and outcome. I did not pad them. They need real screenshots and one verifiable outcome each to carry weight; that is the biggest remaining credibility gap.
5. The enterprise page mentions an "AI-driven platform" and "banking, insurance, and telecom" because the JSON does. Confirm the client is comfortable with that level of detail being public even without a name.

## B4. Pricing page (done, new content gated as a draft)

Pricing stays quote-only. `/pricing` is already live, so the new copy is gated by one flag: `pricingContent.published` in `src/content/pricing-page.ts` (false). While false, the live page is exactly what it was (JSON copy, no FAQ schema). The new sections render only in dev or in a `SHOW_UNPUBLISHED=1` build, with a "Draft preview" banner. Set the flag to true to publish.

New sections (server-rendered, plain markup):
- "What affects the cost?": 7 factors, one sentence each (scope, features, integrations, design depth, content, timeline, ongoing support). Replaces the old 4-item list when published.
- "Which engagement fits?": project-based, ongoing, custom or enterprise, one line each on who it suits (sits under the existing engagement cards).
- "What is included in a quote?": 5 items.
- "How is a project scoped?": 4 steps, no durations (conversation, scoping, a clear quote, your approval; all four come from the JSON wording).
- "Pricing questions": 6 FAQs with visible answers; FAQPage schema is emitted only when they are visible.
- Links to `/services` and `/contact`.

Meta title and description are unchanged.

Verification:
- Normal build: `/pricing` has none of the new sections, no FAQPage schema, no banner, and still shows the old "What affects your quote" list.
- Preview build: JSON-LD is WebPage + BreadcrumbList + FAQPage; FAQ schema text equals the visible text; 1 H1; own canonical; 1 og:image; the new sections contain no `opacity:0`.
- Copy lint (`check-service-copy.mjs`): the new content has no digits at all, no currency, no "from", "starting at", "per month", "free", "discount", "cheap", "affordable"; 6 FAQs, answers 40 to 80 words; 4 scoping steps.
- Screenshot of the preview renders cleanly. lint, tsc, build clean.

Existing issue (not from this step): the original `/pricing` blocks (title, intro, engagement cards) use the `Reveal` wrapper, so their raw HTML carries inline `opacity:0` until the client animates them in. The text is in the DOM, so crawlers that render JavaScript see it, but it is worth fixing site-wide later (same wrapper on other pages).

TODO(verify) / for you:
1. "What is included in a quote?": the JSON promises a clear quote but does not list what it contains. Confirm the 5 items match your real quotes.
2. FAQ on fixed quotes: how scope changes are handled ("we talk to you about it before anything changes").
3. FAQ on hidden costs: that advertising spend, domains and software subscriptions are paid to outside providers and called out in the quote.
4. Decide whether the "Timeline" factor wording is fine; I avoided any time promise.

## B5. About page (done, new content gated as a draft)

`/about` is already live, so the new copy is gated like pricing: `aboutContent.published` in `src/content/about-page.ts` (false). While false, the live page is exactly what it was. New sections render only in dev or a `SHOW_UNPUBLISHED=1` build, under a "Draft preview" banner. Set the flag to true to publish.

New sections (server-rendered, plain markup), founder and team unnamed, no team-size or structure claims:
- "Why does Collabrate exist?": the JSON's one idea only (no separate vendors for development and marketing).
- "How does a project run?": 5 steps. Steps 1 to 3 are the JSON's wording (conversation, scope and clear quote, your approval); steps 4 and 5 (design and build with tools connected during the build; launch and optional ongoing support) are drawn from the JSON's website and engagement descriptions.
- "What do we do, and with which tools?": the three JSON categories with every service (linked only when that service page is published), a sentence naming tools already in the repo's logo list, links to /services, /portfolio and /pricing.
- "Where do we operate?": remote-first, based in Tamil Nadu; India, Singapore, Malaysia and the Gulf countries.
- "How can you reach us?": the visible location line "Collabrate, Tamil Nadu, India" (matches the schema's addressRegion and addressCountry), the email, and Instagram. LinkedIn appears automatically once a real URL replaces PENDING_LINK in the JSON; nothing PENDING is rendered.

Meta and AboutPage schema are unchanged.

Verification:
- Normal build: none of the new sections, no banner, no location line (live page unchanged).
- Preview build: 1 H1, AboutPage + BreadcrumbList schema, own canonical, 1 og:image, no `opacity:0` in the new sections, location line, mailto and Instagram present, LinkedIn and PENDING_LINK absent, internal links present. Screenshot renders cleanly.
- Copy lint: no digits (n8n excluded as a tool name), no "our team", "team of", "founder", "engineer", "years", currency or forbidden words; the location line equals the schema's.
- lint, tsc, build clean.

TODO(verify) / for you:
1. Steps 4 and 5 of "How does a project run?" and the sentence "Remote-first means projects run through calls, messages and shared documents": confirm they describe how you actually work.
2. The existing About copy (unchanged) says "Our team handles both" and "One team": that is the JSON's wording, but it conflicts with the rule against team-structure claims. I left it alone; decide whether to soften it.
3. Add the real LinkedIn URL (A11) and it will show here, in the schema `sameAs`, and in the footer.

## B6. Navigation, internal links and the link checker (done)

All navigation goes through the publish gate (`src/lib/site-links.ts`, `getSiteNavData()`), so a draft can never be linked. With nothing published the header and footer look exactly as before.

Header (5 items unchanged, no new top-level items):
- The Services mega-menu keeps its three categories. Each service now links to its own page when that page is published (otherwise to `/services`, as before).
- When at least one industry is published, the menu gets an "Industries" row (hub link plus each published industry). The mobile menu gets an "Industries" link.

Footer:
- New "All services" block (every published service page, two columns on desktop) and "Industries" block (every published industry page). Both appear only when something is published.
- The footer `solutions` labels from the JSON were not rendered in the footer before and still are not; the real industry links replace them.
- "Areas we serve" is not added: B7 has no published locations.
- Fixed an existing problem the new checker would flag: the footer linked to `/blog`, which is noindex and has no posts. The Blog link now appears only once a post is published (same condition as the sitemap).

Cross-links (from B1 to B3, all published-only): service pages link 2 services, industries and projects; industry pages link their services and projects; case studies link their services and industry; hubs link their children.

`scripts/check-links.mjs` (also `npm run check:links`): crawls a running production server from the home page and every sitemap URL, and fails on broken internal links, links to noindex (unpublished) pages, orphan sitemap pages (linked from nowhere), and sitemap entries that are broken or noindex. Usage: `npm run build`, `npx next start -p 3000`, then `node scripts/check-links.mjs http://localhost:3000`.

Verification:
- Normal build (nothing published): 8 pages crawled, 0 broken, 0 links to unpublished, 0 orphans.
- All 36 pages published (temporary, reverted): 36 pages crawled, 0 broken, 0 links to unpublished pages, 0 orphans, so every published page has an inbound link.
- Negative test (temporary, reverted): with a planted broken link, a link to `/blog` and an orphan sitemap entry, the checker reported all three and exited 1.
- lint, tsc, build clean. Nothing is published now.

Not verified visually: the header mega-menu "Industries" row and mobile link (they render only on hover or tap and only when an industry is published); the footer blocks were checked in a screenshot with everything published.

Notes for you:
1. The homepage "work" cards still use gradient placeholder art (not part of Phase B). Phase B asked for no gradient placeholders on case-study pages, which I followed; the homepage and `/portfolio` cards were not changed.
2. The footer still contains a newsletter form (existing).

## B8. Supporting files (done)

Files: `src/app/llms.txt/route.ts`, `src/app/manifest.ts`, `src/lib/og-image.tsx`, and an `opengraph-image.tsx` in each of `src/app/services/[slug]/`, `src/app/industries/[slug]/`, `src/app/portfolio/[slug]/`. `buildMetadata` (`src/lib/seo.ts`) now accepts `image: null`, which the three templates pass so that the file convention supplies the only og:image and twitter:image.

- `/llms.txt`: generated from the content files, published entries only, prerendered (static). Contains the company summary (from the JSON), the main pages, then services (grouped by the JSON categories), industries and case studies as each is published. A normal build (nothing published) lists only the five main pages. No search engine has confirmed a ranking benefit from this file; it is a low-cost convention.
- `/manifest.webmanifest`: name and short name Collabrate, start URL `/`, display `browser`, background `#FEFFFF` and theme `#8A2BE2` (the `--background` and `--brand-violet` values in `globals.css`), icons `/brand/icons/icon-192.png` and `icon-512.png`. `display` is "browser" on purpose: this is not an installable app.
- Open Graph images: 1200x630 PNG, text only. Colour logo on a light background (brand rule), violet accent bar, the page name as the headline (service display name, industry name from the JSON, case-study title), the domain at the bottom. No photos, no invented text. Static (generated at build for every buildable page).

Verification:
- Build output: `/llms.txt` and `/manifest.webmanifest` static; each template has an `opengraph-image` route for every buildable page.
- One URL per template (`/services/seo`, `/industries/booking-and-scheduling-platforms`, `/portfolio/turf-booking-platform`): exactly 1 `og:image` and 1 `twitter:image`, both pointing at that page's own generated image, width 1200, alt text present, image served as `image/png` (51 to 68 KB). Viewed two of them: logo, headline and layout are readable and on brand.
- All-published run (temporary, reverted): `/llms.txt` listed 32 links, all answering 200; all 27 template pages have exactly one `og:image` and one `twitter:image` and the image URL answers 200.
- lint, tsc, build clean. Nothing is published now.

Notes:
1. The image alt text is one fixed string per template ("Collabrate service", "Collabrate industry", "Collabrate case study"). Fine for now; it can be made page-specific later.
2. The OG images use the framework's default font, not the site's Sora and Hanken fonts, because the installed font files are WOFF2 (the image renderer needs TTF, OTF or WOFF). It reads well; supplying a TTF would match the brand exactly.
3. B7 will add its own `opengraph-image.tsx` for `/locations/[slug]` using the same helper.

## B7. South Tamil Nadu location pages (scaffold only; no pages written)

Built the machinery. No town or district page exists, because the copy cannot honestly be written yet (see "Why no copy").

Files: `src/lib/csv.ts`, `src/lib/locations.ts`, `src/content/location-copy.ts` (empty), `src/app/locations/page.tsx` (hub), `src/app/locations/[slug]/page.tsx` (one route, a town template and a district template), `src/app/locations/[slug]/opengraph-image.tsx`, plus `locationSitemap`, the footer "Areas we serve" block, Organization `areaServed` (published towns only) and a "Areas we serve" section in `/llms.txt`. `scripts/check-service-copy.mjs` now lints location copy.

Rules enforced in code:
- A page exists only if the town has `confirmed=yes` in `SEO/locations-input.csv` AND an entry in `src/content/location-copy.ts`. Verified: copy for an unconfirmed town (Rajapalayam) produced a 404.
- Only the public CSV fields (town, district, Tamil name, aliases) are read. `service_delivered`, `industry_type`, `review_permission` and `notes` are never loaded into anything that renders.
- District slug is `<district>-district` (for example `tirunelveli-district`), so the Tirunelveli town and district do not collide.
- Town page: title "Website Development in <Town> | Collabrate", H1 pattern from the playbook, intro, what local businesses need, 3 to 5 services (links to published pages), optional anonymised example and optional Tamil block (only if you supply them), 5 visible FAQs with FAQ schema, links to the district, 2 to 3 neighbouring towns and one industry (published targets only), PageCTA. Schema: Service with `areaServed` City + breadcrumbs. No address, geo, phone or rating.
- Breadcrumb Home > Locations > District > Town; the district item is dropped when the district page is not published, so a breadcrumb never links to a draft.
- Zero published entries: `/locations` returns 404 in a normal build; in a preview build it is noindex. It is out of the sitemap, the footer and `llms.txt` until the first page is published.
- The CSV lives in `SEO/` (not in `src`) and is currently untracked in git. If it is not committed, the Vercel build will not see it and will build no location pages. Commit it when you publish locations. It contains only your confirmations and notes, never client names.

Verification:
- Normal build with no copy: `/locations`, a town URL and a district URL all 404; 0 location URLs in the sitemap; the home page and footer are unchanged.
- Temporary synthetic fixture (3 towns, 2 districts, one published district, one unpublished district; reverted, 0 "TEST" strings remain): all routes built static, including OG images; the sitemap listed the hub, the published district and 3 towns; each page had 1 H1, 1 og:image and indexable robots; breadcrumbs were Home > Locations > Virudhunagar District > Sivakasi, but Home > Locations > Tirunelveli for the town whose district was unpublished; Organization `areaServed` gained the published cities; the footer "Areas we serve" grouped towns by district and did not link the unpublished district; `llms.txt` gained "Areas we serve"; `check-links` crawled 36 pages with 0 broken links, 0 links to unpublished pages and 0 orphans.
- lint, tsc, build clean. Nothing is published.

Why no copy (decision for you):
- The CSV has 5 confirmed towns (Aruppukottai, Tirunelveli, Tenkasi, Sivakasi, Kovilpatti), enough to start. But every one has `service_delivered`, `industry_type` and `review_permission` blank.
- The spec says to draft town copy only from those columns, the notes, and the playbook's local hooks (which are hypotheses). With nothing in those columns, five town pages would differ only by town name and a few guessed industries, which is the near-identical doorway-page pattern the spec tells me to stop and ask about. So I stopped.
- To unblock: for each town, fill `service_delivered`, `industry_type` (and whether you have permission to mention it), plus any real local detail in `notes`. Tamil text for the town pages (D11) is optional. Then I write unique copy per town and per district, with every local claim marked TODO(verify).

## B9. Verification (done)

All checks were run against a production build (`next build` then `next start`) with every Phase B page temporarily published (all 17 services, 5 industries, 5 case studies, and the pricing and about blocks), then reverted. Nothing is published now. Location pages have no copy, so they were verified earlier with the synthetic fixture (see B7), not here.

New scripts (all committed): `scripts/verify-templates.mjs`, `scripts/check-uniqueness.mjs`, `scripts/check-forbidden.mjs`, `scripts/todo-report.mjs`, plus `check-links.mjs`, `check-slugs.mjs` and `check-service-copy.mjs` from earlier steps. The four that crawl take a base URL (default `http://localhost:3000`).

1. lint, tsc, build: `npx tsc --noEmit` clean; `npm run lint` 0 errors (1 existing warning in `ui/social-media.tsx`); `npm run build` clean. Build output with everything published: 74 static pages. Every new route is static: `/industries`, `/portfolio/[slug]`, `/services/[slug]`, `/locations/[slug]` and all their `opengraph-image` routes are `●` (SSG), `/llms.txt`, `/manifest.webmanifest`, `/locations`, `/industries`, `/pricing`, `/about` are `○` (static). Only `/api/contact` and `/api/newsletter` are dynamic (existing).
2. Per-template HTML (`verify-templates.mjs`, 29 pages: 17 services, 5 industries, 5 case studies, pricing, about): all passed. Each page has exactly one H1; a unique `<title>` of at most 60 characters; a 120 to 155 character description; canonical and `og:url` equal to its own URL; exactly one `og:image` and one `twitter:image`; JSON-LD that parses with no forbidden field (aggregateRating, review, telephone, streetAddress, founder, offers, geo); a BreadcrumbList that equals the visible breadcrumb; FAQ schema whose text is visible on the page.
3. Sitemap: 36 URLs, no duplicates, none noindex, all answer 200; with nothing published it has 8 URLs (the existing pages only).
4. `check-links.mjs`: 0 broken links, 0 links to unpublished pages, 0 orphans, in both states (36 pages crawled with everything published, 8 with nothing published).
5. Text uniqueness (`check-uniqueness.mjs`): 156 same-template pairs (services, industries, case studies); highest 5-word-shingle overlap 11.4% (turf-booking-platform and gym-trainer-app). None above 50%. The CTA block and breadcrumb are excluded as shared. Location pairs: none to compare yet.
6. Forbidden content (`check-forbidden.mjs`; 7 content files and 36 rendered pages): no em dashes, currency amounts, superlatives or promises, client-style company names, invented counts, PENDING placeholders or unresolved placeholders. Two notes: (a) the existing services copy has an en dash in "Sales Navigator–driven prospecting" (from the content JSON; not an em dash, left alone); (b) "AI Solutions" (a service category name) is allow-listed so it is not mistaken for a company name.
7. Lighthouse mobile (local production build, default mobile throttling), one page per template:

| Page | Performance | SEO | Accessibility | Best practices | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| /services/seo | 93 | 100 | 96 | 100 | 3.2 s | 60 ms | 0.007 |
| /industries/booking-and-scheduling-platforms | 93 | 100 | 96 | 100 | 3.2 s | 40 ms | 0 |
| /portfolio/turf-booking-platform | 92 | 100 | 96 | 100 | 3.3 s | 50 ms | 0.008 |
| /pricing (for comparison) | 89 | 100 | 96 | 100 | 3.6 s | 80 ms | 0 |

   LCP is above the 2.5 s target on every template, as it already was on the home page (A8). On the service page the LCP element is the first paragraph (text), time to first byte is 7 ms, first contentful paint is 1.5 s, and the delay comes from render-blocking CSS (about 570 ms estimated saving: one 18 KB stylesheet plus a small one) and the webfont swap (about 240 ms render delay). It is the same cause diagnosed in Phase A, not something the new templates added (they are server-rendered text, no video, no animation wrappers). TBT and CLS are fine. Accessibility 96: the two failing audits are in the shared footer (the newsletter status text contrast, and two link `aria-label` values that do not contain their visible text), existing code.
8. TODO(verify) and unpublished entries: generated into [SEO/phase-b-todo.md](phase-b-todo.md) (74 TODO(verify) items, every one with file, entry and line; 29 entries still `published: false`).

What you must supply or decide (consolidated):

| Item | Needed for | If you do not |
|---|---|---|
| Review the copy, resolve each TODO(verify) in `SEO/phase-b-todo.md`, then set `published: true` per entry (17 services, 5 industries, 5 case studies, pricing block, about block) | everything | stays unpublished; live site unchanged |
| `service_delivered`, `industry_type`, `review_permission` (and any real local detail in `notes`) for each of the 5 confirmed towns in `SEO/locations-input.csv`; Tamil text if wanted (D11) | location pages (B7) | no location pages; the hub 404s |
| Commit `SEO/locations-input.csv` (it is untracked) | location pages building on Vercel | the Vercel build sees no CSV and builds no locations |
| Real screenshots with alt text and one verifiable outcome per case study | case-study credibility (B3) | text-only case studies |
| WhatsApp number (D6) as `NEXT_PUBLIC_WHATSAPP_NUMBER` | PageCTA WhatsApp button | no WhatsApp button |
| Real LinkedIn and Calendly URLs (A11) | sameAs, About, footer, CTAs | hidden |
| `CONTACT_WEBHOOK_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID` in Vercel | contact form and analytics | form shows its email fallback; no analytics |
| Decide: soften the About page's existing "One team" wording; keep or drop the AI-screening line on the workforce page; keep or drop the turf project as an e-commerce example | copy accuracy | left as is |

Open items outside Phase B: LCP target (render-blocking CSS and fonts, A8); the `Reveal` wrapper leaves inline `opacity:0` in the raw HTML of older pages; the footer a11y issues above; consent banner decision (D4).
