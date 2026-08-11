export const servicesPageMeta = {
  title: "Services | Collabrate | Marketing, Development & AI Solutions",
  description: "Marketing, web development, and AI services for startups. Grouped by what you're trying to achieve.",
};

export const servicesHero = {
  headline: "Pick what you need. We'll handle the rest.",
  subheadline:
    "Whether you're hiring for marketing, building technology, or automating with AI, we've organized our services by what you're actually trying to do.",
};

export type ServiceDetail = {
  title: string;
  whatItIs: string;
  included: string[];
  examples: string[];
  timeline: string;
  extraLabel?: string;
  extraItems?: string[];
};

export type ServiceGoalGroup = {
  icon: string;
  emoji: string;
  heading: string;
  subheading: string;
  services: ServiceDetail[];
};

export const serviceGoalGroups: ServiceGoalGroup[] = [
  {
    icon: "TrendingUp",
    emoji: "🎯",
    heading: "I Need More Customers",
    subheading: "Get leads, conversions, and revenue.",
    services: [
      {
        title: "Performance Marketing (Paid Ads)",
        whatItIs: "Google Ads, Facebook/Instagram, LinkedIn, TikTok: we run paid campaigns that actually convert.",
        included: [
          "Campaign strategy and audience targeting",
          "Creative testing and optimization",
          "Daily bid management and monitoring",
          "Monthly performance reports with ROI",
          "Conversion tracking and attribution setup",
        ],
        examples: [
          "E-commerce brand was spending $3K/month on ads with no results. We restructured targeting, rewrote copy, added retargeting. Result: $12K/month profit. Same $3K/month spend, 4x return.",
        ],
        timeline: "Results in 2-4 weeks",
      },
      {
        title: "SEO & Organic Growth",
        whatItIs: "Rank for keywords your customers search. Build traffic that compounds over time.",
        included: [
          "Keyword research and competitive analysis",
          "On-page and technical SEO fixes",
          "Content strategy and blog posts",
          "High-authority backlink building",
          "Monthly ranking and traffic reports",
        ],
        examples: [
          "B2B SaaS was invisible in search. We built 12-month SEO strategy, created 30 blog posts, got 15 quality backlinks. Result: Ranked #1 for top keywords, 300+ organic leads/month.",
        ],
        timeline: "3-6 months to see solid results",
      },
      {
        title: "Lead Generation Systems",
        whatItIs: "Build a repeatable system that fills your pipeline with qualified leads.",
        included: [
          "Lead magnet creation (guides, tools, webinars)",
          "Landing page design and copywriting",
          "Email nurture sequences",
          "Multi-channel promotion",
          "CRM setup and lead scoring",
        ],
        examples: [
          "Consulting firm had sporadic sales pipeline. We built lead gen system with email sequences. Result: 30 qualified leads/month consistently. Closed 8-10 per month. Predictable revenue.",
        ],
        timeline: "4-6 weeks to launch, ongoing optimization",
      },
      {
        title: "Email Marketing & Campaigns",
        whatItIs: "Nurture relationships and convert prospects through strategic email sequences.",
        included: [
          "Email strategy and planning",
          "Campaign copywriting",
          "Email template design",
          "A/B testing and optimization",
          "Deliverability monitoring",
          "Cold email outreach (if needed)",
        ],
        examples: [
          "SaaS company had email list but no system. We built automated nurture sequences. Result: 12% open rate, 3% CTR, 5% of emails → qualified lead.",
        ],
        timeline: "2-3 weeks to launch sequences",
      },
      {
        title: "Social Media Strategy & Content",
        whatItIs: "Build audience and authority on the platforms your customers use.",
        included: [
          "Content calendar and strategy",
          "Post copywriting and scheduling",
          "Community management",
          "Performance tracking",
          "Growth optimization",
        ],
        examples: [
          "Fitness brand wanted Instagram growth. We built content playbook, posted 5x/week, engaged authentically. Result: 2K → 50K followers in 12 months. 15% were paying customers.",
        ],
        timeline: "Ongoing, 3-6 months to see momentum",
      },
      {
        title: "LinkedIn Outreach & B2B Growth",
        whatItIs: "Generate B2B leads and build personal brand through strategic LinkedIn.",
        included: [
          "LinkedIn profile optimization",
          "Targeted prospect research",
          "Personalized connection sequences",
          "LinkedIn content strategy",
          "Sales message optimization",
        ],
        examples: [
          "Executive coach wanted B2B clients. We built LinkedIn strategy, personalized outreach to 50 prospects/month. Result: 2-3 qualified leads/month → $15K/month in contracts.",
        ],
        timeline: "Results in 4-8 weeks",
      },
      {
        title: "Content Marketing & Thought Leadership",
        whatItIs: "Establish authority with valuable content that attracts your ideal customers.",
        included: [
          "Content strategy and topics",
          "Long-form article writing",
          "SEO optimization",
          "Guest posting and PR",
          "Content promotion across channels",
        ],
        examples: [
          "Fintech startup built thought leadership with 20 industry articles. Result: Speaking invitations, press mentions, 200 inbound leads/month from content.",
        ],
        timeline: "Ongoing, 2-3 months to see traction",
      },
      {
        title: "Marketing Automation & Workflows",
        whatItIs: "Set up systems that nurture leads 24/7 without manual work.",
        included: [
          "Platform setup (HubSpot, Zapier, etc.)",
          "Workflow design and automation",
          "Lead scoring and segmentation",
          "Email automation sequences",
          "CRM integration",
        ],
        examples: [
          "Service business was manually following up with 50+ leads. We built automation. Result: Same follow-up, 80% less time. 20% more conversions.",
        ],
        timeline: "2-4 weeks to implement",
      },
    ],
  },
  {
    icon: "Laptop",
    emoji: "💻",
    heading: "I Need A Website Or App",
    subheading: "Build technology that works for your business.",
    services: [
      {
        title: "Full-Stack Web Development",
        whatItIs: "Custom-built web applications. React, Node.js, databases: whatever you need.",
        included: [
          "UI/UX design",
          "Frontend development (React, Next.js)",
          "Backend development and APIs",
          "Database design",
          "Deployment and hosting setup",
        ],
        examples: [
          "Startup needed internal tool to manage 10,000 customer records. We built dashboard in 6 weeks. Result: 10x faster customer operations. $500K saved in year 1.",
        ],
        timeline: "6-12 weeks typical",
        extraLabel: "Common projects",
        extraItems: ["SaaS products", "Internal dashboards", "Marketplaces", "Real-time collaboration tools"],
      },
      {
        title: "E-Commerce Websites",
        whatItIs: "Online store built for conversions. Shopify, custom, whatever works for you.",
        included: [
          "Store design and UX optimization",
          "Product catalog setup",
          "Payment processing integration",
          "Checkout optimization",
          "Email marketing setup",
        ],
        examples: [
          "Brand launched Shopify store. Poor design. We redesigned UX, optimized checkout, added email campaigns. Result: $100K → $400K revenue in year 1.",
        ],
        timeline: "3-6 weeks to launch",
        extraLabel: "What we optimize for",
        extraItems: ["Conversion rate (CVR)", "Average order value (AOV)", "Customer lifetime value (CLV)", "Return customers (repeat rate)"],
      },
      {
        title: "Mobile App Development",
        whatItIs: "iOS and Android apps. Native or cross-platform depending on your needs.",
        included: [
          "App design and UX",
          "Native or cross-platform development",
          "App store launch (iOS App Store, Google Play)",
          "Push notifications and analytics",
          "Post-launch updates",
        ],
        examples: [
          "Fitness startup needed app for class bookings. We built iOS + Android in 10 weeks. Result: 5,000 users month 1. $500K in Series A funding.",
        ],
        timeline: "8-16 weeks typical",
      },
      {
        title: "WordPress Websites",
        whatItIs: "Fast, SEO-friendly WordPress sites. Great for content, portfolios, small business.",
        included: [
          "Custom WordPress theme",
          "Plugin setup and configuration",
          "SEO optimization",
          "Speed optimization",
          "Security hardening",
        ],
        examples: [
          "Agency had slow, clunky WordPress site. Lost 40% of leads to bad UX. We rebuilt with conversion focus. Result: 25% more leads from same traffic.",
        ],
        timeline: "2-4 weeks",
      },
      {
        title: "Dashboards & Admin Panels",
        whatItIs: "Internal tools that give you visibility and control.",
        included: [
          "Real-time data visualization",
          "User role management",
          "Automated reporting",
          "Integration with existing systems",
          "Mobile-responsive design",
        ],
        examples: [
          "Logistics company needed visibility into 50 delivery routes. We built real-time dashboard. Result: 15% faster deliveries, $2M saved annually.",
        ],
        timeline: "4-8 weeks",
      },
      {
        title: "API Development & Integrations",
        whatItIs: "Connect your systems. Custom APIs and third-party integrations.",
        included: [
          "API design and documentation",
          "Third-party platform integration",
          "Data sync automation",
          "Error handling and monitoring",
          "Security and rate limiting",
        ],
        examples: [
          "B2B company needed to sync data across 5 platforms. Manual process took 20 hours/week. We built automated integration. Result: Data syncs instantly, 20 hours/week freed up.",
        ],
        timeline: "2-6 weeks depending on complexity",
      },
      {
        title: "Website Maintenance & Support",
        whatItIs: "Ongoing optimization, updates, monitoring. Keep things running smoothly.",
        included: [
          "Monthly updates and security patches",
          "Performance monitoring",
          "Uptime monitoring with alerts",
          "Bug fixes and improvements",
          "Speed optimization",
        ],
        examples: [
          "Company's site went down 3 times in 6 months. Revenue lost. We took over maintenance, monitoring, optimization. Result: 99.9% uptime for 12 months.",
        ],
        timeline: "Ongoing, monthly retainer",
      },
    ],
  },
  {
    icon: "Bot",
    emoji: "🤖",
    heading: "I Want AI To Do The Work",
    subheading: "Automation and intelligent systems that scale.",
    services: [
      {
        title: "AI Chatbots",
        whatItIs: "24/7 customer support and lead qualification powered by AI.",
        included: [
          "Chatbot design and conversation flow",
          "Website/platform integration",
          "Knowledge base training",
          "Lead qualification automation",
          "Performance analytics",
        ],
        examples: [
          "Support team got 200 emails/day, couldn't keep up. We built AI chatbot. Result: 70% of inquiries handled automatically. Support team 50% less stressed.",
        ],
        timeline: "2-3 weeks to launch",
        extraLabel: "ROI",
        extraItems: [
          "Reduce support response time by 80%",
          "Handle 5-10x more inquiries",
          "Qualify leads 24/7",
          "$500-$2K/month in time saved",
        ],
      },
      {
        title: "AI Agents & Workflow Automation",
        whatItIs: "Autonomous AI that handles repetitive tasks: data entry, research, decision-making.",
        included: [
          "Workflow design and planning",
          "AI agent development",
          "System integration",
          "Performance monitoring",
          "Continuous optimization",
        ],
        examples: [
          "Sales team spent 10 hours/week on manual data entry. We built AI agent. Result: All data entered automatically, 10 hours/week freed up for actual sales.",
          "Content team spent 15 hours/week researching. We built AI research agent. Result: Instant research briefs, content turnaround cut by 60%.",
        ],
        timeline: "3-6 weeks typical",
        extraLabel: "Common workflows",
        extraItems: ["Data entry and processing", "Research and summarization", "Email sorting and response", "Lead qualification", "Content research"],
      },
      {
        title: "Marketing Automation (AI-Powered)",
        whatItIs: "Smart workflows that get smarter. Learn from user behavior and optimize automatically.",
        included: [
          "Workflow setup and training",
          "Behavioral triggers and scoring",
          "Predictive analytics",
          "Automated A/B testing",
          "Lead prediction models",
        ],
        examples: [
          "Email campaigns had 2% CTR. We added AI optimization. Result: AI testing and adjusting subject lines, send times, content. 3.5% CTR in 2 months.",
        ],
        timeline: "3-4 weeks",
      },
      {
        title: "AI Video Generation",
        whatItIs: "Create professional videos automatically. Perfect for marketing, training, tutorials.",
        included: [
          "Script development (or use yours)",
          "AI video generation and voiceover",
          "Subtitle and branding",
          "Bulk processing capability",
          "Distribution setup",
        ],
        examples: [
          "Product team needed tutorial videos for 50 features. Manual production: 3 months, $50K. We generated 50 videos with AI. Result: 2 weeks, $5K, all done.",
        ],
        timeline: "1-2 weeks",
        extraLabel: "Use cases",
        extraItems: ["Product demos", "Training materials", "Marketing videos", "Social media content", "Customer onboarding"],
      },
      {
        title: "AI Voice Assistants",
        whatItIs: "Voice-activated AI for customer service, accessibility, and hands-free interaction.",
        included: [
          "Voice model customization",
          "Conversation flow design",
          "Integration with phone systems",
          "Call analytics and insights",
          "Continuous improvement",
        ],
        examples: [
          "Contact center handled 1,000 calls/day. 80% routine inquiries. We deployed AI voice assistant. Result: 600 calls handled by AI, human team handles complex issues only. 40% cost reduction.",
        ],
        timeline: "4-6 weeks",
      },
      {
        title: "Custom LLM Integration",
        whatItIs: "Use GPT-4, Claude, or other AI models in your product/workflow.",
        included: [
          "Integration with your system",
          "Prompt engineering for your use case",
          "Cost optimization and monitoring",
          "Fine-tuning (if needed)",
          "Performance testing",
        ],
        examples: [
          "Writing tool wanted better suggestions. We integrated Claude API. Result: Better suggestions, users stayed 3x longer, 15% subscription growth.",
        ],
        timeline: "1-3 weeks depending on complexity",
      },
      {
        title: "AI-Powered Analytics & Dashboards",
        whatItIs: "Turn data into insights automatically. Predictions, anomaly detection, recommendations.",
        included: [
          "Data pipeline setup",
          "AI model development",
          "Real-time dashboard",
          "Automated alerts",
          "Predictive reporting",
        ],
        examples: [
          "Retail company had data but no insights. We built AI analytics. Result: AI predicts which products will sell, optimizes inventory, reduced waste by 30%.",
        ],
        timeline: "6-10 weeks",
      },
    ],
  },
];

