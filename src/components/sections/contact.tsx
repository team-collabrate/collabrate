"use client";

import { useState } from "react";
import { ArrowUpRight, Mail, Phone, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@/components/shared/icon-map";
import { contactContent, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Contact() {
  const [reason, setReason] = useState(contactContent.reasons[0].label);
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("done"), 1200);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={contactContent.eyebrow} title={contactContent.title} description={contactContent.description} />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal direction="left" className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm text-foreground hover:text-brand-violet">
                <Mail className="size-4 text-brand-violet" /> {siteConfig.email}
              </a>
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-sm text-foreground hover:text-brand-violet">
                <Phone className="size-4 text-brand-violet" /> {siteConfig.phone}
              </a>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <MapPin className="size-4 text-brand-violet" /> {siteConfig.addressShort}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-brand-diagonal p-7 text-white">
              <p className="text-sm font-medium text-white/80">Response time</p>
              <p className="mt-1 text-2xl font-semibold">Under 24 hours</p>
              <p className="mt-3 text-sm text-white/80">
                Every inquiry reaches a founding engineer directly, no sales queue, no auto-responder loop.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-7 sm:p-8">
              <div>
                <Label className="mb-3 block">What can we help with?</Label>
                <div className="flex flex-wrap gap-2">
                  {contactContent.reasons.map((r) => (
                    <button
                      type="button"
                      key={r.label}
                      onClick={() => setReason(r.label)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-colors",
                        reason === r.label
                          ? "border-transparent bg-gradient-brand-diagonal text-white"
                          : "border-border text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon name={r.icon} className="size-3.5" />
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" placeholder="Jordan Ade" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" placeholder="Acme Inc." />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message">Project details</Label>
                <Textarea id="message" name="message" placeholder="Tell us about your goals, timeline, and budget range." required />
              </div>

              <Button type="submit" variant="gradient" size="lg" disabled={status !== "idle"} className="w-full sm:w-fit">
                {status === "idle" && <>Send Message <ArrowUpRight className="size-4" /></>}
                {status === "submitting" && <><Loader2 className="size-4 animate-spin" /> Sending...</>}
                {status === "done" && <><CheckCircle2 className="size-4" /> Sent, we&apos;ll be in touch</>}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
