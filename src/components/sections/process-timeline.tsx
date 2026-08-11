"use client";

import { SectionHeading } from "@/components/shared/section-heading";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";
import { processSteps } from "@/data/site";

const COLOR_THEMES: Array<"orange" | "blue" | "purple"> = ["orange", "blue", "purple"];

export function ProcessTimeline() {
  const steps: Step[] = processSteps.map((step, i) => ({
    title: step.title,
    duration: step.duration,
    description: step.description,
    colorTheme: COLOR_THEMES[i % COLOR_THEMES.length],
  }));

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="No lengthy process. No disappearing act."
          description="Just straightforward execution."
        />
      </div>

      <div className="mt-8">
        <HowItWorks features={steps} />
      </div>
    </section>
  );
}
