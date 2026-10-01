/**
 * Copy for /services/[slug]. Every entry ships with `published: false`; the owner reviews
 * the text and flips the flag. Unpublished pages render in dev (or with SHOW_UNPUBLISHED=1),
 * send noindex, and stay out of the sitemap, nav, footer and every internal link.
 *
 * Rules (collabrate-content.json globalConstraints): no client names, no invented metrics,
 * no numeric pricing, no team-size claims, no founder, no em dashes. Sentences that go
 * beyond what the JSON states are marked TODO(verify) and listed in SEO/phase-b-report.md.
 */

export interface ServicePage {
  slug: string;
  /** Exact `name` of the service in collabrate-content.json (links the page to its JSON data). */
  serviceName: string;
  published: boolean;
  /** ISO date of the last real content change; becomes the sitemap lastModified. */
  updated: string;
  h1: string;
  /** Optional <title> override when "<Service> in Tamil Nadu and India | Collabrate" is over 60 characters. */
  metaTitle?: string;
  /** Meta description, 120 to 155 characters. */
  description: string;
  /** 40 to 60 words: what the service is and who it is for. */
  answer: string;
  whoItsFor: string[];
  /** Starts from the JSON `points`. */
  included: string[];
  /** Four steps, plain, no timeframes or numbers. */
  howItWorks: { title: string; text: string }[];
  /** Only tools already listed in src/lib/service-logos.ts or the content JSON. */
  toolsWeUse: string[];
  /** 4 to 6 entries, answers 40 to 80 words, no prices, no promises. */
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
  relatedIndustries: string[];
  relatedProjects: string[];
}

