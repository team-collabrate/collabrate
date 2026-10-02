# Collabrate SEO + AEO Playbook (runbook for Claude Code)

**Site:** https://collabrate.digital  **Repo:** `E:\collab_web` (github.com/team-collabrate/collabrate)  **Stack:** Next.js 16.3 (App Router), React 19, Tailwind 4, Vercel, DNS on Cloudflare
**Market order (updated):** 1) **South Tamil Nadu cities, towns and rural areas** (main focus, see [SEO-LOCAL-SOUTH-TN.md](SEO-LOCAL-SOUTH-TN.md)), 2) rest of Tamil Nadu and India, 3) Singapore / Malaysia / Gulf later. **Budget:** free tools only.

> **Priority change:** location pages for South Tamil Nadu towns move from "optional, month 4+" (section D.5) to **Phase B, weeks 2 to 4**, right after the service and industry pages. Wherever this file says "India, Singapore, Malaysia and the Gulf" in page copy, titles or schema, use **South Tamil Nadu** first and add the other regions only on their own later pages. Do the Phase A fixes first as written.
**Written:** 2026-10-01. Findings in section 1 were measured live that day.

---

## 0. How to use this file

This file is a runbook. You open Claude Code in `E:\collab_web`, then give it one task at a time. Every task has:

- **Why** it matters
- **Prompt** you can paste to Claude Code
- **Files** that get touched
- **Done when** a check you or Claude can run

Rules for the whole project (paste once at the start of every Claude Code session):

```
Read AGENTS.md, CLAUDE.md and AUDIT.md first. This is Next.js 16: read the relevant guide in
node_modules/next/dist/docs/ before writing code (middleware is now proxy.ts; robots/sitemap/
opengraph-image/manifest are file conventions). Content source of truth is
src/content/collabrate-content.json and src/lib/content.ts. Obey globalConstraints in that JSON:
no real client names, no invented metrics, no numeric pricing, founder unnamed, no team size
claims. No em dashes in site copy. Tone: corporate, trustworthy, plain language, full sentences.
Never fabricate links, reviews, stats or dates. After each task run `npm run lint` and `npm run build`.
Commit each task separately with a clear message.
```

Work order: **Phase A (week 1)** fix what is broken -> **Phase B (weeks 2-4)** build the pages that can rank -> **Phase C (weeks 3-6)** off-site entity and listings -> **Phase D (ongoing)** content engine -> **Phase E (ongoing)** measure and improve.

> **Honest expectation:** the domain is new (2025) and not yet indexed. Expect 3 to 6 months before organic traffic is meaningful. In the meantime leads come from LinkedIn, directories, Google Business Profile and AI answer engines, so Phase C matters as much as the code.

---

## 1. What is wrong today (measured on the live site)

| # | Finding | Evidence | Severity |
|---|---|---|---|
| 1 | No `robots.txt`, `sitemap.xml`, `llms.txt` | all return 404 | Critical |
| 2 | Every page shares the homepage's `og:title`, `og:url`, `twitter:title` | `/services`, `/about`, `/portfolio`, `/pricing` all show `og:url=https://collabrate.digital` and the home title. `metadata` in `src/app/layout.tsx` sets `openGraph` at root and pages only override `title`, `description`, `alternates` | High (bad shares, canonical/OG mismatch) |
| 3 | `www.collabrate.digital` has a certificate error | `SEC_E_WRONG_PRINCIPAL`. DNS points at Vercel but the domain was not added to the Vercel project | High (visitors and links get a browser warning) |
| 4 | `collabrate.vercel.app` is live, returns 200, no `X-Robots-Tag` | duplicate of the whole site on another host | High (duplicate content, wrong URL can rank) |
| 5 | Blog is a "Coming soon" page marked `index, follow`, H1 "Coming soon" | `/blog` | Medium (thin page indexed, wasted crawl) |
| 6 | Same `ProfessionalService` JSON-LD injected on every page, only `sameAs` is Instagram, no `@id`, no `logo`, no `Organization`/`WebSite`, no `BreadcrumbList`, no `FAQPage`, no `Service` | layout.tsx lines 74-85 | High |
| 7 | `og:locale` is `en_US` while the market is India/SG/MY/Gulf | layout.tsx | Low |
| 8 | Homepage HTML is 543 KB, 74 `<img>`, only 13 lazy, 29 `rel=preload` tags (mostly tool logos) | raw HTML | Medium (LCP, INP on 4G) |
| 9 | All six marketing services and all dev/AI services live on one URL `/services` | `src/app/services/page.tsx` | High (cannot rank for 17 separate intents) |
| 10 | Portfolio has no per-project URLs, no outcomes that can be cited | `portfolioProjects` has 6 anonymized entries | Medium |
| 11 | LinkedIn and Calendly are `PENDING_LINK`; `sameAs` is therefore thin | content JSON | High for entity/AEO |
| 12 | No `manifest.webmanifest` (404), no `Organization` logo URL in schema | live | Low |
| 13 | Brand name collides with Collabera, Collabora, Collabratec, Collabrate (other firms) | web search | Medium (entity disambiguation) |
| 14 | `src/data/site.ts` is legacy and contains the old fake copy (2019, SF, fake stats, `$` prices, fake blog posts, `collabrate.ai`) | file still in repo | Medium (risk someone imports it) |
| 15 | No analytics or Search Console tag detected | no gtag/clarity/vercel insights in HTML | High (no measurement) |
| 16 | Python on this PC is 3.10.11 | `python --version` | Low (claude-seo prefers 3.11+; 3.10 reaches EOL this month) |

