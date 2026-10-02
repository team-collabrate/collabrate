# Tomorrow: Collabrate to-do (Fri 3 Oct 2026)

Paste or import into Notion. Full detail: `SEO/REMAINING-WORK.md`. Tags: **[you]** needs you, **[me]** Claude does it.

## 1. First thing (30 minutes)
- [ ] **[you]** Zoho DKIM: copy the real DKIM record from Zoho Mail admin, add it in Cloudflare DNS, and set DMARC to `p=none` until it verifies. Send a test mail to Gmail and check "Show original" for DKIM and DMARC pass.
- [ ] **[you]** Decide: remove the "What clients say" section now, or wait for real quotes? (4 unattributed placeholder quotes are live.)
- [ ] **[you]** Search Console: Sitemaps page, did `https://collabrate.digital/sitemap.xml` change from "Couldn't fetch"? (Tell me; wait until day 3 before worrying.)

## 2. Vercel environment variables [you]
- [ ] `CONTACT_WEBHOOK_URL` (contact form delivery)
- [ ] `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (spam protection)
- [ ] `NEWSLETTER_WEBHOOK_URL` (or tell me to remove the footer newsletter)
- [ ] `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`
- [ ] Optional: `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] Redeploy after adding them

## 3. Development (me)
- [ ] **P0** Upgrade Next.js 16.3.0 to 16.3.8 and fix `sharp` (critical and high advisories), then lint, tsc, build, all checkers, deploy
- [ ] Custom 404 and error pages
- [ ] Security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy), test GA, Clarity, Turnstile still work
- [ ] "How we work" section on the homepage (plain 4 to 5 steps, JSON wording)
- [ ] Mobile and tablet pass at 360, 412, 768, 1024 on every page
- [ ] LCP fix (live 3.7 s, target under 2.5 s): critical CSS, font preload and swap, hydration trim
- [ ] CI workflow (lint, tsc, build, copy and slug checks)
- [ ] Rewrite `README.md` and `DEPLOY.md`; remove unused font packages
- [ ] Push the local commits (brand facts, competition report, remaining-work scan)

## 4. SEO (you, with me drafting)
- [ ] Create Google Business Profile (service area, address hidden), LinkedIn company page, Bing Places. Wording from `SEO/brand-facts.md`.
- [ ] Bing Webmaster Tools: import from Search Console
- [ ] Give me the real LinkedIn and Calendly URLs (goes into `collabrate-content.json`, two places each)
- [ ] Review draft pages in `npm run dev`, resolve `TODO(verify)` items (`SEO/phase-b-todo.md`), tell me which to publish. Start with batch 1: AI and web service pages.
- [ ] Fill `SEO/locations-input.csv` (`service_delivered`, `industry_type`, `review_permission`) for Aruppukottai, Tirunelveli, Tenkasi, Sivakasi, Kovilpatti, and commit the CSV
- [ ] Ask 3 to 5 clients for a permissioned quote or review, and screenshots
- [ ] Optional: Google Cloud API key (PageSpeed and CrUX) for claude-seo

## 5. Decisions waiting on you
- [ ] Soften "One team" on the About page?
- [ ] Keep the AI-screening line on the workforce page?
- [ ] Keep the turf project as an e-commerce example?
- [ ] Consent banner for Singapore and Gulf visitors (D4)?
- [ ] Publish a WhatsApp number (D6)?
- [ ] Keep or drop the `62115893` clip in "Our work"?
- [ ] Delete the old `homepage-windmark-style` branch?

## 6. Later this week
- [ ] Generate artwork for the other 6 service cards (1000 x 1000 px, transparent if possible)
- [ ] Real project screenshots for "Our work" and the case studies
- [ ] Directory listings: Clutch, GoodFirms, Sortlist, DesignRush, Justdial, Sulekha
- [ ] Privacy policy update (name GA4, Clarity, Turnstile; cookies)
- [ ] Re-run the SEO audit and competitor matrix in 6 to 8 weeks
