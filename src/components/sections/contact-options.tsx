"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, CheckCircle2, CalendarDays, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { PendingLink } from "@/components/shared/pending-link";
import { site } from "@/lib/content";
import { track } from "@/lib/analytics";

const serviceOptions = ["Web/App Development", "Marketing", "AI Solutions", "Not Sure Yet"];
const heardFromOptions = ["Google", "LinkedIn", "Instagram", "ChatGPT or other AI", "Referral", "Other"];

export function ContactOptions() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  // Real submission: posts to /api/contact, which forwards to CONTACT_WEBHOOK_URL. Success
  // (and the generate_lead event) only happen when the server confirms it.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      track("generate_lead", { service: String(data.service ?? ""), heard_from: String(data.heardFrom ?? "") });
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal direction="left" className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-brand-violet">
              <CalendarDays className="size-5" />
            </span>
            <h2 className="text-xl font-semibold text-foreground">Schedule a Call</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Prefer to talk it through? Book a slot that works for you, no pressure, just a quick
              conversation about what you&apos;re building.
            </p>
            <PendingLink
              href={site.calendlyUrl}
              variant="outline"
              size="lg"
              className="mt-2 w-full"
              pendingLabel="Calendly link coming soon"
            >
              Schedule on Calendly <ArrowUpRight className="size-4" />
            </PendingLink>
          </Reveal>

          <Reveal direction="right" delay={0.08} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-brand-violet">
              <MessageSquare className="size-5" />
            </span>
            <h2 className="text-xl font-semibold text-foreground">Send Details</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Tell us about your project, and we&apos;ll come back with a clear plan.
            </p>

            <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name <span className="text-brand-coral">*</span></Label>
                <Input id="name" name="name" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email <span className="text-brand-coral">*</span></Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="service">Service Interested In <span className="text-brand-coral">*</span></Label>
                <Select id="service" name="service" required defaultValue="">
                  <option value="" disabled>Select one</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="heardFrom">How did you hear about us?</Label>
                <Select id="heardFrom" name="heardFrom" defaultValue="">
                  <option value="">Select one (optional)</option>
                  {heardFromOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="details">Project Details <span className="text-brand-coral">*</span></Label>
                <Textarea id="details" name="details" required />
              </div>

              <Button type="submit" variant="gradient" size="lg" disabled={status === "submitting" || status === "done"} className="mt-1 w-full">
                {(status === "idle" || status === "error") && <>Send Message <ArrowUpRight className="size-4" /></>}
                {status === "submitting" && <><Loader2 className="size-4 animate-spin" /> Sending...</>}
                {status === "done" && <><CheckCircle2 className="size-4" /> Sent, we&apos;ll be in touch</>}
              </Button>
              {status === "error" && (
                <p role="alert" className="text-sm text-brand-coral">
                  We couldn&apos;t send your message right now. Please email us at{" "}
                  <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-2">
                    {site.email}
                  </a>
                  .
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
