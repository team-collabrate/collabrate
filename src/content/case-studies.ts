/**
 * Copy for /portfolio/[slug]. Same rules as the other page files: every entry ships with
 * `published: false`, sentences beyond collabrate-content.json carry TODO(verify), and
 * the project stays anonymised (no client name, no logo, no screenshot until real ones
 * are supplied via `screenshots`).
 *
 * Problem, solution and outcome text is taken from the JSON `portfolioProjects` entry,
 * word for word (outcome especially: no numbers or claims are added). The "how this kind
 * of system works" lines are general explanation and are labelled as such on the page.
 *
 * Dairy entries: the two JSON entries ("Dairy Vendor Management App" and its "(2)") are two
 * dairy distribution businesses with near-identical problem, solution and outcome. Two
 * pages would be near-duplicates, so they are ONE page with two parts. Slug:
 * dairy-vendor-management-app.
 */

export interface CaseStudyPart {
  /** Shown only when the page has more than one part. */
  label?: string;
  problem: string;
  built: string;
  /** The JSON `outcome` text, unchanged. */
  outcome: string;
}

export interface CaseStudy {
  slug: string;
  /** Titles of the JSON portfolioProjects entries this page covers. */
  sourceTitles: string[];
  published: boolean;
  updated: string;
  /** Anonymised title (from the JSON). */
  title: string;
  /** The JSON `industry` string for this project, e.g. "Sports & Recreation". */
  industryLabel: string;
  /** Slug of the industry page this project belongs to. */
  industrySlug: string;
  /** Full <title>, under 60 characters. */
  metaTitle: string;
  /** Meta description, 120 to 155 characters. */
  description: string;
  /** One or two sentences under the H1. */
  summary: string;
  parts: CaseStudyPart[];
  /** Short list of what was built, from the JSON `solution`. */
  highlights: string[];
  /** General explanation of how this kind of system works (not claims about the build). */
  howItWorks: string[];
  /** Service slugs. */
  services: string[];
  /** Real screenshots, when supplied. Leave empty until then: no placeholders. */
  screenshots?: { src: string; alt: string; width: number; height: number }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "turf-booking-platform",
    sourceTitles: ["Turf Booking Platform"],
    published: false,
    updated: "2026-10-02",
    title: "Turf Booking Platform",
    industryLabel: "Sports & Recreation",
    industrySlug: "booking-and-scheduling-platforms",
    metaTitle: "Turf Booking Platform Case Study | Collabrate",
    description:
      "How Collabrate built an online booking website for a turf facility, with real-time slot reservation, ticket viewing, a cafe menu and WhatsApp support.",
    summary:
      "A turf facility wanted customers to book slots online instead of by phone, and a digital presence to show the facility.",
    parts: [
      {
        problem:
          "A turf facility needed a way for customers to book slots online instead of relying on phone calls, along with a digital presence to showcase the facility.",
        built:
          "We built a booking website with real-time slot reservation, ticket viewing, a cafe menu, and WhatsApp support integration, along with food delivery platform listings.",
        outcome:
          "Customers can now book and manage turf sessions entirely online, with a streamlined experience across booking, tickets, and food ordering.",
      },
    ],
    highlights: [
      "Real-time slot reservation",
      "Ticket viewing for booked sessions",
      "A cafe menu",
      "WhatsApp support integration",
      "Food delivery platform listings",
    ],
    howItWorks: [
      "A customer opens the website and sees which slots are free, because availability is updated as bookings are made.",
      "Reserving a slot creates a booking that the customer can look up later as a ticket.",
      "Information about the facility, such as the cafe menu, sits next to the booking flow, so customers find what they need in one place.",
      "Questions can be handled over WhatsApp, which many customers already use.",
    ], // TODO(verify): these steps describe the typical flow; confirm they match how the delivered site works.
    services: ["website-development"], // TODO(verify): service mapping is my judgement.
  },

  {
    slug: "hr-recruitment-dashboard",
    sourceTitles: ["HR & Recruitment Dashboard"],
    published: false,
    updated: "2026-10-02",
    title: "HR & Recruitment Dashboard",
    industryLabel: "HR & Recruitment",
    industrySlug: "workforce-and-recruitment-systems",
    metaTitle: "HR and Recruitment Dashboard Case Study | Collabrate",
    description:
      "How Collabrate built a dashboard that brings job listings, applicant tracking and hiring workflows into one place for a more organized recruitment process.",
    summary:
      "Managing job postings, applicants and hiring by hand was slowing recruitment down. We built one dashboard for all of it.",
    parts: [
      {
        problem:
          "Managing job postings, applicants, and hiring workflows manually was slowing down the recruitment process.",
        built:
          "We built a dashboard to centralize job listings, applicant tracking, and hiring workflows in one place.",
        outcome: "A faster, more organized recruitment process with less manual coordination.",
      },
    ],
    highlights: ["Job listings in one place", "Applicant tracking", "Hiring workflows"],
    howItWorks: [
      "Job listings are created once and kept in a single list, so everyone sees the same open roles.",
      "Each applicant is attached to a role and moves through the stages of the hiring workflow.",
      "The team works from the same applicant records, instead of passing information around by email and spreadsheet.",
    ], // TODO(verify): general description; confirm against the delivered dashboard.
    services: ["dashboards-and-admin-panels"], // TODO(verify): service mapping is my judgement.
  },

  {
    slug: "enterprise-software-website",
    sourceTitles: ["Enterprise Software Business Website"],
    published: false,
    updated: "2026-10-02",
    title: "Enterprise Software Business Website",
    industryLabel: "Enterprise Software / B2B",
    industrySlug: "business-and-corporate-websites",
    metaTitle: "Enterprise Software Website Case Study | Collabrate",
    description:
      "How Collabrate built a professional business website for an enterprise software company serving banking, insurance and telecom clients.",
    summary:
      "An enterprise software company needed a website that explains its platform clearly to a technical audience.",
    parts: [
      {
        problem:
          "An enterprise software company needed a professional website to represent their AI-driven platform to clients in banking, insurance, and telecom.",
        built:
          "We built a business website that clearly communicates their methodology and product suite to a technical, enterprise audience.",
        outcome: "A polished digital presence that supports credibility in enterprise sales conversations.",
      },
    ],
    highlights: [
      "A clear explanation of the company's methodology",
      "A clear presentation of the product suite",
      "Written for a technical, enterprise audience",
    ],
    howItWorks: [
      "A business buyer arrives to check the company before a sales conversation, so the site opens with what the company does and who it serves.",
      "Separate pages explain the methodology and the products in terms an enterprise evaluator can follow.",
      "A clear route to contact the company is available from every page.",
    ], // TODO(verify): general description; confirm against the delivered site.
    services: ["business-websites", "website-development"], // TODO(verify): service mapping is my judgement.
  },

  {
    slug: "gym-trainer-app",
    sourceTitles: ["Gym Trainer App"],
    published: false,
    updated: "2026-10-02",
    title: "Gym Trainer App",
    industryLabel: "Fitness & Wellness",
    industrySlug: "booking-and-scheduling-platforms",
    metaTitle: "Gym Trainer App Case Study | Collabrate",
    description:
      "How Collabrate built an Android app that helps gym trainers manage client schedules, track progress and stay connected with their clients.",
    summary:
      "Gym trainers needed one place to manage client schedules and progress. We built an Android app for it.",
    parts: [
      {
        problem:
          "Gym trainers needed a way to manage client schedules, track progress, and stay connected with clients outside the gym.",
        built: "We built an Android application connecting trainers and clients around scheduling and engagement.",
        outcome: "A more organized way for trainers to manage client relationships digitally.",
      },
    ],
    highlights: ["An Android application", "Scheduling between trainers and clients", "Engagement outside the gym"],
    howItWorks: [
      "Trainers and clients each use the app on their phone, so the relationship continues outside the gym.",
      "Sessions are scheduled in the app, so both sides see the same plan.",
      "Progress and messages stay with the client's record, instead of being spread across chats and notes.",
    ], // TODO(verify): general description; the JSON says scheduling and engagement, and the problem mentions progress tracking. Confirm what the app actually does.
    services: ["mobile-app-development"],
  },

  {
    slug: "dairy-vendor-management-app",
    sourceTitles: ["Dairy Vendor Management App", "Dairy Vendor Management App (2)"],
    published: false,
    updated: "2026-10-02",
    title: "Dairy Vendor Management App",
    industryLabel: "Food & Dairy",
    industrySlug: "vendor-and-distribution-management",
    metaTitle: "Dairy Vendor Management App Case Study | Collabrate",
    description:
      "How Collabrate built vendor management apps for two dairy distribution businesses, replacing manual tracking of vendors, orders and deliveries.",
    summary:
      "Two dairy distribution businesses were coordinating vendors, orders and deliveries by hand. We built a vendor management app for each.",
    parts: [
      {
        label: "First dairy distribution business",
        problem:
          "Coordinating vendors, orders, and delivery for dairy distribution was being handled manually, creating inefficiencies.",
        built: "We built a vendor management app to organize orders, delivery, and vendor coordination.",
        outcome: "Smoother day-to-day operations for dairy distribution.",
      },
      {
        label: "Second dairy distribution business",
        problem:
          "A second dairy distribution business needed a digital system to manage vendor and delivery operations instead of manual tracking.",
        built: "We built a dedicated vendor management app suited to their distribution workflow.",
        outcome: "Improved coordination and reduced manual tracking for vendor operations.",
      },
    ],
    highlights: ["Order management", "Delivery management", "Vendor coordination", "Built around each business's workflow"],
    howItWorks: [
      "Each vendor has a record, and orders are entered against it, so there is one place to see what was ordered.",
      "Deliveries are tracked against orders, so it is clear what has been sent and what is still pending.",
      "The app follows the way each distribution business already works, which is why the second business received its own version.",
    ], // TODO(verify): general description; confirm against the delivered apps. The JSON does not say whether these are mobile apps or web apps.
    services: ["dashboards-and-admin-panels", "mobile-app-development"], // TODO(verify): mapping is my judgement; confirm the apps are mobile.
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined => caseStudies.find((c) => c.slug === slug);
