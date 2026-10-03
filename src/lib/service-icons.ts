import {
  Megaphone,
  Code2,
  BrainCircuit,
  MessageCircle,
  Mail,
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
} from "lucide-react";
import { Linkedin } from "@/components/shared/brand-icons";

type LucideIcon = React.ComponentType<{ className?: string }>;

// Shared by the Services page tabs and the navbar mega menu so both show the same icons and labels.
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  marketing: Megaphone,
  "web-app-development": Code2,
  "ai-solutions": BrainCircuit,
};

export const CATEGORY_SHORT_LABELS: Record<string, string> = {
  marketing: "Marketing",
  "web-app-development": "Web & App",
  "ai-solutions": "AI Solutions",
};

export const SERVICE_ICONS: Record<string, LucideIcon> = {
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
