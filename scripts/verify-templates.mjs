// B9 template verification against a running production server.
// Usage: node scripts/verify-templates.mjs [baseUrl]
// Checks, for every URL in the sitemap under /services/, /industries/, /portfolio/, /locations/
// (the deep templates) plus /pricing and /about: one H1; unique <title> of at most 60 chars;
// description 120 to 155; canonical and og:url equal to the page's own URL; exactly one
// og:image and one twitter:image; JSON-LD parses and has no forbidden fields; the breadcrumb
// schema matches the visible breadcrumb trail; FAQ schema matches the visible FAQ text.
// Also: the sitemap has no duplicate URLs.

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const ORIGIN = "https://collabrate.digital";
const FORBIDDEN_KEYS = ["aggregateRating", "review", "telephone", "streetAddress", "founder", "priceRange", "offers", "geo"];
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const strip = (html) => decode(html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
let failures = 0;
const fail = (path, msg) => {
  failures++;
  console.error(`FAIL ${path}: ${msg}`);
};

if (new Set(urls).size !== urls.length) fail("/sitemap.xml", "duplicate URLs");

const targets = urls
  .map((u) => u.replace(ORIGIN, ""))
  .filter((p) => /^\/(services|industries|portfolio|locations)\/[^/]+$/.test(p) || p === "/pricing" || p === "/about");

const titles = new Map();
const hasKey = (node, keys) => {
  if (Array.isArray(node)) return node.some((n) => hasKey(n, keys));
  if (node && typeof node === "object") return Object.entries(node).some(([k, v]) => keys.includes(k) || hasKey(v, keys));
  return false;
};

for (const path of targets) {
  const res = await fetch(`${base}${path}`);
  const html = await res.text();
  const own = `${ORIGIN}${path}`;
  const one = (re) => [...html.matchAll(re)].map((m) => decode(m[1]));

  if ((html.match(/<h1[\s>]/g) ?? []).length !== 1) fail(path, "not exactly one H1");
  const title = one(/<title>(.*?)<\/title>/g)[0] ?? "";
  if (!title || title.length > 60) fail(path, `title ${title.length} chars: ${title}`);
  if (titles.has(title)) fail(path, `duplicate title with ${titles.get(title)}`);
  titles.set(title, path);
  const desc = one(/<meta name="description" content="(.*?)"/g)[0] ?? "";
  if (desc.length < 120 || desc.length > 155) fail(path, `description ${desc.length} chars`);
  if (one(/<link rel="canonical" href="(.*?)"/g).join() !== own) fail(path, "canonical is not the page's own URL");
  if (one(/<meta property="og:url" content="(.*?)"/g).join() !== own) fail(path, "og:url is not the page's own URL");
  if (one(/<meta property="og:image" content="(.*?)"/g).length !== 1) fail(path, "not exactly one og:image");
  if (one(/<meta name="twitter:image" content="(.*?)"/g).length !== 1) fail(path, "not exactly one twitter:image");
  if (/noindex/.test(one(/<meta name="robots" content="(.*?)"/g).join())) fail(path, "noindex page is in the sitemap");

  const blocks = one(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  if (blocks.length === 0) fail(path, "no JSON-LD");
  for (const block of blocks) {
    let data;
    try {
      data = JSON.parse(block.replace(/\\u003c/g, "<"));
    } catch {
      fail(path, "JSON-LD does not parse");
      continue;
    }
    if (hasKey(data, FORBIDDEN_KEYS)) fail(path, "JSON-LD has a forbidden field");
    const graph = data["@graph"] ?? [data];

    // Breadcrumb schema must equal the visible trail.
    const crumbSchema = graph.find((n) => n["@type"] === "BreadcrumbList");
    const nav = html.match(/<nav aria-label="Breadcrumb"[\s\S]*?<\/nav>/);
    if (crumbSchema && nav) {
      const visible = [...nav[0].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => strip(m[1]));
      const schemaNames = crumbSchema.itemListElement.map((i) => i.name);
      if (visible.join("|") !== schemaNames.join("|")) fail(path, `breadcrumb mismatch: visible [${visible}] vs schema [${schemaNames}]`);
    } else if (!crumbSchema) {
      fail(path, "no BreadcrumbList schema");
    }

    // FAQ schema must equal the visible FAQ text.
    const faq = graph.find((n) => n["@type"] === "FAQPage");
    if (faq) {
      const text = strip(html);
      for (const q of faq.mainEntity) {
        if (!text.includes(q.name) || !text.includes(q.acceptedAnswer.text)) fail(path, `FAQ schema text not visible: ${q.name}`);
      }
    }
  }
}

console.log(`Checked ${targets.length} template pages (${urls.length} sitemap URLs). ${failures === 0 ? "All passed." : `${failures} failure(s).`}`);
process.exitCode = failures > 0 ? 1 : 0;
