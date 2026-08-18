import raw from "@/content/collabrate-content.json";

// ---------- Types mirroring collabrate-content.json ----------

export interface CTA {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  domain: string;
  founded: string;
  location: string;
  serviceRegions: string[];
  email: string;
  social: { linkedin: string; instagram: string };
  calendlyUrl: string;
  tone: string;
  primaryCTA: CTA;
  secondaryCTA: CTA;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  name: string;
  summary: string;
  points: string[];
  note?: string;
}

export interface ServiceCategory {
  id: string;
  heading: string;
  description: string;
  highlights?: string[];
  services: ServiceItem[];
}

export interface IndustryItem {
  name: string;
  description: string;
}

export interface PortfolioProject {
  title: string;
  industry: string;
  problem: string;
  solution: string;
  outcome: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FooterContent {
  blurb: string;
  columns: {
    solutions: string[];
    company: NavItem[];
  };
  copyright: string;
}

export interface Content {
  site: SiteConfig;
  nav: NavItem[];
  pages: Record<string, unknown>;
  serviceCategories: ServiceCategory[];
  industries: IndustryItem[];
  portfolioProjects: PortfolioProject[];
  testimonials: Testimonial[];
  footer: FooterContent;
  globalConstraints: string[];
}

export const content = raw as unknown as Content;

// ---------- Convenience exports ----------

export const site = content.site;
export const nav = content.nav;
export const serviceCategories = content.serviceCategories;
export const industries = content.industries;
export const portfolioProjects = content.portfolioProjects;
export const testimonials = content.testimonials;
export const footer = content.footer;
export const globalConstraints = content.globalConstraints;

export const PENDING_LINK = "PENDING_LINK";
export const PENDING_CALENDLY_LINK = "PENDING_CALENDLY_LINK";

export function isPending(href: string | undefined | null): boolean {
  return href === PENDING_LINK || href === PENDING_CALENDLY_LINK || !href;
}

// ---------- Supplementary content (authored, not part of the source JSON) ----------
// Grounded strictly in collabrate-content.json facts: serviceCategories, pricing
// engagement model, and site facts. No claims invented beyond that data.
// Approved by the user for Step 4 (Contact + Services FAQ sections).

export const servicesFaq: FaqItem[] = [
  {
    question: "Can I combine services across categories?",
    answer:
      "Yes. Most projects mix development, marketing, and AI, for example a new website with SEO and a chatbot from day one. We scope combined engagements as one project, not separate contracts.",
  },
  {
    question: "Do you only take on long-term retainers?",
    answer:
      "No. We work both ways: project-based engagements with a defined scope and fixed quote, and ongoing engagements for continuous marketing, development, or AI support. Which one fits depends on what you're trying to do.",
  },
  {
    question: "How is pricing decided?",
    answer:
      "There's no fixed pricing menu. Every quote is based on the type of service, project complexity, timeline, and whether it's a one-time build or ongoing support. You'll always see the quote before work begins.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We've built for booking and scheduling platforms, vendor and distribution management, workforce and recruitment systems, business and corporate websites, and e-commerce. If your business doesn't fit neatly into one of these, tell us what you're building and we'll let you know if it's a fit.",
  },
  {
    question: "Do you work with businesses outside India?",
    answer:
      "We're remote-first and based in Tamil Nadu, India, and currently serve businesses across India, Singapore, Malaysia, and the Gulf countries.",
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: "How quickly will I hear back?",
    answer: "We usually respond within one business day.",
  },
  {
    question: "Should I schedule a call or send details first?",
    answer:
      "Either works. If you already know what you need, send the details and we'll follow up with next steps. If you'd rather talk it through first, book a call.",
  },
  {
    question: "What should I include in the project details?",
    answer:
      "Roughly what you're trying to build or fix, which service you're interested in (development, marketing, AI, or a mix), and any timeline you're working against. The more context you give, the faster we can scope it.",
  },
  {
    question: "Will I get pricing before committing to anything?",
    answer:
      "Yes. We scope the project first and come back with a clear quote. Nothing starts before you've seen and approved it.",
  },
  {
    question: "Do you take on projects outside India?",
    answer:
      "Yes, we currently serve businesses across India, Singapore, Malaysia, and the Gulf countries.",
  },
];
