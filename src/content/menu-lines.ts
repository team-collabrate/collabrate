// One-line descriptions shown under each service name in the navbar mega menu.
// Every line is cut from the service's own summary in collabrate-content.json (the `source` fragment
// must appear there word for word; scripts/check-service-copy.mjs checks it). The six marketing
// services already carry an approved `tagline` in the JSON, so only the other eleven are listed here.
// TODO(verify): owner to read these eleven lines before the menu goes live.

export interface MenuLine {
  line: string;
  source: string;
}

export const menuLines: Record<string, MenuLine> = {
  "Website Development": {
    line: "Websites built for speed and sales.",
    source: "custom websites designed for speed and conversions",
  },
  "Mobile Application Development": {
    line: "Apps people actually keep using.",
    source: "apps people actually keep using",
  },
  "Landing Pages": {
    line: "Focused pages built around one goal.",
    source: "focused pages designed around one goal",
  },
  "Business Websites": {
    line: "Turn visitors into inquiries.",
    source: "turn visitors into inquiries",
  },
  "Dashboards and Admin Panels": {
    line: "Internal tools that fit your team.",
    source: "internal tools that match how your team actually works",
  },
  "E-commerce Websites": {
    line: "Stores built for trust and checkout.",
    source: "stores optimized for browsing, trust, and checkout",
  },
  "AI Chatbots": {
    line: "Chatbots trained on your data.",
    source: "trained on your actual business data",
  },
  "Workflow Automation": {
    line: "Repetitive tasks, automated.",
    source: "automate repetitive tasks across the tools you already use",
  },
  "AI-Powered Support Systems": {
    line: "Faster answers, routed tickets.",
    source: "resolve queries faster, routing and prioritizing tickets automatically",
  },
  "AI Voice Assistants": {
    line: "Calls handled without a person.",
    source: "handle calls without a person on the line",
  },
  "Custom LLM Integration": {
    line: "AI models tailored to your business.",
    source: "integrate AI models tailored to your business and data",
  },
};
