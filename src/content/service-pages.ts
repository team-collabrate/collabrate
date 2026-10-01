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
          "Each platform provides its own analytics on reach, engagement and follower growth, and your website analytics show how much traffic comes from social. We can review these with you and adjust the content. What counts as success depends on your goal, whether that is awareness, inquiries or answering customer questions.", // TODO(verify): that regular reviews of platform analytics are offered.
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
      "Performance marketing is paid advertising where spend is tied to measurable actions such as inquiries, sign-ups or sales. Collabrate plans, creates and runs paid campaigns on Google Ads, Meta Ads and LinkedIn Ads, builds the creatives as well as the targeting, and adjusts budgets based on what is actually converting.",
    whoItsFor: [
      "Businesses with a website or landing page that want more inquiries or sales and need traffic to send there.",
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
          "We run Google Ads, Meta Ads and LinkedIn Ads. Google reaches people while they are searching, Meta reaches people by interest and behavior on Facebook and Instagram, and LinkedIn targets by job role and industry, which often suits B2B. Which one fits depends on your customers and your goal.",
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
          "Ads send people somewhere, so you need a page that can turn a visit into an inquiry or a sale. If your site or landing page is not ready, we can build one, because websites and landing pages are part of what we do and can be planned together with the campaigns.",
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
      "Service businesses that need to nurture inquiries until the person is ready to decide.",
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

  {
    slug: "linkedin-outreach",
    serviceName: "LinkedIn Outreach (Lead Generation)",
    published: false,
    updated: "2026-10-01",
    h1: "LinkedIn outreach and lead generation for B2B businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Targeted LinkedIn outreach using Sales Navigator, with message copywriting and founder profile management, run by Collabrate for B2B lead generation.",
    answer:
      "LinkedIn outreach is the practice of finding the right prospects on LinkedIn and starting relevant conversations with them. Collabrate handles both sides: targeted prospecting with Sales Navigator, written outreach messages, and management of the founder's personal profile so it supports the outreach. It suits B2B businesses that sell to other businesses.",
    whoItsFor: [
      "B2B companies that sell to specific roles or industries and want a steady source of conversations.",
      "Founders whose personal LinkedIn profile is the first thing a prospect checks.",
      "Businesses with a clear target customer but no one with time to find and contact them.",
    ],
    included: [
      "Prospecting with LinkedIn Sales Navigator",
      "Full outreach message copywriting",
      "Personal LinkedIn profile management for founders",
      "Outreach and profile planned together so they support each other",
    ],
    howItWorks: [
      {
        title: "Define the target",
        text: "We agree who you want to reach, by role, industry and company type, so prospecting starts from a clear picture of your customer.",
      },
      {
        title: "Prepare the profile",
        text: "We review and manage the founder's personal profile so that anyone who checks it after a message sees a clear, credible description of the business.",
      },
      {
        title: "Write and send outreach",
        text: "We build prospect lists in Sales Navigator and write the outreach messages for each audience.", // TODO(verify): who sends the messages and how (manually from the client's account or otherwise).
      },
      {
        title: "Follow up and adjust",
        text: "We follow up with people who reply, hand warm conversations to you, and adjust the targeting and messages based on the responses.", // TODO(verify): hand-off and adjustment process.
      },
    ],
    toolsWeUse: ["LinkedIn Sales Navigator", "HubSpot"],
    faqs: [
      {
        question: "What is LinkedIn Sales Navigator?",
        answer:
          "Sales Navigator is LinkedIn's paid tool for finding prospects. It lets you filter people by role, industry, company and other criteria, and save lists to follow. We use it to build targeted prospect lists, so outreach goes to people who plausibly need what your business offers rather than to a broad audience.",
      },
      {
        question: "Who writes the outreach messages?",
        answer:
          "We do. Full outreach message copywriting is part of the service. Messages are written for each audience and aim to start a relevant conversation rather than make a hard sales pitch. You can review the wording, and we adjust it based on how people respond.", // TODO(verify): client review of messages.
      },
      {
        question: "Why does my personal profile matter for outreach?",
        answer:
          "When a prospect receives a message, they usually look at the sender's profile before replying. If the profile is unclear or out of date, it can undercut the message. For this reason we manage the founder's personal profile as part of the service, so profile and outreach tell the same story.",
      },
      {
        question: "Is LinkedIn outreach right for every business?",
        answer:
          "It suits businesses that sell to other businesses and can name their target roles or industries. If your customers are mainly individual consumers, other channels such as search, social media or paid ads are usually a better fit. We can help you decide when we scope the work.",
      },
    ],
    relatedServices: ["performance-marketing", "digital-marketing-strategy"],
    relatedIndustries: ["business-and-corporate-websites", "workforce-and-recruitment-systems"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["enterprise-software-website"], // TODO(verify): mapping is my judgement.
  },

  {
    slug: "seo",
    serviceName: "SEO",
    published: false,
    updated: "2026-10-01",
    h1: "SEO services for businesses in Tamil Nadu, India, Singapore, Malaysia and the Gulf",
    description:
      "Collabrate handles SEO end to end: technical fixes, SEO content writing and keyword research, so your website can be found by the people searching for you.",
    answer:
      "SEO, or search engine optimization, is the work of making your website easier to find in unpaid search results. Collabrate handles it end to end: fixing the technical foundation, writing optimized content, and targeting the keywords your customers search for. It suits businesses that want search to become a steady source of inquiries.",
    whoItsFor: [
      "Businesses whose customers search online for what they offer, in a city, a region or nationally.",
      "Owners of an existing website that is slow, poorly structured or not appearing in search results.",
      "Companies that want to build visibility that continues after an ad budget stops.",
    ],
    included: [
      "Technical SEO: site speed, structure and indexing",
      "SEO content writing for blog posts and pages",
      "Keyword research and optimization",
      "Backlink building on request",
    ],
    howItWorks: [
      {
        title: "Audit the foundation",
        text: "We check how your site is built, how quickly it loads and whether search engines can crawl and index the right pages.",
      },
      {
        title: "Research the keywords",
        text: "We work out what your customers actually search for and match those phrases to the pages that should answer them.",
      },
      {
        title: "Fix and write",
        text: "We correct technical problems and write or improve the pages and articles that target those keywords.",
      },
      {
        title: "Review and extend",
        text: "We check how pages are performing in search, then improve them and add new content where the opportunity is.", // TODO(verify): ongoing review as part of the service.
      },
    ],
    toolsWeUse: ["Google Search Console", "SEMrush", "Ahrefs"],
    faqs: [
      {
        question: "What does technical SEO cover?",
        answer:
          "Technical SEO is about how your site is built rather than what it says. It covers page speed, site structure, how pages link to each other, and whether search engines can crawl and index the pages you want found. Problems here can hold back even good content, so we look at them first.",
      },
      {
        question: "Do you write the content as well?",
        answer:
          "Yes. SEO content writing, including blog posts and website pages, is part of the service. Content is written around keywords your customers actually search for, and should still read naturally for a person. We work from what you tell us about your business so the pages stay accurate.",
      },
      {
        question: "How is SEO different from paid ads?",
        answer:
          "Paid ads bring visitors only while the budget runs. SEO works on your unpaid search visibility, which tends to build gradually and continues after the work is done. Neither replaces the other, and a digital marketing strategy can plan how to combine them for your business.",
      },
      {
        question: "Do you build backlinks?",
        answer:
          "Backlink building is available on request. Links from other relevant websites are one signal search engines use, but they should be earned from real sources and not bought in bulk. If you want links as part of the work, tell us and we will explain what is appropriate for your situation.",
      },
      {
        question: "Can SEO help a local business?",
        answer:
          "Yes. Many customers search for a service together with a place name, so a page that clearly describes what you offer and where you offer it can help you appear for those searches. The right approach depends on your business, so we start by looking at what your customers search for.",
      },
    ],
    relatedServices: ["website-development", "digital-marketing-strategy"],
    relatedIndustries: ["business-and-corporate-websites", "ecommerce-websites-and-stores"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["enterprise-software-website"], // TODO(verify): mapping is my judgement.
  },

  {
    slug: "digital-marketing-strategy",
    serviceName: "Digital Marketing Strategy",
    published: false,
    updated: "2026-10-01",
    h1: "Digital marketing strategy for businesses in India, Singapore, Malaysia and the Gulf",
    metaTitle: "Digital Marketing Strategy in India | Collabrate",
    description:
      "One coordinated plan across SEO, paid ads, social media and email, with GA4 reporting and shared budget planning, prepared by Collabrate.",
    answer:
      "A digital marketing strategy is a single plan that decides what each marketing channel is for and how much effort goes into it. Collabrate ties your SEO, paid ads, social media and email together, with analytics and reporting, so every channel works toward the same goal. It suits businesses using several channels without a shared plan.",
    whoItsFor: [
      "Businesses running SEO, ads, social or email separately, with no common goal.",
      "Owners deciding where a limited marketing budget should go.",
      "Companies that want clear reporting on what each channel contributes.",
    ],
    included: [
      "Cross-channel strategy across SEO, ads, social media and email",
      "Analytics and reporting with GA4 and dashboards",
      "Collaborative budget and channel planning",
    ],
    howItWorks: [
      {
        title: "Set the goals",
        text: "We agree what the marketing needs to achieve for the business, such as inquiries, sales or bookings, and how that will be measured.",
      },
      {
        title: "Review the channels",
        text: "We look at what is already running across search, ads, social and email, and what each channel is doing for you.",
      },
      {
        title: "Plan together",
        text: "We plan which channels to use, how to split the budget between them, and how they support each other. You take part in these decisions.",
      },
      {
        title: "Measure and report",
        text: "We set up analytics and reporting, so you can see results across channels in one place and adjust the plan.",
      },
    ],
    toolsWeUse: ["Google Analytics"],
    faqs: [
      {
        question: "What is a digital marketing strategy?",
        answer:
          "It is a written plan that connects your marketing channels to a business goal. It states which channels you will use, what each is responsible for, how the budget is shared, and how results will be measured. Without one, channels such as SEO, ads, social media and email tend to be run separately and can work against each other.",
      },
      {
        question: "Which channels does the strategy cover?",
        answer:
          "It covers SEO, paid advertising, social media and email, the four channels we also run as separate services. The strategy decides how they fit together for your business. Not every business needs all four, so the plan may recommend starting with one or two and adding others later.",
      },
      {
        question: "Will I be involved in budget decisions?",
        answer:
          "Yes. Budget and channel planning is done collaboratively. We explain what each channel is likely to contribute and what it needs, and you decide how much to put where. Nothing is committed without your agreement, and the plan can be adjusted as results come in.",
      },
      {
        question: "What reporting do I receive?",
        answer:
          "Analytics and reporting are part of the service, using GA4 and dashboards, so you can see how traffic and inquiries are changing and which channels contribute. The exact format and how often it is shared are agreed when we scope the work for your business.", // TODO(verify): reporting format and cadence.
      },
    ],
    relatedServices: ["seo", "performance-marketing"],
    relatedIndustries: ["business-and-corporate-websites", "ecommerce-websites-and-stores"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["enterprise-software-website"], // TODO(verify): mapping is my judgement.
  },

  // ------------------------------------------------------------------ Web and app
  {
    slug: "website-development",
    serviceName: "Website Development",
    published: false,
    updated: "2026-10-01",
    h1: "Website development for businesses in Tamil Nadu, India, Singapore, Malaysia and the Gulf",
    description:
      "Custom websites from UI/UX design through development, built by Collabrate for speed and conversions, with search visibility planned in from the start.",
    answer:
      "Website development is the design and build of a site that represents your business online and turns visitors into inquiries. Collabrate builds custom websites from UI/UX design through development, either custom-coded or on a CMS such as WordPress, with performance and search visibility built in from the start rather than added later.",
    whoItsFor: [
      "New businesses that need their first website.",
      "Businesses with an outdated or slow site that no longer represents them.",
      "Companies that want a site built around their own goals instead of a generic template.",
    ],
    included: [
      "Custom-coded or CMS-based (WordPress) build, chosen per client need",
      "UI/UX design handled in-house",
      "Performance and speed optimization",
      "Search visibility planned in from the start",
    ],
    howItWorks: [
      {
        title: "Understand the goal",
        text: "We start with what the website must do for your business and who it is for, so every page has a reason to exist.",
      },
      {
        title: "Design the experience",
        text: "We design the layout and flow of the site, so visitors can find what they need and know what to do next.",
      },
      {
        title: "Build and optimize",
        text: "We build the site custom-coded or on WordPress, depending on what suits you, and tune it for speed.",
      },
      {
        title: "Launch and connect",
        text: "We launch the site and connect analytics and any tools you use, such as a CRM or payments, so it is ready to measure results.", // TODO(verify): launch-stage tasks. The JSON states tracking is wired in during the build.
      },
    ],
    toolsWeUse: ["Figma", "Framer", "React", "Node.js", "WordPress", "Webflow"],
    faqs: [
      {
        question: "Should my website be custom-coded or built on WordPress?",
        answer:
          "It depends on what you need. WordPress suits sites where your team wants to edit content easily. A custom-coded site gives more control over design and performance for unusual requirements. We choose per project and explain the trade-off, so the decision is based on your needs and not on habit.",
      },
      {
        question: "Do you handle the design as well as the development?",
        answer:
          "Yes. UI/UX design is handled in-house, so the same people shaping how the site looks and flows are connected to how it is built. You do not need to arrive with finished designs, although you are welcome to share brand material and sites you like.", // TODO(verify): "same people" claim is a team-structure implication; reword if unsure.
      },
      {
        question: "Will my website be fast and easy to find in search?",
        answer:
          "Performance and search visibility are built in from the start. That means attention to loading speed and a clean structure that search engines can read. No one can promise a particular ranking, but a fast, well-structured site gives later SEO work a stronger foundation than one that is fixed afterwards.",
      },
      {
        question: "Can the website connect to my other tools?",
        answer:
          "Yes. Analytics, CRM and payments can be connected during the build, so the site is ready to measure and capture leads from the first day. Tell us which tools you already use and we will plan the integrations when we scope the project.",
      },
      {
        question: "What do you need from me to get started?",
        answer:
          "A clear idea of what the site is for, who it should reach, and any brand assets you already have, such as a logo, colours and photos. If some of this is not ready, we can help work it out. Content such as service descriptions and contact details is needed before launch.",
      },
    ],
    relatedServices: ["business-websites", "seo"],
    relatedIndustries: ["business-and-corporate-websites", "booking-and-scheduling-platforms"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["enterprise-software-website", "turf-booking-platform"],
  },

  {
    slug: "mobile-app-development",
    serviceName: "Mobile Application Development",
    published: false,
    updated: "2026-10-01",
    h1: "Mobile app development for businesses in Tamil Nadu, India, Singapore, Malaysia and the Gulf",
    metaTitle: "Mobile App Development in Tamil Nadu and India | Collabrate",
    description:
      "Android, iOS and cross-platform apps designed and built by Collabrate, chosen per project and taken through to App Store and Play Store deployment.",
    answer:
      "Mobile app development is the design and build of an application that people install on their phones. Collabrate designs and builds apps as native Android in Kotlin, native iOS in Swift, or cross-platform in Flutter or React Native, chosen per project, and carries them through to App Store and Play Store deployment.",
    whoItsFor: [
      "Businesses whose customers or staff would use a dedicated app, such as for booking, tracking or managing work.",
      "Founders with a product idea that needs to run on phones.",
      "Organizations that want one app on both Android and iOS.",
    ],
    included: [
      "Native Android (Kotlin), native iOS (Swift) or cross-platform (Flutter, React Native), chosen per project",
      "Design focused on an app people keep using",
      "App Store and Play Store deployment",
    ],
    howItWorks: [
      {
        title: "Define the app",
        text: "We agree what the app must do, who will use it and which devices they use, so the first version stays focused.",
      },
      {
        title: "Choose the approach",
        text: "We choose native or cross-platform based on what the project needs, and explain the reasons.",
      },
      {
        title: "Design and build",
        text: "We design the screens and flows, then build the app, so that everyday tasks are quick for the user.",
      },
      {
        title: "Publish to the stores",
        text: "We take the app through App Store and Play Store deployment, so it is ready for people to install.",
      },
    ],
    toolsWeUse: ["Flutter", "React Native", "Swift", "Kotlin"],
    faqs: [
      {
        question: "Should my app be native or cross-platform?",
        answer:
          "Native apps are written separately for Android and iOS and can make the fullest use of each phone. Cross-platform tools such as Flutter and React Native let one codebase serve both. The right choice depends on the features you need and your plans, so we decide per project rather than by default.",
      },
      {
        question: "Do you help publish the app to the App Store and Play Store?",
        answer:
          "Yes. Carrying the app through App Store and Play Store deployment is part of the service. The stores have their own review requirements, so we prepare the app to meet them. Store accounts normally belong to your business, and we will explain what you need to set up.", // TODO(verify): store account ownership practice.
      },
      {
        question: "Can the app work with my existing website or systems?",
        answer:
          "Often yes. Apps commonly connect to a website, a database or other tools through an API. Whether that is practical depends on what you already use, so tell us about your existing systems when we scope the project and we will explain what integration would involve.",
      },
      {
        question: "Do I need an app or is a website enough?",
        answer:
          "A website reaches anyone with a browser and is usually the right first step. An app suits cases where people return often, need features tied to their phone, or use the product daily. If a website would serve you, we will say so instead of recommending an app you do not need.",
      },
    ],
    relatedServices: ["website-development", "dashboards-and-admin-panels"],
    relatedIndustries: ["booking-and-scheduling-platforms", "vendor-and-distribution-management"],
    relatedProjects: ["gym-trainer-app", "dairy-vendor-management-app"], // TODO(verify): confirm these projects were mobile apps; the JSON calls them apps.
  },

  {
    slug: "landing-pages",
    serviceName: "Landing Pages",
    published: false,
    updated: "2026-10-01",
    h1: "Landing page design and development for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Focused, fast landing pages built by Collabrate around one conversion goal, then tested with A/B testing and refined against real visitor behavior.",
    answer:
      "A landing page is a single page built around one goal, such as getting an inquiry or a sign-up. Collabrate designs landing pages with deliberate layout and copy choices, builds them to load fast on mobile, and tests and refines them against real visitor behavior instead of guesswork. They suit campaigns where traffic needs somewhere focused to land.",
    whoItsFor: [
      "Businesses running paid ads or email campaigns that need a focused page for the traffic.",
      "Companies launching a single product, offer or event.",
      "Owners whose current page gets visits but few inquiries.",
    ],
    included: [
      "Conversion-focused design",
      "A/B testing",
      "Fast load times and mobile optimization",
    ],
    howItWorks: [
      {
        title: "Pick the one goal",
        text: "We agree the single action the page should lead to and who the visitor is, so the page does not try to do everything.",
      },
      {
        title: "Design and write",
        text: "We design the layout and write the copy around that goal, with a clear call to action.",
      },
      {
        title: "Build for speed",
        text: "We build the page to load quickly and work well on phones, where much of the traffic arrives.",
      },
      {
        title: "Test and refine",
        text: "We run A/B tests and refine the page based on how visitors actually behave.",
      },
    ],
    toolsWeUse: ["Figma", "Framer"],
    faqs: [
      {
        question: "What is the difference between a landing page and a website?",
        answer:
          "A website has many pages for many purposes. A landing page has one purpose and usually removes distractions such as extra menus so the visitor focuses on a single action. It is often used with ads or email campaigns, where you know why the visitor arrived and what you want them to do.",
      },
      {
        question: "What is A/B testing?",
        answer:
          "A/B testing shows two versions of a page, for example with different headlines, to different visitors and compares which one leads to more of the action you want. It replaces guesswork with evidence from your own visitors. It needs enough traffic to be meaningful, which we discuss when planning.",
      },
      {
        question: "Will the page work on mobile phones?",
        answer:
          "Yes. Fast load times and mobile optimization are part of the service. Many visitors will arrive on a phone, often from a social media or search ad, and a slow or awkward page loses them quickly, so the mobile version is designed and checked as carefully as the desktop one.",
      },
      {
        question: "Do I need a landing page if I already have a website?",
        answer:
          "Often it helps. A page made for one campaign can match the ad's message and goal more closely than a general page on your main site. If you are not running campaigns, improving your main pages may be the better first step, and we can help you decide.",
      },
    ],
    relatedServices: ["performance-marketing", "email-marketing"],
    relatedIndustries: ["ecommerce-websites-and-stores", "business-and-corporate-websites"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["enterprise-software-website"], // TODO(verify): mapping is my judgement.
  },

  {
    slug: "business-websites",
    serviceName: "Business Websites",
    published: false,
    updated: "2026-10-01",
    h1: "Business website design and development in Tamil Nadu, India and the Gulf",
    description:
      "Business websites built by Collabrate to turn visitors into inquiries, with clear calls to action, an SEO-ready structure and lead capture from day one.",
    answer:
      "A business website presents your company, explains what you offer and turns visitors into inquiries. Collabrate builds business websites on a custom CMS or WordPress, structured around clear calls to action and an SEO-ready foundation, with contact and lead capture wired in from the start instead of added after launch.",
    whoItsFor: [
      "Service companies, manufacturers and professional firms that need a credible online presence.",
      "Businesses that rely on referrals and need a site to confirm their credibility.",
      "Companies replacing an old site that does not bring in inquiries.",
    ],
    included: [
      "Custom CMS or WordPress",
      "SEO-ready structure",
      "Contact and lead-capture integration",
      "Clear calls to action on every key page",
    ],
    howItWorks: [
      {
        title: "Plan the structure",
        text: "We decide which pages the site needs and how visitors move between them, based on the questions your customers ask.",
      },
      {
        title: "Design the pages",
        text: "We design each page around a clear call to action, so visitors know how to contact you.",
      },
      {
        title: "Build with lead capture",
        text: "We build the site on a custom CMS or WordPress and connect contact forms and lead capture from the start.",
      },
      {
        title: "Launch and hand over",
        text: "We launch the site and explain how to update it, so your team can keep content current.", // TODO(verify): handover and training.
      },
    ],
    toolsWeUse: ["WordPress"],
    faqs: [
      {
        question: "What pages does a business website need?",
        answer:
          "Most need a home page, pages describing each service, an about page and a contact page. Beyond that it depends on your business, for example a portfolio, pricing information or frequently asked questions. We plan the structure around what your customers want to know before they get in touch.",
      },
      {
        question: "Can I update the website myself?",
        answer:
          "Yes, if the site is built on a CMS such as WordPress or a custom CMS, which let you edit text and images without writing code. We choose the setup to match how much you want to change yourself, and we explain how to use it when the site is handed over.", // TODO(verify): handover.
      },
      {
        question: "What does SEO-ready mean?",
        answer:
          "It means the site is built so search engines can read and understand it: a clear page structure, sensible headings, fast loading, and pages that match what people search for. It does not promise a ranking, but it avoids the structural problems that make search work harder later on.",
      },
      {
        question: "How do inquiries reach me?",
        answer:
          "Contact forms and lead capture are connected during the build. Inquiries can be sent to your email or into a CRM, depending on what you use. Tell us how your team handles inquiries today and we will set the site up to fit that, not the other way round.",
      },
    ],
    relatedServices: ["website-development", "seo"],
    relatedIndustries: ["business-and-corporate-websites"],
    relatedProjects: ["enterprise-software-website"],
  },

  {
    slug: "dashboards-and-admin-panels",
    serviceName: "Dashboards and Admin Panels",
    published: false,
    updated: "2026-10-01",
    h1: "Custom dashboards and admin panels for businesses in India, Singapore, Malaysia and the Gulf",
    metaTitle: "Admin Panels and Dashboards in Tamil Nadu | Collabrate",
    description:
      "Internal tools built by Collabrate around how your team works, with role-based access and real-time data, so operations run on live information.",
    answer:
      "A dashboard or admin panel is an internal tool your team uses to manage the business, such as viewing data, handling records or approving requests. Collabrate builds custom tools that match how your team works, with role-based access and real-time data, so operations run on live information instead of static reports.",
    whoItsFor: [
      "Businesses managing work in spreadsheets, messages and paper that has outgrown them.",
      "Teams that need different people to see and do different things.",
      "Companies that want live figures instead of reports prepared by hand.",
    ],
    included: [
      "Custom internal tools",
      "Role-based access and permissions",
      "Real-time data integration",
    ],
    howItWorks: [
      {
        title: "Map the workflow",
        text: "We learn how your team currently does the work and where time is lost, so the tool follows your process.",
      },
      {
        title: "Define roles and data",
        text: "We decide who needs to see and change what, and which data the tool must show.",
      },
      {
        title: "Build the tool",
        text: "We build the screens and connect them to live data so what your team sees is current.",
      },
      {
        title: "Refine with your team",
        text: "We adjust the tool based on how your team actually uses it.", // TODO(verify): feedback and refinement stage.
      },
    ],
    toolsWeUse: ["PostgreSQL"],
    faqs: [
      {
        question: "What is an admin panel?",
        answer:
          "It is the back-office side of a website or application, used by your team rather than by customers. It is where staff manage records, approve requests, update content or view figures. A custom admin panel is built around your own process, which usually fits better than a generic tool adapted to it.",
      },
      {
        question: "What does role-based access mean?",
        answer:
          "It means each person sees and can do only what their role allows. A manager may view reports and approve requests, while a staff member can enter data but not change settings. It protects sensitive information and keeps screens simple for each user, because they see only what is relevant.",
      },
      {
        question: "Can the dashboard show live data?",
        answer:
          "Yes. Real-time data integration is part of the service, so figures reflect what is happening now and not a report from last week. What can be shown live depends on the systems that hold your data, and we confirm that when we scope the project.",
      },
      {
        question: "Can you build on top of my existing system?",
        answer:
          "Often yes, if your existing system exposes its data in a way another tool can use. If not, a new system may be needed. We look at what you have first, and tell you plainly which approach makes sense, instead of rebuilding something that already works.",
      },
    ],
    relatedServices: ["workflow-automation", "mobile-app-development"],
    relatedIndustries: ["workforce-and-recruitment-systems", "vendor-and-distribution-management"],
    relatedProjects: ["hr-recruitment-dashboard", "dairy-vendor-management-app"],
  },

  {
    slug: "ecommerce-websites",
    serviceName: "E-commerce Websites",
    published: false,
    updated: "2026-10-01",
    h1: "E-commerce website development for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Online stores built by Collabrate on Shopify or a custom build, designed for browsing, trust and checkout, with payment gateways and tuned cart flows.",
    answer:
      "An e-commerce website is an online store where customers browse products and pay. Collabrate builds stores on Shopify or as a custom build, depending on your needs, optimized for browsing, trust and checkout, with payment gateway integration and cart flows tuned to reduce drop-off at every step.",
    whoItsFor: [
      "Businesses selling products online for the first time.",
      "Sellers on marketplaces who want their own store.",
      "Existing stores with many visitors and abandoned carts.",
    ],
    included: [
      "Shopify or custom builds",
      "Payment gateway integration",
      "Cart and checkout optimization",
      "A layout designed for browsing and trust",
    ],
    howItWorks: [
      {
        title: "Choose the platform",
        text: "We choose between Shopify and a custom build, based on your catalogue, your plans and how much control you need.",
      },
      {
        title: "Design the store",
        text: "We design the browsing experience and product pages so shoppers can find items and trust what they see.",
      },
      {
        title: "Connect payments and checkout",
        text: "We integrate payment gateways and set up the cart and checkout flow to remove unnecessary steps.",
      },
      {
        title: "Launch and refine",
        text: "We launch the store and look at where shoppers drop off, then refine the flow.", // TODO(verify): post-launch refinement.
      },
    ],
    toolsWeUse: ["Shopify", "WooCommerce", "Stripe"],
    faqs: [
      {
        question: "Should I use Shopify or a custom store?",
        answer:
          "Shopify is a good fit when you want a proven platform with standard features and quick setup. A custom build suits unusual requirements, such as special pricing rules or deep integration with your own systems. We recommend one after learning about your products and plans, and explain the reasons.",
      },
      {
        question: "Which payment methods can the store accept?",
        answer:
          "Payment gateway integration is part of the service. The options available depend on the gateway you choose and the countries you sell in. Tell us where your customers are and how they like to pay, and we will advise on suitable gateways when we scope the project.",
      },
      {
        question: "What does checkout optimization involve?",
        answer:
          "It means looking at each step between adding an item to the cart and paying, and removing anything that makes people give up, such as extra form fields, unclear costs or forced account creation. Small changes at these steps often matter more than changes to the rest of the store.",
      },
      {
        question: "Can I manage products myself after launch?",
        answer:
          "Yes. Both Shopify and well-built custom stores include an admin area for adding products, changing prices and managing orders. We explain how to use it when the store is handed over, so routine updates such as new products and price changes do not depend on us.", // TODO(verify): handover.
      },
    ],
    relatedServices: ["email-marketing", "performance-marketing"],
    relatedIndustries: ["ecommerce-websites-and-stores"],
    relatedProjects: ["turf-booking-platform"], // TODO(verify): the turf project included food ordering listings; confirm it is a fair example of e-commerce or drop it.
  },

  // ------------------------------------------------------------------------- AI
  {
    slug: "ai-chatbots",
    serviceName: "AI Chatbots",
    published: false,
    updated: "2026-10-01",
    h1: "AI chatbot development for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Hybrid chatbots from Collabrate that combine structured flows with AI, trained on your business data and deployed on your website, WhatsApp and Instagram.",
    answer:
      "An AI chatbot answers customer questions automatically, around the clock. Collabrate builds hybrid chatbots that combine structured flows with AI, trained on your own documents, FAQs and business data instead of generic scripts, and deploys them where your customers already are, such as your website, WhatsApp and Instagram.",
    whoItsFor: [
      "Businesses that receive the same questions repeatedly by message or on their website.",
      "Companies that want to respond to inquiries outside working hours.",
      "Teams that want customers to get quick answers and reach a person for harder questions.",
    ],
    included: [
      "Hybrid rule-based and AI or LLM chatbot development",
      "Multi-channel deployment on your website, WhatsApp, Instagram and more",
      "Training on your documents, FAQs and business data",
    ],
    howItWorks: [
      {
        title: "Collect the knowledge",
        text: "We gather the documents, FAQs and information the chatbot should be able to answer from.",
      },
      {
        title: "Design the conversation",
        text: "We design structured flows for common tasks and decide where AI answers open questions.",
      },
      {
        title: "Train and connect",
        text: "We train the chatbot on your business data and connect it to the channels you choose.",
      },
      {
        title: "Test and improve",
        text: "We test the answers, correct mistakes and improve the chatbot as real conversations show gaps.", // TODO(verify): post-launch improvement.
      },
    ],
    toolsWeUse: ["OpenAI", "Google Dialogflow", "Botpress"],
    faqs: [
      {
        question: "What is a hybrid chatbot?",
        answer:
          "A hybrid chatbot combines fixed, rule-based flows with AI. Fixed flows handle predictable tasks, such as taking a booking or collecting contact details, in a controlled way. AI handles open questions in natural language. Using both keeps important steps reliable while still letting people ask in their own words.",
      },
      {
        question: "What data is the chatbot trained on?",
        answer:
          "It is trained on your own documents, FAQs and business data, so its answers reflect your business and not generic scripts. The quality of the chatbot depends on the quality of that material, so we may ask you to fill gaps or correct out-of-date information before launch.",
      },
      {
        question: "Which channels can the chatbot run on?",
        answer:
          "We deploy chatbots on your website, WhatsApp and Instagram, and on other channels where your customers already are. Each channel has its own rules and setup requirements, which we explain when we scope the project, so you know what is possible for the channels you care about.",
      },
      {
        question: "Can a customer reach a real person?",
        answer:
          "That is a design choice we recommend. A chatbot should hand over to a person for questions it cannot answer or that need judgement. We plan where that hand-over happens and how your team is notified, so customers are not left stuck in a loop.", // TODO(verify): handover capability.
      },
    ],
    relatedServices: ["ai-support-systems", "workflow-automation"],
    relatedIndustries: ["booking-and-scheduling-platforms", "ecommerce-websites-and-stores"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["turf-booking-platform"], // The JSON mentions WhatsApp support integration on this project.
  },

  {
    slug: "workflow-automation",
    serviceName: "Workflow Automation",
    published: false,
    updated: "2026-10-01",
    h1: "Workflow automation for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Collabrate automates repetitive tasks across the tools you already use with Zapier, Make, n8n or custom scripts, so work moves between systems on its own.",
    answer:
      "Workflow automation connects the tools you already use so that repetitive tasks happen without manual handoffs. Collabrate builds trigger-based automations with Zapier, Make or custom scripts, integrating your CRM and other tools, so that, for example, a new inquiry is recorded and followed up automatically.",
    whoItsFor: [
      "Teams copying information between tools by hand.",
      "Businesses where inquiries, orders or tasks wait for someone to pass them on.",
      "Owners who want routine follow-ups to happen consistently.",
    ],
    included: [
      "Zapier, Make or custom scripts",
      "Tool and CRM integrations",
      "Trigger-based task automation",
    ],
    howItWorks: [
      {
        title: "Find the repetitive work",
        text: "We list the tasks your team repeats and the tools involved, and choose the ones worth automating first.",
      },
      {
        title: "Design the flow",
        text: "We define what triggers each automation and what should happen next, including what to do when something goes wrong.",
      },
      {
        title: "Build and connect",
        text: "We build the automations in Zapier, Make or custom scripts and connect your tools and CRM.",
      },
      {
        title: "Test and monitor",
        text: "We test each flow with real examples and check that it keeps running as expected.", // TODO(verify): monitoring after launch.
      },
    ],
    toolsWeUse: ["Zapier", "Make", "n8n"],
    faqs: [
      {
        question: "What kind of tasks can be automated?",
        answer:
          "Rule-based, repeating tasks are the ones that suit automation: saving a new inquiry to your CRM, sending a confirmation message, creating a task when an order arrives, or copying data from one tool to another. If the steps can be described clearly and do not need judgement, they can usually be automated.",
      },
      {
        question: "Which tools do you use for automation?",
        answer:
          "We use Zapier, Make and n8n, and write custom scripts when a ready-made connector is not enough. The choice depends on the tools you use and how complex the flow is. Ready-made platforms are quicker to set up, while custom scripts give more control for unusual needs.",
      },
      {
        question: "Do I have to change the tools I already use?",
        answer:
          "Usually not. The point of automation is to connect the tools you already use, so information moves between them without being retyped. We look at what you have first, and only suggest a change when a tool cannot connect to the rest of your setup.",
      },
      {
        question: "What happens if an automation fails?",
        answer:
          "Automations can fail, for example when a connected tool changes or goes offline. We design flows so that errors are noticed and not silently lost, and we plan what should happen to the affected task. How you are notified is agreed during design.", // TODO(verify): error-handling and notification approach.
      },
    ],
    relatedServices: ["ai-chatbots", "dashboards-and-admin-panels"],
    relatedIndustries: ["workforce-and-recruitment-systems", "vendor-and-distribution-management"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["hr-recruitment-dashboard"], // TODO(verify): mapping is my judgement.
  },

  {
    slug: "ai-support-systems",
    serviceName: "AI-Powered Support Systems",
    published: false,
    updated: "2026-10-01",
    h1: "AI-powered customer support systems for businesses in India, Singapore, Malaysia and the Gulf",
    metaTitle: "AI Support Systems in Tamil Nadu and India | Collabrate",
    description:
      "Support systems built by Collabrate that route and prioritize tickets, answer from your knowledge base and escalate to a human agent when needed.",
    answer:
      "An AI-powered support system helps your team answer customers faster. Collabrate builds systems that route and prioritize tickets automatically, pull answers from your knowledge base, and escalate to a human agent whenever one is actually needed. It suits businesses whose support requests are growing faster than their team.",
    whoItsFor: [
      "Businesses receiving support requests across email, chat and messages that are hard to keep track of.",
      "Teams answering the same questions repeatedly.",
      "Companies that want urgent requests seen first.",
    ],
    included: [
      "Ticket routing and prioritization",
      "Knowledge base integration",
      "Escalation to human agents when needed",
    ],
    howItWorks: [
      {
        title: "Review current support",
        text: "We look at how requests arrive today, the questions asked most often and where customers wait longest.",
      },
      {
        title: "Organize the knowledge",
        text: "We help structure your answers into a knowledge base that the system can draw from.",
      },
      {
        title: "Set up routing and escalation",
        text: "We configure how tickets are sorted and prioritized, and when a person must take over.",
      },
      {
        title: "Test with real requests",
        text: "We test the system on real examples and adjust before it is relied on.", // TODO(verify): testing process.
      },
    ],
    toolsWeUse: ["Zendesk", "Intercom", "Freshdesk"],
    faqs: [
      {
        question: "What does ticket routing and prioritization mean?",
        answer:
          "Routing sends each support request to the right person or team, and prioritization decides which requests are handled first. Doing this automatically means urgent or high-value requests are not left waiting in a general queue, and your team spends less time sorting messages and more time answering them.",
      },
      {
        question: "Where do the answers come from?",
        answer:
          "From your knowledge base, which is the collection of your own help articles, policies and FAQs. The system pulls answers from that material so responses reflect how your business actually works. If the knowledge base is thin or out of date, answers will be too, so we help organize it.",
      },
      {
        question: "When does a human agent take over?",
        answer:
          "Whenever one is actually needed. Escalation to human agents is part of the system, so complex, sensitive or unclear requests reach a person. We agree the rules for that hand-over with you, so customers are never stuck with an automated answer that does not solve their problem.",
      },
      {
        question: "Can it work with the support tool I already use?",
        answer:
          "Often yes. Many businesses already use tools such as Zendesk, Intercom or Freshdesk, and a support system can be built to work with them. Whether that suits your case depends on the tool and your needs, so we check this when we scope the project.", // TODO(verify): the logo list names these tools; confirm integration is offered with each.
      },
    ],
    relatedServices: ["ai-chatbots", "workflow-automation"],
    relatedIndustries: ["ecommerce-websites-and-stores", "booking-and-scheduling-platforms"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["turf-booking-platform"], // TODO(verify): mapping is my judgement.
  },

  {
    slug: "ai-voice-assistants",
    serviceName: "AI Voice Assistants",
    published: false,
    updated: "2026-10-01",
    h1: "AI voice assistants for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "Voice AI built by Collabrate to handle calls without a person on the line, covering appointment booking and common questions, with every call transcribed.",
    answer:
      "An AI voice assistant answers phone calls without a person on the line. Collabrate builds voice systems that handle appointment booking and common questions, and that transcribe and summarize every call so nothing is lost. It suits businesses that receive many routine calls or miss calls outside working hours.",
    whoItsFor: [
      "Businesses that take bookings or inquiries by phone.",
      "Teams that miss calls when busy or after hours.",
      "Owners who want a written record of what callers asked for.",
    ],
    included: [
      "Voice AI for calls",
      "Appointment booking and FAQs",
      "Call transcription and summaries",
    ],
    howItWorks: [
      {
        title: "Decide what calls it handles",
        text: "We list the calls your business receives and choose the routine ones the assistant should deal with, such as bookings and common questions.",
      },
      {
        title: "Design the conversation",
        text: "We design how the assistant greets callers, asks for details and answers questions, in language that sounds natural.",
      },
      {
        title: "Connect and set up calls",
        text: "We connect the assistant to a phone line and to your calendar or booking system.", // TODO(verify): phone and calendar integration scope.
      },
      {
        title: "Review the transcripts",
        text: "We review call transcripts and summaries to find mistakes and improve how the assistant responds.",
      },
    ],
    toolsWeUse: ["Twilio", "ElevenLabs"],
    faqs: [
      {
        question: "What kinds of calls can a voice assistant handle?",
        answer:
          "Routine, predictable ones: booking or changing an appointment, answering common questions such as opening hours or services, and collecting a caller's details. Calls that need judgement or are emotionally sensitive are better handled by a person, and the assistant can be set up to pass those on.",
      },
      {
        question: "Will callers know they are speaking to an AI?",
        answer:
          "We recommend telling them. Being open about it is fair to callers and, in many places, expected. How the assistant introduces itself is part of the conversation design, and we agree the wording with you so it fits your business and the rules that apply where you operate.",
      },
      {
        question: "What happens to the recordings and transcripts?",
        answer:
          "Every call is transcribed and summarized, so you have a written record of what each caller wanted. Call data can contain personal information, so how long it is kept and who can see it should be decided up front. We discuss this when we scope the project.", // TODO(verify): data retention and access handling.
      },
      {
        question: "Can the assistant book appointments into my calendar?",
        answer:
          "Appointment booking is part of the service. The assistant can check availability and record a booking, depending on the calendar or booking system you use. We look at your current setup first, and tell you what can be connected before you commit to the work.",
      },
    ],
    relatedServices: ["ai-chatbots", "ai-support-systems"],
    relatedIndustries: ["booking-and-scheduling-platforms"],
    relatedProjects: ["turf-booking-platform", "gym-trainer-app"], // TODO(verify): mapping is my judgement.
  },

  {
    slug: "custom-llm-integration",
    serviceName: "Custom LLM Integration",
    published: false,
    updated: "2026-10-01",
    h1: "Custom LLM integration for businesses in India, Singapore, Malaysia and the Gulf",
    description:
      "AI models integrated by Collabrate into your existing systems, using OpenAI, Anthropic Claude or open-source models, fine-tuned on your data where useful.",
    answer:
      "Custom LLM integration means adding a large language model to your own software or processes so it can perform tasks such as answering questions, summarizing or drafting. Collabrate integrates OpenAI, Anthropic Claude or open-source models into your existing systems through APIs, and fine-tunes them on your business data where that is useful.",
    whoItsFor: [
      "Businesses that want AI features inside software they already run.",
      "Teams with documents or data they want people to query in plain language.",
      "Companies that have tried general AI tools and need something fitted to their data.",
    ],
    included: [
      "OpenAI, Anthropic Claude or open-source models, chosen for fit",
      "API integration into existing systems",
      "Custom fine-tuning on business data",
    ],
    howItWorks: [
      {
        title: "Define the task",
        text: "We agree what you want the model to do and what a good result looks like, so the work has a clear target.",
      },
      {
        title: "Choose the model",
        text: "We choose between OpenAI, Anthropic Claude and open-source models based on the task, your data and your requirements.",
      },
      {
        title: "Integrate with your systems",
        text: "We connect the model to your existing systems through APIs, so it works inside the tools your team uses.",
      },
      {
        title: "Tune and evaluate",
        text: "We fine-tune on your data where it helps and check the results against examples from your business.", // TODO(verify): evaluation method.
      },
    ],
    toolsWeUse: ["OpenAI", "Anthropic", "LangChain"],
    faqs: [
      {
        question: "What is a large language model?",
        answer:
          "A large language model, or LLM, is an AI system trained on large amounts of text that can read and write natural language. It can answer questions, summarize documents, draft text and classify messages. Integrating one means connecting it to your own software and data so it does these tasks for your business.",
      },
      {
        question: "Which models do you work with?",
        answer:
          "We work with OpenAI models, Anthropic Claude and open-source models, and choose per project. The right choice depends on the task, how sensitive your data is, where it must be processed and your constraints. We explain the options and the trade-offs instead of defaulting to one provider.",
      },
      {
        question: "Is my business data safe?",
        answer:
          "That depends on the provider, the setup and the data involved, so it is something we discuss at the start. Options include choosing a provider whose terms suit you, limiting what data is sent, or using an open-source model. We tell you plainly what each option means for your data.", // TODO(verify): data-handling practices; avoid stronger claims unless confirmed.
      },
      {
        question: "What is fine-tuning, and do I always need it?",
        answer:
          "Fine-tuning further trains a model on your own examples so it responds in the style or format your business needs. It is not always required: many tasks work well by giving a model the right information when it answers. We use fine-tuning where it adds value and not by default.",
      },
    ],
    relatedServices: ["ai-chatbots", "workflow-automation"],
    relatedIndustries: ["workforce-and-recruitment-systems", "business-and-corporate-websites"], // TODO(verify): mapping is my judgement.
    relatedProjects: ["hr-recruitment-dashboard"], // TODO(verify): mapping is my judgement.
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
