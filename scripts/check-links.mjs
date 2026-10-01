// Internal link checker. Crawls a running site (default http://localhost:3000, i.e. `next start`
// on a production build) starting from the home page and the sitemap, and fails on:
//   1. broken internal links          (target does not answer 200)
//   2. links to unpublished pages     (target answers 200 but is noindex, i.e. a draft or an empty hub)
//   3. orphan pages                   (listed in the sitemap but linked from no other page)
//
// Usage:  npm run build && npx next start -p 3000   (other terminal)
//         node scripts/check-links.mjs [baseUrl]
// Exit code 1 on any failure.

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const SKIP = [/^\/_next\//, /^\/api\//, /\.(png|jpe?g|svg|webp|avif|gif|ico|mp4|webm|woff2?|css|js|json|txt|xml|pdf)$/i];

const normalise = (href, from) => {
  let url;
  try {
    url = new URL(href, `${base}${from}`);
  } catch {
    return null;
  }
  if (url.origin !== base && url.hostname !== "collabrate.digital" && url.hostname !== "www.collabrate.digital") return null;
  let path = url.pathname.replace(/\/+$/, "") || "/";
  if (SKIP.some((re) => re.test(path))) return null;
  return path;
};

async function get(path) {
  const res = await fetch(`${base}${path}`, { redirect: "manual" });
  const html = res.status === 200 ? await res.text() : "";
  return { status: res.status, location: res.headers.get("location"), html };
}

const linksIn = (html, from) => {
  const out = new Set();
  for (const m of html.matchAll(/<a\s[^>]*?href="([^"#]*)(?:#[^"]*)?"/gi)) {
    const href = m[1].replace(/&amp;/g, "&");
    if (!href || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
    const path = normalise(href, from);
    if (path) out.add(path);
  }
  return out;
};

const isNoindex = (html) => /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);

// Seed: home + every sitemap URL.
const sitemap = await get("/sitemap.xml");
if (sitemap.status !== 200) {
  console.error(`Cannot read ${base}/sitemap.xml (status ${sitemap.status}). Is the production server running?`);
  process.exit(1);
}
const sitemapPaths = [...sitemap.html.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((m) => normalise(m[1], "/"))
  .filter(Boolean);

const queue = ["/", ...sitemapPaths];
const seen = new Map(); // path -> { status, html }
const inbound = new Map(); // path -> Set(from)
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  const page = await get(path);
  seen.set(path, page);
  if (page.status !== 200) continue;
  for (const target of linksIn(page.html, path)) {
    if (target !== path) {
      if (!inbound.has(target)) inbound.set(target, new Set());
      inbound.get(target).add(path);
    }
    if (!seen.has(target)) queue.push(target);
  }
}

let failures = 0;
const report = (kind, lines) => {
  if (lines.length === 0) return console.log(`OK    ${kind}: none`);
  failures += lines.length;
  console.error(`FAIL  ${kind}: ${lines.length}`);
  for (const line of lines) console.error(`        ${line}`);
};

const sources = (path) => [...(inbound.get(path) ?? [])].slice(0, 3).join(", ");

report(
  "broken internal links",
  [...seen]
    .filter(([path, page]) => page.status !== 200 && inbound.has(path))
    .map(([path, page]) => `${path} -> ${page.status}${page.location ? ` (${page.location})` : ""}  linked from ${sources(path)}`)
);

report(
  "links to unpublished (noindex) pages",
  [...seen]
    .filter(([path, page]) => page.status === 200 && isNoindex(page.html) && inbound.has(path))
    .map(([path]) => `${path}  linked from ${sources(path)}`)
);

report(
  "orphan pages (in the sitemap, linked from nowhere)",
  [...new Set(sitemapPaths)]
    .filter((path) => path !== "/" && !inbound.has(path))
    .map((path) => path)
);

// Sitemap sanity: every sitemap URL must answer 200 and be indexable.
report(
  "sitemap entries that are broken or noindex",
  [...new Set(sitemapPaths)]
    .filter((path) => seen.get(path)?.status !== 200 || isNoindex(seen.get(path).html))
    .map((path) => `${path} -> ${seen.get(path)?.status}${seen.get(path)?.status === 200 ? " (noindex)" : ""}`)
);

console.log(`\nCrawled ${seen.size} pages, ${sitemapPaths.length} sitemap URLs.`);
process.exit(failures > 0 ? 1 : 0);
