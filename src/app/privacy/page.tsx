import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Collabrate collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  { heading: "Information We Collect", body: "We collect information you provide directly, such as your name, email, company name, and project details, when you submit a contact form, book a call, or communicate with us. We may also collect basic usage data (such as pages visited or general location) through standard website analytics tools." },
  { heading: "How We Use Your Information", body: "We use the information you provide to respond to inquiries, prepare quotes, deliver services, and communicate about your project. We do not sell your personal information to third parties." },
  { heading: "Third-Party Services", body: "We may use third-party tools (such as scheduling platforms, analytics providers, or email services) to operate our website and business. These providers process data according to their own privacy policies." },
  { heading: "Data Retention", body: "We retain your information only as long as necessary to fulfill the purpose it was collected for, or as required by law." },
  { heading: "Your Rights", body: "You may request access to, correction of, or deletion of your personal information at any time by contacting us at hello@collabrate.digital." },
  { heading: "Cookies", body: "Our website may use cookies to improve functionality and understand site usage. You can control cookie preferences through your browser settings." },
  { heading: "Changes to This Policy", body: "We may update this policy from time to time. Continued use of our website after changes are posted constitutes acceptance of the updated policy." },
  { heading: "Contact", body: "For questions about this policy, contact us at hello@collabrate.digital." },
];

export default function PrivacyPage() {
  return (
    <main>
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-24">
        <div className="mx-auto max-w-2xl px-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: August 2026</p>

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
