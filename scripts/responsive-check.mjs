// Responsive audit over the DevTools protocol. For each page and viewport it reports:
//   - horizontal page overflow (document wider than the viewport)
//   - elements that stick out of the viewport (not inside a scroll or clip container)
//   - tap targets smaller than 24x24 px (WCAG 2.5.8 minimum) and smaller than 44 px (advice)
//   - text smaller than 12 px
//   - whether the mobile menu opens (below the lg breakpoint)
// Usage: node scripts/responsive-check.mjs <baseUrl> [widths=360,412,768,1024] [paths=comma list | sitemap]
//        add SHOTS=dir to also save a full-page screenshot per page and width.
import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const widths = (process.argv[3] ?? "360,412,768,1024").split(",").map(Number);
let paths = (process.argv[4] ?? "sitemap").split(",");
const SHOTS = process.env.SHOTS;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });
if (paths[0] === "sitemap") {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text();
  paths = [...xml.matchAll(/<loc>https:\/\/collabrate\.digital(.*?)<\/loc>/g)].map((m) => m[1] || "/");
  paths.push("/does-not-exist"); // the 404 page
}

const port = 9500 + Math.floor(Math.random() * 300);
const chrome = spawn(
  process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
  ["--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "resp-"))}`, "about:blank"],
  { stdio: "ignore" }
);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let targets;
for (let i = 0; i < 40; i++) {
  try {
    targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    if (targets.length) break;
  } catch {}
  await sleep(250);
}
const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg.result ?? msg.error);
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const i = ++id;
    pending.set(i, resolve);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
const evaluate = async (expression) => {
  const r = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  return r.result?.value;
};

await send("Page.enable");
await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });

const PROBE = `(() => {
  const vw = document.documentElement.clientWidth;
  const inClip = (el) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const s = getComputedStyle(p);
      if (/(auto|scroll|hidden|clip)/.test(s.overflowX)) return true;
    }
    return false;
  };
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && s.opacity !== "0";
  };
  const name = (el) => (el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + (typeof el.className === "string" && el.className ? "." + el.className.trim().split(/\\s+/).slice(0, 3).join(".") : "")).slice(0, 90);
  const out = { vw, scrollWidth: document.documentElement.scrollWidth, overflowPx: document.documentElement.scrollWidth - vw, sticksOut: [], tiny: [], small: [], smallText: [] };
  for (const el of document.querySelectorAll("body *")) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if ((r.right > vw + 1 || r.left < -1) && !inClip(el) && getComputedStyle(el).position !== "fixed" && !el.closest("[aria-hidden='true']")) {
      if (out.sticksOut.length < 6) out.sticksOut.push(name(el) + " right=" + Math.round(r.right));
    }
  }
  for (const el of document.querySelectorAll("a[href], button, input:not([type=hidden]), select, textarea, [role=button]")) {
    if (!visible(el) || el.closest("[class*='sr-only']") || el.classList.contains("skip-link")) continue;
    const r = el.getBoundingClientRect();
    const inline = el.tagName === "A" && getComputedStyle(el).display === "inline"; // inline text links are exempt from the size rule
    if (inline) continue;
    if (r.width < 24 || r.height < 24) out.tiny.push(name(el) + " " + Math.round(r.width) + "x" + Math.round(r.height));
    else if (r.height < 44 || r.width < 44) out.small.push(1);
  }
  for (const el of document.querySelectorAll("body *")) {
    if (!visible(el)) continue;
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
    if (!own) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 12 && !el.closest("[class*='sr-only']")) out.smallText.push(name(el) + " " + fs + "px");
  }
  out.small = out.small.length;
  return JSON.stringify(out);
})()`;

const MENU_PROBE = `(async () => {
  const btn = document.querySelector('button[aria-label="Toggle menu"]');
  if (!btn || getComputedStyle(btn).display === "none") return JSON.stringify({ hasToggle: false });
  btn.click();
  await new Promise((r) => setTimeout(r, 500));
  const nav = document.querySelector('nav[aria-label="Mobile"]');
  const open = !!nav && nav.getBoundingClientRect().height > 0;
  const links = nav ? [...nav.querySelectorAll("a")].map((a) => a.textContent.trim()) : [];
  const vw = document.documentElement.clientWidth;
  const sticks = nav ? nav.getBoundingClientRect().right > vw + 1 : false;
  const locked = document.body.style.overflow === "hidden";
  btn.click();
  await new Promise((r) => setTimeout(r, 300));
  return JSON.stringify({ hasToggle: true, open, links: links.length, sticks, locked });
})()`;

const rows = [];
for (const width of widths) {
  const mobile = width < 768;
  await send("Emulation.setDeviceMetricsOverride", { width, height: width >= 768 ? 1024 : 800, deviceScaleFactor: 1, mobile });
  for (const path of paths) {
    await send("Page.navigate", { url: base + path });
    await sleep(2500);
    await evaluate("(async()=>{for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}window.scrollTo(0,0);})()");
    await sleep(600);
    const m = JSON.parse(await evaluate(PROBE));
    let menu = null;
    if (path === "/") menu = JSON.parse(await evaluate(MENU_PROBE));
    if (SHOTS) {
      const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
      writeFileSync(join(SHOTS, `${path === "/" ? "home" : path.slice(1).replace(/\//g, "_")}-${width}.png`), Buffer.from(shot.data, "base64"));
    }
    rows.push({ width, path, ...m, menu });
  }
}

ws.close();
chrome.kill();

let issues = 0;
for (const r of rows) {
  const problems = [];
  if (r.overflowPx > 1) problems.push(`page overflows by ${r.overflowPx}px`);
  if (r.sticksOut.length) problems.push(`sticks out: ${r.sticksOut.join("; ")}`);
  if (r.tiny.length) problems.push(`tap targets under 24px: ${[...new Set(r.tiny)].slice(0, 4).join("; ")}`);
  if (r.smallText.length) problems.push(`text under 12px: ${[...new Set(r.smallText)].slice(0, 3).join("; ")}`);
  if (r.menu?.hasToggle && (!r.menu.open || r.menu.sticks || !r.menu.locked)) problems.push(`mobile menu: ${JSON.stringify(r.menu)}`);
  if (problems.length) {
    issues++;
    console.log(`${String(r.width).padStart(4)}px ${r.path}\n      ${problems.join("\n      ")}`);
  }
}
console.log(`\n${rows.length} page/width checks across ${paths.length} pages and widths ${widths.join(", ")}. ${issues === 0 ? "No problems found." : `${issues} with problems.`}`);
console.log(`Tap targets under 44px (advice only): ${rows.reduce((n, r) => n + r.small, 0)} elements across all checks.`);
writeFileSync(process.env.RESP_JSON ?? "responsive-results.json", JSON.stringify(rows, null, 1));
process.exitCode = issues > 0 ? 1 : 0;
