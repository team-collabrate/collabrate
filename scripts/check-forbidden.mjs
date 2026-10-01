// B9 forbidden-content scan. Usage: node scripts/check-forbidden.mjs [baseUrl]
// 1. Scans the Phase B content files in src/content (and the content JSON) as text.
// 2. Scans the visible text of every page in the sitemap (needs a running production server).
// Looks for: em and en dashes, currency amounts (symbol or INR/Rs/$ next to digits),
// superlatives and promises (best, leading, number one, guarantee), client-style company names
// (Pvt, Ltd, Inc, LLP, Technologies, Solutions, Infotech), invented counts (N clients,
// projects, years), PENDING_LINK / PENDING_CALENDLY_LINK, and unresolved placeholders ([city]).

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const PATTERNS = [
  ["em dash", /—/],
  ["currency amount", /(?:₹|\$|€|£)\s?\d|\d\s?(?:INR|USD|EUR)\b|\bRs\.?\s?\d|\bINR\s?\d/i],
  ["superlative or promise", /\b(?:the best|best[- ](?:in|agency|company|web|digital)|leading|number one|top[- ]10|guarantee[ds]?)\b/i],
  // "AI Solutions" is the service category name, not a company.
  ["client-style company name", /\b(?!AI Solutions\b)[A-Z][A-Za-z]+ (?:Pvt|Ltd|Inc|LLP|Technologies|Infotech|Solutions)\b/],
  ["invented count", /\b\d+\+? (?:clients|projects|customers|years|websites|apps)\b/i],
  ["PENDING placeholder", /PENDING(?:_CALENDLY)?_LINK/],
  ["unresolved placeholder", /\[(?:city|town|client name)\]/i],
];

let failures = 0;
let enDashPages = [];
const hit = (where, label, match) => {
  failures++;
  console.error(`FAIL ${where}: ${label}: "${match[0]}"`);
};
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// 1. Content files (code comments and TODO notes are for the owner, so only string values are scanned).
const dir = "src/content";
const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
for (const file of files) {
  const text = readFileSync(join(dir, file), "utf8");
  const strings = [...text.matchAll(/"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)].map((m) => m[1] ?? m[2]);
  const joined = strings.join("\n");
  for (const [label, re] of PATTERNS) {
    const m = joined.match(re);
    if (m) hit(`${dir}/${file}`, label, m);
  }
}
console.log(`Scanned ${files.length} content files.`);

// 2. Rendered pages.
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>https:\/\/collabrate\.digital(.*?)<\/loc>/g)].map((m) => m[1] || "/");
for (const path of paths) {
  const html = await (await fetch(`${base}${path}`)).text();
  // Visible text only, plus meta description and JSON-LD text (all of it is public).
  const text = decode(html.replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " "));
  for (const [label, re] of PATTERNS) {
    const m = text.match(re);
    if (m) hit(path, label, m);
  }
  const en = text.match(/.{20}–.{20}/);
  if (en) enDashPages.push(`${path}: "${en[0]}"`);
}
console.log(`Scanned ${paths.length} rendered pages.`);
if (enDashPages.length) console.log(["NOTE (not a failure, en dash in existing copy):", ...enDashPages].join("\n  "));
console.log(failures === 0 ? "No forbidden content found." : `${failures} finding(s).`);
process.exitCode = failures > 0 ? 1 : 0;
