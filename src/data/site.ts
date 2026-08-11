export const siteConfig = {
  name: "Collabrate",
  legalName: "Collabrate",
  tagline: "Marketing, Web Development & AI for Startups",
  description:
    "We help startups grow with smart marketing, custom websites, and AI automation. Real results. No fluff.",
  url: "https://collabrate.ai",
  email: "hello@collabrate.io",
  phone: "+1 (415) 555-0148",
  addressShort: "San Francisco · Remote-first, serving startups worldwide",
  founded: "2019",
  social: {
    twitter: "https://twitter.com/collabrate",
    linkedin: "https://linkedin.com/company/collabrate",
    github: "https://github.com/collabrate",
    dribbble: "https://dribbble.com/collabrate",
  },
};

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#portfolio" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/#blog" },
];

export const heroContent = {
  badge: "Used by 50+ growing startups",
  headline: "Stop juggling vendors. Get everything from one team.",
  highlightWord: "one team",
  subheadline:
    "Marketing that converts. Websites that perform. AI that works 24/7. We handle the full stack so you can focus on growing.",
  primaryCTA: { label: "Let's Talk Growth", href: "/contact" },
  secondaryCTA: { label: "See What We've Built", href: "/#portfolio" },
  stats: [] as { label: string; value: number; suffix: string; prefix?: string }[],
  trustBadges: [
    "50+ startups trust us",
    "$5M+ in revenue generated for clients",
    "Average 3x ROI in 6 months",
    "Launch in weeks, not months",
  ],
};

export const whatWeDoContent = {
  eyebrow: "What we do",
  title: "We work in three areas. Pick one or all three.",
  areas: [
    {
      icon: "Target",
      title: "Marketing That Drives Results",
      description: "Get customers through paid ads, SEO, social, and email. We obsess over conversions, not vanity metrics.",
    },
    {
      icon: "Laptop",
      title: "Web & Mobile Apps",
      description: "Custom-built websites, dashboards, and apps. Fast, scalable, and built to grow with you.",
    },
    {
      icon: "Bot",
      title: "AI That Actually Works",
      description: "Chatbots, automations, and AI agents that handle the repetitive stuff so your team doesn't have to.",
    },
  ],
};

export const trustedByLogos = [
  "Northwind Capital",
  "Vantage Health",
  "Ledgerly",
  "Fieldbase",
  "Orbitline",
  "Marrow Labs",
  "Havenly Financial",
  "Circuit Robotics",
  "Ampere Energy",
  "Basecamp Logistics",
];

export const aboutContent = {
  eyebrow: "About Collabrate",
  title: "We're not a dev shop. We're your AI-era engineering team.",
  body: "Founded in 2019, Collabrate partners with founders and enterprise teams to design, engineer, and scale software that puts AI at the core, not bolted on as an afterthought. Our multidisciplinary pods combine AI engineers, product designers, and full-stack developers who've shipped at companies like Stripe, Google, and top-tier startups. We don't hand you a deck and disappear. We embed, ship weekly, and stay accountable to outcomes, not hours logged.",
  pillars: [
    {
      title: "Outcome-obsessed",
      description: "Every sprint ties back to a business metric: activation, retention, revenue, or cost saved.",
    },
    {
      title: "AI-native by default",
      description: "We build with LLMs, agents, and automation as first-class citizens, not plugins.",
    },
    {
      title: "Senior-only teams",
      description: "No junior handoffs. You work directly with engineers and designers who've shipped at scale.",
    },
  ],
};

export const whyChooseUsContent = {
  eyebrow: "Why startups choose us",
  title: "Real reasons, not marketing BS.",
};

export const whyChooseUs = [
  {
    icon: "Target",
    title: "We Actually Care About Your ROI",
    description: "Every decision is tied to results. Not hours billed. Not features built. Results.",
  },
  {
    icon: "Users",
    title: "One Team, Full Capability",
    description: "No juggling five vendors. No miscommunication. One team that gets your vision.",
  },
  {
    icon: "Rocket",
    title: "Startup-Friendly Pricing",
    description: "We start with what you can afford. Grow together as you scale. No rigid contracts.",
  },
  {
    icon: "Zap",
    title: "Speed Without Cutting Corners",
    description: "Fast doesn't mean sloppy. We've optimized our process. Most projects ship in weeks.",
  },
  {
    icon: "MessageCircle",
    title: "Transparent Communication",
    description: "Weekly updates. Real metrics. We tell you what's working and what's not.",
  },
  {
    icon: "Infinity",
    title: "Embedded Team Mentality",
    description: "We're not vendors. We're part of your team. We're invested in your success.",
  },
];

