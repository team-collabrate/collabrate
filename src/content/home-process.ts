/**
 * Homepage "How we work" steps. The wording is the site's own JSON wording (pricing page
 * "How it works", the engagement types, and the contact FAQ), not new claims: no timeframes,
 * no numbers, no team statements. `sources` lists the verbatim fragments each step is built
 * from; scripts/check-service-copy.mjs fails if a fragment is no longer in the source text,
 * so this copy cannot drift away from the JSON.
 */

export interface ProcessStep {
  title: string;
  text: string;
  /** Verbatim fragments from src/content/collabrate-content.json or src/lib/content.ts. */
  sources: string[];
}

export const homeProcess = {
  heading: "How we work",
  intro: "Every business is different, so we don't force projects into fixed packages.",
  steps: [
    {
      title: "We talk",
      text: "We start with a conversation about your goals and what you need.",
      sources: ["We start with a conversation about your goals"],
    },
    {
      title: "We scope",
      text: "We scope the right mix of development, marketing, or AI work.",
      sources: ["scope the right mix of development, marketing, or AI work"],
    },
    {
      title: "You get a quote",
      text: "You get a clear quote before anything begins, with no hidden costs.",
      sources: ["You get a clear quote before anything begins, no hidden costs, no locked-in retainers you don't need"],
    },
    {
      title: "You approve",
      text: "Nothing starts until you've seen and approved the scope and quote.",
      sources: ["Nothing starts before you've seen and approved it", "seen and approved"],
    },
    {
      title: "We build, you grow",
      text: "We build to a defined scope and fixed quote, with ongoing support available.",
      sources: ["a defined scope and fixed quote", "ongoing support"],
    },
  ] satisfies ProcessStep[],
};
