import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactOptions } from "@/components/sections/contact-options";
import { DirectContact } from "@/components/sections/direct-contact";
import { FAQ } from "@/components/sections/faq";
import { contactFaq } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a project in mind or just exploring options? Tell us what you're working on, and we'll get back with next steps.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative pt-40 pb-12 sm:pt-48 sm:pb-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Contact"
            description="Have a project in mind or just exploring options? Tell us what you're working on, and we'll get back with next steps."
          />
        </div>
      </section>

      <ContactOptions />
      <DirectContact />

      <section className="relative pb-4 sm:pb-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-medium text-foreground">Your message goes straight to our team.</p>
          <p className="mt-1 text-sm text-muted-foreground">We usually respond within one business day.</p>
        </div>
      </section>

      <FAQ eyebrow="FAQ" title="Still have questions?" items={contactFaq} id="faq" />
    </main>
  );
}