export type ServiceItem = {
  icon: string;
  category: string;
  title: string;
  description: string;
  features: string[];
};

export const services: ServiceItem[] = [
  {
    icon: "Sparkles",
    category: "AI",
    title: "AI & Intelligent Automation",
    description: "AI agents, copilots, and workflow automation that do real work, not chatbot demos.",
    features: ["AI Agents & Copilots", "LLM Integration", "Retrieval-Augmented Generation (RAG)", "Voice AI", "Computer Vision", "AI Strategy & Consulting"],
  },
  {
    icon: "Code2",
    category: "Software",
    title: "Software Development",
    description: "Enterprise-grade SaaS, internal tools, and platforms engineered to scale from day one.",
    features: ["SaaS Platforms", "Enterprise Systems", "CRM & ERP", "Custom Dashboards", "API Development", "Cloud-native Apps"],
  },
  {
    icon: "Smartphone",
    category: "Mobile",
    title: "Mobile Engineering",
    description: "Native and cross-platform apps that feel fast, feel native, and ship on schedule.",
    features: ["Flutter", "React Native", "Native iOS (Swift)", "Native Android (Kotlin)", "App Store Optimization", "Offline-first Architecture"],
  },
  {
    icon: "Globe",
    category: "Web",
    title: "Web Experiences",
    description: "High-conversion websites, portals, and storefronts built on modern, maintainable stacks.",
    features: ["Landing Pages", "Business Websites", "Ecommerce", "Headless CMS", "Customer Portals", "Web Performance"],
  },
  {
    icon: "Cloud",
    category: "Cloud",
    title: "Cloud & DevOps",
    description: "Infrastructure that scales quietly in the background so your team never thinks about it.",
    features: ["AWS / Azure / GCP", "Docker & Kubernetes", "CI/CD Pipelines", "Infrastructure as Code", "Observability", "Cost Optimization"],
  },
  {
    icon: "PenTool",
    category: "Design",
    title: "Product Design",
    description: "Interfaces that make complex, AI-powered products feel effortless to use.",
    features: ["UI / UX Design", "Product Design", "Design Systems", "Wireframes & Prototypes", "Usability Testing", "Design-to-Code Handoff"],
  },
  {
    icon: "TrendingUp",
    category: "Growth",
    title: "Growth & Outbound",
    description: "Pipeline-building systems that combine automation with human-grade personalization.",
    features: ["LinkedIn Outreach", "Lead Generation", "Cold Email Systems", "CRM Automation", "Appointment Setting", "Sales Ops"],
  },
  {
    icon: "Megaphone",
    category: "Marketing",
    title: "Performance Marketing",
    description: "SEO, paid, and content programs measured in pipeline, not vanity impressions.",
    features: ["SEO & Local SEO", "Google Ads", "Meta Ads", "Performance Marketing", "Content Marketing", "Email Marketing"],
  },
  {
    icon: "Palette",
    category: "Creative",
    title: "Brand & Creative",
    description: "Visual identity and content systems that make your product feel as good as it works.",
    features: ["Brand Identity", "Graphic Design", "Motion Graphics", "Video & Reels Editing", "Social Media Management", "Content Strategy"],
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery Call (1 week)",
    description: "You tell us what you're trying to achieve. We ask the hard questions and get specific.",
    icon: "Search",
  },
  {
    step: "02",
    title: "Strategy & Plan (1-2 weeks)",
    description: "We map out the game plan, timeline, and what success looks like.",
    icon: "Compass",
  },
  {
    step: "03",
    title: "Build & Launch (2-4 weeks)",
    description: "We start shipping. Weekly updates. Transparent about progress.",
    icon: "Hammer",
  },
  {
    step: "04",
    title: "Measure & Optimize (Ongoing)",
    description: "Real data, real metrics. We show you what's working and double down.",
    icon: "LineChart",
  },
];

