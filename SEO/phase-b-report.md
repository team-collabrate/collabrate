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
