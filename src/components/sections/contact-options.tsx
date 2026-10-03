"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { ArrowUpRight, CalendarDays, CheckCircle2, Globe2, Loader2, Mail, MapPin, MessageSquare } from "lucide-react";
import { Instagram, Linkedin, XLogo } from "@/components/shared/brand-icons";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { homeProcess } from "@/content/home-process";
import { isPending, site } from "@/lib/content";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// Cloudflare Turnstile is optional: the widget only renders when the site key is set.
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { reset: () => void };
  }
}

const serviceOptions = ["Web/App Development", "Marketing", "AI Solutions", "Not Sure Yet"];
const heardFromOptions = ["Google", "LinkedIn", "Instagram", "ChatGPT or other AI", "Referral", "Other"];

// Calendly inline embed: a plain iframe, mounted only while the "Schedule a call" tab is open. The query
// string is what Calendly asks for on inline embeds; the colours match the site.
const calendlySrc = `${site.calendlyUrl}?${new URLSearchParams({
  embed_domain: "collabrate.digital",
  embed_type: "Inline",
  hide_gdpr_banner: "1",
  primary_color: "8a2be2",
  text_color: "1a1433",
  background_color: "ffffff",
}).toString()}`;

type Tab = "quote" | "schedule";

const subscribeToHash = (callback: () => void) => {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
};
const readHash = () => window.location.hash;

const handleOf = (url: string) => "@" + url.replace(/\/+$/, "").split("/").pop();

