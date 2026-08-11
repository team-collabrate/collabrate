import fs from "node:fs";
import path from "node:path";

const SERVICE_IMAGES_DIR = path.join(process.cwd(), "public", "services");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

/**
 * Looks for a real photo at public/services/{slug}.{jpg|jpeg|png|webp}.
 * Returns the public URL if found, otherwise null so the caller can fall
 * back to generated cover art. Runs at build time (Server Component /
 * static generation), so dropping a new file in and rebuilding is all
 * that's needed — no code changes.
 */
export function getServiceImagePath(slug: string): string | null {
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(SERVICE_IMAGES_DIR, `${slug}${ext}`))) {
      return `/services/${slug}${ext}`;
    }
  }
  return null;
}
