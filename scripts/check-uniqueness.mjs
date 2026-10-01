// B9 text-uniqueness check. Usage: node scripts/check-uniqueness.mjs [baseUrl]
// For every pair of published pages of the same template (services, industries, portfolio,
// locations), compute the overlap of 5-word shingles in the page's main text and flag any pair
// above 50 percent. Overlap = shared shingles / shingles in the smaller page (the strict
// direction). Shared closing call-to-action text is removed first, since it is on every page.

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const THRESHOLD = 0.5;
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>https:\/\/collabrate\.digital(.*?)<\/loc>/g)].map((m) => m[1]);
const TEMPLATES = ["services", "industries", "portfolio", "locations"];

function mainText(html) {
  const article = html.match(/<article[\s\S]*?<\/article>/) ?? html.match(/<main[\s\S]*?<\/main>/);
  let body = article ? article[0] : html;
  // Drop the shared CTA block and breadcrumb: identical on every page of a template.
  body = body.replace(/<nav aria-label="Breadcrumb"[\s\S]*?<\/nav>/, " ").replace(/<section class="mt-16 rounded-\[20px\][\s\S]*?<\/section>/, " ");
  return decode(body.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " "))
    .toLowerCase()
    .replace(/[^a-z0-9஀-௿\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

const shingles = (words) => {
  const set = new Set();
  for (let i = 0; i + 5 <= words.length; i++) set.add(words.slice(i, i + 5).join(" "));
  return set;
};

let flagged = 0;
let pairs = 0;
let worst = { pct: 0, a: "", b: "" };

for (const template of TEMPLATES) {
  const pages = [];
  for (const path of paths.filter((p) => p.startsWith(`/${template}/`) && p.split("/").length === 3)) {
    const html = await (await fetch(`${base}${path}`)).text();
    pages.push({ path, set: shingles(mainText(html)) });
  }
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const [a, b] = [pages[i], pages[j]];
      let shared = 0;
      for (const s of a.set) if (b.set.has(s)) shared++;
      const pct = shared / Math.min(a.set.size, b.set.size);
      pairs++;
      if (pct > worst.pct) worst = { pct, a: a.path, b: b.path };
      if (pct > THRESHOLD) {
        flagged++;
        console.error(`FAIL ${(pct * 100).toFixed(0)}% overlap: ${a.path} and ${b.path}`);
      }
    }
  }
  console.log(`${template}: ${pages.length} pages`);
}

console.log(`\nCompared ${pairs} same-template pairs. Highest overlap: ${(worst.pct * 100).toFixed(1)}% (${worst.a} and ${worst.b}). ${flagged === 0 ? "None above 50%." : `${flagged} pair(s) above 50%.`}`);
process.exitCode = flagged > 0 ? 1 : 0;
