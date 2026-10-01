import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVICES = ["Web/App Development", "Marketing", "AI Solutions", "Not Sure Yet"];
const HEARD_FROM = ["Google", "LinkedIn", "Instagram", "ChatGPT or other AI", "Referral", "Other"];

const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT = 5; // submissions per IP per window
const RATE_WINDOW_MS = 10 * 60 * 1000;

// Best-effort rate limit. Serverless instances do not share memory, so this stops a single
// bot hammering one instance, not a distributed attack. Turnstile (below) is the strong check.
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip")) || "unknown";
}

// Cloudflare Turnstile. Only enforced when TURNSTILE_SECRET_KEY is set, so the form keeps
// working until the keys exist. Returns null when the check passes, or an error response.
async function verifyTurnstile(token: string, ip: string): Promise<NextResponse | null> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return null;
  if (!token) {
    return NextResponse.json({ error: "Please complete the verification and try again." }, { status: 400 });
  }
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip !== "unknown" ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(5000),
    });
    const result = (await res.json()) as { success?: boolean };
    if (!result.success) {
      return NextResponse.json({ error: "Verification failed. Please try again." }, { status: 400 });
    }
    return null;
  } catch {
    return NextResponse.json({ error: "Couldn't verify your submission right now." }, { status: 503 });
  }
}

// Forwards contact-form submissions to CONTACT_WEBHOOK_URL (Zapier / Make / n8n / an
// email-sending webhook). Until that env var is set this answers 503, so the form never
// claims a message was sent when it was not (same pattern as /api/newsletter).
// Spam protection: honeypot field, per-IP rate limit, size caps, optional Turnstile.
// No personal data is logged.
export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Invalid request." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error("shape");
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const text = (key: string, max: number) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, max) : "";

  // Honeypot: real visitors never see or fill this field. Answer as if it worked so the bot
  // gets no signal, and forward nothing.
  if (text("hp_check", 200)) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const name = text("name", 120);
  const email = text("email", 254);
  const company = text("company", 160);
  const service = text("service", 60);
  const details = text("details", 4000);
  const heardFrom = text("heardFrom", 40);
  const town = text("town", 80);

  if (!name || !details || !EMAIL_RE.test(email) || !SERVICES.includes(service)) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }
  if (heardFrom && !HEARD_FROM.includes(heardFrom)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const blocked = await verifyTurnstile(text("cf-turnstile-response", 2048), ip);
  if (blocked) return blocked;

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "The contact form isn't connected yet." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, service, details, heardFrom, town, at: new Date().toISOString() }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return NextResponse.json({ error: "Couldn't send your message right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
