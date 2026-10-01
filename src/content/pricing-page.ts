/**
 * Extra copy for /pricing. Pricing stays quote-only: no amounts, ranges, "from" prices or
 * words like "cheap" or "affordable" anywhere (collabrate-content.json globalConstraints).
 *
 * `published` gates this whole block. While it is false, the live /pricing page is exactly
 * what it was (the JSON copy); the new sections render only in dev or in a build made with
 * SHOW_UNPUBLISHED=1, and the FAQ schema is emitted only when the FAQ is visible.
 * Sentences that describe Collabrate's process beyond the JSON are marked TODO(verify).
 */

export const pricingContent = {
  published: false,
  updated: "2026-10-02",

  costFactors: [
    { title: "Scope", text: "How many pages, screens, channels or features the work covers. More scope means more to design, build and test." },
    { title: "Features", text: "Standard features need less effort than custom ones, such as booking rules, user roles or special checkout logic." },
    { title: "Integrations", text: "Connecting payments, a CRM, WhatsApp or other tools adds work, because each connection has to be set up and tested." },
    { title: "Design depth", text: "A simple layout needs less design work than fully custom UI and UX with bespoke pages and interactions." },
    { title: "Content", text: "Who writes the copy and prepares the images changes the work. Content you supply needs less work than content written from scratch." },
    { title: "Timeline", text: "A tighter deadline changes how the work has to be planned and sequenced, so it is part of the scope conversation." },
    { title: "Ongoing support", text: "A one-time delivery is different from continuing support, updates, marketing or monitoring after launch." },
  ],

  includedInQuote: [
    "A written description of what will be delivered",
    "The services involved and what each one covers",
    "What we need from you, such as content, access and decisions",
    "Whether the work is one-time or ongoing",
    "The assumptions behind the quote, so you can see what would change it",
  ], // TODO(verify): the JSON promises "a clear quote before anything begins" but does not list what a quote contains. Confirm this matches your real quotes.

  scopingSteps: [
    { title: "A conversation about your goals", text: "We start by understanding what you are trying to achieve and what you already have." },
    { title: "Scoping the work", text: "We work out the right mix of development, marketing or AI work for the goal." },
    { title: "A clear quote", text: "You receive a clear quote before anything begins." },
    { title: "Your approval", text: "Nothing starts until you have seen and approved the quote." },
  ],

  engagementFit: [
    { title: "Project-based", text: "Suits a website, an app or a one-off campaign with a defined scope and a clear end point." },
    { title: "Ongoing engagement", text: "Suits continuous marketing, development or AI support, where the work does not stop at launch." },
    { title: "Custom or enterprise", text: "Suits larger requirements that combine several services and need their own scoping." },
  ],

  faqs: [
    {
      question: "How much does a website or app cost?",
      answer:
        "We do not publish prices, because the cost depends on scope, features, integrations, design depth and content. A small brochure site and a booking platform are very different projects. Tell us what you need and we will come back with a clear quote before any work begins.",
    },
    {
      question: "Why do you not list fixed packages?",
      answer:
        "Every business is different, and forcing projects into fixed packages usually means paying for things you do not need or missing things you do. We scope each project around what you actually need, so the quote reflects your goals and the work involved.",
    },
    {
      question: "Is the quote fixed once I accept it?",
      answer:
        "For project-based work, a defined scope comes with a fixed quote. If your needs change during the project, we talk to you about it before anything changes, so there are no surprises. Ongoing engagements are billed on a recurring basis and are agreed up front.", // TODO(verify): how scope changes are handled.
    },
    {
      question: "Are there hidden costs or locked-in retainers?",
      answer:
        "No hidden costs and no retainers you do not need. Some things are paid to outside providers rather than to us, such as advertising spend, domain names or software subscriptions. Where these apply to your project, the quote says so, so you know what to expect.", // TODO(verify): that third-party costs are itemised in the quote.
    },
    {
      question: "Can I start with one service and add more later?",
      answer:
        "Yes. Many clients start with one service, such as a website, and add others, such as SEO or a chatbot, later. Projects that combine services are scoped together as one engagement. You can begin with the part that matters most and grow from there.",
    },
    {
      question: "How quickly will I hear back, and what should I send?",
      answer:
        "We usually respond within one business day. Send a short description of what you are trying to build or fix, which services interest you, and any deadline you are working to. The more context you give, the faster we can scope the work and prepare a clear quote.",
    },
  ],
};