export type ServiceCoverSlide = {
  key: string;
  slug: string;
  title: string;
  category: string;
  emoji: string;
  value: string;
  engagement: string;
};

export const serviceCoverSlides: ServiceCoverSlide[] = [
  // Marketing Services
  { key: "Social Media Marketing", slug: "social-media", title: "Social Media Marketing", category: "Marketing Services", emoji: "🎯", value: "Grow audience + drive engagement daily", engagement: "Monthly Subscription" },
  { key: "Paid Ads", slug: "paid-ads", title: "Performance Marketing (Paid Ads)", category: "Marketing Services", emoji: "🎯", value: "Convert clicks into customers instantly", engagement: "Monthly Subscription" },
  { key: "SEO", slug: "seo", title: "SEO & Organic Growth", category: "Marketing Services", emoji: "🎯", value: "Rank #1 for money-making keywords", engagement: "Monthly Subscription" },
  { key: "Email", slug: "email-marketing", title: "Email Marketing & Campaigns", category: "Marketing Services", emoji: "🎯", value: "Nurture leads into paying customers", engagement: "Monthly Subscription" },
  { key: "LinkedIn Outreach", slug: "linkedin-outreach", title: "LinkedIn Outreach", category: "Marketing Services", emoji: "🎯", value: "Generate B2B leads on autopilot", engagement: "Monthly Subscription" },
  { key: "Lead Gen", slug: "lead-generation", title: "Lead Generation Systems", category: "Marketing Services", emoji: "🎯", value: "Fill sales pipeline with qualified prospects", engagement: "Monthly Subscription" },
  { key: "Content", slug: "content-marketing", title: "Content Marketing & Thought Leadership", category: "Marketing Services", emoji: "🎯", value: "Attract customers through valuable content", engagement: "Monthly Subscription" },
  { key: "Automation", slug: "marketing-automation", title: "Marketing Automation & Workflows", category: "Marketing Services", emoji: "🎯", value: "Workflows that nurture 24/7 automatically", engagement: "Monthly Subscription" },

  // Web Development Services
  { key: "Web Dev", slug: "web-development", title: "Full-Stack Web Development", category: "Web Development Services", emoji: "💻", value: "Custom apps that scale with you", engagement: "One-Time Project / Maintenance Support" },
  { key: "System Architecture", slug: "system-architecture", title: "System Architecture & Building", category: "Web Development Services", emoji: "💻", value: "Infrastructure built for rapid growth", engagement: "One-Time Project / Maintenance Support" },
  { key: "Mobile App", slug: "mobile-app", title: "Mobile App Development", category: "Web Development Services", emoji: "💻", value: "iOS + Android apps live fast", engagement: "One-Time Project / Maintenance Support" },
  { key: "E-Commerce", slug: "ecommerce", title: "E-Commerce Websites", category: "Web Development Services", emoji: "💻", value: "Online store converting browsers to buyers", engagement: "One-Time Project / Maintenance Support" },
  { key: "WordPress", slug: "wordpress", title: "WordPress Websites", category: "Web Development Services", emoji: "💻", value: "Fast, SEO-ready site in weeks", engagement: "One-Time Project / Maintenance Support" },
  { key: "Dashboards", slug: "dashboards", title: "Dashboard & Admin Panels", category: "Web Development Services", emoji: "💻", value: "Real-time visibility into your business", engagement: "One-Time Project / Maintenance Support" },
  { key: "API Integrations", slug: "api-integrations", title: "API Development & Integrations", category: "Web Development Services", emoji: "💻", value: "Connect all your tools seamlessly", engagement: "One-Time Project / Maintenance Support" },
  { key: "Website Maintenance", slug: "website-maintenance", title: "Website Maintenance & Support", category: "Web Development Services", emoji: "💻", value: "99.9% uptime + zero downtime", engagement: "Monthly Subscription" },

  // AI Services
  { key: "Chatbots", slug: "ai-chatbots", title: "AI Chatbots", category: "AI Services", emoji: "🤖", value: "Handle customer support 24/7 automated", engagement: "Setup (One-Time) / Monthly Service" },
  { key: "AI Video", slug: "ai-video", title: "AI Video Generation", category: "AI Services", emoji: "🤖", value: "Create professional videos in minutes", engagement: "One-Time Project / Monthly Subscription*" },
  { key: "AI Agents", slug: "ai-agents", title: "AI Agents & Workflow Automation", category: "AI Services", emoji: "🤖", value: "Automate repetitive tasks, free your team", engagement: "Setup (One-Time) / Monthly Service" },
  { key: "AI Voice", slug: "ai-voice", title: "AI Voice Assistants", category: "AI Services", emoji: "🤖", value: "Voice AI handling routine inquiries", engagement: "Setup (One-Time) / Monthly Service" },
  { key: "LLM Integration", slug: "llm-integration", title: "Custom LLM Integrations", category: "AI Services", emoji: "🤖", value: "GPT-4 + Claude in your product", engagement: "Setup (One-Time) / Monthly Support" },
  { key: "AI Analytics", slug: "ai-analytics", title: "AI-Powered Analytics & Dashboards", category: "AI Services", emoji: "🤖", value: "Turn data into actionable insights", engagement: "One-Time Build / Monthly Optimization" },
];

