"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { contactFormContent } from "@/data/contact-page";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("done"), 1200);
  };

  return (
    <section id="contact-form" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading eyebrow={contactFormContent.eyebrow} title={contactFormContent.title} />

        <Reveal delay={0.1} className="mt-16">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-7 sm:p-10">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Your Name <span className="text-brand-coral">*</span></Label>
                <Input id="name" name="name" placeholder="Jordan Ade" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email <span className="text-brand-coral">*</span></Label>
                <Input id="email" name="email" type="email" placeholder="you@company.com" required />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" name="company" placeholder="Acme Inc." />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="achieve">What are you trying to achieve? <span className="text-brand-coral">*</span></Label>
              <Select id="achieve" name="achieve" required defaultValue="">
                <option value="" disabled>Select one</option>
                {contactFormContent.achieveOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="details">Tell us more. <span className="text-brand-coral">*</span></Label>
              <Textarea
                id="details"
                name="details"
                placeholder="Describe your goal, current situation, what you've tried, or what's holding you back."
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="budget">Budget range (optional)</Label>
                <Select id="budget" name="budget" defaultValue="">
                  <option value="" disabled>Select a range</option>
                  {contactFormContent.budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="timeline">Timeline (optional)</Label>
                <Select id="timeline" name="timeline" defaultValue="">
                  <option value="" disabled>Select a timeline</option>
                  {contactFormContent.timelineOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="reach">How can we reach you?</Label>
              <Select id="reach" name="reach" defaultValue="">
                <option value="" disabled>Select a preference</option>
                {contactFormContent.reachOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="anythingElse">Anything else? (optional)</Label>
              <Textarea
                id="anythingElse"
                name="anythingElse"
                placeholder="Budget concerns, timeline constraints, current tech stack, anything else we should know."
              />
            </div>

            <Button type="submit" variant="gradient" size="lg" disabled={status !== "idle"} className="w-full sm:w-fit">
              {status === "idle" && <>Send Message <ArrowUpRight className="size-4" /></>}
              {status === "submitting" && <><Loader2 className="size-4 animate-spin" /> Sending...</>}
              {status === "done" && <><CheckCircle2 className="size-4" /> Sent, we&apos;ll be in touch</>}
            </Button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
