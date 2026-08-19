import type { SocialItem } from "@/components/ui/social-media";

// Maps each service name (must match `name` in collabrate-content.json
// serviceCategories[].services[]) to the tool logos relevant to it.
// Logo files live in /public/logos/ and were sourced from Simple Icons,
// SVGL, and each tool's own site/official brand assets.

function tool(name: string, file: string, color: string, href: string): SocialItem {
  return {
    ariaLabel: name,
    tooltip: name,
    svgUrl: `/logos/${file}`,
    color,
    href,
  };
}

export const serviceToolLogos: Record<string, SocialItem[]> = {
  "Social Media Marketing": [
    tool("Instagram", "instagram.svg", "#FF0069", "https://www.instagram.com"),
    tool("Facebook", "facebook.svg", "#0866FF", "https://www.facebook.com"),
    tool("LinkedIn", "linkedin.svg", "#0A66C2", "https://www.linkedin.com"),
    tool("X", "x.svg", "#000000", "https://x.com"),
    tool("YouTube", "youtube.svg", "#FF0000", "https://www.youtube.com"),
  ],

  "Performance Marketing (Paid Ads)": [
    tool("Google Ads", "google-ads.svg", "#4285F4", "https://ads.google.com"),
    tool("Meta Ads Manager", "meta-ads-manager.svg", "#0467DF", "https://www.facebook.com/business/tools/ads-manager"),
    tool("LinkedIn Ads", "linkedin-ads.svg", "#0A66C2", "https://www.linkedin.com/ads"),
  ],

  "Email Marketing and Campaigns": [
    tool("Gmail", "gmail.svg", "#EA4335", "https://mail.google.com"),
    tool("Microsoft Outlook", "microsoft-outlook.svg", "#F25022", "https://outlook.com"),
    tool("Amazon SES", "amazon-ses.svg", "#FF9900", "https://aws.amazon.com/ses/"),
    tool("Mailchimp", "mailchimp.svg", "#FFE01B", "https://mailchimp.com"),
  ],

  "LinkedIn Outreach (Lead Generation)": [
    tool("LinkedIn Sales Navigator", "linkedin-sales-navigator.svg", "#0A66C2", "https://business.linkedin.com/sales-solutions/sales-navigator"),
    tool("HubSpot", "hubspot.svg", "#FF7A59", "https://www.hubspot.com"),
  ],

  SEO: [
    tool("Google Search Console", "google-search-console.svg", "#458CF5", "https://search.google.com/search-console"),
    tool("SEMrush", "semrush.svg", "#FF642D", "https://www.semrush.com"),
    tool("Ahrefs", "ahrefs.svg", "#FF8800", "https://ahrefs.com"),
  ],

  "Digital Marketing Strategy": [
    tool("Google Analytics", "google-analytics.svg", "#E37400", "https://analytics.google.com"),
  ],

  "Website Development": [
    tool("Figma", "figma.svg", "#00B6FF", "https://www.figma.com"),
    tool("Framer", "framer.svg", "#0055FF", "https://www.framer.com"),
    tool("React", "react.svg", "#61DAFB", "https://react.dev"),
    tool("Node.js", "node-js.svg", "#5FA04E", "https://nodejs.org"),
    tool("WordPress", "wordpress.svg", "#21759B", "https://wordpress.org"),
    tool("Webflow", "webflow.svg", "#146EF5", "https://webflow.com"),
  ],

  "Mobile Application Development": [
    tool("Flutter", "flutter.svg", "#02569B", "https://flutter.dev"),
    tool("React Native", "react-native.svg", "#61DAFB", "https://reactnative.dev"),
    tool("Swift", "swift.svg", "#F05138", "https://www.swift.org"),
    tool("Kotlin", "kotlin.svg", "#7F52FF", "https://kotlinlang.org"),
  ],

  "Landing Pages": [
    tool("Figma", "figma.svg", "#00B6FF", "https://www.figma.com"),
    tool("Framer", "framer.svg", "#0055FF", "https://www.framer.com"),
  ],

  "Business Websites": [
    tool("WordPress", "wordpress.svg", "#21759B", "https://wordpress.org"),
  ],

  "Dashboards and Admin Panels": [
    tool("PostgreSQL", "postgresql.svg", "#4169E1", "https://www.postgresql.org"),
  ],

  "E-commerce Websites": [
    tool("Shopify", "shopify.svg", "#7AB55C", "https://www.shopify.com"),
    tool("WooCommerce", "woocommerce.svg", "#96588A", "https://woocommerce.com"),
    tool("Stripe", "stripe.svg", "#635BFF", "https://stripe.com"),
  ],

  "AI Chatbots": [
    tool("OpenAI", "openai.svg", "#000000", "https://openai.com"),
    tool("Google Dialogflow", "google-dialogflow.svg", "#FF9800", "https://cloud.google.com/dialogflow"),
    tool("Botpress", "botpress.svg", "#09090B", "https://botpress.com"),
  ],

  "Workflow Automation": [
    tool("Zapier", "zapier.svg", "#FF4F00", "https://zapier.com"),
    tool("Make", "make.svg", "#6D00CC", "https://www.make.com"),
    tool("n8n", "n8n.svg", "#EA4B71", "https://n8n.io"),
  ],

  "AI-Powered Support Systems": [
    tool("Zendesk", "zendesk.svg", "#03363D", "https://www.zendesk.com"),
    tool("Intercom", "intercom.svg", "#6AFDEF", "https://www.intercom.com"),
    tool("Freshdesk", "freshdesk.svg", "#00AC4C", "https://freshdesk.com"),
  ],

  "AI Voice Assistants": [
    tool("Twilio", "twilio.svg", "#e31e26", "https://www.twilio.com"),
    tool("ElevenLabs", "elevenlabs.svg", "#000000", "https://elevenlabs.io"),
  ],

  "Custom LLM Integration": [
    tool("OpenAI", "openai.svg", "#000000", "https://openai.com"),
    tool("Anthropic", "anthropic.svg", "#191919", "https://www.anthropic.com"),
    tool("LangChain", "langchain.svg", "#7FC8FF", "https://www.langchain.com"),
  ],
};
