import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactOptions } from "@/components/sections/contact-options";
import { FAQ } from "@/components/sections/faq";
import { contactFaq } from "@/lib/content";

const pageMeta = {
  title: "Contact Collabrate: Get a Quote",
  description:
    "Tell us what you are building and we will reply with next steps. Collabrate usually responds within one business day. Get a quote.",
  path: "/contact",
};

export const metadata: Metadata = buildMetadata(pageMeta);

export default function ContactPage() {
  return (
    <main>
      <PageJsonLd type="ContactPage" meta={pageMeta} crumb="Contact" />
      <section className="relative pt-32 pb-6 sm:pt-36 sm:pb-8">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <SectionHeading
            as="h1"
            title="Contact"
            description="Have a project in mind or just exploring options? Tell us what you're working on, and we'll get back with next steps."
          />
        </div>
      </section>

      <ContactOptions />

      <p className="mx-auto max-w-3xl px-6 pb-2 text-center text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Your message goes straight to our team.</span> We usually respond within one business day.
      </p>

      <FAQ eyebrow="FAQ" title="Still have questions?" items={contactFaq} id="faq" compact />
    </main>
  );
}
