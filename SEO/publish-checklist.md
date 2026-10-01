# Publish checklist (use for every batch)

Nothing goes live unreviewed. A page is published by setting `published: true` on its entry in `src/content/*.ts` (pricing and About: the block-level `published` flag). Drafts 404 in production, so each batch is invisible until you flip it.

## Order of batches
1. **Batch 1: AI and web service pages** (best ranking odds): ai-chatbots, workflow-automation, ai-support-systems, ai-voice-assistants, custom-llm-integration, website-development, mobile-app-development, business-websites, e-commerce, landing-pages, dashboards-and-admin-panels.
2. **Batch 2: marketing services**: social-media-marketing, performance-marketing, email-marketing, linkedin-outreach, seo, digital-marketing-strategy.
3. **Batch 3: industries (5) and case studies (5).** Publish an industry page together with its case study so the cross-links are live.
4. **Batch 4: pricing and About blocks.**
5. **Batch 5+: town and district pages**, a few towns at a time, only with unique copy from the CSV.

## Before flipping a flag
- [ ] Every `TODO(verify)` on that entry is resolved or the sentence is removed (list: `node scripts/todo-report.mjs`, or [phase-b-todo.md](phase-b-todo.md)).
- [ ] You read the page in `npm run dev` and every sentence is true.
- [ ] Related industries and projects the page links to are published too (or the link simply will not appear).
- [ ] No client name, count, rating, price, team size or founder name.

## After flipping, locally
```
npm run lint && npx tsc --noEmit && npm run build
npx next start -p 3000          # separate terminal
node scripts/check-links.mjs http://localhost:3000        # 0 broken, 0 unpublished links, 0 orphans
node scripts/verify-templates.mjs http://localhost:3000   # titles, canonicals, schema, FAQ text
node scripts/check-uniqueness.mjs http://localhost:3000   # no pair above 50 percent
node scripts/check-forbidden.mjs http://localhost:3000
node --no-warnings scripts/check-service-copy.mjs
```

## Ship and register
- [ ] Commit and push to `main` (Vercel deploys).
- [ ] On the live site: `curl -I https://collabrate.digital/services/<slug>` is 200; the page appears in `/sitemap.xml` and `/llms.txt`.
- [ ] Search Console: URL Inspection, Request indexing for each new URL (and the hub: `/services`, `/industries`, `/portfolio`, `/locations`).
- [ ] Bing Webmaster: submit the sitemap (or IndexNow).
- [ ] After 2 to 4 weeks: Search Console, Pages and Performance reports for the batch; claude-seo `drift compare` against the baseline.

## One-time setup this week (yours)
- [ ] Google Search Console, Domain property `collabrate.digital` (DNS TXT in Cloudflare); submit `sitemap.xml`.
- [ ] Bing Webmaster Tools (import from Search Console).
- [ ] Google Cloud API key for PageSpeed Insights and CrUX (free), for `/seo google setup`.
- [ ] `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `CONTACT_WEBHOOK_URL` in Vercel.
- [ ] Google Business Profile (service area, address hidden), LinkedIn company page, Bing Places; copy wording from [brand-facts.md](brand-facts.md).
- [ ] Real LinkedIn and booking URLs into `src/content/collabrate-content.json` (both `PENDING_LINK` places).
- [ ] Fill and commit `SEO/locations-input.csv` (`service_delivered`, `industry_type`, `review_permission`).
