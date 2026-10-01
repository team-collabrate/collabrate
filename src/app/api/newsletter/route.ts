import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Forwards signups to NEWSLETTER_WEBHOOK_URL (Zapier / Make / n8n / your ESP's webhook).
// Until that env var is set the endpoint answers 503 so the UI never pretends a signup was saved.
export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "Newsletter signup isn't connected yet." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "footer", at: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return NextResponse.json({ error: "Couldn't subscribe right now. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
