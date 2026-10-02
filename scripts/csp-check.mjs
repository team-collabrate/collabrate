// Loads pages in headless Chrome over the DevTools protocol and reports Content-Security-Policy
// violations plus whether GA4, Clarity and Turnstile actually started.
// Usage: build with the third-party env vars set, start the server, then
//   node scripts/csp-check.mjs http://localhost:3000 /,/contact,/about
// Env needed at BUILD time for a meaningful run:
//   NEXT_PUBLIC_GA_ID=G-TESTTEST01 NEXT_PUBLIC_CLARITY_ID=abcdefghij
//   NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA   (Cloudflare's always-pass test key)
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/+$/, "");
const paths = (process.argv[3] ?? "/,/contact").split(",");
const CHROME = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const port = 9300 + Math.floor(Math.random() * 400);

const chrome = spawn(
  CHROME,
  ["--headless=new", "--disable-gpu", "--no-sandbox", `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), "csp-"))}`, "about:blank"],
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
const page = targets.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
const events = [];
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) pending.get(msg.id)(msg.result ?? msg.error);
  else if (msg.method) events.push(msg);
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const myId = ++id;
    pending.set(myId, resolve);
    ws.send(JSON.stringify({ id: myId, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");
await send("Network.enable");
if (process.env.BYPASS_CSP === "1") await send("Page.setBypassCSP", { enabled: true }); // baseline: same page without CSP

let violations = 0;
for (const path of paths) {
  events.length = 0;
  await send("Page.navigate", { url: base + path });
  await sleep(9000); // lazyOnload scripts (Turnstile) and Clarity need a few seconds
  const state = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      gtag: typeof window.gtag === "function",
      dataLayer: Array.isArray(window.dataLayer) ? window.dataLayer.length : 0,
      clarity: typeof window.clarity === "function",
      turnstile: typeof window.turnstile === "object",
      turnstileIframe: !!document.querySelector('iframe[src*="challenges.cloudflare.com"]'),
      turnstileDiv: !!document.querySelector(".cf-turnstile"),
      turnstileTokenLength: document.querySelector('input[name="cf-turnstile-response"]')?.value.length ?? 0,
    })`,
    returnByValue: true,
  });
  const csp = [];
  for (const e of events) {
    if (e.method === "Log.entryAdded" && /Content Security Policy|Refused to/i.test(e.params.entry.text)) csp.push(e.params.entry.text.slice(0, 200));
    if (e.method === "Runtime.consoleAPICalled") {
      const t = (e.params.args ?? []).map((a) => a.value ?? a.description ?? "").join(" ");
      if (/Content Security Policy|Refused to/i.test(t)) csp.push(t.slice(0, 200));
    }
    if (e.method === "Network.loadingFailed" && e.params.blockedReason === "csp") csp.push(`network blocked by csp: ${e.params.requestId}`);
  }
  violations += csp.length;
  // Proof that the third parties really talked to their servers (not just that the scripts parsed).
  const hosts = {};
  for (const e of events) {
    if (e.method === "Network.responseReceived") {
      const u = new URL(e.params.response.url);
      const key = /googletagmanager|google-analytics|analytics\.google/.test(u.host) ? "ga4"
        : /clarity\.ms|bing\.com/.test(u.host) ? "clarity"
        : /challenges\.cloudflare\.com/.test(u.host) ? "turnstile" : null;
      if (key) (hosts[key] ??= []).push(e.params.response.status);
    }
  }
  console.log(`${path}  ${state.result.value}`);
  console.log(`  responses (status codes) by service: ${JSON.stringify(hosts)}`);
  console.log(`  CSP violations: ${csp.length}`);
  for (const v of [...new Set(csp)].slice(0, 8)) console.log(`    ${v}`);
}

ws.close();
chrome.kill();
process.exitCode = violations > 0 ? 1 : 0;
