# Deploying and operating the site

Hosting: Vercel (project `collabrate`, team `teamcollabrate-3053s-projects`). Source: GitHub `team-collabrate/collabrate`. DNS: Cloudflare. Domain: `collabrate.digital` (the `www` host redirects to it).

## The normal deploy

Push to `main`. Vercel's GitHub integration builds and deploys it to production automatically (about a minute). Other branches and pull requests get preview deployments.

Before pushing:

```bash
npm run lint && npm run typecheck && npm run check:copy && npm run check:slugs
npm run build
npm start &            # then, in another terminal or after it is up:
npm run check:site     # links, orphans, per-page SEO tags and schema, uniqueness, forbidden content
```

CI (`.github/workflows/ci.yml`) runs the same sequence on every push and pull request.

After deploying, check the live site:

- `https://collabrate.digital/` returns 200, `https://www.collabrate.digital/` redirects (308) to it;
- `/sitemap.xml` lists only published pages, `/robots.txt` and `/llms.txt` load;
- a draft URL such as `/services/seo` returns 404 until its entry is published.

## Which hosts are ours

- Public: `collabrate.digital` and `www.collabrate.digital`.
- Per-deployment and branch hosts look like `collabrate-<hash>-teamcollabrate-3053s-projects.vercel.app`. They sit behind Vercel login and send `X-Robots-Tag: noindex`.
- `collabrate.vercel.app` is **not** this project (it serves an unrelated site). Do not use it for checks.

## Environment variables

Listed in [README.md](README.md#environment-variables). Add or change them in Vercel (Project Settings, Environment Variables), then redeploy: `NEXT_PUBLIC_*` values are baked in at build time. Never put them in the repo.

Needed for a fully working site: `CONTACT_WEBHOOK_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_CLARITY_ID`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Optional: `NEWSLETTER_WEBHOOK_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## Vercel CLI (optional)

```bash
npm i -g vercel
vercel login
vercel ls collabrate            # recent deployments
vercel domains ls               # domains on the team
```

Avoid `vercel --prod` for routine work; pushing to `main` is the deploy.

## Domain and DNS (Cloudflare)

- Records that point at Vercel must be **DNS only** (grey cloud), because Vercel issues and renews the certificate itself. Current values are shown in Vercel, Project Settings, Domains.
- Email runs on Zoho (MX, SPF, DKIM, DMARC records). Keep the Zoho records when editing DNS. DKIM must be a real key and DMARC should not be stricter than your DKIM setup supports; test by mailing a Gmail address and checking "Show original" for DKIM and DMARC pass.
- Google Search Console is verified through a `google-site-verification` TXT record. Keep it.

## Search Console

Domain property `collabrate.digital` (verified). Sitemap: `https://collabrate.digital/sitemap.xml` (enter the full URL for a Domain property). After each publishing batch, request indexing for the new URLs. See `SEO/publish-checklist.md`.

## Rolling back

Vercel keeps every deployment. In the Vercel dashboard, open Deployments, pick a previous Ready production deployment and choose "Promote to Production", or `vercel rollback`. Reverting the commit in git and pushing also works.

## Security headers

Set in `next.config.ts` (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy). If a new third-party script or embed does not work after a deploy, check the browser console for a "Refused to load" message and add the host to the CSP.
