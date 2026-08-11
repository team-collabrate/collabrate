"use client";

import { Twitter, Linkedin, Github, Dribbble, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { siteConfig, footerContent } from "@/data/site";

const socialLinks = [
  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
  { icon: Dribbble, href: siteConfig.social.dribbble, label: "Dribbble" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-sm flex-col gap-5">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {footerContent.description}
            </p>
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-purple hover:text-brand-purple"
                >
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {footerContent.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h4 className="text-lg font-semibold text-foreground">{footerContent.newsletterHeading}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{footerContent.newsletterText}</p>
          </div>
          <form className="flex w-full max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="you@company.com" aria-label="Email address" required />
            <Button type="submit" variant="gradient" className="shrink-0">
              Subscribe <ArrowUpRight className="size-4" />
            </Button>
          </form>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>{footerContent.copyright}</p>
          <p>📍 {siteConfig.addressShort}</p>
        </div>
      </div>
    </footer>
  );
}