export const servicesByGoalContent = {
  eyebrow: "Services by use case",
  title: "Find what you need.",
  groups: [
    {
      icon: "TrendingUp",
      goal: "I need more customers",
      items: [
        { name: "Performance Marketing (Paid Ads)", description: "Google, Meta, LinkedIn ads that convert" },
        { name: "Lead Generation", description: "Qualified prospects in your pipeline" },
        { name: "SEO & Organic Growth", description: "Rank for what your customers search for" },
        { name: "Email Campaigns", description: "Nurture sequences that close deals" },
      ],
    },
    {
      icon: "Laptop",
      goal: "I need a website or app",
      items: [
        { name: "Full-Stack Web Development", description: "Custom built, not templates" },
        { name: "E-Commerce Sites", description: "Shopify or custom, built for conversions" },
        { name: "Mobile Apps", description: "iOS/Android for your users" },
        { name: "Dashboard & Admin Tools", description: "Internal systems that work" },
      ],
    },
    {
      icon: "Bot",
      goal: "I need to scale operations",
      items: [
        { name: "AI Chatbots", description: "Handle support 24/7, qualify leads automatically" },
        { name: "Marketing Automation", description: "Workflows that run without you" },
        { name: "AI Agents", description: "Automate repetitive tasks and free up your team" },
        { name: "System Integration", description: "Connect all your tools and data" },
      ],
    },
    {
      icon: "Award",
      goal: "I want to build authority",
      items: [
        { name: "Content Marketing", description: "Blog posts, guides, and thought leadership" },
        { name: "Social Media Strategy", description: "Build community, not just followers" },
        { name: "LinkedIn Outreach", description: "B2B relationships and positioning" },
      ],
    },
  ],
};

export const servicesFullListContent = {
  eyebrow: "Services (full list)",
  title: "Everything we offer.",
  categories: [
    {
      category: "Marketing Services",
      items: [
        "Social Media Marketing",
        "Performance Marketing (Paid Ads)",
        "SEO & Backlink Building",
        "Email Marketing & Cold Outreach",
        "LinkedIn Outreach & B2B Growth",
        "Lead Generation Systems",
        "Content Marketing",
        "Marketing Automation",
      ],
    },
    {
      category: "Web & App Development",
      items: [
        "Full-Stack Web Development",
        "System Architecture & Building",
        "Mobile App Development (iOS/Android)",
        "E-Commerce Websites",
        "WordPress Websites",
        "Dashboards & Admin Panels",
        "API Development & Integrations",
        "Website Maintenance & Support",
      ],
    },
    {
      category: "AI Solutions",
      items: [
        "AI Chatbots (24/7 support)",
        "AI Video Generation",
        "AI Agents & Workflow Automation",
        "AI Voice Assistants",
        "Custom LLM Integration",
        "AI-Powered Analytics & Dashboards",
      ],
    },
  ],
  cta: { label: "View Full Services Page", href: "/services" },
};

export const industries = [
  { icon: "Landmark", name: "Fintech", description: "Payments, lending, and wealth platforms built for compliance and scale." },
  { icon: "HeartPulse", name: "Healthcare", description: "HIPAA-aware patient, provider, and operations software." },
  { icon: "ShoppingBag", name: "Ecommerce", description: "High-conversion storefronts and commerce infrastructure." },
  { icon: "Building2", name: "Real Estate", description: "PropTech platforms for listings, leasing, and portfolio management." },
  { icon: "Truck", name: "Logistics", description: "Route, fleet, and supply-chain systems that run in real time." },
  { icon: "Layers", name: "SaaS & B2B", description: "Multi-tenant platforms built to onboard enterprise customers." },
  { icon: "GraduationCap", name: "Education", description: "Learning platforms and tools for institutions and edtech startups." },
  { icon: "Scale", name: "Legal", description: "Document intelligence and workflow automation for legal teams." },
];