Good news already in place: SSR/prerender (`X-Nextjs-Prerender: 1`), HTTPS + HSTS, http->https 308, trailing slash 308, canonical on every page, `lang="en"`, unique `<title>` and `<meta description>` per page, every image has `alt`, skip link, FAQ answers exist in HTML, real 404 status.

---

## 2. Constraints that shape the strategy (read before doing anything)

The content JSON forbids several things that normally help SEO. We will not break them silently. Each one becomes a **decision for you**:

| Constraint | SEO cost | Recommendation |
|---|---|---|
| No numeric pricing | The top buying query is "cost of X". Quote-only pages rarely rank or get cited | **Decision D1.** Recommended: keep the site pricing page quote-only, but publish blog guides on *what drives the cost* of a website/app/SEO/chatbot (factors, ranges explained as "depends on", checklists). If you later approve ranges, put them only in those guides and mark them as estimates |
| Founder unnamed, no team structure | Weakens E-E-A-T (Experience, Expertise) | **Decision D2.** Recommended: author posts as "Collabrate" for now and show process proof (real screenshots, code snippets, build notes). Revisit naming a founder once you are comfortable. Google and AI engines weigh a real, verifiable author |
| No real client names | No named case studies, no client backlinks | Keep anonymized. Get **written permission** for a few "client name allowed" case studies later (largest single trust upgrade) |
| No invented metrics | Fewer numbers to cite | Use real, small, verifiable numbers from your own projects (pages built, load time scores, hours saved). Ask clients for 1 true metric each |
| Blog says "no dummy content" | Blog nav must stay hidden until posts exist | Matches advice: do not index an empty blog |

---

## 3. Tool setup (30 to 60 minutes, once)

### 3.1 Install claude-seo
Run these in your **terminal** (they are Claude Code plugin commands, not shell commands):

```
/plugin marketplace add AgriciDaniel/claude-seo
/plugin install claude-seo@agricidaniel-claude-seo
/seo setup
/seo doctor
```
Fallback (Windows PowerShell): `git clone --depth 1 https://github.com/AgriciDaniel/claude-seo.git` then **read `install.ps1` first**, then `powershell -ExecutionPolicy Bypass -File claude-seo\install.ps1`.

