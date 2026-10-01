/**
 * Extra copy for /about. The founder and the team stay unnamed, and nothing is said about
 * team size or structure (collabrate-content.json globalConstraints). Facts come from the
 * JSON: founded 2025, remote-first, based in Tamil Nadu, serving India, Singapore,
 * Malaysia and the Gulf countries.
 *
 * `published` gates this whole block. While false, the live /about page is exactly what it
 * was; the new sections render only in dev or with SHOW_UNPUBLISHED=1. Sentences that go
 * beyond the JSON are marked TODO(verify).
 */

export const aboutContent = {
  published: false,
  updated: "2026-10-02",

  whyWeExist: [
    "Collabrate was built on a simple idea: businesses should not have to manage separate vendors for development and marketing.",
    "Development and marketing are handled together, so what is built is designed to perform, and what is marketed is backed by something solid.",
  ],

  howProjectRuns: [
    { title: "A conversation about your goals", text: "Every project starts by talking through what you are trying to achieve." },
    { title: "Scope and quote", text: "We scope the right mix of development, marketing or AI work and give you a clear quote before anything begins." },
    { title: "Your approval", text: "Nothing starts until you have seen and approved the quote." },
    { title: "Design and build", text: "We design and build the work, connecting tools such as analytics, a CRM or payments during the build instead of afterwards." },
    { title: "Launch and support", text: "After launch, work can continue as ongoing marketing, development or AI support if you want it, or end with the project." },
  ], // TODO(verify): steps four and five describe the usual shape of a project; confirm they match how you actually run one.

  toolsLine:
    "Across these services we work with tools such as Figma, Framer, React, WordPress, Webflow, Shopify, Flutter, Zapier, Make, n8n, OpenAI and Google Analytics, chosen per project.",

  whereWeOperate: [
    "Collabrate is remote-first and based in Tamil Nadu, India.",
    "We work with businesses across India, Singapore, Malaysia and the Gulf countries.",
    "Remote-first means projects run through calls, messages and shared documents, so location is rarely a limit on who we can work with.", // TODO(verify): wording about how remote projects run.
  ],

  /** Visible location line; matches the schema (addressRegion Tamil Nadu, addressCountry IN). */
  locationLine: "Collabrate, Tamil Nadu, India",
};