export const techStack = [
  {
    category: "AI & ML",
    items: ["OpenAI GPT-5", "Anthropic Claude", "Google Gemini", "LangChain", "LlamaIndex", "Pinecone", "Whisper", "Hugging Face"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Vue.js", "Remix"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "GraphQL", "Go", "Redis", "Supabase"],
  },
  {
    category: "Mobile",
    items: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
  },
];

export type CaseStudy = {
  client: string;
  industry: string;
  tags: string[];
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  color: string;
};

export const portfolioContent = {
  eyebrow: "Recent work",
  title: "Real results, not portfolio fluff.",
};

export const caseStudies: CaseStudy[] = [
  {
    client: "SaaS Startup",
    industry: "10x Lead Growth",
    tags: ["SEO", "Performance Marketing"],
    challenge: "Bootstrapped SaaS with zero marketing budget.",
    solution: "Built SEO strategy + performance marketing campaigns.",
    results: [
      { label: "Result", value: "10x lead increase in 6 months. Now profitable." },
      { label: "Investment", value: "Started at $3K/month" },
    ],
    color: "from-[#8A2BE2] to-[#B154B3]",
  },
  {
    client: "E-Commerce Brand",
    industry: "$1M Revenue in Year 1",
    tags: ["Ecommerce", "Paid Ads", "Email"],
    challenge: "Shopify store not converting, paid ads bleeding money.",
    solution: "Redesigned store, fixed ads targeting, email sequences.",
    results: [
      { label: "Result", value: "$1M revenue year 1. 35% profit margin." },
      { label: "Investment", value: "$8K/month for 12 months" },
    ],
    color: "from-[#B154B3] to-[#CF6CAD]",
  },
  {
    client: "Service Business",
    industry: "Booked 3 Months Out",
    tags: ["Lead Gen", "AI Chatbot", "Automation"],
    challenge: "Manually chasing leads, burning out.",
    solution: "Built lead system + AI chatbot + email automation.",
    results: [
      { label: "Result", value: "Consistent 20 leads/month. Business 4x more efficient." },
      { label: "Investment", value: "$5K/month for ongoing" },
    ],
    color: "from-[#CF6CAD] to-[#F7686F]",
  },
  {
    client: "Tech Startup",
    industry: "App Launch in 6 Weeks",
    tags: ["Full-Stack Dev", "Launch Marketing"],
    challenge: "Idea ready, but no development team.",
    solution: "Full-stack development, launch marketing, analytics.",
    results: [
      { label: "Result", value: "5,000 users in first month. $500K funding raised." },
      { label: "Investment", value: "$40K project + ongoing support" },
    ],
    color: "from-[#F7686F] to-[#FF9F43]",
  },
];

export const metricsContent = {
  eyebrow: "The numbers",
  title: "What our clients see.",
};

export type Metric = {
  icon: string;
  label: string;
  display: string;
  value?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
};

export const metrics: Metric[] = [
  { icon: "TrendingUp", display: "+200%", value: 200, prefix: "+", suffix: "%", label: "Average Lead Growth in 6 months" },
  { icon: "Rocket", display: "3x", value: 3, suffix: "x", label: "Average ROI on investment in first 6 months" },
  { icon: "Users", display: "95%", value: 95, suffix: "%", label: "Client Retention: stay 12+ months" },
  { icon: "Clock", display: "3-4 wks", label: "Average Time to Launch" },
  { icon: "Award", display: "$5M+", label: "Revenue Generated for clients in last 2 years" },
];

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "Collabrate didn't just build what we asked for. They challenged our roadmap and made it better. Our AI agent now handles two-thirds of support volume.",
    name: "Priya Nandakumar",
    title: "VP of Product",
    company: "Ledgerly",
    initials: "PN",
  },
  {
    quote: "We evaluated four agencies. Collabrate was the only team that spoke fluently about both LLM architecture and clinical workflows. That mattered.",
    name: "Dr. Marcus Webb",
    title: "Chief Technology Officer",
    company: "Vantage Health",
    initials: "MW",
  },
  {
    quote: "Weekly releases, zero surprises. Collabrate operates like an internal team that happens to be extraordinarily good at AI.",
    name: "Sofia Reyes",
    title: "Founder & CEO",
    company: "Fieldbase",
    initials: "SR",
  },
  {
    quote: "The storefront rebuild alone paid for itself in six weeks. Their design and growth teams work in lockstep. That's rare.",
    name: "Jordan Ade",
    title: "Head of Growth",
    company: "Orbitline",
    initials: "JA",
  },
  {
    quote: "Our technicians actually use the voice assistant Collabrate built. That's the real test. Adoption was instant.",
    name: "Elena Kowalski",
    title: "Director of Operations",
    company: "Circuit Robotics",
    initials: "EK",
  },
  {
    quote: "Migrating twenty years of legacy systems is never simple. Collabrate made it feel like the easiest decision we made all year.",
    name: "Thomas Achebe",
    title: "COO",
    company: "Havenly Financial",
    initials: "TA",
  },
];

export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const pricingContent = {
  eyebrow: "What it costs",
  title: "We don't do one-size-fits-all pricing. But here's what to expect.",
};

