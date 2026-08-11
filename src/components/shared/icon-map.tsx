import {
  Rocket, BrainCircuit, ShieldCheck, Users, LineChart, Infinity as InfinityIcon,
  Sparkles, Code2, Smartphone, Globe, Cloud, PenTool, TrendingUp, Megaphone, Palette,
  Search, Compass, Hammer, Landmark, HeartPulse, ShoppingBag, Building2, Truck, Layers,
  GraduationCap, Scale, Clock, Award, Briefcase, MessageCircle, Star, ArrowRight,
  ArrowUpRight, CheckCircle2, Check, Menu, X, Sun, Moon, Mail, Phone, MapPin,
  Twitter, Linkedin, Github, Dribbble, Bot, Mic, Eye, Workflow, Database,
  Target, Laptop, Zap, CalendarCheck, ClipboardList, HelpCircle, FileText,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Rocket, BrainCircuit, ShieldCheck, Users, LineChart, Infinity: InfinityIcon,
  Sparkles, Code2, Smartphone, Globe, Cloud, PenTool, TrendingUp, Megaphone, Palette,
  Search, Compass, Hammer, Landmark, HeartPulse, ShoppingBag, Building2, Truck, Layers,
  GraduationCap, Scale, Clock, Award, Briefcase, MessageCircle, Star, ArrowRight,
  ArrowUpRight, CheckCircle2, Check, Menu, X, Sun, Moon, Mail, Phone, MapPin,
  Twitter, Linkedin, Github, Dribbble, Bot, Mic, Eye, Workflow, Database,
  Target, Laptop, Zap, CalendarCheck, ClipboardList, HelpCircle, FileText,
};

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = iconMap[name] ?? Sparkles;
  return <Cmp className={className} />;
}
