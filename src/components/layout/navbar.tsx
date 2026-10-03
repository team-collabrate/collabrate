"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { isPending, nav, site, serviceCategories, stripServiceParenthetical } from "@/lib/content";
import { menuLines } from "@/content/menu-lines";
import { CATEGORY_SHORT_LABELS, SERVICE_ICONS } from "@/lib/service-icons";
import type { SiteNavData } from "@/lib/site-links";
import { cn } from "@/lib/utils";

const SERVICES_HREF = "/services";
const MENU_CARD_IMAGE = "/images/menu-card.webp";
// Menu label: no parenthetical, and "and" as "&" so every name stays short and reads on one or two lines.
const menuName = (name: string) => stripServiceParenthetical(name).replace(/ and /g, " & ");
// Each category takes one bar of the logo mark: top (orange), middle (coral), bottom (purple).
// Full class strings so Tailwind can see them.
const CATEGORY_ACCENTS: Record<string, { tile: string; title: string; rule: string }> = {
  marketing: {
    tile: "from-[#FBA003] to-[#FC8204] shadow-[0_6px_14px_-6px_rgba(252,130,4,0.7)]",
    title: "group-hover/item:text-[#E07300]",
    rule: "after:from-[#FC8204]/60",
  },
  "web-app-development": {
    tile: "from-[#FF613E] to-[#FE3E5A] shadow-[0_6px_14px_-6px_rgba(254,62,90,0.7)]",
    title: "group-hover/item:text-[#FE3E5A]",
    rule: "after:from-[#FE3E5A]/60",
  },
  "ai-solutions": {
    tile: "from-[#BE47A5] to-[#9A44C3] shadow-[0_6px_14px_-6px_rgba(154,68,195,0.7)]",
    title: "group-hover/item:text-[#9A44C3]",
    rule: "after:from-[#9A44C3]/60",
  },
};

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

  // Warm the contact-card artwork once the browser is idle, so it is ready the first time the menu opens.
  useEffect(() => {
    const warm = () => {
      const img = new window.Image();
      img.src = MENU_CARD_IMAGE;
    };
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm);
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(warm, 2000);
    return () => clearTimeout(t);
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

        {/* Services mega-panel. Same near-opaque white as the navbar pill (so they read as one surface), but
            not see-through: the hero plays a video behind the navbar and the links must stay readable. Layout after the Windmark menu: category columns with
            icon tiles and one-line descriptions, plus a contact card on the right. */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.99 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={openMenu}
              onMouseLeave={closeMenu}
              className="absolute left-1/2 top-full hidden w-[min(1260px,calc(100vw-2rem))] -translate-x-1/2 pt-1 lg:block"
            >
              <div className="flex gap-3 rounded-[22px] border border-white/80 bg-white/92 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_70px_-20px_rgba(26,20,51,0.35)] ring-1 ring-black/[0.06] backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/[0.06] dark:ring-white/5">
                {/* Column labels are one short line each, so all three columns start level; items then flow
                    naturally within their own column. */}
                <div className="min-w-0 flex-1">
                  <div className="grid grid-cols-3">
                    {serviceCategories.map((category, index) => {
                      const accent = CATEGORY_ACCENTS[category.id];
                      return (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.28, delay: 0.04 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className={cn("flex flex-col px-4 pb-1", index > 0 && "border-l border-black/10 dark:border-white/10")}
                        >
                          <Link
                            href={SERVICES_HREF}
                            onClick={() => setMenuOpen(false)}
                            className={cn(
                              "relative mb-1 pb-2.5 pt-1.5 text-[15px] text-muted-foreground transition-colors hover:text-foreground",
                              "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:to-transparent",
                              accent?.rule,
                            )}
                          >
                            {CATEGORY_SHORT_LABELS[category.id] ?? category.heading}
                          </Link>
                          {category.services.map((service) => {
                            const ServiceIcon = SERVICE_ICONS[service.name];
                            const description = service.tagline ?? menuLines[service.name]?.line;
                            return (
                              <Link
                                key={service.name}
                                href={serviceHrefs[service.name] ?? SERVICES_HREF}
                                onClick={() => setMenuOpen(false)}
                                className="group/item flex items-start gap-3 py-2.5"
                              >
                                {ServiceIcon && (
                                  <span
                                    className={cn(
                                      "flex size-9 shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-br text-white transition-transform duration-200 group-hover/item:-translate-y-0.5 group-hover/item:scale-105",
                                      accent?.tile,
                                    )}
                                  >
                                    <ServiceIcon className="size-[18px]" aria-hidden />
                                  </span>
                                )}
                                <span className="min-w-0">
                                  <span className={cn("block text-[15px] font-medium leading-tight text-foreground transition-colors", accent?.title)}>
                                    {menuName(service.name)}
                                  </span>
                                  {description && <span className="mt-1 block text-[13.5px] leading-snug text-muted-foreground">{description}</span>}
                                </span>
                              </Link>
                            );
                          })}
                        </motion.div>
                      );
                    })}
                  </div>
                  {industries.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-1 gap-y-1 border-t border-black/10 px-3 pt-3 dark:border-white/10">
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

                {/* Contact card. No ratings, client counts or logos: nothing that is not in the content file. */}
                <aside className="relative hidden w-[248px] shrink-0 flex-col overflow-hidden xl:flex rounded-2xl bg-gradient-to-br from-[#9A44C3] via-[#BE47A5] to-[#FF613E] p-5 text-white">
                  {/* Website mock-up artwork: heading space on top, tilted screens below, bleeding off the edges. */}
                  <Image src={MENU_CARD_IMAGE} alt="" fill sizes="248px" unoptimized aria-hidden className="pointer-events-none object-cover object-bottom" />
                  <p className="relative text-[22px] font-semibold leading-tight tracking-tight">Not sure which service you need?</p>
                  <p className="relative mt-2.5 text-sm leading-snug text-white/85">
                    Tell us what you are trying to achieve and we will point you to the right fit.
                  </p>
                  <div className="relative mt-auto flex flex-col gap-2 pt-6">
                    <Link
                      href={site.primaryCTA.href}
                      onClick={() => setMenuOpen(false)}
                      className="group/cta flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#1A1433] shadow-[0_8px_20px_-8px_rgba(26,20,51,0.5)] transition-transform hover:-translate-y-0.5"
                    >
                      {site.primaryCTA.label}
                      <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" aria-hidden />
                    </Link>
                    {!isPending(site.calendlyUrl) && (
                      <a
                        href={site.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center rounded-xl border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                      >
                        Book a call
                      </a>
                    )}
                    <a href={`mailto:${site.email}`} className="mt-1 text-center text-xs text-white/85 underline-offset-4 hover:underline">
                      {site.email}
                    </a>
                  </div>
                </aside>
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
