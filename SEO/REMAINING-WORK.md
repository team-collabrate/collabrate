# Remaining work: full scan (2026-10-02)

Sources: all five Claude chats for this project (Aug 19 to Oct 2), the repo, the live site, DNS, Vercel, `npm audit`, the Windmark reference, and the SEO files. Items are tagged **[you]** (needs your input or access), **[me]** (I can do it), or **[both]**. Priority: P0 do first, P1 this week, P2 later.

## 0. What the chats show (so nothing is lost)
| Chat | Dates | Covered | Left open from it |
|---|---|---|---|
| 1 | Aug 19 to Sep 29 | Service card alignment (3 points, 3 lines), `/services` copy tweaks, Woo and Amazon logos, tooltip clipping, "end the AI slop look", Windmark redesign brief | The redesign itself moved to chat 3 |
| 2 | Sep 29 | Windmark accuracy comparison, Playwright MCP setup | Done in chat 3 |
| 3 | Sep 29 to Oct 1 | Windmark-style homepage, navbar, footer; logo; Vercel deploy and git integration; hero video (3 clips); design iterations | Mobile and tablet never checked after several design changes; the "62115893" clip decision; "Our work" card placeholders |
| 4 | Sep 29 | Logo variants, navbar behaviour, footer copy and AI-explore block, card artwork sizes, floating icons | Only the Website Development card has custom artwork (see 3.3) |
| 5 (this) | Oct 1 to 2 | SEO Phase A, Phase B, accessibility fixes, claude-seo, Search Console | See below |