export function ContactOptions() {
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const canSchedule = !isPending(site.calendlyUrl);

  // The tab follows the URL: /contact#book opens the calendar, plain /contact opens the quote form.
  // Clicking a tab overrides that until the hash changes again.
  const hash = useSyncExternalStore(subscribeToHash, readHash, () => "");
  const [picked, setPicked] = useState<Tab | null>(null);
  useEffect(() => {
    const reset = () => setPicked(null);
    window.addEventListener("hashchange", reset);
    return () => window.removeEventListener("hashchange", reset);
  }, []);
  const wanted: Tab = picked ?? (hash === "#book" ? "schedule" : "quote");
  const tab: Tab = canSchedule ? wanted : "quote";

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
    } finally {
      // A Turnstile token works once; get a fresh one for any retry.
      window.turnstile?.reset();
    }
  };

  const choose = (next: Tab) => {
    setPicked(next);
    if (next === "schedule") track("click_calendly", { link_url: "#book" });
  };

  const socials = [
    { label: "LinkedIn", href: site.social.linkedin, icon: Linkedin },
    { label: "Instagram", href: site.social.instagram, icon: Instagram },
    { label: "X", href: site.social.x, icon: XLogo },
  ].filter((s) => !isPending(s.href));

  const tabClass = (active: boolean) =>
    cn(
      "flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors duration-200",
      active ? "bg-white text-[#1A1433] shadow-sm" : "text-white/90 hover:bg-white/10"
    );

  return (
    <section id="book" aria-labelledby="book-heading" className="relative scroll-mt-28 overflow-x-clip pb-6 sm:pb-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <Reveal className="rounded-[28px] border border-border bg-gradient-to-b from-background to-tint-violet p-3 shadow-[0_24px_60px_-28px_rgba(60,30,120,0.35)] sm:p-4">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr]">
            {/* Left: what to expect, and how to reach us */}
            <div className="flex flex-col justify-between gap-8 px-3 py-4 sm:px-8 sm:py-7">
              <div>
                <span className="inline-flex items-center gap-2 rounded-lg bg-brand-violet px-3 py-1.5 text-xs font-semibold text-white">
                  <MapPin className="size-3.5" aria-hidden /> Remote-first, based in Tamil Nadu, India
                </span>
                <h2 id="book-heading" className="display-2 mt-5 max-w-[460px] text-balance">
                  Let&apos;s talk about what you&apos;re building.
                </h2>
                <ol className="mt-6 flex flex-col gap-4">
                  {homeProcess.steps.map((step) => (
                    <li key={step.title} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-violet" aria-hidden />
                      <div>
                        <p className="text-[15px] font-medium text-foreground">{step.title}</p>
                        <p className="text-sm leading-snug text-muted-foreground">{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid gap-5 border-t border-border pt-6 sm:grid-cols-3">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-brand-violet">
                    <Mail className="size-3.5" aria-hidden /> Email
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 flex min-h-11 items-center break-words text-sm font-medium text-foreground hover:text-brand-violet lg:min-h-6"
                  >
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[1.5px] text-brand-violet">
                    <Globe2 className="size-3.5" aria-hidden /> Serving
                  </p>
                  <p className="mt-1.5 text-sm text-foreground">India, Singapore, Malaysia and the Gulf</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[1.5px] text-brand-violet">Follow</p>
                  <ul className="mt-1.5 flex flex-wrap gap-x-2">
                    {socials.map(({ label, href, icon: Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          title={label === "Instagram" || label === "X" ? handleOf(href) : label}
                          className="flex size-11 items-center justify-center text-foreground transition-colors hover:text-brand-violet lg:size-9"
                        >
                          <Icon className="size-[18px]" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: violet panel with the quote form or the calendar */}
            <div className="rounded-3xl bg-[linear-gradient(160deg,#9B3BEF_0%,#8A2BE2_45%,#6A1DB8_100%)] p-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] sm:p-4">
              {canSchedule && (
                <div role="tablist" aria-label="How would you like to reach us?" className="flex gap-1 rounded-2xl bg-white/15 p-1 backdrop-blur-sm">
                  <button
                    type="button"
                    role="tab"
                    id="tab-quote"
                    aria-selected={tab === "quote"}
                    aria-controls="panel-quote"
                    onClick={() => choose("quote")}
                    className={tabClass(tab === "quote")}
                  >
                    <MessageSquare className="size-4" aria-hidden /> Send details
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="tab-schedule"
                    aria-selected={tab === "schedule"}
                    aria-controls="panel-schedule"
                    onClick={() => choose("schedule")}
                    className={tabClass(tab === "schedule")}
                  >
                    <CalendarDays className="size-4" aria-hidden /> Schedule a call
                  </button>
                </div>
              )}

              {/* Send details. Always mounted (just hidden) so the Turnstile widget survives tab switches. */}
              <div role="tabpanel" id="panel-quote" aria-labelledby="tab-quote" hidden={tab !== "quote"} className="px-1 pb-1 pt-4 sm:px-2">
                <h3 className="text-2xl font-semibold tracking-tight !text-white">Send details</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                  Tell us about your project, and we&apos;ll come back with a clear plan.
                </p>

                {/* @container: the field pairs sit side by side once the form itself is wide enough, whatever the screen. */}
                <div className="@container mt-4">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-3 gap-y-3 rounded-2xl bg-white p-4 text-foreground @[26rem]:grid-cols-2 sm:p-5">
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">Name <span className="text-brand-coral">*</span></Label>
                      <Input id="name" name="name" required className="h-11" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">Email <span className="text-brand-coral">*</span></Label>
                      <Input id="email" name="email" type="email" required className="h-11" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="company">Company</Label>
                      <Input id="company" name="company" className="h-11" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="service">Service Interested In <span className="text-brand-coral">*</span></Label>
                      <Select id="service" name="service" required defaultValue="" className="h-11">
                        <option value="" disabled>Select one</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="heardFrom">How did you hear about us?</Label>
                      <Select id="heardFrom" name="heardFrom" defaultValue="" className="h-11">
                        <option value="">Select one (optional)</option>
                        {heardFromOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="town">Which town are you in?</Label>
                      <Input id="town" name="town" maxLength={80} autoComplete="address-level2" placeholder="Optional" className="h-11" />
                    </div>
                    <div className="flex flex-col gap-1.5 @[26rem]:col-span-2">
                      <Label htmlFor="details">Project Details <span className="text-brand-coral">*</span></Label>
                      <Textarea id="details" name="details" required className="min-h-[88px]" />
                    </div>

                    {/* Honeypot: hidden from people and screen readers, bots tend to fill it. */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                      <label htmlFor="hp_check">Leave this field empty</label>
                      <input id="hp_check" name="hp_check" type="text" tabIndex={-1} autoComplete="off" />
                    </div>

                    {TURNSTILE_SITE_KEY && (
                      <div className="@[26rem]:col-span-2">
                        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
                        <div className="cf-turnstile" data-sitekey={TURNSTILE_SITE_KEY} data-theme="light" />
                      </div>
                    )}

                    <div className="flex flex-col gap-2.5 @[26rem]:col-span-2">
                      <Button type="submit" variant="gradient" size="lg" disabled={status === "submitting" || status === "done"} className="w-full">
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
                      <p className="text-xs leading-relaxed text-foreground/65">
                        We use your details only to reply to your enquiry. See our{" "}
                        <Link href="/privacy" className="underline underline-offset-2">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Schedule a call. The iframe exists only while this tab is open, so Calendly loads on demand. */}
              {canSchedule && (
                <div role="tabpanel" id="panel-schedule" aria-labelledby="tab-schedule" hidden={tab !== "schedule"} className="px-1 pb-1 pt-4 sm:px-2">
                  <h3 className="text-2xl font-semibold tracking-tight !text-white">Pick a time</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/85">
                    Book a 30 minute call directly on our calendar.{" "}
                    <a
                      href={site.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-6 items-center gap-1 underline underline-offset-2 hover:text-white"
                    >
                      Open in a new tab <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  </p>
                  {tab === "schedule" && (
                    <iframe
                      src={calendlySrc}
                      title="Book a call with Collabrate"
                      className="mt-4 block h-[900px] w-full rounded-2xl bg-white sm:h-[680px]"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
