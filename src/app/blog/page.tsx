import type { Metadata } from "next";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "Blog",
  description: "Collabrate's blog is on the way. Notes on development, marketing, and AI, coming soon.",
  alternates: { canonical: "/blog" },
};

const pillars = [
  "Web & App Development",
  "Marketing & Growth",
  "AI & Automation",
  "Industry Playbooks",
  "Process Notes",
];

// No posts published yet. This is an empty state, not a fabricated post list.
// Not linked from primary nav until real posts exist, per the JSON's nav array.
export default function BlogPage() {
  return (
    <main>
      <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <SectionHeading
            as="h1"
            eyebrow="Blog"
            title="Coming soon"
            description="We're working on our first posts. When they're ready, you'll find them here."
          />

          <Reveal delay={0.12} className="mt-10">
            <p className="text-sm font-medium text-muted-foreground">What we&apos;ll be writing about:</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {pillars.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs text-muted-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
