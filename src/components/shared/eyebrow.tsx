import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("text-sm font-medium text-brand-violet", className)}>{children}</span>;
}
