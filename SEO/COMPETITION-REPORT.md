# Competition and baseline report (2026-10-02)

Scope: where collabrate.digital stands today, who it competes with, and what to do about it. Data sources: claude-seo 2.4.1 scripts (headless renderer, agent-readiness checker, sitemap discovery, drift baseline), the Lighthouse CLI on live pages, and a general web search. No Search Console, no paid SERP or backlink data, so nothing here is a ranking or a traffic figure. Detail tables: [competitors/matrix.md](competitors/matrix.md). Raw baseline files: [baseline/](baseline/).

## 1. Tooling status
- claude-seo 2.4.1 is installed (user scope, marketplace `agricidaniel-claude-seo`). Its isolated Python 3.12 runtime and Chromium are set up and `doctor` reports ready.
- The `/seo ...` slash commands appear after a plugin reload or a new session; this session did not list them, so I ran the plugin's own scripts directly (same code the commands call).
- Not run: PageSpeed Insights (rate-limited without an API key; Lighthouse CLI used instead), Common Crawl backlink graph (needs a large dataset download; optional), anything needing paid SERP data.

## 2. Baseline of the live site
| Check | Result |
|---|---|
| Deploy state | Phase B is live but invisible: `/services/seo` returns 404, `/llms.txt` and `/manifest.webmanifest` return 200, sitemap has the 8 Phase A URLs (valid), `www` 308s to the apex. |
| Home page | 1 H1, 7 H2, canonical is itself, `index, follow`, schema Organization + ProfessionalService + WebSite, no console errors, server-rendered (not an SPA shell). |
| Agent readiness | P0 4 of 4 pass, `llms.txt` pass, AI-crawler rules pass, user-agent matrix pass (no WAF blocking). Info only: content-signal, Markdown delivery, WebMCP (all optional). |
| Lighthouse mobile (live) | Performance 78, SEO 100, Accessibility 100, Best practices 100. LCP 3.7 s (target under 2.5 s), TBT 240 ms, CLS 0. The accessibility fixes are live. |
| Security headers | Only `Strict-Transport-Security`. No CSP, X-Frame-Options, X-Content-Type-Options or Referrer-Policy. Low priority; can be added in `next.config.ts` `headers()`. |
| Indexing | Unknown. Needs Google Search Console (a web search for `site:collabrate.digital` showed nothing, but that tool is not Google and cannot be trusted on this). |
| Drift baseline | Captured (id 1) for later `drift compare`. |

Correction to Phase A: `https://collabrate.vercel.app` is **not our site**. It serves an unrelated "Grocery Order Form" page from a different project, so the Phase A exit check (`curl -I https://collabrate.vercel.app`, expect 308) was wrong. Our own `*.vercel.app` hosts (for example `collabrate-git-main-teamcollabrate-3053s-projects.vercel.app`) sit behind Vercel's login and already send `X-Robots-Tag: noindex`, so there is no duplicate-content risk. The A2 redirect rule is harmless but is not exercised by any public host.

## 3. Competitors (one page each, see the matrix)
**South Tamil Nadu town pages (our best opening).**
- Devoted Infotech, Tirunelveli page: 782 words, "Tirunelveli" appears 3 times, no other local place named, no case study, no schema except an address, typos ("Proffessional"), a "leading" claim, 1 internal link, Lighthouse performance 44 (LCP 12.8 s).
- Creators Web India, Sivakasi page: a Chennai-based agency with a template page; "Sivakasi" repeated 10 times, Chennai the only other place named, no case study; carries `AggregateRating` and `Review` schema; Lighthouse 71, CLS 0.162.
- Nellaiseo (Tirunelveli and Chennai): the home page mentions Tirunelveli once; the town URL that search returned is now a 404. Lighthouse 65, LCP 8.6 s.
- Jaamboo: 113 words, no H1, a 104-character title, no schema.
Pattern: town name inserted into a generic page; no neighbouring towns, no local industries, no anonymised local example, no FAQs tied to local questions. Matches the earlier Aruppukottai scan.

**Tamil Nadu and Chennai agencies.** DISOADS (106 words on its Tamil Nadu page; LocalBusiness and Service schema; Lighthouse 74), JHB Automations (Salem; five superlatives; FAQPage schema), Weboin (64 H2s; "1000+ clients" and "12 years" claims). They already sell the web + marketing + AI bundle, so the claim "all three under one roof" is not unique; the proof and local depth are.

**AI and WhatsApp automation.** Aiingo (title "#1 AI Automation Agency", "10+ years"), plus SaaS platforms (AiSensy, Interakt, Wati, Gallabox, Landbot) that win tool queries. Agency intent ("build me a WhatsApp chatbot") is open.

**Brand name (from search results, pages not fetched).** Several unrelated companies use near-identical names: Collabrate (an email-collaboration product with YouTube and SlideShare presence), Collabera Digital (large digital-engineering firm), COLLAB Digital Agency (performance marketing), Collab (creator marketing), Collabora, Collabratec. We do not appear for the brand query in that search, and search engines may "correct" the name to Collabera.

**Performance.** Competitor mobile Lighthouse performance 44 to 74 against our 78; their LCP 3.4 to 12.8 s against our 3.7 s. We are already ahead on speed and can widen the gap by fixing LCP.

## 4. What no competitor in these results offers (our openings)
1. A town page with unique, specific local content: neighbouring towns, local industries from real client work, local questions answered. (Needs the CSV facts.)
2. Anonymised, schema-marked case studies with real screenshots and one verifiable outcome. (Built; needs screenshots.)
3. Honest claims: no "best", no invented counts. Competitors' superlatives and unprovable numbers are a trust and policy weakness we should not copy.
4. Fast, accessible pages (Lighthouse SEO 100 and accessibility 100 live today).
5. A consistent entity across profiles (name, descriptor, description, regions) that separates us from the lookalike names. (`brand-facts.md` is ready.)

## 5. Where to fight, in order
| Priority | Arena | Why | Blocker |
|---|---|---|---|
| 1 | South Tamil Nadu towns (Aruppukottai, Tirunelveli, Tenkasi, Sivakasi, Kovilpatti) | Weak, templated competitors; real local clients | CSV columns `service_delivered`, `industry_type`, `review_permission`; commit the CSV |
| 2 | Brand entity: "Collabrate Digital" | Cheap; separates us from Collabera, Collab and the email product | Search Console, Google Business Profile, LinkedIn page, Bing Places |
| 3 | AI and automation service pages for India | Agency intent beside SaaS giants; pages written | Your review and publish |
| 4 | Directories and reviews (Clutch, Sortlist, GoodFirms, Justdial, Sulekha) | Competitors appear there today | Reviews and accounts (yours) |
| Later | "Agency Tamil Nadu" and Chennai | Established players and directory lists | After 1 to 4 |

## 6. Next actions
Sequenced in [publish-checklist.md](publish-checklist.md). In short: set up Search Console and Bing this week (nothing else can be measured without it); publish the approved service pages in batches and re-verify after each; fill the town CSV and commit it so the town pages can be written; create the brand profiles using [brand-facts.md](brand-facts.md); fix LCP; re-run this report in 6 to 8 weeks and compare with the drift baseline.

## 7. Limits of this report
- One page per competitor, rendered once; no rankings, volumes or backlinks. Search results came from a general search tool, not Google India.
- Competitor counts and claims are quoted only to show the pattern; none may be reused.
- Findings that contradict Search Console data should be treated as unverified.
