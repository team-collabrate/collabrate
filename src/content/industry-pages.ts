/**
 * Copy for /industries/[slug]. Same rules as service-pages.ts: every entry ships with
 * `published: false`, nothing is linked or listed until the owner flips it, and sentences
 * beyond what collabrate-content.json states are marked TODO(verify).
 *
 * Project mapping (from the JSON `industry` field of each portfolio project):
 *   Booking and scheduling     <- Turf Booking Platform (Sports & Recreation), Gym Trainer App (Fitness & Wellness)
 *   Vendor and distribution    <- Dairy Vendor Management App and its second entry (Food & Dairy)
 *   Workforce and recruitment  <- HR & Recruitment Dashboard
 *   Business and corporate     <- Enterprise Software Business Website
 *   E-commerce                 <- no matching project in the JSON (page has no proof section)
 */

export interface IndustryPage {
  slug: string;
  /** Exact `name` of the industry in collabrate-content.json. */
  industryName: string;
  published: boolean;
  updated: string;
  h1: string;
  /** Full <title>, under 60 characters. */
  title: string;
  /** Meta description, 120 to 155 characters. */
  description: string;
  /** 40 to 60 words: what this is and who it is for. */
  answer: string;
  /** The real problem this kind of business has (2 short paragraphs). */
  problem: string[];
  /** Feature checklist: what such a platform generally needs. */
  platformNeeds: string[];
  /** Service slugs that apply, each with one sentence on why it applies here. */
  services: { slug: string; why: string }[];
  /** Project slugs (case-study pages arrive in B3). */
  projects: string[];
  /** 4 entries, answers 40 to 80 words, no prices, no promises. */
  faqs: { question: string; answer: string }[];
}

