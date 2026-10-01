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
