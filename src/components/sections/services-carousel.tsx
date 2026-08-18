import {
  Megaphone,
  Search,
  Mail,
  Target,
  PenTool,
  Workflow,
  Code2,
  Smartphone,
  ShoppingBag,
  Bot,
  Sparkles,
  MessageCircle,
  Linkedin,
  Layers,
  Globe,
  LayoutDashboard,
  Database,
  ShieldCheck,
  Video,
  Mic,
  BrainCircuit,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card3DList, type CardData, type ThemeType } from "@/components/ui/animated-3d-card";

export interface ServiceCard {
  slug: string;
  title: string;
  category: string;
  value: string;
}

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "social-media": MessageCircle,
  "paid-ads": Megaphone,
  seo: Search,
  "email-marketing": Mail,
  "linkedin-outreach": Linkedin,
  "lead-generation": Target,
  "content-marketing": PenTool,
  "marketing-automation": Workflow,
  "web-development": Code2,
  "system-architecture": Layers,
  "mobile-app": Smartphone,
  ecommerce: ShoppingBag,
  wordpress: Globe,
  dashboards: LayoutDashboard,
  "api-integrations": Database,
  "website-maintenance": ShieldCheck,
  "ai-chatbots": Bot,
  "ai-video": Video,
  "ai-agents": Sparkles,
  "ai-voice": Mic,
  "llm-integration": BrainCircuit,
  "ai-analytics": BarChart3,
};

// Original 21st.dev theme set, cycled across all services.
const THEME_CYCLE: ThemeType[] = [
  "primary",
  "secondary",
  "accent",
  "success",
  "warning",
  "danger",
  "info",
  "neutral",
];

export function ServicesCarousel({ services }: { services: ServiceCard[] }) {
  const cards: CardData[] = services.map((service, i) => {
    const Icon = SERVICE_ICONS[service.slug] ?? Sparkles;
    return {
      id: service.slug,
      title: service.title,
      icon: <Icon className="size-6" />,
      theme: THEME_CYCLE[i % THEME_CYCLE.length],
    };
  });

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Browse our services" title="Everything we do, at a glance." />

        <div className="mt-14">
          <Card3DList cards={cards} columns={4} gap="md" size="sm" variant="premium" />
        </div>
      </div>
    </section>
  );
}
