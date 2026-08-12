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
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card3DList, type CardData } from "@/components/ui/animated-3d-card";

export interface ServiceCard {
  slug: string;
  title: string;
  category: string;
  value: string;
  image: string;
}

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "social-media": MessageCircle,
  "paid-ads": Megaphone,
  seo: Search,
  "email-marketing": Mail,
  "lead-generation": Target,
  "content-marketing": PenTool,
  "marketing-automation": Workflow,
  "web-development": Code2,
  "mobile-app": Smartphone,
  ecommerce: ShoppingBag,
  "ai-chatbots": Bot,
  "ai-agents": Sparkles,
};

const THEME_CYCLE = ["violet", "coral", "orange", "magenta"] as const;

export function ServicesCarousel({ services }: { services: ServiceCard[] }) {
  const cards: CardData[] = services.map((service, i) => {
    const Icon = SERVICE_ICONS[service.slug] ?? Sparkles;
    return {
      id: service.slug,
      title: service.title,
      description: service.value,
      image: service.image,
      icon: <Icon className="size-7" />,
      theme: THEME_CYCLE[i % THEME_CYCLE.length],
    };
  });

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Browse our services" title="Everything we do, at a glance." />

        <div className="mt-14">
          <Card3DList cards={cards} columns={3} gap="lg" size="md" variant="premium" />
        </div>
      </div>
    </section>
  );
}
