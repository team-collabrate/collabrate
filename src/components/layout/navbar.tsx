"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { nav, site, serviceCategories } from "@/lib/content";
import type { SiteNavData } from "@/lib/site-links";
import { cn } from "@/lib/utils";

const SERVICES_HREF = "/services";

export function Navbar({ navData }: { navData: SiteNavData }) {
  const { serviceHrefs, industries } = navData;
  const pathname = usePathname();
  // `compact`: page has scrolled, so the logo, links and CTA share one pill.
  const [compact, setCompact] = useState(false);
  // `hidden`: scrolling down tucks the bar away; scrolling up brings it back.
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastY = useRef(0);
  // Scroll position where the current direction of travel began; small wheel
  // ticks accumulate against it so slow scrolling still toggles the bar.
  const anchorY = useRef(0);
  const dir = useRef<"up" | "down">("down");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCompact(y > 24);
      const next = y > lastY.current ? "down" : y < lastY.current ? "up" : dir.current;
      if (next !== dir.current) {
        dir.current = next;
        anchorY.current = lastY.current;
      }
      if (y <= 200) {
        setHidden(false);
      } else if (dir.current === "down" && y - anchorY.current > 16) {
        setHidden(true);
        setMenuOpen(false);
      } else if (dir.current === "up" && anchorY.current - y > 6) {
        setHidden(false);
      }
      lastY.current = y;
    };
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

  // Small delay on close so the pointer can travel from the trigger into the
  // panel without it disappearing underneath.
  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const closeMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMenuOpen(false), 140);
  };

  const linkClass = (active: boolean) =>
    cn(
      "inline-flex h-9 items-center gap-1.5 rounded-[8px] px-[18px] text-sm font-medium transition-colors duration-200 hover:bg-black/[0.05] dark:hover:bg-white/10",
      active ? "text-nav-ink" : "text-nav-ink/80 hover:text-nav-ink"
    );

  return (
    <header
      className={cn(
        "fixed inset-x-4 top-5 z-50 transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] lg:top-8",
        hidden && !open && "pointer-events-none -translate-y-[200%]"
      )}
    >
      <div
        className={cn(
          "relative mx-auto flex h-14 max-w-[1408px] items-center justify-between px-3 transition-[max-width] duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)] lg:px-4",
          compact && "lg:max-w-[1025px]"
        )}
      >
        {/* Glass layer lives apart from the content so the blur can never swallow the links. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[18px] border border-white/80 bg-white/92 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_30px_-10px_rgba(20,30,60,0.22)] ring-1 ring-black/[0.06] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_32px_-8px_rgba(0,0,0,0.6)] dark:ring-white/5"
        />
        <Logo className="relative z-10" />

        <nav
          className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {nav.map((link) => {
            const isActive = pathname === link.href;
            if (link.href === SERVICES_HREF) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                  onFocus={openMenu}
                  onBlur={closeMenu}
                >
                  <Link
                    href={link.href}
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(linkClass(isActive), menuOpen && "bg-black/5 text-nav-ink dark:bg-white/10")}
                  >
                    {link.label}
                    <ChevronDown
                      className={cn("size-[11px] transition-transform duration-200", menuOpen && "rotate-180")}
                    />
                  </Link>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={linkClass(isActive)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-10 hidden items-center lg:flex">
          <Button variant="primary" className="h-11 rounded-[12px] px-5" asChild>
            <Link href={site.primaryCTA.href}>{site.primaryCTA.label}</Link>
          </Button>
        </div>

        <button
          className="relative z-10 flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Services mega-panel: frosted, three category columns. */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
              className="absolute left-1/2 top-full hidden w-[min(933px,calc(100vw-2rem))] -translate-x-1/2 pt-1 lg:block"
            >
              <div className="grid grid-cols-3 gap-2 rounded-[16px] border border-white/60 bg-white/70 p-4 backdrop-saturate-150 dark:bg-zinc-900/70 shadow-[0_24px_48px_-16px_rgba(26,20,51,0.3)] backdrop-blur-xl dark:border-white/10">
                {serviceCategories.map((category) => (
                  <div key={category.id} className="flex flex-col gap-1 rounded-xl p-3">
                    <Link
                      href={SERVICES_HREF}
                      onClick={() => setMenuOpen(false)}
                      className="mb-1 rounded-lg px-2 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      {category.heading}
                    </Link>
                    {category.services.map((service) => (
                      <Link
                        key={service.name}
                        href={serviceHrefs[service.name] ?? SERVICES_HREF}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                ))}
                {industries.length > 0 && (
                  <div className="col-span-3 flex flex-wrap items-center gap-x-1 gap-y-1 border-t border-black/10 px-3 pt-3 dark:border-white/10">
                    <Link
                      href="/industries"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-2 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      Industries
                    </Link>
                    {industries.map((industry) => (
                      <Link
                        key={industry.href}
                        href={industry.href}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
                      >
                        {industry.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-h-[calc(100svh-6rem)] overflow-y-auto rounded-[18px] border border-white/60 bg-white/70 p-4 shadow-[0_10px_32px_-8px_rgba(60,30,120,0.28)] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-zinc-900/70 lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {nav.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-4 py-3 text-base font-medium hover:bg-black/[0.04]",
                      isActive ? "bg-black/[0.04] text-foreground" : "text-foreground"
                    )}
                  >
                    {isActive && <span className="size-1.5 shrink-0 rounded-full bg-brand-violet" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            {industries.length > 0 && (
              <nav className="mt-2 flex flex-col gap-1 border-t border-border pt-2" aria-label="Industries">
                <Link
                  href="/industries"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-foreground hover:bg-black/[0.04]"
                >
                  Industries
                </Link>
              </nav>
            )}
            <div className="mt-3 border-t border-border pt-3">
              <Button variant="primary" className="w-full" asChild>
                <Link href={site.primaryCTA.href} onClick={() => setOpen(false)}>
                  {site.primaryCTA.label}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
