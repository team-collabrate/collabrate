"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500",
        scrolled ? "border-border bg-background/85 backdrop-blur-md" : "border-transparent bg-transparent"
      )}
    >
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((link) => {
            const isActive = pathname === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navActiveDot"
                    className="absolute inset-x-3.5 -bottom-[1px] h-px rounded-full bg-brand-violet"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button variant="gradient" size="sm" asChild>
            <a href={site.primaryCTA.href}>
              {site.primaryCTA.label} <ArrowUpRight className="size-3.5" />
            </a>
          </Button>
        </div>

        <button
          className="flex size-11 items-center justify-center text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass fixed inset-x-4 top-20 z-40 rounded-3xl border border-border p-6 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {nav.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-4 py-3 text-base font-medium hover:bg-surface",
                      isActive ? "text-foreground bg-surface" : "text-foreground"
                    )}
                  >
                    {isActive && <span className="size-1.5 shrink-0 rounded-full bg-brand-violet" />}
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Button variant="gradient" asChild>
                <a href={site.primaryCTA.href} onClick={() => setOpen(false)}>
                  {site.primaryCTA.label} <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
