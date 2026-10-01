# Phase A report

Source: SEO/SEO-PLAYBOOK.md section 4. Steps are logged here as they finish. A1 was run through the Vercel CLI; A2 onward are code commits.

## A1: www domain

**Status: done, 2026-10-01.** `https://www.collabrate.digital` now returns a valid certificate and 308-redirects to `https://collabrate.digital` with path and query kept.

### Before (read-only checks)

| Check | Result |
|---|---|
| CLI | Vercel CLI 62.1.0, logged in as `collabrate` after a fresh device login (the session had been logged out) |
| Account vs `.vercel/project.json` | The `projectId` and `orgId` in the file return the `collabrate` project under team `teamcollabrate-3053s-projects` (Hobby). They match |
| Domains attached to project `collabrate` | `collabrate.digital` only (verified, no redirect). `www.collabrate.digital` was **not** attached |
| Other domain in the team | `gapfoods.in` (not touched) |
| DNS | `www` is a CNAME to `51e2d5db5f6b18c1.vercel-dns-017.com`, which resolves to 64.29.17.65 and 216.198.79.65. The apex resolves to the same IPs. No Cloudflare change needed |
| `curl -sI https://www.collabrate.digital` | failed: `SEC_E_WRONG_PRINCIPAL` (curl exit 60) |
| `curl -sI http://www.collabrate.digital` | 308 to `https://www.collabrate.digital/` |
| `curl -sI https://collabrate.digital` | 200 |
| Nameservers shown by Vercel | intended `ns1/ns2.vercel-dns.com`, current Cloudflare. Expected for DNS-on-Cloudflare, not an error |

### Commands run (changes)

1. `vercel domains add www.collabrate.digital collabrate`
   Result: `status: success, reason: domain_added`. Attaches `www` to the project so Vercel can issue its certificate. No `--force`.
2. `vercel api "/v9/projects/<projectId>/domains/www.collabrate.digital?teamId=<orgId>" -X PATCH -F redirect=collabrate.digital -F redirectStatusCode=308`
   Result: `redirect: "collabrate.digital"`, `redirectStatusCode: 308`, `verified: true`.

Not run (per the rules): `deploy`, `--prod`, `remove`, `domains rm`, `vercel env`, anything that edits DNS. No token, cookie or `.env` content was read or printed. Nothing was pushed to git.

### After

| Check | Result |
|---|---|
| `vercel domains verify www.collabrate.digital` | `status: ok`, `configured_correctly`, no issues |
| `curl -sI https://www.collabrate.digital/` | `308`, `Location: https://collabrate.digital/` |
| `curl -sI "https://www.collabrate.digital/services?x=1"` | `308`, `Location: https://collabrate.digital/services?x=1` |
| `curl -sI http://www.collabrate.digital/` | `308` to `https://www.collabrate.digital/` (then a second 308 to the apex, so two hops) |
| `curl -sI https://collabrate.digital` | `200`, unchanged |
| Project domains afterwards | `www.collabrate.digital` (redirect to apex, 308, verified) and `collabrate.digital` (no redirect, verified) |

