const BRAND_STOPS = ["#8A2BE2", "#B154B3", "#CF6CAD", "#E29AB4", "#F7686F", "#FF9F43"];

/**
 * Generates an on-brand square "cover art" image (as a data URI) for cards
 * that need a visual but don't have a real photo — e.g. service tiles in
 * the coverflow carousel. Pure SVG, no network request.
 */
export function makeCoverArt({
  emoji,
  label,
  index,
}: {
  emoji: string;
  label: string;
  index: number;
}) {
  const from = BRAND_STOPS[index % BRAND_STOPS.length];
  const to = BRAND_STOPS[(index + 2) % BRAND_STOPS.length];

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g)" />
  <circle cx="210" cy="150" r="170" fill="#ffffff" fill-opacity="0.08" />
  <circle cx="60" cy="330" r="90" fill="#ffffff" fill-opacity="0.06" />
  <text x="200" y="235" font-size="128" text-anchor="middle" font-family="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif">${emoji}</text>
  <text x="32" y="362" font-size="19" font-family="Arial, sans-serif" font-weight="700" letter-spacing="2" fill="#ffffff" fill-opacity="0.88">${label.toUpperCase()}</text>
</svg>`.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
