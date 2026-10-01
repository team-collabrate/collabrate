import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

// Decision D3 (SEO playbook): visibility first, so search, answer and training
// crawlers are all allowed. Every named group repeats the /api/ disallow, because a
// crawler obeys only its most specific group and would otherwise ignore the "*" rule.
const DISALLOW = ["/api/"];

const SEARCH_AND_ANSWER_BOTS = [
  "Googlebot",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
];

const TRAINING_BOTS = ["GPTBot", "ClaudeBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...[...SEARCH_AND_ANSWER_BOTS, ...TRAINING_BOTS].map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: DISALLOW,
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
