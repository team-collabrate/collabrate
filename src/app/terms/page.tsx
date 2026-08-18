import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern use of Collabrate's website and services.",
  alternates: { canonical: "/terms" },
};

const sections = [
  { heading: "Services", body: "Collabrate provides web and mobile development, digital marketing, and AI solutions. All engagements are scoped and quoted individually based on client requirements, as outlined in a separate proposal or agreement." },
  { heading: "Quotes and Payment", body: "Pricing is custom to each project and shared prior to work beginning. Payment terms will be specified in the individual client agreement or invoice." },
  { heading: "Intellectual Property", body: "Upon full payment, clients receive ownership rights to the final deliverables as agreed in the project scope, unless otherwise specified. Collabrate retains the right to showcase completed work in its portfolio, unless a client requests confidentiality." },
  { heading: "Client Responsibilities", body: "Clients are responsible for providing timely feedback, content, and access needed to complete a project as scheduled." },
  { heading: "Limitation of Liability", body: "Collabrate is not liable for indirect, incidental, or consequential damages arising from the use of our services or website." },
  { heading: "Termination", body: "Either party may terminate an ongoing engagement as outlined in the individual service agreement." },
  { heading: "Governing Law", body: "These terms are governed by applicable law based on the jurisdiction of service delivery." },
  { heading: "Contact", body: "For questions about these terms, contact us at hello@collabrate.digital." },
];

export default function TermsPage() {
  return (
    <main>
      <section className="relative pt-40 pb-16 sm:pt-48 sm:pb-24">
        <div className="mx-auto max-w-2xl px-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Terms of Service</h1>
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