Python: you have 3.10.11. Install 3.11+ (https://www.python.org) before `/seo setup` if `/seo doctor` complains.

**Done when:** `/seo doctor` shows no red items.

### 3.2 Free accounts (you do these; Claude cannot create accounts or accept terms for you)
1. **Google Search Console**: add a **Domain property** `collabrate.digital` (verify with a DNS TXT record in Cloudflare).
2. **Bing Webmaster Tools**: import from Search Console. Copy the **IndexNow key** later.
3. **GA4**: property + web data stream. Keep the Measurement ID (`G-XXXX`).
4. **Microsoft Clarity** (free heatmaps and recordings).
5. **Google Business Profile** (see Phase C).
6. **Google Cloud API key** for PageSpeed Insights + CrUX (free) for `/seo google setup` Tier 0. Optional: OAuth for Search Console (Tier 1) and GA4 (Tier 2).
7. **LinkedIn Company Page** for Collabrate (this unblocks `PENDING_LINK`).
8. **Calendly** (or Cal.com) booking link (the other `PENDING_LINK`).

Then in Claude Code: `/seo google setup`. Credentials are stored locally under `~/.config/claude-seo/`. Never paste keys into the repo or chat; `.env.local` is gitignored, keep it that way.

### 3.3 Baseline (before changing anything)
```
/seo audit https://collabrate.digital
/seo drift baseline https://collabrate.digital
```
Save `FULL-AUDIT-REPORT.md` into `SEO/baseline/` in the repo. This is your "before" score.

> claude-seo scores are decision support, not rankings. Treat any finding that contradicts Search Console data as unverified.

---

## 4. PHASE A: Fix what is broken (week 1)

Do these in order. Each is a separate commit.

### A1. Add the domain `www` to Vercel and force one canonical host
**Why:** certificate error on `www` (finding 3).
**You do (dashboard):** Vercel project `collabrate` -> Settings -> Domains -> add `www.collabrate.digital` and set it to **redirect to `collabrate.digital`** (308). In Cloudflare keep the records **DNS only** (grey cloud) as `DEPLOY.md` says.
**Done when:** `curl -I https://www.collabrate.digital` returns 308 to `https://collabrate.digital/` with no certificate error.

### A2. Stop `collabrate.vercel.app` from competing with the real domain
**Why:** finding 4.
**Prompt:**
```
Using Next.js 16 docs in node_modules/next/dist/docs (proxy.ts, redirects with `has: host`),
make every request whose host is not collabrate.digital (e.g. collabrate.vercel.app, preview
URLs) either 308-redirect to https://collabrate.digital + same path in production, or return
`X-Robots-Tag: noindex, nofollow`. Production host must be unaffected. Preview deployments
should stay usable (noindex only). Explain which you chose and why.
```
**Files:** `next.config.ts` (headers/redirects) or `src/proxy.ts`.
**Done when:** `curl -I https://collabrate.vercel.app` shows a redirect or `x-robots-tag: noindex`.

### A3. `robots.ts`
**Why:** finding 1. Also controls AI crawler access.
**Decision D3 (AI crawlers):** recommended policy: **allow search/answer crawlers** (Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) so you can be cited. **Training-only crawlers** (GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, meta-externalagent, Amazonbot) are your call: blocking them does not hurt rankings; allowing them may help models know your brand. Recommended for a young brand that needs visibility: **allow all**.
**Prompt:**
```
Create src/app/robots.ts per node_modules/next/dist/docs/.../robots.md. Allow all user agents,
disallow /api/, reference https://collabrate.digital/sitemap.xml. Add explicit allow rules for
OAI-SearchBot, ChatGPT-User, GPTBot, Claude-SearchBot, Claude-User, ClaudeBot, PerplexityBot,
Perplexity-User, Google-Extended. Host must be built from site.domain in src/lib/content.ts.
```
**Done when:** `/robots.txt` returns 200 with the sitemap line.

### A4. `sitemap.ts` (and keep `/blog` out until it has posts)
**Prompt:**
```
Create src/app/sitemap.ts (docs: sitemap.md). Include /, /services, /about, /portfolio, /pricing,
/contact, /privacy, /terms. Exclude /blog while it has no posts: make inclusion depend on a
`blogPosts.length > 0` check from a content source I can extend. Use real lastModified values
(git commit date of the page file or a constant per route that I update), never `new Date()` on
every build. Export a helper so later phases can append service, industry, case-study and blog URLs.
```
**Done when:** `/sitemap.xml` returns 200, then submit it in Search Console and Bing.

### A5. Per-page metadata that does not inherit the homepage OG
**Why:** finding 2. This is the most common Next.js SEO trap: `openGraph` set in the root layout is **replaced, not merged**, when a page defines its own `openGraph`; and when a page defines none, children inherit the homepage values including `url`.
**Prompt:**
```
Create a helper src/lib/seo.ts: buildMetadata({ title, description, path, image? }) that returns
Metadata with title, description, alternates.canonical = path, openGraph {title, description,
url = path (resolved against metadataBase), siteName, locale "en_IN", type "website", images},
and twitter {card, title, description, images}. Change the root layout to default values only
(no root-level openGraph url, no root alternates.canonical). Use buildMetadata in every page.tsx
(/, /services, /about, /portfolio, /pricing, /contact, /blog, /privacy, /terms). Titles must be
unique and under 60 characters, descriptions 120-155 characters. Set /blog robots to noindex
until posts exist.
```
Titles to use (edit if you like, keep brand last):

| Route | Title | Notes |
|---|---|---|
| `/` | `Collabrate: Web, App, Marketing and AI Agency in India` | Home also uses `title.absolute` |
| `/services` | `Web, Marketing and AI Services \| Collabrate` | replaced in Phase B by hub + service pages |
| `/portfolio` | `Our Work: Booking, HR and Vendor Platforms \| Collabrate` | |
| `/pricing` | `How Collabrate Pricing Works \| Collabrate` | quote-only |
| `/about` | `About Collabrate, a Tamil Nadu Digital Agency` | |
| `/contact` | `Contact Collabrate: Get a Quote` | |

**Done when:** `curl -s https://collabrate.digital/services | grep -E 'og:(title|url)'` shows the services values.

### A6. Fix locale
Change `og:locale` to `en_IN` in the helper. `<html lang="en">` stays; do **not** add `hreflang` until there are real regional pages (Phase D).

### A7. Replace the schema with a real entity graph
**Why:** finding 6. Search engines and AI engines need one stable entity (`@id`) they can attach everything to.
**Prompt:**
```
Read node_modules/next/dist/docs/01-app/02-guides/json-ld.md. Create src/lib/schema.ts and a
<JsonLd> server component that escapes `<` as \u003c. On the HOME page only, output a @graph with:
- Organization (@id https://collabrate.digital/#organization, name Collabrate, legalName,
  url, logo ImageObject using /logo-full.png or the best square logo, email, foundingDate 2025,
  areaServed (India, Singapore, Malaysia, United Arab Emirates, Saudi Arabia, Qatar, Kuwait,
  Oman, Bahrain), sameAs [only real profile URLs, skip any PENDING_LINK], knowsAbout
  (web development, mobile app development, SEO, performance marketing, AI chatbots, workflow
  automation))
- WebSite (@id .../#website, publisher -> Organization, inLanguage en-IN)
- ProfessionalService (@id .../#service-provider, provider/parentOrganization -> Organization,
  address { addressRegion: "Tamil Nadu", addressCountry: "IN" } with NO street address because
  it is remote-first)
On every other page output only page-level schema (WebPage/CollectionPage, BreadcrumbList).
Remove the site-wide ProfessionalService from layout.tsx. Do not invent a phone number, rating,
review count, address or founder.
```
**Done when:** Rich Results Test / schema.org validator show no errors; no `aggregateRating` anywhere unless real.

### A8. Performance trim on the homepage
**Why:** finding 8. 29 preloads for tool logos compete with the LCP element.
**Prompt:**
```
Audit the homepage for LCP. Find why ~29 tool logos are emitted as rel=preload (likely next/image
with `priority` or manual <link>). Keep `priority` only on the single LCP image or none if the
LCP element is text. Make all below-the-fold images lazy. Convert large PNG/JPG in /public to
AVIF/WebP via next/image where they are used. Do not remove visual content. Report Lighthouse
mobile before and after using `/seo technical` or Unlighthouse.
```
Targets: LCP < 2.5 s, INP < 200 ms, CLS < 0.1 on mobile.

### A9. Remove dead legacy data
`src/data/site.ts`, `contact-page.ts`, `services-page.ts` still contain old fake copy. Ask Claude to **grep for imports**; if none, delete them (they are a content-compliance risk).
```
Check whether anything imports src/data/*. If nothing does, delete those files and remove dead
components (e.g. unused sections). Run lint and build.
```

### A10. Analytics (needs your consent text)
**Prompt:**
```
Add GA4 and Microsoft Clarity to the layout using next/script (strategy afterInteractive), IDs
from NEXT_PUBLIC_GA_ID and NEXT_PUBLIC_CLARITY_ID env vars; load nothing if unset. Add a minimal
consent notice only if I confirm it is needed for my target regions (GDPR-style for Singapore/Gulf
visitors is a decision, ask me). Send GA4 events: generate_lead on contact form success,
click_calendly, click_email, view_portfolio_item, scroll_faq_open.
```
Mark `generate_lead` as a **key event** in GA4. Add a "How did you hear about us?" optional field to the contact form with options: Google, LinkedIn, Instagram, ChatGPT or other AI, Referral, Other. (This is how you will see AI-search leads.)

### A11. Wire the two `PENDING_LINK`s
After you create the LinkedIn page and the booking link, replace them in `collabrate-content.json`. `isPending()` already hides them, so schema `sameAs` fills in automatically.

**Phase A exit check:** run `/seo audit` again and `/seo drift compare`. Submit sitemap in Search Console + Bing. Request indexing for `/`, `/services`, `/portfolio`, `/about`, `/pricing`, `/contact`.

---

## 5. PHASE B: Build pages that can rank (weeks 2 to 4)

### 5.1 Target URL architecture

```
/                           home (brand + category: "web, marketing and AI agency")
/services                   hub (links to every service)
/services/seo
/services/performance-marketing
/services/social-media-marketing
/services/email-marketing
/services/linkedin-outreach
/services/digital-marketing-strategy
/services/website-development
/services/mobile-app-development
/services/landing-pages
/services/business-websites
/services/dashboards-and-admin-panels
/services/ecommerce-websites
/services/ai-chatbots
/services/workflow-automation
/services/ai-support-systems
/services/ai-voice-assistants
/services/custom-llm-integration
/industries                 hub
/industries/booking-and-scheduling-platforms
/industries/vendor-and-distribution-management
/industries/workforce-and-recruitment-systems
/industries/business-and-corporate-websites
/industries/ecommerce
/portfolio                  hub
/portfolio/turf-booking-platform
/portfolio/hr-recruitment-dashboard
/portfolio/enterprise-software-website
/portfolio/gym-trainer-app
/portfolio/dairy-vendor-management-app   (the two dairy entries become one page with two parts, or two pages if they differ)
/pricing   /about   /contact   /privacy   /terms
/blog (only when first post is live)   /blog/<slug>
```
These 17 service names and 5 industries come straight from `collabrate-content.json`, so the content already exists and complies with the constraints. The job is to **split it into pages and deepen it**.

### B1. Generate service pages from the data (one template, 17 pages)
**Prompt:**
```
Create a dynamic route src/app/services/[slug]/page.tsx using generateStaticParams over
serviceCategories[].services[] in src/lib/content.ts. Slug = kebab-case of stripServiceParenthetical(name).
Use generateMetadata via buildMetadata. Page structure (server components, content visible in HTML,
no content hidden behind JS):
1. H1: "{Service name} for businesses in India, Singapore, Malaysia and the Gulf" (adjust per service)
2. A 40-60 word direct answer: what this service is and who it is for
3. What is included (from `points`)
4. How we work (4 steps)
5. Tools we use (reuse existing logo/tooling data, with text labels)
6. Related industries and related portfolio projects (internal links)
7. FAQ (4 to 6 questions, answers in plain HTML, not accordion-only) 
8. CTA: Get a Quote
Schema: Service (provider -> Organization @id, areaServed, serviceType), BreadcrumbList, FAQPage
only if the FAQ text is visible on the page.
Add each URL to sitemap.ts. Link every service from /services, the footer and related services.
Do not state prices, team size, client names or results that are not in the content JSON.
```
**Content needed from you:** for each service, 4 to 6 real FAQs and 1 to 2 real project examples. Ask Claude to draft them from the JSON and mark unverified claims with `TODO(verify)` for you to review before publishing.

### B2. Industry pages (5)
Same pattern at `/industries/[slug]`. Each page: the problem in that industry, what a platform needs (features checklist), which services apply, the related portfolio project(s), FAQ, CTA. These match your real proof (turf booking, HR, dairy vendor, corporate sites) so they are your **strongest early-ranking pages**. Example H1: "Booking and scheduling platform development".

### B3. Portfolio case-study pages (6)
Route `/portfolio/[slug]`. Template sections: Problem, What we built, How it works, Stack, Outcome (only the outcome already in JSON or one you verify), Gallery (real screenshots you provide; if none, a clean diagram instead of a gradient placeholder), CTA. Schema: `CreativeWork` or `Article` about the project (no client name, no review).
**You provide:** 3 to 6 real screenshots per project (blur data if needed) and one honest, verifiable outcome per project. This is the biggest E-E-A-T lift available under your constraints.

### B4. Pricing page: make it answer the real questions without numbers
Keep "no numeric pricing". Add: a table of **cost factors** (scope, integrations, design depth, content, timeline, ongoing support), "what is included in a quote", "how fast we respond" (one business day, already on the site), "typical engagement types" and a 6-question FAQ (visible text). Link to the cost-factor blog guides (Phase D). Decision D1 applies if you later want ranges.

### B5. About page
Keep founder unnamed (D2). Add: why Collabrate exists (from JSON only), how a project runs, tools, where you operate (Tamil Nadu, remote), regions served, links to LinkedIn and Instagram, contact. Add visible NAP-style info: `Collabrate, Tamil Nadu, India, hello@collabrate.digital`.

### B6. Navigation and internal linking
- Header: Services (with mega-menu to the 3 categories), Work, Industries, Pricing, About, Contact. Add Blog only after the first post.
- Footer `solutions` column: turn the 6 labels into links to the industry/service pages.
- Every service page links to 2 industries, 1 project, 2 sibling services. Every industry page links to its services and project. Use real `<a href>` (Next `<Link>`), never `onClick` navigation.
- Breadcrumbs UI + `BreadcrumbList` schema on all deep pages.

### B7. Fix thin or hidden content
- FAQ answers must be in the HTML (they are today; keep it that way when you change the accordion).
- Do not put key text only in tooltips, tabs, carousels, or hover reveals (the homepage has hover-reveal interactions per the JSON). Each hover/tab panel's text must exist in the server HTML, or be duplicated in a visible section below.
- Run `/seo technical https://collabrate.digital/services` and `/seo agentic` after changes to confirm what a non-JS crawler sees. claude-seo's `seo-visual` agent cross-checks animation-heavy pages (Framer Motion `Reveal` wrappers can leave text at `opacity: 0` in raw HTML; confirm it is still in the DOM and not `display:none`).

### B8. `llms.txt`, images, manifest
```
Create public/llms.txt (or an app route) describing Collabrate in 10 to 15 lines with links to
/services, each service, /industries, /portfolio, /pricing, /about, /contact, plus a short
"what we do and who for" paragraph. Add app/manifest.ts. Add opengraph-image.tsx per section
(services, industries, portfolio, blog posts) using the brand fonts/colours, text-only, no stock
photos. Name images descriptively and keep alt text specific.
```
(`llms.txt` is a low-cost convention; no search engine has confirmed ranking benefit. Do it, do not rely on it.)

**Phase B exit check:** `/seo audit`, `/seo schema`, `/seo sitemap https://collabrate.digital/sitemap.xml`, Rich Results Test on one page of each template, `npm run build` shows all pages as static (`●` / `○`).

---

## 6. PHASE C: Entity, listings and off-site (weeks 3 to 6, mostly manual)

AI engines and Google weigh what the **rest of the web** says about you. This phase is mostly you, with Claude drafting the text. Keep identical wording everywhere.

### C1. Canonical brand block (write once, reuse everywhere)
Ask Claude to create `SEO/brand-facts.md` containing: name `Collabrate` (always add the descriptor "Collabrate Digital" or "Collabrate, a web, marketing and AI agency"), one-sentence description, 50-word and 150-word bios, categories, services, regions, founding year 2025, location line, email, URL, logo file names, social links. Every listing copies from this file so there is no NAP drift.

**Name-collision defence:** Collabera (IT staffing), Collabora (software), Collabratec (IEEE), "Collabrate" (other firms). Always write "Collabrate (collabrate.digital)" in bios, profile names, and on-page "About". Use `Collabrate Digital` as the Google Business Profile and directory display name if "Collabrate" is taken.

### C2. Profiles (in this order)
1. **Google Business Profile**: service-area business, no public address if you work from home (Google allows hiding the address). Primary category "Web designer" or "Software company"; additional "Marketing agency", "Internet marketing service". Add all 17 services, regions, hours, description (use the 750-character bio), photos (logo, project screenshots), UTM link `https://collabrate.digital/?utm_source=google&utm_medium=organic&utm_campaign=gbp`. Needs video/postcard verification, which can take days.
2. **LinkedIn Company Page** (complete every field, services tab, posts 3 per week).
3. **Instagram** already exists; bio link to site, highlights for services and projects.
4. **YouTube channel**: tutorials and walkthroughs with transcripts (AI engines cite these a lot).
5. **Bing Places**, **Apple Business Connect** (free).
6. **Crunchbase**, **AngelList/Wellfound** (company), **Product Hunt** maker profile if you ship tools.
7. **GitHub org** (public repos for templates or n8n workflows help topical authority).
8. **Wikidata/Wikipedia**: skip for now (notability needed). Do not create self-promotional pages.

### C3. Directories and reviews (pick the ones with India/SEA/Gulf reach)
Clutch, GoodFirms, DesignRush, Sortlist, TopDevelopers, TechBehemoths, Justdial, Sulekha, IndiaMART (only if you sell there), F6S, Startup India directories, local Chamber/MSME listings, and Gulf/SEA agency directories when you expand. **Never** buy reviews or backlinks and never fabricate testimonials. The three `[Client Name]` testimonials on the site are placeholders; replace them with real, permissioned quotes before launch, or remove them.

**Review engine:** after each delivered project send one email with direct review links (Google, Clutch). Target 5 reviews in 60 days, then 10+.

### C4. Digital PR and links (free ways)
- Guest posts and quotes on SaaS/startup/marketing blogs in India and SEA.
- Expert-quote platforms (Qwoted, Featured, Connectively).
- Podcasts and webinars.
- Partner pages on Shopify, Webflow, HubSpot, Zapier, n8n **only if you meet their requirements**.
- Client credit link ("Website by Collabrate") in footers of sites you deliver: add contractually, `rel` normal (not sponsored) because it is editorial credit, but keep anchor text varied (`Collabrate`, `collabrate.digital`, `web development by Collabrate`).
- Share-worthy assets: "Website launch checklist for Indian businesses", "Booking platform requirements template", "n8n WhatsApp automation workflow pack". These earn natural links.
- Use `/seo backlinks https://collabrate.digital` (free tier) and manually record referring domains in `SEO/links.csv`.

### C5. Social distribution loop
For every blog post: 1 LinkedIn post (text + carousel), 1 X thread, 1 Instagram carousel, 1 short video. Reddit/Quora: answer real questions, disclose affiliation, no link dropping.

---

## 7. PHASE D: Content engine (weeks 4 onward; cadence from JSON: 2 posts/month on Tuesdays, raise to weekly once the process works)

### D.1 Pillars (from the blog config)
1. Web & App Development 2. Marketing & Growth 3. AI & Automation 4. Industry Playbooks 5. Founder/Process Notes

### D.2 First 20 posts (validate each with `/seo cluster <keyword>` and `/seo content-brief <topic>`)

**Money-adjacent and cost guides (D1 applies, no numbers unless you approve)**
1. What affects the cost of a business website in India
2. What affects the cost of building a mobile app
3. Freelancer vs agency for a website project: how to decide
4. WordPress vs Webflow vs custom Next.js: which fits your business
5. How to choose a digital marketing agency (checklist)

**Industry playbooks (your real proof, lowest competition)**
6. How a turf or court booking platform works (features, payments, WhatsApp reminders)
7. Features every dairy or distribution vendor management app needs
8. HR and recruitment dashboard: applicant tracking basics for small teams
9. What a B2B enterprise software website must include
10. Fitness trainer app: scheduling and client progress features

**AI and automation**
11. AI chatbot for business: what it can and cannot do
12. Automate WhatsApp enquiries with n8n (workflow walk-through)
13. When a voice assistant makes sense for customer support
14. AI support systems: human handoff checklist

**Marketing**
15. Technical SEO checklist for a new business website
16. How to rank in AI answers (ChatGPT, Perplexity, Google AI Mode): practical steps
17. Google Business Profile setup for service businesses in India
18. LinkedIn outreach without getting restricted
19. Google Ads vs Meta Ads for lead generation in India
20. Process note: how we scope a project in one week

### D.3 Per-post workflow (give Claude this each time)
```
Use /seo content-brief "<topic>" and /seo cluster "<keyword>" to find the primary query,
secondary queries and People-Also-Ask questions. Draft the post to the brief:
- H1 contains the primary query. First paragraph answers it in 40 to 60 words.
- H2s phrased as questions where natural. One idea per section, each section self-contained
  (120 to 160 words) so it can be quoted.
- Include one original element: a checklist, table, template, screenshot from our own build, or
  a code/config snippet. No invented statistics. Any outside statistic needs a source link.
- Author: "Collabrate" until decision D2 changes. Visible published and updated dates.
- 4 internal links (service, industry, related post, project) and 2 external authority links.
- Add Article schema (headline, datePublished, dateModified, author Organization, publisher).
- Run /seo content on the draft; fix anything below target; run a humanizer pass.
- Output as MDX/TSX under src/content/blog/. Do not publish; leave `draft: true` for my review.
```
**Publishing rule:** a human (you) reads, fixes facts, and adds one real insight before anything goes live. Google's 2026 spam enforcement targets mass, unedited, low-value pages, including eligibility to be cited in AI Overviews/AI Mode.

### D.4 Blog infrastructure (build once, before post #1)
```
Build the blog: src/content/blog/*.mdx with frontmatter (title, description, slug, date, updated,
category, draft). /blog index (cards, pagination after 12), /blog/[slug] with table of contents,
reading time, related posts, Article + BreadcrumbList schema, canonical, OG image, RSS feed at
/blog/feed.xml, add posts to sitemap, un-hide the Blog nav link and flip /blog robots to index
only when at least one non-draft post exists. No dummy posts.
```

### D.5 Programmatic/city pages (month 4+, optional, guard-railed)
Only create `/services/<service>/<city>` pages when each one has unique, genuinely useful content (local examples, local regulations or payment methods like UPI/GST, local clients served with permission). Start with 3 cities where you have real work. Use `/seo programmatic` to check for doorway-page risk. If you cannot make a page meaningfully different, do not publish it.

### D.6 Regional expansion (month 5+)
Singapore, Malaysia, UAE/Gulf: separate pages like `/singapore`, `/malaysia`, `/gulf` explaining services, local compliance and payments (PayNow, Stripe regional, Arabic needs). Only add `hreflang` (`/seo hreflang`) when you have genuine regional variants (`en-SG`, `en-MY`, `en-AE`). If you add Arabic, use real human translation; machine-translated pages are a known quality risk.

---

## 8. PHASE E: Measurement and operating rhythm

### E.1 Dashboards
- Search Console: queries, pages, indexing, CWV, page experience.
- GA4: Reports -> Acquisition; build an exploration "Organic and AI referrals" (source contains `chatgpt`, `perplexity`, `gemini`, `copilot`, `claude`, `bing`, `google`).
- Bing Webmaster: AI Performance/clicks, IndexNow submissions.
- Clarity: rage clicks and dead taps on `/contact` and `/services`.

### E.2 IndexNow
Ask Claude to add an `IndexNow` key file under `/public` and a small script/`/seo bing` workflow to ping URLs after each deploy or publish. (IndexNow serves Bing and others; Google does not use it.)

### E.3 AI visibility tracking (free, manual)
Keep `SEO/ai-prompts.csv` with ~40 prompts, for example:
- "best web development agency in India for small businesses"
- "who builds booking platforms for turfs in India"
- "digital agency that does web, marketing and AI automation together"
- "vendor management app for dairy business"
- "AI chatbot agency India"
Each month run them in ChatGPT, Perplexity, Gemini, Google AI Mode, Copilot, Claude. Record: mentioned? cited URL? competitor named? Aim to move from 0 to mentioned for niche prompts first (booking, dairy vendor, HR dashboard), then broader ones.

### E.4 Cadence
| When | Do |
|---|---|
| Every deploy | `npm run build`, `/seo drift compare https://collabrate.digital`, check no accidental `noindex` |
| Weekly | Search Console review; refresh pages with impressions at positions 8 to 20; 1 to 2 posts; LinkedIn 3 to 5 posts; request reviews |
| Monthly | AI prompt tracking; backlinks; Core Web Vitals; new directory listings; publish report in `SEO/reports/YYYY-MM.md` |
| Quarterly | Full `/seo audit`, `/seo plan agency` refresh, content pruning and updates, competitor review |

### E.5 Targets (realistic for a 2025 domain, free tools)
| Horizon | Targets |
|---|---|
| 30 days | Sitemap/robots live, all pages indexed, schema valid, per-page OG fixed, GBP created, 5 listings, GA4 + GSC collecting |
| 90 days | 17 service + 5 industry + 6 case pages live, 8+ posts, 5 reviews, branded query #1, first organic lead |
| 6 months | 20+ posts, page-1 for several long-tail industry queries, mentioned in AI answers for niche prompts, 3 to 5 organic leads/month |
| 12 months | 20+ inbound leads/month from organic + AI + referral, 30+ referring domains, regional pages live |

---

## 9. Extra SEO traps to avoid on THIS site (checklist)

Tick these when Claude changes related code.

**Next.js / technical**
- [ ] `openGraph` in a page replaces the root's object (no deep merge). Always pass the full object through `buildMetadata`.
- [ ] Canonical set in root layout applies to every child that does not override it: never put a hard-coded canonical in the root layout.
- [ ] `generateStaticParams` + `dynamicParams = false` on service/industry/portfolio/blog routes so unknown slugs return real 404, not soft 200.
- [ ] No `noindex` left from preview; check production HTML for `<meta name="robots" content="noindex">` after every release.
- [ ] No duplicate routes: `/services` and `/services/` already redirect (good); keep one casing; no `/index`.
- [ ] Soft 404 on empty states (`/blog` with no posts): keep `noindex` and out of sitemap until content exists.
- [ ] Redirects 301/308 only, no chains; moving a slug requires an entry in `next.config.ts` `redirects()`.
- [ ] Do not hydrate-gate content (`useEffect` setting text, lazy components that render text only on the client).
- [ ] Do not hide primary text in `display:none` accordions/tabs. Visually collapsed is OK if the text is in the DOM and not `hidden` for important sections; otherwise show it expanded.
- [ ] JSON-LD must match visible content exactly (FAQ, Service). Remove schema for anything not shown.
- [ ] Add `<link rel="preconnect">` only for hosts really used (the current `preconnect href="/"` is pointless).
- [ ] Images: explicit `width/height`, descriptive filenames, AVIF/WebP, lazy except LCP. Add SVG `<title>`/aria-label for logo-only links.
- [ ] Fonts: four `@fontsource-variable` packages are installed (Geist, Hanken Grotesk, Inter, Sora); only import what is used (layout imports two). Remove unused packages to cut CSS and add `font-display: swap`.
- [ ] Marquee/carousel animations: respect `prefers-reduced-motion` (already partly done), avoid layout shift.
- [ ] 404 page: custom `not-found.tsx` with links to services and contact.
- [ ] Security headers (CSP report-only first, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) in `next.config.ts` `headers()`.
- [ ] `/api/*` stays disallowed in robots and `noindex`.

**Content / E-E-A-T**
- [ ] One H1 per page, matches the page's main query; heading levels not skipped.
- [ ] Meta `keywords` tag is ignored by search engines; harmless, do not spend time on it.
- [ ] No keyword stuffing; no "best agency in India" claims without proof.
- [ ] Contact page: email only today; add WhatsApp and phone **only if real and monitored** (local-trust signal in India).
- [ ] Privacy and Terms must be real and linked in the footer (done). Add a cookie notice only if you load analytics for regulated regions.
- [ ] Testimonials with `[Client Name]` placeholders must not ship live. Remove or replace with real ones.
- [ ] Portfolio gradient blocks look like missing images; use real screenshots or diagrams.

**Off-site**
- [ ] Do not buy links, comment spam, or PBN. Do not mass-create directory profiles with inconsistent details.
- [ ] Do not impersonate other firms or use "Collabera/Collabora" in any text.
- [ ] Do not scale AI content without human review (Google scaled content abuse policy).
- [ ] Do not keep two live versions of the site (vercel.app, www, http): see Phase A.

**Competitor/intent traps**
- [ ] "Best web development company in [city]" pages are crowded; win the niche queries first (booking platform, vendor management, HR dashboard, AI chatbot + n8n).
- [ ] Do not target "SEO services" as your lead page; position as **"web + marketing + AI in one team"** and rank that angle plus niche problems.

---

## 10. Command cheat sheet (claude-seo)

| Goal | Command |
|---|---|
| Full audit | `/seo audit https://collabrate.digital` |
| Single page | `/seo page https://collabrate.digital/services` |
| Technical | `/seo technical https://collabrate.digital` |
| Content quality | `/seo content <url>` |
| Content brief | `/seo content-brief "<topic>"` |
| Keyword cluster | `/seo cluster "<keyword>"` |
| Schema check/generate | `/seo schema <url>` |
| AI search readiness | `/seo geo <url>` and `/seo agentic <url>` |
| Search experience | `/seo sxo <url>` |
| Sitemap | `/seo sitemap <url>` or `/seo sitemap generate` |
| Images | `/seo images <url>` |
| Local/maps | `/seo local <url>` and `/seo maps` |
| International | `/seo hreflang <url>` |
| Programmatic | `/seo programmatic <url>` |
| Competitor pages | `/seo competitor-pages <url>` |
| Backlinks | `/seo backlinks <url>` |
| Plan | `/seo plan agency` |
| Regression guard | `/seo drift baseline|compare|history <url>` |
| Google data | `/seo google setup` then `/seo google ...` |
| Bing/IndexNow | `/seo bing ...` |
| Multi-page Lighthouse | `/seo unlighthouse <url>` |
| Evidence framework | `/seo flow` |

Paid extensions (DataForSEO, Ahrefs, SE Ranking, Profound, Firecrawl) are **skipped** on the free-only budget. Revisit after the first 3 to 5 organic leads.

---

## 11. Decisions I need from you

| ID | Question | My recommendation |
|---|---|---|
| D1 | Allow rough price ranges anywhere? | No on site pricing page; use cost-factor guides |
| D2 | Name a founder/author on posts? | Not yet; revisit at month 3 |
| D3 | Allow AI training crawlers? | Allow all for now (visibility first) |
| D4 | Add consent banner for GA4/Clarity? | Yes if you target Singapore/Gulf traffic; keep minimal |
| D5 | Can you provide real screenshots + 1 verifiable outcome per project? | Needed for case-study pages |
| D6 | Is a phone/WhatsApp number available to publish? | Yes if monitored; helps conversion and local signals |
| D7 | Redirect or noindex `collabrate.vercel.app`? | Redirect to the main domain |
| D8 | Python 3.11 upgrade OK? | Yes, before installing claude-seo |

---

## 12. Task order (copy this into a checklist)

```
Week 1   A1 www domain  A2 vercel.app  A3 robots  A4 sitemap  A5 per-page metadata
         A6 locale  A7 schema  A8 perf  A9 remove legacy  A10 analytics  A11 PENDING_LINKs
         3.1-3.3 install claude-seo + accounts + baseline audit; submit sitemaps
Week 2   B1 service pages (template + 6 marketing)  B6 nav + internal links
Week 3   B1 remaining 11 services  B2 industries  C1 brand facts  C2 GBP + LinkedIn
Week 4   B3 case studies  B4 pricing  B5 about  B8 llms.txt/manifest/OG images  D.4 blog infra
Week 5-6 C3 directories + reviews  first 4 posts live  AI prompt baseline (E.3)
Month 2+ 2 posts/month minimum (raise when possible), C4 PR/links, monthly reports
Month 4+ optional city pages, Month 5+ regional pages + hreflang
```

---

## 13. What Claude should NOT do on this project

- Do not invent clients, metrics, reviews, certifications, awards, team size, phone numbers, addresses or founder details.
- Do not create accounts, enter passwords, accept terms, or submit forms on directories or Google for you. It can prepare the text; you submit.
- Do not publish blog posts or push to `main` without your review.
- Do not add numeric prices.
- Do not install paid extensions or enter API keys into the repo.