export const pricingTiers: PricingTier[] = [
  {
    name: "Small Startups",
    price: "$3K–$5K",
    cadence: "starting / month",
    description: "MVP/Launch Phase. Marketing or development focused. One core service.",
    features: [],
    cta: "Get in Touch",
  },
  {
    name: "Growing Startups",
    price: "$8K–$15K",
    cadence: "starting / month",
    description: "Series A/Scaling Phase. Multiple services. Dedicated team across marketing, web, AI.",
    features: [],
    cta: "Get in Touch",
    highlighted: true,
  },
  {
    name: "Scaling Companies",
    price: "Custom",
    cadence: "usually $20K+/month",
    description: "Series B+. Full-stack engagement. Comprehensive strategy and execution.",
    features: [],
    cta: "Get in Touch",
  },
  {
    name: "Project-Based Work",
    price: "$10K–$100K+",
    cadence: "depending on scope",
    description: "Apps, websites, one-off campaigns.",
    features: [],
    cta: "Get in Touch",
  },
];

export const faqs = [
  {
    question: "How long does it take to see results?",
    answer:
      "Depends on the service. SEO takes 3-6 months. Paid ads show results in days. Websites/apps launch in 3-4 weeks. We'll be honest about timelines upfront.",
  },
  {
    question: "Do you work with really small budgets?",
    answer:
      "Yes. Our starting point is $3K/month, but we've worked with companies starting at $2K. Let's talk.",
  },
  {
    question: "What if we only need one service?",
    answer:
      "Perfect. Hire for marketing, development, or AI only. No forced bundling.",
  },
  {
    question: "How do we know if it's working?",
    answer:
      "Clear KPIs from day one. Monthly reports. Real data. You'll see the metrics that matter.",
  },
  {
    question: "Can we scale up or down?",
    answer:
      "Yes. Most clients start small and expand. You're not locked in long-term.",
  },
  {
    question: "Do you work with non-startups?",
    answer:
      "We focus on startups and growth-stage companies, but we work with some established businesses too. Let's see if it's a fit.",
  },
];

export const blogPosts = [
  {
    title: "Why Most 'AI Agents' Are Just Chatbots With Extra Steps",
    excerpt: "The difference between a demo-ready agent and one that survives production traffic, and how to tell them apart before you buy.",
    category: "AI Strategy",
    readTime: "7 min read",
    date: "Jul 22, 2026",
  },
  {
    title: "RAG in Production: Lessons From 30+ Deployments",
    excerpt: "What actually breaks when retrieval-augmented generation meets real users, real data, and real edge cases.",
    category: "Engineering",
    readTime: "9 min read",
    date: "Jul 9, 2026",
  },
  {
    title: "The Real Cost of Skipping a Design System",
    excerpt: "Why the fastest-moving teams invest in design systems early, and what it costs them when they don't.",
    category: "Product Design",
    readTime: "6 min read",
    date: "Jun 28, 2026",
  },
  {
    title: "How We Cut a Client's Cloud Bill by 41% Without Downtime",
    excerpt: "A practical breakdown of the infrastructure audit process we run on every enterprise engagement.",
    category: "Cloud & DevOps",
    readTime: "8 min read",
    date: "Jun 14, 2026",
  },
];

export const calendlyUrl = "https://calendly.com/collabrate/discovery-call"; // TODO: replace with your real Calendly link

export const nextStepsContent = {
  eyebrow: "Next steps",
  title: "Ready to grow faster?",
  options: [
    {
      title: "Option 1: Schedule a Call",
      description: "Quick 20-30 min chat. No pressure. Just real talk about your goals.",
      cta: "Schedule on Calendly",
      href: calendlyUrl,
    },
    {
      title: "Option 2: Send Details",
      description: "Tell us about your project. We'll come back with a game plan.",
      cta: "Get in Touch",
      href: "/contact",
    },
  ],
};

export const contactContent = {
  eyebrow: "Get in touch",
  title: "Tell us what you're building.",
  description: "Share a few details and a founding engineer will reply within one business day, no sales queue, no gatekeeping.",
  reasons: [
    { icon: "Rocket", label: "Start a new project" },
    { icon: "Users", label: "Explore a partnership" },
    { icon: "Briefcase", label: "Enterprise engagement" },
    { icon: "MessageCircle", label: "Just have a question" },
  ],
};

export const footerContent = {
  description:
    "Collabrate helps startups and growing businesses win through smart marketing, custom technology, and AI automation. Real results. No vendors. One team.",
  quickLinks: [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/#portfolio" },
    { label: "Blog", href: "/#blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "#" },
  ],
  newsletterHeading: "Get Updates",
  newsletterText: "Join 500+ founders getting insights on growth, marketing, and product.",
  copyright: "© 2025 Collabrate. Built for startups who move fast.",
};