export const industryPages: IndustryPage[] = [
  {
    slug: "booking-and-scheduling-platforms",
    industryName: "Booking & Scheduling Platforms",
    published: false,
    updated: "2026-10-02",
    h1: "Booking and scheduling platform development",
    title: "Booking Platform Development in India | Collabrate",
    description:
      "Booking and scheduling platforms for sports facilities, fitness studios and service businesses, built by Collabrate with real-time availability.",
    answer:
      "A booking and scheduling platform lets customers see what is available and reserve a slot online, while your staff manage the calendar in one place. Collabrate builds these for sports facilities, fitness studios and service-based businesses that currently take bookings by phone or message and want fewer clashes and missed requests.",
    problem: [
      "Many service businesses still take bookings by phone call or message. Availability lives in someone's head or in a notebook, so double bookings happen, calls go unanswered when staff are busy, and customers cannot see what is free without asking.",
      "The same applies to trainers and studios managing client schedules. When scheduling and communication are spread across calls, chats and spreadsheets, time is lost on coordination instead of the service itself.",
    ],
    platformNeeds: [
      "Real-time availability, so customers only see slots that are actually free",
      "Online reservation, with confirmation sent to the customer",
      "A way for customers to view and manage their own bookings",
      "A staff view of the calendar to add, move or cancel bookings",
      "Rules for cancellations and rescheduling that match how you operate",
      "Messaging touchpoints such as WhatsApp for customer support",
      "Simple records of bookings, so you can see how the facility or schedule is used",
    ],
    services: [
      { slug: "website-development", why: "A booking website gives customers a place to check availability and reserve without calling." },
      { slug: "mobile-app-development", why: "An app suits trainers and regular customers who manage schedules from their phones." },
      { slug: "workflow-automation", why: "Confirmations and reminders can be sent automatically when a booking is made." },
      { slug: "ai-voice-assistants", why: "A voice assistant can take routine booking calls when staff are unavailable." },
    ],
    projects: ["turf-booking-platform", "gym-trainer-app"],
    faqs: [
      {
        question: "What is a booking and scheduling platform?",
        answer:
          "It is software that shows your availability, lets customers reserve a slot, and gives your staff one place to manage the calendar. It replaces booking by phone call or message, so customers can reserve at any time and your team spends less time answering the same availability questions.",
      },
      {
        question: "Which businesses use booking platforms?",
        answer:
          "Sports facilities, fitness studios and trainers, and other service-based businesses that work by appointment or time slot. If your income depends on filling a calendar and you currently take bookings manually, a booking platform is worth considering. The right design depends on how your slots and rules work.",
      },
      {
        question: "Can customers book through WhatsApp?",
        answer:
          "WhatsApp can be connected to a booking platform for customer support and messaging. One of our booking projects included WhatsApp support integration. What is practical for your business depends on how your customers prefer to reach you, and we discuss the options when we scope the work.",
      },
      {
        question: "Do I need a mobile app or is a website enough?",
        answer:
          "A booking website works for anyone with a browser and is usually the simplest start. An app suits cases where trainers and regular customers use it daily and want it on their phone. We recommend based on how your customers actually book, and we will say if a website is enough.",
      },
    ],
  },

  {
    slug: "vendor-and-distribution-management",
    industryName: "Vendor & Distribution Management",
    published: false,
    updated: "2026-10-02",
    h1: "Vendor and distribution management software development",
    title: "Vendor Management Software in India | Collabrate",
    description:
      "Vendor, order and delivery management apps for dairy, FMCG and supply-chain businesses, built by Collabrate to replace manual tracking.",
    answer:
      "Vendor and distribution management software keeps track of vendors, orders, inventory and deliveries in one system. Collabrate builds these apps for dairy, FMCG and supply-chain businesses that coordinate daily distribution by hand and want fewer errors, clearer records and smoother day-to-day operations.",
    problem: [
      "Distribution businesses coordinate many moving parts every day: vendors, orders, stock and deliveries. When this is tracked in notebooks, calls and spreadsheets, orders get missed, quantities are disputed and nobody has a clear view of what was delivered.",
      "The problem grows with the number of vendors and routes. Manual tracking that works for a handful of vendors becomes slow and error-prone as the business scales.",
    ],
    platformNeeds: [
      "A record for each vendor, with contact details and order history",
      "Order capture that is quick to enter and easy to review",
      "Delivery tracking, so you know what was sent and what is pending",
      "Inventory visibility, so you can see stock against orders",
      "Role-based access for owners, managers and delivery staff",
      "Simple reports on orders and deliveries over time",
      "Access from a phone for people working in the field",
    ],
    services: [
      { slug: "dashboards-and-admin-panels", why: "An admin panel gives owners and managers a live view of vendors, orders and deliveries." },
      { slug: "mobile-app-development", why: "Field staff and vendors can record orders and deliveries from their phones." },
      { slug: "workflow-automation", why: "Routine steps such as order confirmations can move between systems without manual handoffs." },
    ],
    projects: ["dairy-vendor-management-app"], // TODO(verify): the second dairy entry (placeholder slug dairy-vendor-management-app-2) is added once B3 decides whether to merge it.
    faqs: [
      {
        question: "What does vendor management software do?",
        answer:
          "It keeps your vendors, their orders, stock and deliveries in one system instead of notebooks and messages. You can see what was ordered, what was delivered and what is pending. The aim is fewer mistakes and less time spent chasing information, especially as the number of vendors grows.",
      },
      {
        question: "Which businesses is it for?",
        answer:
          "Dairy, FMCG and supply-chain businesses that coordinate vendors, inventory and delivery. We have built vendor management apps for dairy distribution. If your business has a similar pattern of vendors, orders and deliveries, the approach carries over, though the details always depend on your workflow.",
      },
      {
        question: "Can it be used on a phone?",
        answer:
          "Yes, a mobile app is often the practical choice, because the people placing orders and making deliveries work away from a desk. We decide between an app and a web-based tool after learning how your team works, and the two can also be combined with an admin panel for managers.",
      },
      {
        question: "Can you replace my spreadsheets without disrupting work?",
        answer:
          "We design the system around how your team already works, so the change is as small as possible for the people using it. We would look at your current spreadsheets and routines first, and talk through how to move over, so that day-to-day operations are not interrupted.", // TODO(verify): migration approach.
      },
    ],
  },

  {
    slug: "workforce-and-recruitment-systems",
    industryName: "Workforce & Recruitment Systems",
    published: false,
    updated: "2026-10-02",
    h1: "Recruitment and workforce system development",
    title: "Recruitment System Development in India | Collabrate",
    description:
      "Recruitment dashboards and hiring systems for HR teams and agencies, built by Collabrate to manage job postings, applicants and hiring pipelines.",
    answer:
      "A recruitment and workforce system brings job postings, applicants and hiring workflows into one place. Collabrate builds dashboards for HR teams and recruitment agencies that manage hiring by hand and want a more organized process with less manual coordination between people and tools.",
    problem: [
      "Hiring involves many people and many steps: posting roles, collecting applicants, reviewing them, scheduling interviews and recording decisions. When these steps live in email, spreadsheets and chat, candidates get lost and nobody has a single view of where each hire stands.",
      "Agencies face the same problem across several clients at once. Manual coordination slows the process and makes it hard to keep every applicant and every role up to date.",
    ],
    platformNeeds: [
      "Job listings managed in one place",
      "Applicant records with each candidate's current stage",
      "A hiring workflow that moves candidates from application to decision",
      "Role-based access, so each person sees only what they should",
      "Shared notes and status, so the team is working from the same information",
      "Simple reporting on open roles and where applicants are in the pipeline",
    ],
    services: [
      { slug: "dashboards-and-admin-panels", why: "A dashboard centralizes job listings, applicants and hiring workflows." },
      { slug: "workflow-automation", why: "Status changes and notifications can be sent between tools without manual updates." },
      { slug: "custom-llm-integration", why: "AI models can help with tasks such as summarizing applications, where that suits your process." }, // TODO(verify): confirm we are comfortable suggesting AI for application screening; consider the fairness and legal aspects before publishing.
      { slug: "website-development", why: "A careers page or job board can feed applicants directly into the system." },
    ],
    projects: ["hr-recruitment-dashboard"],
    faqs: [
      {
        question: "What is a recruitment management system?",
        answer:
          "It is software that manages job postings, applicants and the hiring pipeline in one place. Instead of tracking candidates in email and spreadsheets, each applicant has a record and a stage. It helps HR teams and agencies see where every hire stands and cuts down the manual coordination involved.",
      },
      {
        question: "Who is it for?",
        answer:
          "HR teams and recruitment agencies that manage job postings, applicants and hiring pipelines. We built a recruitment dashboard that centralizes job listings, applicant tracking and hiring workflows. The details of your system depend on how your hiring process works, which we look at before building anything.",
      },
      {
        question: "Can different team members see different information?",
        answer:
          "Yes. Role-based access is a standard part of the dashboards we build, so each person sees and can change only what suits their role. For example, a coordinator might manage listings and schedules while a hiring manager reviews shortlisted candidates. The roles are agreed when the system is planned.",
      },
      {
        question: "Can it connect to the tools my team already uses?",
        answer:
          "Often yes, through integrations or workflow automation, depending on the tools involved. Tell us which tools you use for email, calendars or job boards, and we will explain which connections are practical. We prefer to connect what you already use rather than ask your team to learn everything again.",
      },
    ],
  },

  {
    slug: "business-and-corporate-websites",
    industryName: "Business & Corporate Websites",
    published: false,
    updated: "2026-10-02",
    h1: "Business and corporate website development",
    title: "Corporate Website Development in India | Collabrate",
    description:
      "Websites for professional services and B2B companies, built by Collabrate to build credibility and generate inquiries, with an SEO-ready structure.",
    answer:
      "A business or corporate website presents a professional services or B2B company, explains what it offers and brings in inquiries. Collabrate builds these websites for firms that need to build credibility with other businesses, with clear calls to action, an SEO-ready structure and lead capture from the start.",
    problem: [
      "Business buyers usually check a company's website before they reply to a message or take a meeting. If the site is outdated, unclear or slow, it can cost credibility before a conversation has started.",
      "Many B2B companies also sell something complex, such as software or professional services. A website has to explain it clearly to a technical or non-technical audience and make it easy to make contact.",
    ],
    platformNeeds: [
      "Clear explanation of what the company does and who it is for",
      "Pages for each service or product, written for the people who evaluate them",
      "Honest credibility content, such as how the company works and what it has built",
      "Obvious calls to action and a contact form that reaches the right person",
      "Fast loading and a layout that works on phones and desktops",
      "A structure that search engines can read",
      "An easy way for your team to keep content up to date",
    ],
    services: [
      { slug: "business-websites", why: "Websites structured around clear calls to action, with lead capture connected from the start." },
      { slug: "website-development", why: "Custom design and development, from UI/UX through to a fast, finished site." },
      { slug: "seo", why: "Helps buyers searching for what you offer to find the site." },
      { slug: "landing-pages", why: "Focused pages for specific campaigns or offers." },
    ],
    projects: ["enterprise-software-website"],
    faqs: [
      {
        question: "What does a corporate website need to do?",
        answer:
          "It needs to explain clearly what the company does, show that it can be trusted, and make it easy to get in touch. Business buyers often look at a website before replying to an approach, so clarity and credibility matter more than decoration. Every page should lead the visitor toward a sensible next step.",
      },
      {
        question: "Can you build a website for a technical product?",
        answer:
          "Yes. We built a business website for an enterprise software company that needed to explain its methodology and product suite to a technical enterprise audience. The principle is to describe the product plainly and accurately for the people who evaluate it, without simplifying it into something misleading.",
      },
      {
        question: "Will the website help us get inquiries?",
        answer:
          "That is the aim. Calls to action and lead capture are part of the structure from the start, and the site is built so search engines can read it. No website can promise a specific number of inquiries, but a clear, fast, well-structured site gives your marketing a solid base.",
      },
      {
        question: "Can we update the content ourselves?",
        answer:
          "Yes, if the site is built on a CMS such as WordPress or a custom CMS, which lets your team edit text and images without writing code. We choose the setup based on how much you want to change yourselves, and we explain how to use it when the site is handed over.", // TODO(verify): handover.
      },
    ],
  },

  {
    slug: "ecommerce-websites-and-stores",
    industryName: "E-commerce Websites and Online Stores",
    published: false,
    updated: "2026-10-02",
    h1: "E-commerce website and online store development",
    title: "E-commerce Store Development in India | Collabrate",
    description:
      "Online stores built by Collabrate for businesses selling products online, designed for browsing, trust and checkout conversion on Shopify or custom builds.",
    answer:
      "An online store lets customers browse your products and pay online. Collabrate builds e-commerce websites for businesses that sell products and want a store designed for browsing, trust and checkout conversion, on Shopify or as a custom build, with payment gateways and cart flows set up to reduce drop-off.",
    problem: [
      "Selling online means competing for attention and trust. Shoppers leave if products are hard to find, if the store looks unreliable, or if checkout asks for too much. Many stores lose sales at the cart and payment steps, not at the front page.",
      "Sellers who rely only on marketplaces also depend on someone else's rules and presentation. Their own store gives control over how products and the brand are shown.",
    ],
    platformNeeds: [
      "Product pages and categories that make items easy to find and compare",
      "A cart and checkout with as few steps as possible",
      "Payment gateway integration, with the payment options your customers expect",
      "Trust signals such as clear policies and contact details",
      "An admin area for managing products, prices and orders",
      "A mobile layout, since many shoppers browse on phones",
      "Email flows, such as abandoned cart reminders, to bring shoppers back",
    ],
    services: [
      { slug: "ecommerce-websites", why: "Stores built on Shopify or custom, with payment and checkout flows tuned to reduce drop-off." },
      { slug: "email-marketing", why: "Abandoned cart and follow-up sequences bring shoppers back to the store." },
      { slug: "performance-marketing", why: "Paid campaigns send shoppers to the store and are measured by what converts." },
      { slug: "seo", why: "Helps shoppers searching for your products find the store." },
    ],
    projects: [], // TODO(verify): the JSON has no e-commerce project, so this page has no proof section. The turf project includes food ordering listings but is not an online store.
    faqs: [
      {
        question: "What is the difference between Shopify and a custom store?",
        answer:
          "Shopify is a ready-made platform with standard features and quick setup. A custom store is built to your own requirements, which suits unusual pricing, integrations or workflows. We recommend one after learning about your catalogue and plans, and explain the trade-offs so the choice is based on your needs.",
      },
      {
        question: "Why do shoppers leave without buying?",
        answer:
          "Common reasons are products that are hard to find, a store that does not feel trustworthy, unexpected costs, and checkout that asks for too much. We design the browsing experience and the cart and checkout flow to reduce drop-off at each step, and we look at where shoppers leave once the store is live.",
      },
      {
        question: "Can I sell on my own store as well as marketplaces?",
        answer:
          "Yes. Many businesses run their own store alongside marketplaces. Your own store gives you control over presentation, customer relationships and the checkout experience. It also needs its own traffic, so we plan how shoppers will find it, for example through search, ads and email.",
      },
      {
        question: "Which payment methods can the store accept?",
        answer:
          "Payment gateway integration is part of the work. The methods available depend on the gateway you choose and the countries you sell in. Tell us where your customers are and how they prefer to pay, and we will advise on suitable gateways when we scope the project.",
      },
    ],
  },
];

export const getIndustryPage = (slug: string): IndustryPage | undefined => industryPages.find((p) => p.slug === slug);
