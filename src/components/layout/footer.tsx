"use client";

import { Linkedin, Instagram, MapPin, Mail } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Separator } from "@/components/ui/separator";
import { PendingIconLink } from "@/components/shared/pending-link";
import { site, footer } from "@/lib/content";

const LEGAL_HREFS = new Set(["/privacy", "/terms"]);

export function Footer() {
  const companyNav = footer.columns.company.filter((link) => !LEGAL_HREFS.has(link.href));
  const legalNav = footer.columns.company.filter((link) => LEGAL_HREFS.has(link.href));

  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex max-w-sm flex-col gap-5">
            <Logo />
            <p className="text-sm leading-relaxed text-muted-foreground">{footer.blurb}</p>
            <div className="flex items-center gap-2">
              <PendingIconLink href={site.social.linkedin} icon={Linkedin} label="LinkedIn" />
              <PendingIconLink href={site.social.instagram} icon={Instagram} label="Instagram" />
            </div>
          </div>

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
              {companyNav.map((link) => (
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

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-foreground">Contact</h4>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail className="size-3.5 shrink-0" /> {site.email}
              </a>
              <span className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0" /> {site.location}
              </span>
            </div>

            {legalNav.length > 0 && (
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-foreground">Legal</h4>
                <ul className="flex flex-col gap-2.5">
                  {legalNav.map((link) => (
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
              </div>
            )}
          </div>
        </div>

        <Separator className="my-12" />

        <p className="text-center text-xs text-muted-foreground sm:text-left">{footer.copyright}</p>
      </div>
    </footer>
  );
}