export const servicePages: ServicePage[] = [
  // ---------------------------------------------------------------- Marketing
  {
    slug: "social-media-marketing",
    serviceName: "Social Media Marketing",
    published: false,
    updated: "2026-10-01",
    h1: "Social media marketing for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Collabrate manages your social media end to end: content editing, scheduling and community management on Instagram, Facebook, LinkedIn and X.",
    answer:
      "Social media marketing keeps your business visible and active on the platforms your customers already use. Collabrate manages it end to end: we edit and design content from the material you provide, schedule posts, and handle comments and direct messages. It suits businesses that want a consistent, on-brand presence without running it in-house.",
    whoItsFor: [
      "Local and regional businesses that need a steady presence online but have nobody to run it day to day.",
      "Founders and owners who can share photos, videos and updates but do not have time to edit, schedule and reply.",
      "Businesses whose customers look for them on Instagram, Facebook, LinkedIn or X before getting in touch.",
    ],
    included: [
      "Platform mix across Instagram, Facebook, LinkedIn and X, decided case by case",
      "Content editing and design from the material you provide",
      "Posting and scheduling so content goes out consistently",
      "Community management: replying to comments and direct messages",
    ],
    howItWorks: [
      {
        title: "Choose the platforms",
        text: "We start with who you want to reach and pick the mix of platforms that fits your business, instead of posting everywhere by default.",
      },
      {
        title: "Share your material",
        text: "You send photos, videos, product details and updates. We edit and design them into posts that suit each platform and look like your brand.",
      },
      {
        title: "Schedule and publish",
        text: "Posts are scheduled in advance so your profiles stay active and consistent.", // TODO(verify): whether clients approve posts before they go out, and how.
      },
      {
        title: "Manage the conversation",
        text: "We reply to comments and direct messages, and pass on anything that needs a decision from you.", // TODO(verify): the hand-off process for messages that need the client.
      },
    ],
    toolsWeUse: ["Instagram", "Facebook", "LinkedIn", "X", "YouTube"],
    faqs: [
      {
        question: "Which social media platforms do you manage?",
        answer:
          "We work with Instagram, Facebook, LinkedIn and X. The mix is decided case by case, based on where your customers spend their time and what kind of content your business can supply. Not every business needs every platform, and a smaller number of well-kept profiles usually works better than many neglected ones.",
      },
      {
        question: "Do I need to provide the content?",
        answer:
          "You provide the raw material, such as photos, videos, product details and news from your business. We edit and design it into posts that suit each platform and your brand. If you are unsure which material is useful, tell us about your business and we will explain what is worth collecting.",
      },
      {
        question: "Will you reply to comments and messages?",
        answer:
          "Yes. Community management is part of the service, which means replying to comments and direct messages on your profiles. Anything that needs a decision from you, such as a custom request or a complaint, can be passed to you so the reply comes from someone with the full picture.", // TODO(verify): hand-off wording.
      },
      {
        question: "Is this the same as running paid ads?",
        answer:
          "No. Social media marketing here means organic content and community management on your own profiles. Paid advertising on Meta and LinkedIn is a separate service called performance marketing. The two work well together when they are planned as part of one strategy.",
      },
      {
        question: "How will I know whether it is working?",
        answer:
          "Each platform provides its own analytics on reach, engagement and follower growth, and your website analytics show how much traffic comes from social. We can review these with you and adjust the content. What counts as success depends on your goal, whether that is awareness, enquiries or answering customer questions.", // TODO(verify): that regular reviews of platform analytics are offered.
      },
    ],
    relatedServices: ["performance-marketing", "digital-marketing-strategy"],
    relatedIndustries: ["booking-and-scheduling-platforms", "ecommerce-websites-and-stores"], // TODO(verify): industry mapping is my judgement, not from the JSON.
    relatedProjects: ["turf-booking-platform", "gym-trainer-app"], // TODO(verify): mapping is my judgement; the JSON does not say social media was part of these projects.
  },

  {
    slug: "performance-marketing",
    serviceName: "Performance Marketing (Paid Ads)",
    published: false,
    updated: "2026-10-01",
    h1: "Performance marketing and paid ads for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Paid campaigns on Google Ads, Meta Ads and LinkedIn Ads, planned and run by Collabrate, with budgets adjusted based on what converts.",
    answer:
      "Performance marketing is paid advertising where spend is tied to measurable actions such as enquiries, sign-ups or sales. Collabrate plans, creates and runs paid campaigns on Google Ads, Meta Ads and LinkedIn Ads, builds the creatives as well as the targeting, and adjusts budgets based on what is actually converting.",
    whoItsFor: [
      "Businesses with a website or landing page that want more enquiries or sales and need traffic to send there.",
      "Online stores that want to reach shoppers through search and social platforms.",
      "B2B companies that want to reach decision makers by job role and industry on LinkedIn.",
      "Businesses already running ads that want campaigns managed against conversions rather than clicks.",
    ],
    included: [
      "Google Ads campaigns",
      "Meta Ads campaigns",
      "LinkedIn Ads campaigns",
      "Creatives built alongside the targeting",
      "Budget adjustments based on what converts",
    ],
    howItWorks: [
      {
        title: "Define the goal",
        text: "We agree what counts as a conversion for your business, such as a form submission, a call or a purchase, and which platforms suit that goal.",
      },
      {
        title: "Build campaigns and creatives",
        text: "We plan the campaign structure and targeting, and create the ad creatives ourselves so the message and the audience are designed together.",
      },
      {
        title: "Launch and measure",
        text: "Campaigns go live with conversion tracking, so results are measured against the goal you set.", // TODO(verify): that conversion tracking setup is part of the paid ads service.
      },
      {
        title: "Adjust the budget",
        text: "We move budget toward the campaigns, audiences and creatives that convert, and away from those that do not.",
      },
    ],
    toolsWeUse: ["Google Ads", "Meta Ads Manager", "LinkedIn Ads"],
    faqs: [
      {
        question: "Which ad platforms do you run campaigns on?",
        answer:
          "We run Google Ads, Meta Ads and LinkedIn Ads. Google reaches people while they are searching, Meta reaches people by interest and behaviour on Facebook and Instagram, and LinkedIn targets by job role and industry, which often suits B2B. Which one fits depends on your customers and your goal.",
      },
      {
        question: "Do you create the ads as well as manage them?",
        answer:
          "Yes. We build the creatives as well as the targeting, so the ad itself and the audience it is shown to are planned together. You do not need to arrive with finished designs or copy, although you are welcome to share brand material and examples you like.",
      },
      {
        question: "How is the ad budget handled?",
        answer:
          "Ad spend is paid to the advertising platform, separate from the service itself. We scope the work first and give you a clear quote, and during the campaign we adjust how the budget is split across campaigns and audiences based on what converts.", // TODO(verify): billing model (ad spend paid directly by the client to the platform).
      },
      {
        question: "Do I need a website before running ads?",
        answer:
          "Ads send people somewhere, so you need a page that can turn a visit into an enquiry or a sale. If your site or landing page is not ready, we can build one, because websites and landing pages are part of what we do and can be planned together with the campaigns.",
      },
      {
        question: "Is performance marketing the same as SEO?",
        answer:
          "No. Paid ads bring traffic for as long as the budget runs, while SEO builds visibility in unpaid search results over time. They complement each other, and a digital marketing strategy can plan how effort and budget are split between them for your business.",
      },
      {
        question: "How do you decide what is working?",
        answer:
          "We look at conversions, meaning the actions you care about such as form submissions, calls or purchases, rather than clicks alone. Budget then moves toward the campaigns, audiences and creatives that produce those actions, and away from the ones that only produce visits.",
      },
    ],
    relatedServices: ["landing-pages", "seo"],
    relatedIndustries: ["ecommerce-websites-and-stores", "business-and-corporate-websites"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["enterprise-software-website"], // TODO(verify): mapping is my judgement; the JSON does not say ads were part of this project.
  },

  {
    slug: "email-marketing",
    serviceName: "Email Marketing and Campaigns",
    published: false,
    updated: "2026-10-01",
    metaTitle: "Email Marketing in Tamil Nadu and India | Collabrate",
    h1: "Email marketing and campaigns for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Email copywriting, campaigns and automated sequences built by Collabrate in Mailchimp, Klaviyo or your existing tool, matched to your funnel.",
    answer:
      "Email marketing uses written campaigns and automated sequences to move leads and customers toward a decision. Collabrate writes the email copy, builds the campaigns and sets up automated flows such as welcome, nurture and abandoned cart emails, mapped to where each subscriber is in your funnel, in Mailchimp, Klaviyo or your existing tool.",
    whoItsFor: [
      "Businesses with leads or customers on a list who want to follow up in a planned way instead of sending occasional newsletters.",
      "Online stores that want abandoned cart and post-purchase emails.",
      "Service businesses that need to nurture enquiries until the person is ready to decide.",
    ],
    included: [
      "Full email copywriting",
      "Automated sequences: welcome, nurture, abandoned cart and more",
      "Platform setup or integration with Mailchimp, Klaviyo or your existing tool",
      "Campaigns mapped to where each subscriber is in your funnel",
    ],
    howItWorks: [
      {
        title: "Map the funnel",
        text: "We look at how people join your list and what decision each stage needs them to make, so every email has a clear job.",
      },
      {
        title: "Set up the platform",
        text: "We set up Mailchimp or Klaviyo, or connect to the email tool you already use, and link it to your website or store.",
      },
      {
        title: "Write and build",
        text: "We write the emails and build the campaigns and automated sequences, from a first welcome message through to follow-ups.",
      },
      {
        title: "Review and refine",
        text: "We look at how the emails perform and refine the copy and the sequence over time.", // TODO(verify): ongoing review and refinement as part of the service.
      },
    ],
    toolsWeUse: ["Mailchimp", "Klaviyo", "Amazon SES"], // Klaviyo is named in the JSON; Mailchimp and Amazon SES are in service-logos.ts.
    faqs: [
      {
        question: "Which email platforms do you work with?",
        answer:
          "We set up and integrate Mailchimp and Klaviyo, or work inside the email tool you already use. If you have a platform you are happy with, there is usually no reason to move. If you do not have one yet, we can recommend which of the two suits your business.",
      },
      {
        question: "What is an automated email sequence?",
        answer:
          "It is a set of emails that sends automatically when someone takes an action, such as joining your list or leaving items in a cart. Common examples are welcome, nurture and abandoned cart sequences. Once built, they keep working in the background without anyone sending each email by hand.",
      },
      {
        question: "Do you write the emails?",
        answer:
          "Yes, full email copywriting is included. We write each email around a single purpose for a specific stage of your funnel, so a welcome email, a follow-up and a reminder each read differently. You review the copy and can ask for changes.", // TODO(verify): client review step before sending.
      },
      {
        question: "Do I need an existing email list?",
        answer:
          "A list helps, but sequences such as welcome emails start working as soon as people subscribe. If you have no list yet, sign-up forms on your website or landing pages can begin collecting subscribers. Email should only go to people who have agreed to receive it.",
      },
      {
        question: "How is this different from sending a newsletter?",
        answer:
          "A newsletter sends the same message to everyone at once. Campaigns and sequences are mapped to where each subscriber actually is in your funnel, so a new subscriber, a warm lead and a returning customer each receive something relevant to their stage rather than a generic update.",
      },
      {
        question: "Can email marketing work with an online store?",
        answer:
          "Yes. For online stores, abandoned cart sequences remind shoppers about items they left behind, and other flows can follow up after a purchase. These connect your store to your email platform, so they depend on the store and platform you use. We set up the integration as part of the work.",
      },
    ],
    relatedServices: ["ecommerce-websites", "digital-marketing-strategy"],
    relatedIndustries: ["ecommerce-websites-and-stores", "business-and-corporate-websites"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["enterprise-software-website"], // TODO(verify): mapping is my judgement; the JSON does not say email was part of this project.
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