## 1. P0: do these first
1. **Upgrade Next.js (security). [me]** `npm audit` reports a **critical** advisory for Next 16.0.0 to 16.3.5 (remote code execution paths, one in the image optimizer with AVIF) and a **high** one for `sharp`. The project is on 16.3.0. A non-breaking fix exists: Next 16.3.8. Upgrade, rebuild, run all checks, deploy. (Vercel's own hosting reduces exposure but the fix is cheap.)
2. **Unattributed testimonials are live on the homepage. [you decide, me remove or replace]** "What clients say" shows four quotes taken from the JSON placeholders (`[Client Name]`), with the names hidden. They read as real client quotes but nobody can be named, and the JSON itself says they must be replaced by real, permissioned quotes before launch. Either get 3 to 4 real quotes (with permission, a first name and company type is enough) or remove the section until you have them. Same goes for the playbook's rule on fabricated testimonials.
3. **Email authentication looks broken. [you, in Cloudflare and Zoho]** DNS shows `DMARC p=reject; adkim=s; aspf=s` (strict), Zoho MX, and an SPF for Zoho, but the Zoho DKIM selector (`zoho._domainkey`) resolves to an empty key (`v=DKIM1; p=`), which looks like a wildcard "no DKIM" record, not a real key. With strict DMARC and no valid DKIM, mail from hello@collabrate.digital (including contact-form replies and notifications) can be rejected or land in spam. Fix: in Zoho Mail admin, copy the real DKIM record for the domain, add it in Cloudflare, and until it verifies relax DMARC to `p=none` or `p=quarantine`. Test by sending to a Gmail address and checking "Show original" for DKIM and DMARC pass. (This is inferred from DNS; Zoho's admin page will confirm.)
4. **Contact form is not wired. [you]** Set `CONTACT_WEBHOOK_URL` in Vercel. Until then the form shows an error with an email fallback. Also set `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (the form code added spam protection that only activates when they exist) and `NEWSLETTER_WEBHOOK_URL` (or remove the footer newsletter form, which currently answers "isn't connected yet").
5. **Search Console follow-up. [you]** Sitemap showed "Couldn't fetch" on 2 Oct (the file is fine: 200, valid XML). Recheck in 2 to 3 days; do not resubmit repeatedly.

## 2. DevOps and infrastructure
| Item | State | Action |
|---|---|---|
| Hosting and deploy | Vercel project `collabrate`, git auto-deploy from `main` works; Phase B is live | none |
| Domains | `collabrate.digital` 200, `www` 308 to apex, Cloudflare DNS (DNS only) | none |
| `collabrate.vercel.app` | Belongs to someone else's unrelated project | Do not use it for checks; own preview hosts are login-protected and noindex |
| Env vars in Vercel | Missing: `CONTACT_WEBHOOK_URL`, `TURNSTILE_*`, `NEWSLETTER_WEBHOOK_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional) **[you]** | Add, then redeploy |
| Security headers | Only HSTS. No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy **[me, P1]** | Add in `next.config.ts` `headers()`; test GA, Clarity and Turnstile still load before enforcing a CSP |
| Dependencies | 1 critical (Next), 1 high (`sharp`) **[me, P0]**; unused packages `@fontsource-variable/inter` and `sora` (no imports) **[me, P2]** | `npm install next@16.3.8`, `npm audit fix`, remove unused fonts |
| CI | None. No `.github/workflows` **[me, P1]** | Add a workflow: lint, `tsc`, build, `check-service-copy`, `check-slugs` on every push and PR |
| Stale branch | `origin/homepage-windmark-style` still exists and spawns preview deployments **[you]** | Delete after confirming it is merged |
| Docs | `README.md` still describes an old "AI-First landing page" with Inter and Sora; `DEPLOY.md` still tells you to push and mentions Cloudflare Workers **[me, P2]** | Rewrite both to match reality |
| Unpushed work | 2 local commits (brand facts, competition report) **[me]** | Push |
| DNS hygiene | No CAA record; DMARC strict (see P0) **[you, P2]** | Optional: add CAA allowing the certificate issuers in use |
| Monitoring | None (no uptime or error tracking) **[you, P2]** | Add a free uptime monitor and Vercel Analytics or Sentry if wanted |
| Backups and secrets | `.env.local` is gitignored (good); two untracked SEO docs and the CSV sit outside git **[you]** | Commit `SEO/locations-input.csv` and the playbook files (or move them) so a fresh clone has them |

## 3. Development: website, page by page
### 3.1 Performance and quality
- **LCP 3.7 s live (target 2.5 s). [me, P1]** Cause measured earlier: render-blocking CSS (about 450 to 570 ms), webfont swap (about 240 ms), hydration cost. Plan: trim and inline critical CSS, `font-display` and preload the two fonts actually used, defer non-critical client components, check `Reveal` wrappers (they leave inline `opacity:0` in raw HTML on older pages).
- **Mobile and tablet never verified [me, P1].** Several chat-3 and chat-4 changes (hero video text, glass navbar, footer, card artwork) were only screenshot-checked at desktop width. Run a pass at 360, 412, 768 and 1024 widths on every page.
- Lighthouse today (live home): performance 78, SEO 100, accessibility 100, best practices 100. Template pages: 92 to 93 performance.
- Missing **custom 404 page** (`src/app/not-found.tsx`) and `error.tsx`; visitors currently get the framework default **[me, P1]**.
- Header mega-menu "Industries" row and mobile link are unverified visually (they only appear once an industry is published) **[me, with first publish]**.

### 3.2 Content and compliance
- Pre-existing en dash in the services copy ("Sales Navigator–driven prospecting") in `collabrate-content.json`; harmless but breaks the "no dashes" style rule **[me, P2]**.
- Privacy policy (last updated August 2026) says analytics "may" be used; once GA4, Clarity and Turnstile are live it should name them, say what is collected, and mention cookies. Consider a consent notice for Singapore and Gulf visitors (decision D4) **[you decide, me build]**.
- Terms and privacy have no company legal name, address or grievance contact; fine for now but required in some jurisdictions once you take payments **[you]**.
- The About page still says "Our team handles both" and "One team" (JSON wording) against the no-team-claims rule **[you decide]**.
- `Blog` route exists but is empty and noindex (correct); no posts yet.

### 3.3 Visual gaps against your intent
- **Services bento artwork [you generate, me place].** You wanted generated pictures for all cards. Only Website Development has custom artwork; the other six cards use older stock-style JPGs. The card sizes you need are in chat 4 (narrow cards 421 x 410 px, wide 867 x 410 px; generate 1000 x 1000 px, transparent background if possible).
- **"Our work" cards use gradient placeholder art**, not project screenshots (comment in `work-showcase.tsx`: "there are no real project screenshots to show yet"). Windmark uses real project imagery; this is the biggest visual gap. Needs real screenshots **[you]** with alt text; the case-study pages already have a slot for them.
- Hero video: three clips are in `public/video` (hero, work, work-reel); `62115893.mp4` (another brand's promo with slogans) was only used in the "Our work" card after logo cuts; confirm you are happy with it **[you]**. Remove the unused `work.mp4` if not needed **[me]**.
- Unreachable components still in the tree (animated counter, aurora, glow-card, hero-art, mesh-background, cover-art, coverflow carousel, etc.) **[me, P2]**.

## 4. Comparison with the reference (thewindmark.com)
Section by section, what Windmark has against what we have (we may copy structure and feel, never wording, photos, numbers, team claims or pricing):

| Windmark section | Collabrate home | Gap |
|---|---|---|
| Full-bleed video hero, strong H1, two CTAs, tool/logo strip | Done (own video, own headline, tool logos) | Mobile QA |
| "An agency that owns the whole website": bento of services with imagery | Done (7 cards) | Custom artwork on 6 of 7 cards |
| "Websites we've designed, built, and shipped": 6 real client projects with screenshots | 6 anonymised projects with gradient art | **Real screenshots** (blocked on you) |
| Founders and client testimonials with names | 4 unattributed quotes | **Real, permissioned quotes or remove** (P0) |
| "Agency, freelancer, or Windmark" comparison table | Done (qualitative, no claims about named competitors) | none |
| Process or "how it works" | **Missing** on the home page (your own redesign brief listed "How we work / process") | Add a plain 4 to 5 step section using the JSON wording from About and Pricing **[me, P1]** |
| Detailed FAQ: price, timeline, tools, team, support, migration | 9 questions, shorter, no numbers | Deepen answers (what is included, how we start, what we need from you) within the no-numbers rule **[me, P2]**; consider FAQPage schema (value is limited since Google restricts FAQ rich results) |
| Footer with AI-explore, newsletter, email marquee | Done | Newsletter backend or removal |
| Real client logos | Correctly absent (rule: no invented logos) | Add only with permission |
| Concrete numbers (price from, weeks, team structure) | Absent by rule | Do not copy |

## 5. SEO: everything open
### 5.1 Done
Phase A (domains, robots, sitemap, metadata, schema, analytics wiring), Phase B (17 services, 5 industries, 5 case studies, pricing and About additions, location machinery, llms.txt, manifest, OG images, link and copy checkers), brand facts, baseline and competitor matrix, Search Console verified.

### 5.2 Open, in order
1. **Publish content [you review, me flip and verify].** 29 entries are drafts (17 services, 5 industries, 5 case studies, pricing block, About block). 74 `TODO(verify)` items are listed in `SEO/phase-b-todo.md`. Publish in the batch order in `SEO/publish-checklist.md`; after each batch run the five checkers, push, and request indexing.
2. **Indexing.** Only the home page is confirmed in Search Console so far; the other pages are "not indexed" (normal for a new domain). More internal links (the Phase B pages) and external signals (profiles, directories) are what move this.
3. **Brand entity [you create, me draft].** Google Business Profile (service area, address hidden), LinkedIn company page, Bing Places, Instagram bio link, YouTube if wanted. Use `SEO/brand-facts.md`. Name collisions (Collabera, Collab, the Collabrate email product) make this high value.
4. **Bing Webmaster Tools** (import from Search Console) and IndexNow **[you]**.
5. **Town pages [you fill CSV, me write].** Fill `service_delivered`, `industry_type`, `review_permission` for Aruppukottai, Tirunelveli, Tenkasi, Sivakasi, Kovilpatti; commit the CSV; optional Tamil text. Then unique town and district copy.
6. **Real LinkedIn and Calendly URLs [you]** into `collabrate-content.json` (two places each), so `sameAs`, About, footer and CTAs light up.
7. **Proof [you].** 3 to 6 screenshots with alt text and one verifiable outcome per case study; 5 permissioned reviews in 60 days.
8. **Directories [you].** Clutch, GoodFirms, Sortlist, DesignRush, Justdial, Sulekha (where competitors appear), all using the brand-facts wording.
9. **Free data upgrade [you].** Google Cloud API key for PageSpeed and CrUX, then `/seo google setup`; optional Search Console OAuth so claude-seo can read real queries.
10. **GA4 and Clarity IDs [you]**, mark `generate_lead` as a key event; decide consent (D4).
11. **Re-measure [me].** Re-run the claude-seo audit and `drift compare` and the competitor matrix in 6 to 8 weeks.
12. **Content engine (Phase D, later).** First 2 posts from real local questions (`/seo content-brief`), then a steady cadence; Phase C off-site (guest posts, partner pages) after the basics.
13. **Optional extras.** Competitor "vs" pages (carefully, no false claims), Tamil/Tanglish pages after the English town pages, WhatsApp button once a monitored number exists (D6).

## 6. Decisions waiting on you
1. Remove the testimonials section now, or wait for real quotes?
2. Brand descriptor: "Collabrate Digital" (default).
3. Soften "One team" on the About page?
4. Keep the AI-screening line on the workforce industry page?
5. Keep the turf project as an e-commerce example?
6. Consent banner (D4): yes or no?
7. WhatsApp number (D6): publish one or not?
8. Keep or drop the `62115893` reel in "Our work"?
9. Delete the old `homepage-windmark-style` branch?