Certificate timing: the first request right after the change failed with `CRYPT_E_REVOCATION_OFFLINE` (the new certificate's revocation check, not a name mismatch). The next attempt, about 20 seconds later, returned the 308 with no certificate error.

### Still needed from you

Nothing for A1. Optional: if you want the http to https to apex hop to be a single redirect, that needs a Cloudflare or Vercel setting change. It is two 308s today, which is harmless for SEO.

---

## Summary of A2 to A11

Nothing below is pushed or deployed. All commits are local on `main`.

| Step | Commit | Result |
|---|---|---|
| A1 | none (Vercel project setting) | done, see above |
| A2 | `ffbbd0d` | `*.vercel.app` hosts 308 to the real domain in production builds and get `X-Robots-Tag: noindex, nofollow` everywhere |
| A3 | `6454d7c` | `robots.ts`: all crawlers allowed (D3), `/api/` disallowed, sitemap line |
| A4 | `2c15f78` | `sitemap.ts` with fixed per-route dates; `/blog` excluded until a post exists; `sitemapSources` list for later phases |
| A5 + A6 | `77478b6` | `buildMetadata()` in `src/lib/seo.ts`; unique title, description, canonical, og and twitter on all 9 routes; locale `en_IN`. A6 is one constant inside the A5 helper, so they share a commit |
| A7 | `d0acc40` | Entity graph on home (Organization, WebSite, ProfessionalService); WebPage family and BreadcrumbList elsewhere; old layout-wide schema removed |
| (extra) | `3dde2a4` | Your design work (video hero, glass nav, less purple) committed on its own so A8 stayed clean. Not an SEO step |
| A8 | `7cd7453` | Homepage preloads 29 to 3, page weight halved; LCP target not met, see below |
| A9 | `827df0d` | Deleted `src/data/*` and 28 unused sections (3,054 lines) |
| A10 | `89d2005` | GA4 + Clarity behind env vars, five events, honest contact form |
| A11 | none | waiting on the real URLs; plumbing verified |

Every step ran `npm run lint` (0 errors, 1 old warning in `social-media.tsx`) and `npm run build` before its commit. A9 and A10 also ran `tsc --noEmit`.

### A2: vercel.app (code, `next.config.ts`)

Chosen: redirect in production plus noindex everywhere on `*.vercel.app`. Verified on a local production server with different `Host` headers (production build: `collabrate.vercel.app`, deployment URLs and `/about` all 308 to `https://collabrate.digital/...` with the query kept; `collabrate.digital` and `localhost` return 200 with no robots header; preview-style build: vercel.app host returns 200 with `X-Robots-Tag: noindex, nofollow`). `www` is not touched by this rule (A1 handles it).
**Not verified on Vercel itself.** The redirect depends on `VERCEL_ENV=production` at build time. After your next deploy run `curl -I https://collabrate.vercel.app` and expect a 308.

### A3: robots.ts

Output has 12 user-agent groups, each repeating `Disallow: /api/` (a crawler obeys only its most specific group), and `Sitemap: https://collabrate.digital/sitemap.xml`. Host comes from `site.domain` through the new `siteUrl` export in `src/lib/content.ts`.

### A4: sitemap.ts

8 URLs, no `/blog`. Dates are constants taken from each page's last commit (not `new Date()`); update them in `src/lib/sitemap-sources.ts` when a page's content really changes. Add blog posts in `src/content/blog-posts.ts`; later phases append a function to `sitemapSources`.

### A5 + A6: metadata

Verified by fetching all 9 routes from a production build: each has its own `<title>`, canonical, `og:title`, `og:url`, `twitter:title`; `og:locale` is `en_IN`; `/blog` is `noindex, nofollow`. Titles are 27 to 55 characters, descriptions 120 to 155 (checked with a script). The root layout now holds defaults only (no `og:url`, no canonical).

### A7: schema

Verified by parsing the JSON-LD on every route: home has `Organization + WebSite + ProfessionalService`; the 7 other pages have a WebPage-family node plus `BreadcrumbList`; `/blog` has none. Scan found no `aggregateRating`, `reviewCount`, `telephone`, `streetAddress`, `founder`, `legalName` or `PENDING`. Organization logo is `/brand/icons/icon-512.png` (returns 200). `sameAs` currently holds Instagram only.
**Two judgement calls to review:** (1) `areaServed` lists the six GCC states for "Gulf countries" in the JSON, as the playbook prompt says; (2) `about` on the page graph points at the Organization.
**Not run:** Google's Rich Results Test (needs a public URL). Run it on the live home page after deploy.

### A8: performance (honest result)

Lighthouse mobile, simulated slow 4G, local production build, same machine and settings before and after:

| Metric | Before | After |
|---|---|---|
| Performance score | 68 | 78 |
| Total page weight | 2,447 KiB | 1,213 KiB |
| TBT | 370 ms | 110 ms |
| LCP | 4.7 s | **4.5 s** |
| FCP | 2.2 s | 2.0 s |
| CLS | 0 | 0 |
| `rel=preload` tags | 29 | 3 |
| `<img>` with `loading="lazy"` | 18 of 79 | 78 of 81 |

What changed: lazy-load below-the-fold logos (they were preloaded because plain `<img>` tags were treated as eager); hero poster is now a priority `next/image` (86 KB jpg served as 19 KB); the video mounts only after load and idle (`DeferredVideo`); a 646 KB mobile clip under 768px (desktop clip 1.4 MB to 1.2 MB); the "Our work" clip loads on desktop only.
**LCP target (under 2.5 s) is NOT met.** The LCP element is the hero poster, which loads in about 0.3 s but is not painted until about 4.5 s: Lighthouse reports a 2.2 s "element render delay". Likely causes, in order: two render-blocking CSS files (about 450 ms), variable-font loading, and main-thread hydration (about 1 s of script and 0.7 s of style work). That needs a deeper pass (trim hydration, fonts, CSS), not more image work. The other targets, INP and CLS, were not at risk (CLS is 0; INP can only be measured with real users).
Unused fonts: `@fontsource-variable/inter` and `sora` are still installed. I did not remove packages; remove them if nothing imports them.

### A9: legacy data

Reachability trace from every file under `src/app`: the three `src/data/*` files were imported only by 28 section components that no route renders. All deleted. `tsc` and build pass; all routes still prerender.
Still unreachable but kept (no fake copy, so not a compliance risk): `src/components/shared/` (animated-counter, aurora-background, eyebrow, glow-card, hero-art, icon-map, marquee, mesh-background), `src/components/ui/` (animated-3d-card, avatar, badge, card, coverflow-carousel, separator), `src/lib/cover-art.ts`, `src/lib/service-images.ts`. Safe to delete later if you want a clean tree.

### A10: analytics (needs input from you)

Built: GA4 and Clarity load via `next/script` only when `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID` are set. Verified: with the IDs unset the home HTML has no googletagmanager or clarity references; with test IDs, the rendered DOM (headless Chrome) contains the gtag init and the Clarity script. The five events are wired: `generate_lead`, `click_email` and `click_calendly` (delegated link clicks), `view_portfolio_item` (card scrolls into view, once), `scroll_faq_open`. **I could not verify events reach GA4** (no real ID); use GA4 DebugView after you add the ID.

**Behaviour change you must know about.** The contact form previously showed "Sent, we'll be in touch" after a `setTimeout`, without sending anything, so real enquiries were being lost silently. I did not fire `generate_lead` on that. The form now posts to a new `/api/contact` route that forwards to `CONTACT_WEBHOOK_URL` (400 on bad input, 503 until the variable is set, 502 if the webhook fails). Verified: bad JSON, missing fields, bad service and bad "heard from" all return 400; a valid post with no webhook returns 503; with a local mock webhook it returns 200 and the webhook received the full payload including `heardFrom`. **Until you set `CONTACT_WEBHOOK_URL` in Vercel, the form on the live site shows an error with an email fallback (hello@collabrate.digital) instead of a fake "Sent".** That is honest, but it means you must connect it (Zapier, Make, n8n, or any email webhook) before or right after deploy. The optional "How did you hear about us?" field (Google, LinkedIn, Instagram, ChatGPT or other AI, Referral, Other) is added and validated server-side.

Still needed from you:
1. Create the GA4 property, then set `NEXT_PUBLIC_GA_ID` (G-XXXX) and `NEXT_PUBLIC_CLARITY_ID` in Vercel, and mark `generate_lead` as a key event in GA4.
2. Set `CONTACT_WEBHOOK_URL` in Vercel.
3. **Decision D4 (consent banner) is still open.** Analytics loads on every visit. If you target Singapore or Gulf visitors and want a consent notice, say so; the only file to change is `src/components/analytics/analytics.tsx`.

### A11: PENDING_LINK (blocked on you)

I do not have the real LinkedIn page or booking URL and did not invent any. Verified the wiring with a throwaway dry run (dummy URLs set, built, then reverted with `git checkout`; no commit): the home schema `sameAs` gained the LinkedIn URL, the footer showed a live LinkedIn link, and the contact page showed a live Calendly button. When you have the URLs, edit `src/content/collabrate-content.json` in **both** places that hold `PENDING_LINK`: `site.social.linkedin` and `site.calendlyUrl` at the top, and the `directContact` block on the contact page data (`social.linkedin`, near line 214). Then rebuild.

### Phase A exit check (yours to run)

1. Deploy, then `curl -I https://collabrate.vercel.app` (expect 308) and open `/robots.txt` and `/sitemap.xml` on the live domain.
2. Submit `https://collabrate.digital/sitemap.xml` in Search Console and Bing.
3. Request indexing for `/`, `/services`, `/portfolio`, `/about`, `/pricing`, `/contact`.
4. Run the Rich Results Test on the live home page.
5. `/seo audit` and `/seo drift compare` once claude-seo is installed (not done in this session).

### Things I deliberately did not do

No push, no deploy, no env vars set, no DNS or domain changes beyond A1, no new copy beyond what the playbook specified (page titles and the "How did you hear" options come from it; descriptions use facts already in the content JSON; the contact error text is functional microcopy, review it).