export const serviceComparison = {
  eyebrow: "Service comparison",
  title: "At a glance.",
  rows: [
    { service: "Paid Ads", timeline: "2-4 weeks", bestFor: "Immediate revenue", complexity: "Low-Medium" },
    { service: "SEO", timeline: "3-6 months", bestFor: "Long-term growth", complexity: "Medium" },
    { service: "Lead Gen", timeline: "4-6 weeks", bestFor: "Sales pipeline", complexity: "Medium" },
    { service: "Email", timeline: "2-3 weeks", bestFor: "Nurture & retention", complexity: "Low" },
    { service: "Social", timeline: "3-6 months", bestFor: "Brand & community", complexity: "Low-Medium" },
    { service: "Content", timeline: "Ongoing", bestFor: "Authority & SEO", complexity: "Medium" },
    { service: "Web Dev", timeline: "6-12 weeks", bestFor: "Complex systems", complexity: "High" },
    { service: "E-Commerce", timeline: "3-6 weeks", bestFor: "Online sales", complexity: "Medium" },
    { service: "Mobile App", timeline: "8-16 weeks", bestFor: "User engagement", complexity: "Very High" },
    { service: "Chatbots", timeline: "2-3 weeks", bestFor: "Support scale", complexity: "Medium" },
    { service: "AI Agents", timeline: "3-6 weeks", bestFor: "Task automation", complexity: "High" },
    { service: "Automation", timeline: "2-4 weeks", bestFor: "Efficiency", complexity: "Medium" },
  ],
};

