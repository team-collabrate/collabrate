import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * WhatsApp is shown only when NEXT_PUBLIC_WHATSAPP_NUMBER is set (digits with country
 * code, no "+"). There is no number in the content JSON, so until the owner decides (D6)
 * this renders the Get a Quote button alone. Never hard-code a number here.
 */
const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");

/**
 * Server-rendered closing call to action for deep pages. Plain markup (no animation
 * wrapper), so the text is in the HTML at full opacity.
 */
export function PageCTA({
  heading = "Ready to talk about your project?",
  body = "Tell us what you are trying to achieve and we will come back with a clear plan and a quote.",
  ctaLabel = "Get a Quote",
  ctaHref = "/contact",
  /** Pre-filled WhatsApp message, e.g. "Hi Collabrate, I am interested in SEO." */
  whatsappMessage,
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  whatsappMessage?: string;
}) {
  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ""}`
    : null;

  return (
    <section className="mt-16 rounded-[20px] border border-black/10 bg-surface px-6 py-10 text-center sm:px-10">
      <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{heading}</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{body}</p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button variant="primary" asChild>
          <Link href={ctaHref}>{ctaLabel}</Link>
        </Button>
        {whatsappHref && (
          <Button variant="soft" asChild>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Chat on WhatsApp <ArrowRight className="size-4" />
            </a>
          </Button>
        )}
      </div>
    </section>
  );
}
