"use client";

import { Mail, MapPin, Globe2 } from "lucide-react";
import { Linkedin, Instagram, XLogo } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";
import { PendingIconLink } from "@/components/shared/pending-link";
import { site } from "@/lib/content";

export function DirectContact() {
  return (
    <section className="relative pb-16 sm:pb-20">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="flex flex-col gap-6 rounded-3xl border border-border bg-surface p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="flex flex-col gap-3">
              <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-2.5 text-sm font-medium text-foreground hover:text-brand-violet">
                <Mail className="size-4" /> {site.email}
              </a>
              <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="size-4" /> {site.location}
              </span>
              <span className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Globe2 className="size-4" /> Serving businesses across India, Singapore, Malaysia, and the
                Gulf countries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <PendingIconLink href={site.social.linkedin} icon={Linkedin} label="LinkedIn" />
              <PendingIconLink href={site.social.instagram} icon={Instagram} label="Instagram" />
              <PendingIconLink href={site.social.x} icon={XLogo} label="X" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
