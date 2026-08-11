"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlowCard({
  children,
  className,
  gradient = "from-[#8A2BE2]/20 via-[#CF6CAD]/10 to-[#FF9F43]/20",
}: {
  children: ReactNode;
  className?: string;
  gradient?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative rounded-3xl border border-border bg-card/60 p-6 sm:p-8 overflow-hidden",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_60px_-20px_rgba(138,43,226,0.35)] transition-shadow duration-500",
        className
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          gradient
        )}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
