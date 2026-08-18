"use client";

import {
  Check,
  MessageCircle,
  Megaphone,
  Mail,
  Linkedin,
  Search,
  BarChart3,
  Code2,
  Smartphone,
  Layers,
  Globe,
  LayoutDashboard,
  ShoppingBag,
  Bot,
  Workflow,
  Headphones,
  Mic,
  BrainCircuit,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Card3DList, type CardData, type ThemeType } from "@/components/ui/animated-3d-card";
import type { ServiceCategory } from "@/lib/content";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "Social Media Marketing": MessageCircle,
  "Performance Marketing (Paid Ads)": Megaphone,
  "Email Marketing and Campaigns": Mail,
  "LinkedIn Outreach (Lead Generation)": Linkedin,
  SEO: Search,
  "Digital Marketing Strategy": BarChart3,
  "Website Development": Code2,
  "Mobile Application Development": Smartphone,
  "Landing Pages": Layers,
  "Business Websites": Globe,
  "Dashboards and Admin Panels": LayoutDashboard,
  "E-commerce Websites": ShoppingBag,
  "AI Chatbots": Bot,
  "Workflow Automation": Workflow,
  "AI-Powered Support Systems": Headphones,
  "AI Voice Assistants": Mic,
  "Custom LLM Integration": BrainCircuit,
};

// Same 21st.dev theme cycle used previously on the old services carousel, offset per category for variety.
const THEME_CYCLE: ThemeType[] = ["primary", "secondary", "accent", "success", "warning", "danger", "info", "neutral"];

// "Performance Marketing (Paid Ads)" -> heading "Performance Marketing", subtitle "Paid Ads".
// Names with no brackets (SEO, Social Media Marketing, ...) get a heading only.
function splitServiceName(name: string): { heading: string; subtitle?: string } {
  const match = name.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (match) {
    return { heading: match[1].trim(), subtitle: match[2].trim() };
  }
  return { heading: name };
}

export function ServiceCategorySection({ category, index }: { category: ServiceCategory; index: number }) {
  const cards: CardData[] = category.services.map((service, i) => {
    const Icon = SERVICE_ICONS[service.name] ?? Sparkles;
    const { heading, subtitle } = splitServiceName(service.name);
    return {
      id: service.name,
      title: heading,
      subtitle,
      icon: <Icon className="size-6" />,
      theme: THEME_CYCLE[(index * 3 + i) % THEME_CYCLE.length],
    };
  });

  return (
    <section id={category.id} className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{category.heading}</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">{category.description}</p>
        </Reveal>

        {category.highlights && category.highlights.length > 0 && (
          <Reveal delay={0.08} className="mt-6 flex flex-wrap gap-2">
            {category.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </Reveal>
        )}

        {/* Visual browse grid: the 21st.dev 3D tilt card treatment, real service copy. */}
        <div className="mt-10">
          <Card3DList cards={cards} columns={3} gap="md" size="md" variant="premium" />
        </div>

        {/* Full detail, always visible (not hover-gated), per service */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {category.services.map((service) => (
            <div key={service.name} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">{service.name}</h3>
              <ul className="flex flex-col gap-2">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" />
                    {point}
                  </li>
                ))}
              </ul>
              {service.note && <p className="text-xs italic text-muted-foreground/80">{service.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
