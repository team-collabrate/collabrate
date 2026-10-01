// Verifies slugs are stable and unique. Run: node scripts/check-slugs.mjs
// (Node 22.6+ strips the TypeScript types in src/lib/slug.ts on import.)
import { readFileSync } from "node:fs";
import { slugFor } from "../src/lib/slug.ts";

const content = JSON.parse(readFileSync(new URL("../src/content/collabrate-content.json", import.meta.url), "utf8"));

const EXPECTED_SERVICES = {
  "Social Media Marketing": "social-media-marketing",
  "Performance Marketing (Paid Ads)": "performance-marketing",
  "Email Marketing and Campaigns": "email-marketing",
  "LinkedIn Outreach (Lead Generation)": "linkedin-outreach",
  SEO: "seo",
  "Digital Marketing Strategy": "digital-marketing-strategy",
  "Website Development": "website-development",
  "Mobile Application Development": "mobile-app-development",
  "Landing Pages": "landing-pages",
  "Business Websites": "business-websites",
  "Dashboards and Admin Panels": "dashboards-and-admin-panels",
  "E-commerce Websites": "ecommerce-websites",
  "AI Chatbots": "ai-chatbots",
  "Workflow Automation": "workflow-automation",
  "AI-Powered Support Systems": "ai-support-systems",
  "AI Voice Assistants": "ai-voice-assistants",
  "Custom LLM Integration": "custom-llm-integration",
};
const EXPECTED_INDUSTRIES = {
  "Booking & Scheduling Platforms": "booking-and-scheduling-platforms",
  "Vendor & Distribution Management": "vendor-and-distribution-management",
  "Workforce & Recruitment Systems": "workforce-and-recruitment-systems",
  "Business & Corporate Websites": "business-and-corporate-websites",
  "E-commerce Websites and Online Stores": "ecommerce-websites-and-stores",
};

let failed = false;
const fail = (msg) => {
  console.error("FAIL", msg);
  failed = true;
};

const MERGED = new Set(["Dairy Vendor Management App (2)"]); // intentionally shares a page with the entry before it

function check(label, names, expected) {
  const seen = new Map();
  for (const name of names) {
    const slug = slugFor(name);
    if (expected && expected[name] !== slug) fail(`${label}: "${name}" -> "${slug}", expected "${expected[name]}"`);
    if (seen.has(slug) && !MERGED.has(name)) fail(`${label}: duplicate slug "${slug}" ("${seen.get(slug)}" and "${name}")`);
    seen.set(slug, name);
  }
  if (expected) for (const name of Object.keys(expected)) if (!names.includes(name)) fail(`${label}: "${name}" no longer in the JSON`);
  console.log(`${label}: ${names.length} names, ${seen.size} unique slugs`);
}

check("services", content.serviceCategories.flatMap((c) => c.services.map((s) => s.name)), EXPECTED_SERVICES);
check("industries", content.industries.map((i) => i.name), EXPECTED_INDUSTRIES);
check("projects", content.portfolioProjects.map((p) => p.title));

process.exit(failed ? 1 : 0);
