import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SERVICES = ["Web/App Development", "Marketing", "AI Solutions", "Not Sure Yet"];
const HEARD_FROM = ["Google", "LinkedIn", "Instagram", "ChatGPT or other AI", "Referral", "Other"];

// Forwards contact-form submissions to CONTACT_WEBHOOK_URL (Zapier / Make / n8n / an
// email-sending webhook). Until that env var is set this answers 503, so the form never
// claims a message was sent when it was not (same pattern as /api/newsletter).
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const text = (key: string, max: number) =>
    typeof body[key] === "string" ? (body[key] as string).trim().slice(0, max) : "";

  const name = text("name", 120);
  const email = text("email", 254);
  const company = text("company", 160);
  const service = text("service", 60);
  const details = text("details", 4000);
  const heardFrom = text("heardFrom", 40);

  if (!name || !details || !EMAIL_RE.test(email) || !SERVICES.includes(service)) {
    return NextResponse.json({ error: "Please complete the required fields." }, { status: 400 });
  }
  if (heardFrom && !HEARD_FROM.includes(heardFrom)) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ error: "The contact form isn't connected yet." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, company, service, details, heardFrom, at: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return NextResponse.json({ error: "Couldn't send your message right now." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
