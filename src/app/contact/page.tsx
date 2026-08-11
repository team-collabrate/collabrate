import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact-hero";
import { WaysToConnect } from "@/components/sections/ways-to-connect";
import { ContactForm } from "@/components/sections/contact-form";
import { DirectContactMethods, ResponseGuarantee, WhatHappensAfter } from "@/components/sections/contact-info-blocks";
import { FAQ } from "@/components/sections/faq";
import { ApproachNote, WhyScheduleCall } from "@/components/sections/approach-note";
import { CTABanner } from "@/components/sections/cta-banner";
import { ClientQuotes } from "@/components/sections/client-quotes";
import { OtherWays } from "@/components/sections/other-ways";
import { contactPageMeta, contactFaq, readyToTalk } from "@/data/contact-page";

export const metadata: Metadata = {
  title: { absolute: contactPageMeta.title },
  description: contactPageMeta.description,
  openGraph: {
    title: contactPageMeta.title,
    description: contactPageMeta.description,
  },
  twitter: {
    title: contactPageMeta.title,
    description: contactPageMeta.description,
  },
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <WaysToConnect />
      <ContactForm />
      <DirectContactMethods />
      <ResponseGuarantee />
      <WhatHappensAfter />
      <FAQ eyebrow="Common questions" title="Still have questions?" items={contactFaq} id="faq" />
      <ApproachNote />
      <WhyScheduleCall />
      <CTABanner title={readyToTalk.title} options={readyToTalk.options} />
      <ClientQuotes />
      <OtherWays />
    </main>
  );
}