export const typicalCombinations = {
  eyebrow: "Typical combinations",
  title: "What works together.",
  combos: [
    { scenario: "Early-stage startup launching", stack: "Paid Ads + Website + Chatbot" },
    { scenario: "E-commerce brand scaling", stack: "SEO + Email + Paid Ads + E-Commerce Site" },
    { scenario: "B2B company seeking leads", stack: "LinkedIn Outreach + Content + Email + Lead Gen System" },
    { scenario: "Scaling company automating", stack: "Marketing Automation + AI Agents + Full-Stack App" },
  ],
};

export const howWePrice = {
  eyebrow: "How we price",
  title: "No fixed pricing. It depends on your needs.",
  models: [
    {
      name: "Retainer Services (Monthly)",
      description: "Marketing, automation, maintenance",
      price: "Starting at $2K-$5K/month depending on scope",
    },
    {
      name: "Project-Based (One-time)",
      description: "Websites, apps, implementations",
      price: "$10K-$100K depending on complexity",
    },
    {
      name: "Hybrid (Retainer + Project)",
      description: "Project launch + ongoing optimization",
      price: "Common model for most clients",
    },
  ],
};

export const servicesFaq = [
  {
    question: "Can I combine multiple services?",
    answer: "Absolutely. Most of our clients do. We'll create a plan that makes sense for your budget and goals.",
  },
  {
    question: "Do you do retainers or one-off projects?",
    answer: "Both. Marketing and support are typically ongoing. Development and implementations can be one-off. Tell us what you need.",
  },
  {
    question: "What if I only have $2K-$3K/month?",
    answer: "We can work with that. We'll focus on highest-impact services. Might start with paid ads or email, then expand.",
  },
  {
    question: "How do you measure success?",
    answer: "Depends on the service. Paid ads = revenue/ROAS. SEO = rankings/traffic. Development = performance/uptime. We'll set clear metrics upfront.",
  },
  {
    question: "Do you guarantee results?",
    answer: "We guarantee strategy, execution, and transparency. Results depend on many variables, but we're incentivized to deliver ROI.",
  },
  {
    question: "What if we want to scale up or pause?",
    answer: "No problem. Most clients adjust scope monthly. Start small, scale as you grow.",
  },
];

export const servicesNextSteps = {
  title: "Ready to add a service?",
  options: [
    {
      title: "Quick Discovery Call",
      description: "30 minutes. We'll understand your goal and recommend what makes sense.",
      cta: "Schedule on Calendly",
    },
    {
      title: "Or Send Us Details",
      description: "Tell us what you're trying to do. We'll come back with a recommendation and rough investment.",
      cta: "Get in Touch",
      href: "/contact",
    },
  ],
};
