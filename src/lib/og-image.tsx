import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteUrl } from "@/lib/content";

/**
 * Text-only social card (1200x630) for the dynamic templates: services, industries, case
 * studies, and later locations. Brand colours from globals.css, the colour logo on a light
 * background (brand rule), the page name as the headline. No stock photos, no invented text.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const HEADING = "#1A1433";
const BODY = "#57536B";
const VIOLET = "#8A2BE2";
const TINT = "#F0E9FC";
const BACKGROUND = "#FEFFFF";

let logoDataUri: string | undefined;
async function logo(): Promise<string> {
  if (!logoDataUri) {
    const svg = await readFile(join(process.cwd(), "public/brand/svg/collabrate-full-color.svg"));
    logoDataUri = `data:image/svg+xml;base64,${svg.toString("base64")}`;
  }
  return logoDataUri;
}

export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const host = siteUrl.replace(/^https?:\/\//, "");
  // Shrink long titles so they stay inside two lines at 1200x630.
  const fontSize = title.length > 46 ? 64 : title.length > 28 ? 76 : 88;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(135deg, ${BACKGROUND} 0%, ${TINT} 100%)`,
          padding: "64px 80px",
          borderLeft: `16px solid ${VIOLET}`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={await logo()} alt="" width={288} height={60} style={{ objectFit: "contain", objectPosition: "left" }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: VIOLET,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: HEADING,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: BODY }}>{host}</div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
