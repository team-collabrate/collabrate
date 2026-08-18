"use client";

import { Linkedin, Instagram, MapPin, Mail } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";
import { PendingIconLink } from "@/components/shared/pending-link";
import { site, footer } from "@/lib/content";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-sm flex-col gap-5">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">
              {footer.blurb}
            </p>
            <div className="flex items-center gap-2">
              <PendingIconLink href={site.social.linkedin} icon={Linkedin} label="LinkedIn" />
              <PendingIconLink href={site.social.instagram} icon={Instagram} label="Instagram" />
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">Solutions</h4>
              <ul className="flex flex-col gap-2.5">
                {footer.columns.solutions.map((label) => (
                  <li key={label} className="text-sm text-muted-foreground">
                    {label}
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">Company</h4>
              <ul className="flex flex-col gap-2.5">
                {footer.columns.company.map((link) => (
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
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col gap-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {site.location}
            </span>
            <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-foreground">
              <Mail className="size-3.5" /> {site.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
