# Collabrate website

Marketing site for Collabrate (collabrate.digital): a web, app, marketing and AI agency based in Tamil Nadu, India. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion, Radix primitives. Hosted on Vercel.

> Next.js 16 has breaking changes against older versions. Before changing framework-level code, read the matching guide in `node_modules/next/dist/docs/` (see `AGENTS.md`).

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

Copy no secrets into the repo: `.env*` files are gitignored. See [Environment variables](#environment-variables).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server. Draft pages (see below) are visible, with a banner. |
| `npm run build` / `npm start` | Production build and server. |
| `npm run lint` / `npm run typecheck` | ESLint and `tsc --noEmit`. |
| `npm run check:copy` | Lints all page copy: word counts, forbidden words and numbers, verbatim source wording, location CSV. |
| `npm run check:slugs` | Service, industry and project slugs are stable and unique. |
| `npm run check:site` | Needs a running production server (`npm run build && npm start`). Crawls it: broken links, orphan pages, links to unpublished pages, per-page title/description/canonical/og/schema, text uniqueness, forbidden content. |
| `npm run check:links` | The link crawl alone. |
| `npm run check:csp` | Loads pages in headless Chrome and reports Content-Security-Policy violations and whether GA4, Clarity and Turnstile start (build with test IDs, see the script header). |
| `node scripts/responsive-check.mjs <url>` | Overflow, tap-target, text-size and mobile-menu audit at 360, 412, 768 and 1024 px. |
| `node scripts/todo-report.mjs` | Lists every `TODO(verify)` and every unpublished entry. |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, `check:copy`, `check:slugs`, a build and `check:site` on every push to `main` and every pull request.

## How content works

Copy lives in files, not in components.

| File | Holds |
|---|---|
| `src/content/collabrate-content.json` | The source of truth: site facts, nav, the 17 services, industries, anonymised projects, footer, and `globalConstraints` (no client names, no invented numbers, no numeric pricing, no named founder, no team-size claims). |
| `src/content/service-pages.ts`, `industry-pages.ts`, `case-studies.ts` | The long-form pages: `/services/[slug]`, `/industries/[slug]`, `/portfolio/[slug]`. |
| `src/content/pricing-page.ts`, `about-page.ts` | Extra sections for `/pricing` and `/about`. |
| `src/content/home-process.ts` | The homepage "How we work" steps (each step lists the verbatim source wording it is built from). |
| `src/content/location-copy.ts` + `SEO/locations-input.csv` | South Tamil Nadu town and district pages. Empty until the CSV is filled in. |
| `src/lib/content.ts` | Typed access to the JSON and the shared FAQ copy. |

### Publishing gate

Every long-form page and page block has `published: false` until the owner has reviewed it. Unpublished pages:

- do not exist in a normal production build (they 404);
- show in `npm run dev` or a build made with `SHOW_UNPUBLISHED=1`, with a banner and `noindex`;
- are never in the sitemap, navigation, footer, hub lists, `llms.txt` or related links.

To publish, set `published: true` on the entry, resolve its `TODO(verify)` comments, run `npm run build && npm start` and `npm run check:site`, then push. The checklist is `SEO/publish-checklist.md`.

Content rules (enforced by `check:copy`): no em dashes, no currency or numbers in pricing copy, no "best"/"leading"/"guaranteed", no client names, no team-size claims, no phone number or address that is not in the JSON.

## Project layout

```
src/app/                 routes: /, /services(/[slug]), /industries(/[slug]), /portfolio(/[slug]),
                         /locations(/[slug]), /about, /pricing, /contact, /privacy, /terms, /blog,
                         api/contact, api/newsletter, sitemap.ts, robots.ts, manifest.ts, llms.txt,
                         not-found.tsx, error.tsx, global-error.tsx, opengraph-image.tsx (per template)
src/components/          layout (navbar, footer), sections (page sections), shared, ui, seo, analytics
src/lib/                 content, schema (JSON-LD), seo (metadata helper), publish, slug, sitemap sources
scripts/                 checkers and audits (see above)
SEO/                     playbook, reports, brand facts, competitor matrix, publish checklist, locations CSV
public/                  logos, brand files, hero and work videos
```

SEO building blocks: `buildMetadata()` in `src/lib/seo.ts` (every page passes its title, description and path through it), JSON-LD builders in `src/lib/schema.ts`, the sitemap in `src/lib/sitemap-sources.ts`.

## Environment variables

All optional; nothing loads or sends without them. Set them in Vercel (Project Settings, Environment Variables) and redeploy.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID (`G-…`). |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID. |
| `CONTACT_WEBHOOK_URL` | Where `/api/contact` forwards form submissions (Zapier, Make, n8n, an email webhook). Until set, the form shows an error with an email fallback. |
| `NEWSLETTER_WEBHOOK_URL` | Where `/api/newsletter` forwards footer sign-ups. Until set, it answers 503. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile spam protection on the contact form. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits with country code. Shows a WhatsApp button on deep pages. Not set means no button. |
| `SHOW_UNPUBLISHED` | `1` builds draft pages too (for review builds only, never production). |

`NEXT_PUBLIC_*` values are inlined at build time, so change them and redeploy.

## Security headers

`next.config.ts` sends a Content-Security-Policy and the usual hardening headers. When adding a third-party script, embed or API, add its host to the CSP there, then run `npm run check:csp`.

## Deploying

See [DEPLOY.md](DEPLOY.md).
