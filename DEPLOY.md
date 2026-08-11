# Deploying Collabrate to Vercel

Vercel is Next.js's native host, so this is zero-config: no static export, no wrangler files, no build-output-directory settings. I reverted `next.config.ts` back to plain defaults and removed the Cloudflare-specific `wrangler.jsonc`. Vercel detects it's a Next.js project automatically and just builds and runs it.

Everything below runs on your own machine (not through Cowork), since it needs your GitHub and Vercel logins.

## 1. Push the code to GitHub

Same repo you already have (`team-collabrate/collabrate`) works fine, this isn't a GitHub problem, so no need to touch that part. Just make sure the latest changes are pushed:

```bash
git add -A
git commit -m "Switch to Vercel"
git push
```

If that repo is still giving you grief (the "linked to a repository that no longer exists" issue from before is a *Cloudflare*-side stale reference, unrelated to GitHub itself), first confirm `https://github.com/team-collabrate/collabrate` actually loads and shows your files before moving on.

## 2. Import the project into Vercel

1. Go to [vercel.com](https://vercel.com) → sign in with GitHub.
2. **Add New... → Project**.
3. Authorize the Vercel GitHub App if prompted, and select `team-collabrate/collabrate`. This is a separate GitHub App installation from Cloudflare's, so none of the earlier permission mess carries over, if Vercel can see the repo in the picker, it has access.
4. Vercel auto-detects **Framework Preset: Next.js**. Leave build/output settings on their defaults, don't override them.
5. Click **Deploy**. First build takes a minute or two. You'll get a `*.vercel.app` URL to confirm it works before wiring up the real domain.

Every future `git push` to `main` auto-deploys, same as Cloudflare would have. Pull requests also get their own preview URLs automatically.

## 3. Point collabrate.digital at Vercel

Your nameservers already point to Cloudflare (confirmed propagated), so the easiest path is to keep Cloudflare as your DNS host and just add records pointing at Vercel, no need to touch Porkbun again or revert anything.

1. In Vercel: project → **Settings → Domains** → add `collabrate.digital` (and `www.collabrate.digital` if you want both). Vercel will show you the exact record(s) it needs, typically:
   - `A` record: `@` → `76.76.21.21`
   - `CNAME` record: `www` → `cname.vercel-dns.com`
   (Vercel shows the current values on that page, use whatever it actually displays, these change occasionally.)
2. In Cloudflare: `collabrate.digital` → **DNS → Records** → add those records.
3. **Important:** set the proxy status to **DNS only** (grey cloud, not orange) on these records. Vercel issues and manages its own SSL certificate for the domain directly; routing it through Cloudflare's proxy on top can cause certificate/handshake conflicts (similar to the 525 error from before).
4. Back in Vercel, the Domains page will show a checkmark once it verifies the DNS, usually within a few minutes.

That's it, `https://collabrate.digital` will serve the live site over HTTPS.

## Cleanup (optional, no rush)

The old Cloudflare Worker project (`collabrate` under Workers & Pages) is now unused, you can delete it from the Cloudflare dashboard whenever, it's not costing you anything sitting there.

## One thing to know

The contact form on `/contact` is currently front-end only (it shows a "Sent" confirmation but doesn't actually send anywhere). If you want real submissions to reach your inbox, say so and I'll wire it up, e.g. a Vercel-friendly option like a Next.js Server Action calling Resend, which is even easier now that we're not on a static export.
