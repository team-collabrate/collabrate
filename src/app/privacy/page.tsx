import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageJsonLd } from "@/components/seo/page-json-ld";

const pageMeta = {
  title: "Privacy Policy | Collabrate",
  description:
    "How Collabrate collects, uses, and protects your information when you visit collabrate.digital or contact us about a project.",
  path: "/privacy",
};

export const metadata: Metadata = buildMetadata(pageMeta);

const sections = [
  { heading: "Information We Collect", body: "We collect information you provide directly, such as your name, email, company name, and project details, when you submit a contact form, book a call, or communicate with us. We may also collect basic usage data (such as pages visited or general location) through analytics tools, but only if you accept analytics cookies (see Cookies below)." },
  { heading: "How We Use Your Information", body: "We use the information you provide to respond to inquiries, prepare quotes, deliver services, and communicate about your project. We do not sell your personal information to third parties." },
  { heading: "Third-Party Services", body: "We use a small number of third-party services to run this website. Google Analytics 4 and Microsoft Clarity measure how the site is used, and they load only after you accept analytics cookies. Cloudflare Turnstile protects our contact form from spam. Details you send through the contact form or newsletter sign-up are passed to the tools we use to receive and answer them, such as email and workflow services. We may also use scheduling and email providers to run our business. These providers process data under their own privacy policies." },
  { heading: "Data Retention", body: "We retain your information only as long as necessary to fulfill the purpose it was collected for, or as required by law." },
  { heading: "Your Rights", body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us at hello@collabrate.digital." },
  { heading: "Cookies", body: "The site works without analytics cookies. If you accept them in the notice that appears on your first visit, Google Analytics 4 and Microsoft Clarity may set cookies and collect information such as the pages you view, your approximate location, device and browser type, and how you interact with pages. If you decline, or do not choose, neither tool loads. You can change your choice at any time with the Cookie settings link at the bottom of every page, and you can also control cookies in your browser settings." },
  { heading: "Changes to This Policy", body: "We may update this policy from time to time. Continued use of our website after changes are posted constitutes acceptance of the updated policy." },
  { heading: "Contact", body: "For questions about this policy, contact us at hello@collabrate.digital." },
];

export default function PrivacyPage() {
  return (
    <main>
      <PageJsonLd type="WebPage" meta={pageMeta} crumb="Privacy Policy" />
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-24">
        <div className="mx-auto max-w-2xl px-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: October 2026</p>

          <div className="mt-10 flex flex-col gap-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
