"use client";

import { useState } from "react";
import {
  ChevronDown,
  Check,
  Megaphone,
  Code2,
  BrainCircuit,
  MessageCircle,
  Mail,
  Linkedin,
  Search,
  BarChart3,
  Smartphone,
  Layers,
  Globe,
  LayoutDashboard,
  ShoppingBag,
  Bot,
  Workflow,
  Headphones,
  Mic,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SocialTooltip } from "@/components/ui/social-media";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { motion } from "framer-motion";
import { serviceCategories, type ServiceCategory, type ServiceItem } from "@/lib/content";
import { serviceToolLogos } from "@/lib/service-logos";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  marketing: Megaphone,
  "web-app-development": Code2,
  "ai-solutions": BrainCircuit,
};

const CATEGORY_SHORT_LABELS: Record<string, string> = {
  marketing: "Marketing",
  "web-app-development": "Web & App",
  "ai-solutions": "AI Solutions",
};

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

// Rotating set of icon-badge gradients, cycled per card for visual variety
// without going as heavy as the full 3D tilt-card treatment used elsewhere.
const BADGE_GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-indigo-500 to-violet-600",
];

// "Performance Marketing (Paid Ads)" -> heading "Performance Marketing", subtitle "Paid Ads".
function splitServiceName(name: string): { heading: string; subtitle?: string } {
  const match = name.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (match) {
    return { heading: match[1].trim(), subtitle: match[2].trim() };
  }
  return { heading: name };
}

function ServiceCard({ service, gradient, defaultOpen }: { service: ServiceItem; gradient: string; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = SERVICE_ICONS[service.name] ?? Sparkles;
  const { heading, subtitle } = splitServiceName(service.name);
  const tools = serviceToolLogos[service.name];

  return (
    <motion.div
      variants={staggerItem}
      className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-colors hover:border-brand-violet/40"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-6 text-left"
      >
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-sm",
            gradient
          )}
        >
          <Icon className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-semibold text-foreground">{heading}</span>
          {subtitle && <span className="block text-xs text-muted-foreground">{subtitle}</span>}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      <div className={cn("grid transition-all duration-300 ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="flex flex-col gap-5 px-6 pb-6">
            <p className="text-sm leading-relaxed text-muted-foreground">{service.summary}</p>

            <ul className="flex flex-col gap-2 border-t border-border pt-4">
              {service.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-violet" />
                  {point}
                </li>
              ))}
            </ul>

            {service.note && <p className="text-xs italic text-muted-foreground/80">{service.note}</p>}

            {tools && tools.length > 0 && (
              <div className="flex flex-col gap-4 border-t border-border pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tools we use
                </span>
                <SocialTooltip items={tools} className="justify-start gap-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CategoryPanel({ category }: { category: ServiceCategory }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base leading-relaxed text-muted-foreground">{category.description}</p>
      </div>

      <StaggerGroup className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2" stagger={0.06}>
        {category.services.map((service, i) => (
          <ServiceCard
            key={service.name}
            service={service}
            gradient={BADGE_GRADIENTS[i % BADGE_GRADIENTS.length]}
            defaultOpen={i === 0}
          />
        ))}
      </StaggerGroup>
    </div>
  );
}

export function ServicesExplorer() {
  const [activeTab, setActiveTab] = useState(serviceCategories[0]?.id ?? "");

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col items-center">
          <TabsList>
            {serviceCategories.map((category) => {
              const CatIcon = CATEGORY_ICONS[category.id] ?? Sparkles;
              return (
                <TabsTrigger key={category.id} value={category.id} className="gap-2">
                  <CatIcon className="size-4" />
                  {CATEGORY_SHORT_LABELS[category.id] ?? category.heading}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {serviceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="w-full">
              <CategoryPanel category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
