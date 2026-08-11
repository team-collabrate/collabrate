# Deploying Collabrate to Cloudflare Pages

The site is already configured for this: `next.config.ts` now builds a fully static export (`output: "export"`), which I verified builds cleanly into an `out/` folder that Cloudflare Pages can serve directly, no server runtime needed.

Everything below runs on your own machine (not through Cowork), since it needs your GitHub and Cloudflare logins.

## 1. Push the code to GitHub

In a terminal, `cd` into your `collab_web` folder, then:

```bash
git init
git add -A
git commit -m "Initial commit"
```

Create a new empty repo on GitHub (github.com → New repository → don't initialize with a README). Then:

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git branch -M main
git push -u origin main
```

**Before moving on, open the repo in your browser** (e.g. `https://github.com/<org-or-user>/<repo-name>`) and confirm you actually see your files (`package.json`, `src/`, etc.), not an empty repo. Cloudflare's "Cloning repository..." step fails instantly with `error occurred while fetching repository` if the repo has no commits yet, this is the single most common cause, more common than GitHub App permissions.

## 2. Connect the repo to Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize Cloudflare's GitHub app and pick the repo you just pushed.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Click **Save and Deploy**. First build takes a couple of minutes. You'll get a `*.pages.dev` URL to confirm it works before wiring up the real domain.

Every future `git push` to `main` auto-deploys.

**If the build fails at "Cloning repository..." with `error occurred while fetching repository`:** this almost always means the Cloudflare GitHub App doesn't actually have access to the repo, most commonly because it was installed with "Only select repositories" and this one wasn't checked, or the repo was renamed/transferred after the app was installed. Fix:

1. Go to [github.com/settings/installations](https://github.com/settings/installations) (or your org's equivalent) → find **Cloudflare Workers and Pages** → **Configure**.
2. Under **Repository access**, either switch to **All repositories**, or make sure this specific repo is checked under **Only select repositories**.
3. Retry the deployment from the Cloudflare dashboard (or push a new commit).

If that doesn't fix it, uninstall the **Cloudflare Workers and Pages** GitHub App entirely from that settings page, then in Cloudflare go to **Workers & Pages → Create → Pages → Connect to Git** again to reinstall it fresh and re-pick the repo.

## 3. Point your Porkbun domain at Cloudflare

1. Cloudflare dashboard → **Add a domain**, enter the domain you bought on Porkbun.
2. Cloudflare scans existing DNS records, then gives you two nameservers (something like `xxx.ns.cloudflare.com` / `yyy.ns.cloudflare.com`).
3. In Porkbun: **Account → Domain Management** → your domain → **NS** (nameservers) → replace Porkbun's default nameservers with the two Cloudflare gave you.
4. Nameserver changes usually take effect within a few minutes to a few hours (can take up to 24h). Cloudflare emails you once it detects the switch and the domain becomes "Active."

## 4. Attach the domain to your Pages project

1. Workers & Pages → your project → **Custom domains** → **Set up a custom domain**.
2. Enter the domain (and `www` subdomain if you want both). Cloudflare auto-creates the DNS records and issues SSL since the domain is now on Cloudflare's nameservers.

That's it, the domain will serve the live site over HTTPS.

## One thing to know

The contact form on `/contact` is currently front-end only (it shows a "Sent" confirmation but doesn't actually send anywhere). If you want real submissions to reach your inbox, say so and I'll wire it up to an email service (e.g. Resend) or a form backend, since a static export has no server to handle it natively, it'd call a small external API instead.
