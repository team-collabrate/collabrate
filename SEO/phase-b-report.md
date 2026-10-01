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
