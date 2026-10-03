// Uptime probe for a monitor (UptimeRobot, Better Stack, Vercel checks). Cheap, uncached, no data.
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
}
