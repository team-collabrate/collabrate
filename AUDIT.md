# Collabrate Content Audit — Step 1 (checklist) + Step 2 (KEEP/REPLACE/DELETE)

No code has been changed. This is the audit only, per the brief's instruction to show the mapping before proceeding.

## 0. Routing gap (found during audit, not a copy item, but blocks Step 4)

The JSON defines 8 routes: `/`, `/about`, `/services`, `/portfolio`, `/pricing`, `/contact`, `/privacy`, `/terms`, plus `/blog`. The current codebase only has 3 real routes: `/`, `/services`, `/contact`. About, Portfolio, and Pricing currently exist only as *sections stacked on the Home page* (`src/app/page.tsx` renders `About`, `Portfolio`, `Pricing` inline). Privacy, Terms, and Blog don't exist at all yet.

**REPLACE (structural):** Home needs to be trimmed to just the sections `pages.home.sections` lists (hero, servicesOverview, industries, testimonials, ctaBanner), and About/Portfolio/Pricing/Privacy/Terms/Blog need to become real routes.

## 0.1 Discrepancy to flag (stopping to ask per the brief's own rule)

`CLAUDE_BUILD_BRIEF.md` says to "build nav link pointing to [blog]," but `collabrate-content.json`'s own `nav` array (site.nav) only lists Services / Work / Pricing / About / Contact — no Blog entry. **Which one is correct: add Blog to the nav, or leave it un-navved (route exists but unlinked, reachable only via footer/direct URL if at all)?** I'll hold this specific point rather than guess.

---

## 1. Founding year / location / contact info

| Item | Current | JSON says | Verdict |
|---|---|---|---|
| Founded year | `site.ts`: `"2019"` | `"2025"` | **REPLACE** |
| Location | `site.ts`: `"San Francisco · Remote-first, serving startups worldwide"` | `"Remote-first, based in Tamil Nadu, India"` | **REPLACE** |
| Service regions | not present | `["India", "Singapore", "Malaysia", "Gulf countries"]` | **REPLACE** (add) |
| Domain | `site.ts`: `"https://collabrate.ai"` | `"collabrate.digital"` | **REPLACE** |
| Email | `site.ts` / `contact-page.ts`: `"hello@collabrate.io"` | `"hello@collabrate.digital"` | **REPLACE** |
| Phone | `site.ts`: `"+1 (415) 555-0148"` (fabricated US number) | not in JSON | **DELETE** |
| Social — Twitter/GitHub/Dribbble | `site.ts` + navbar/footer render live icon links | not in JSON at all | **DELETE** |
| Social — LinkedIn | fake URL `linkedin.com/company/collabrate` | `"PENDING_LINK"` | **REPLACE** with visible-placeholder state |
| Social — Instagram | not present currently | `"https://instagram.com/collab.rate"` | **REPLACE** (add) |
| Calendly URL | `site.ts`: fake working link `calendly.com/collabrate/discovery-call` with a code comment admitting it's a placeholder | `"PENDING_LINK"` | **REPLACE** with visible-placeholder state |

## 2. Stats / counters / metrics (all fabricated, JSON explicitly forbids this category)

- Hero badge: `"Used by 50+ growing startups"` — **DELETE**
- Hero trust badges: `"50+ startups trust us"`, `"$5M+ in revenue generated for clients"`, `"Average 3x ROI in 6 months"`, `"Launch in weeks, not months"` — **DELETE**
- Hero floating dashboard mockup (inline JSX in `hero.tsx`, not even in a data file): animated counters showing "2.4M Requests handled" and "99.98% Uptime", plus a fake bar chart and "Deploy successful — Build #248 · 41s" chip — **DELETE**. This is the single biggest fabrication and it's hardcoded straight into the component, not the data layer.
- `metrics` section (whole section): "+200% Average Lead Growth", "3x Average ROI", "95% Client Retention", "3-4 wks Average Time to Launch", "$5M+ Revenue Generated" — **DELETE entire section**, no JSON equivalent, and JSON explicitly says "Don't add stats/counters."
- Footer newsletter block: `"Join 500+ founders getting insights..."` + a working-looking email subscribe form — **DELETE**, no equivalent in JSON, and it's a fake-functional form (doesn't actually send anywhere) which conflicts with the "don't fake a working feature" spirit of the brief.

## 3. Client logos

- `trustedByLogos`: "Northwind Capital", "Vantage Health", "Ledgerly", "Fieldbase", "Orbitline", "Marrow Labs", "Havenly Financial", "Circuit Robotics", "Ampere Energy", "Basecamp Logistics" — all fabricated, rendered as a live logo marquee ("Trusted by teams building the future"). **DELETE entire section**, no equivalent in JSON, explicitly named as a "don't" in the brief ("no fake rotating logos").

## 4. Testimonials

- Home `testimonials` (site.ts, 6 entries): named authors (Priya Nandakumar, Dr. Marcus Webb, Sofia Reyes, Jordan Ade, Elena Kowalski, Thomas Achebe) with fake titles and fake companies (Ledgerly, Vantage Health, Fieldbase, Orbitline, Circuit Robotics, Havenly Financial) — **DELETE the named/company details, REPLACE with JSON's 4 testimonials** which use bracketed `[Client Name]` / `[Company/Industry]` placeholders by design.
- Contact page `contactTestimonials` (3 entries): first-name-only authors (Alex, Sarah, Marcus) with invented growth numbers ("grew revenue 300% in 6 months") — **DELETE**, no equivalent, JSON only has the one shared testimonials array (4 entries), reused wherever needed.

## 5. Portfolio / case studies

- `caseStudies` (site.ts, 4 entries): "SaaS Startup", "E-Commerce Brand", "Service Business", "Tech Startup" — each with fabricated dollar figures ("$1M Revenue in Year 1", "$8K/month for 12 months", "$500K funding raised", etc.) — **DELETE entirely, REPLACE with JSON's `portfolioProjects`** (6 real anonymized projects: Turf Booking Platform, HR & Recruitment Dashboard, Enterprise Software Business Website, Gym Trainer App, Dairy Vendor Management App ×2). Different shape too (problem/solution/outcome, no dollar figures, no "results" stat blocks) — this is a structural rebuild, not a copy swap.

## 6. Pricing

- `pricingTiers` (site.ts, 4 tiers): "Small Startups $3K–$5K", "Growing Startups $8K–$15K", "Scaling Companies Custom (usually $20K+/month)", "Project-Based $10K–$100K+" — **DELETE entirely**. JSON's pricing page is explicitly no-numbers: intro → how it works → factors list → 3 engagement types (Project-based / Ongoing / Custom-Enterprise, no dollar amounts anywhere) → CTA. **REPLACE** with that structure. Numeric pricing is a hard constraint violation, not just a content mismatch.
- `howWePrice` (services-page.ts): "$2K-$5K/month", "$10K-$100K depending on complexity" — same violation — **DELETE**.
- Contact form `budgetOptions` dropdown: "Under $5K/month" … "$20K+/month" — **DELETE**, JSON's contact form fields (name/email/company/service-select/details) have no budget field at all.
- Every FAQ answer mentioning dollar figures (contact-page.ts has ~6 of these, services-page.ts has 2) — **DELETE/REPLACE**, JSON has no FAQ arrays at all for contact or services pages, so these sections don't map to anything and should likely be dropped rather than rewritten guess-work. Flagging rather than inventing new FAQ copy.

## 7. Service page "examples" (fabricated case-study micro-stories)

Every one of the 22 services in `serviceGoalGroups` (services-page.ts) has an `examples` array telling a fake client story with dollar figures and specific numbers (e.g. "E-commerce brand was spending $3K/month... Result: $12K/month profit," "Logistics company... $2M saved annually"). None of this exists in the JSON — `serviceCategories[].services[]` only has `name`, `summary`, `points[]`, occasionally `note`. **DELETE all `examples`, `timeline`, `extraLabel`/`extraItems` fields — REPLACE the whole services data shape** to match JSON's flatter structure. This is also a full service-list mismatch, not just tone: JSON has 6 marketing services + 6 dev services + 5 AI services (17 total, different names in places — e.g. "LinkedIn Outreach (Lead Generation)" is one merged service, not two; "Digital Marketing Strategy" and "Landing Pages" and "Business Websites" and "AI-Powered Support Systems" are new services not in the current site at all) versus the current site's 22 services. This needs a full swap, not an edit.

## 8. Industries

- Current `industries` (site.ts, 8 entries): Fintech, Healthcare, Ecommerce, Real Estate, Logistics, SaaS & B2B, Education, Legal.
- JSON `industries` (5 entries): Booking & Scheduling Platforms, Vendor & Distribution Management, Workforce & Recruitment Systems, Business & Corporate Websites, E-commerce Websites and Online Stores.
- Completely different list (matches the actual portfolio projects instead of generic verticals). **REPLACE entirely.**

## 9. Services overview / "What We Do" framing

- `whatWeDoContent` (3 areas: Marketing / Web & Mobile Apps / AI) — conceptually close to JSON's 3 `serviceCategories` (Marketing / Web & App Development / AI Solutions) but copy differs and JSON explicitly locks the naming ("Don't rename 'AI Solutions' to 'AI Agents' or similar"). **REPLACE copy, KEEP the three-category structural pattern.**
- JSON additionally specifies a **hover-reveal interaction** on Home (hovering a service name reveals summary+points on the opposite side) that doesn't exist in the current build at all — current Home just shows short one-line descriptions per goal-group (`servicesByGoalContent`, organized by *outcome* like "I need more customers" rather than by *category*). **REPLACE — new interaction pattern, not present in current code.**
- `servicesByGoalContent` (goal-based grouping: "I need more customers" / "I need a website or app" / "I need to scale operations" / "I want to build authority") has no equivalent in the JSON at all, which organizes strictly by category (Marketing/Dev/AI), not by user goal. **DELETE this framing** (or confirm with you if you want to keep goal-based framing as an *addition* alongside the category structure — flagging since JSON doesn't forbid it, just doesn't include it).
- `servicesFullListContent` ("Services (full list)" section on Home) — redundant once the real service categories render properly; service names also drift from JSON's list. **DELETE**, superseded by `serviceCategoriesFull` structure.
- `serviceComparison` (services page "At a glance" timeline/complexity table) and `typicalCombinations` ("what works together") — no JSON equivalent, and `serviceComparison` rows include timeline claims not sourced from JSON. **DELETE both.**

## 10. Tech stack

- `techStack` section: "OpenAI GPT-5, Anthropic Claude, Google Gemini, LangChain..." etc. — no equivalent in JSON at all, and lists a nonexistent product ("GPT-5"). **DELETE entire section.**

## 11. Why Choose Us / About pillars

- `whyChooseUs` (6 cards: "We Actually Care About Your ROI," "One Team, Full Capability," "Startup-Friendly Pricing," "Speed Without Cutting Corners," "Transparent Communication," "Embedded Team Mentality") — punchy/startup tone, conflicts with JSON's specified "corporate, trustworthy... not startup-punchy" tone. JSON's About page has its own 3 `pillars` (Founder-led hands-on / One team, full capability / Built for where you're growing) which partially overlaps ("One team, full capability" survives). **REPLACE with JSON's About pillars; DELETE the rest as a separate Home section** (JSON's home sections list doesn't include a standalone "why choose us" block).
- `aboutContent` body text ("We're not a dev shop... founders and enterprise teams... engineers who've shipped at Stripe, Google...") — name-drops real companies (Stripe, Google) as if former clients/employers, which is exactly the kind of unverifiable claim the brief prohibits. **DELETE, REPLACE with JSON's `aboutIntro` body.**

## 12. Founder references

- `contact.tsx` (dead component, not imported anywhere) and `site.ts`'s `contactContent.description`: "a founding engineer will reply within one business day" — **DELETE.** Not live on the site currently (component is unused) but the data field is still exported and should be cleaned up rather than left as orphaned fabricated copy.
- `contact-page.ts` → `whatHappensAfter.steps[0].description`: "A founder reads your message. No auto-reply BS." — this one **is** live (renders on `/contact`). JSON's About page explicitly says "No founder name or bio — keep team/founder unnamed throughout," and the global constraint says founder is never named/pictured anywhere. Referring to "a founder" without a name is borderline — flagging for your call: **REPLACE with a founder-agnostic phrase** ("A member of our team reads your message") to stay safely inside the constraint, unless you're fine with the unnamed generic reference.
- `directContactMethods.methods` (contact-page.ts): LinkedIn row says "Company page or founder profiles" — same borderline case, **REPLACE** to stay unnamed-safe.

## 13. Team size language

- No explicit "team of N" numeric claims found (grepped for patterns like "team of 5", "12 engineers," etc. — none exist). Good, nothing to flag here beyond the founder-adjacent phrasing above.

## 14. Blog

- `blogPosts` (site.ts, 4 fabricated posts with fake dates/read-times, e.g. "RAG in Production: Lessons From 30+ Deployments") rendered in a live `BlogPreview` section on Home — **DELETE entirely.** JSON explicitly says blog has no posts yet and to build an empty-state page, not fabricate posts. Also needs to become a real `/blog` route rather than a Home section.

## 15. Contact page structure

- Current `/contact` is a single long page: hero, two-options block, big form (7 fields including budget/timeline dropdowns), direct-contact block, response guarantee, "what happens after" 5-step timeline, FAQ (10 $-heavy questions), approach note, "why schedule a call," testimonials, "other ways to learn." Much of this has no JSON equivalent.
- JSON's contact page is much leaner: intro → two parallel options (Schedule a Call / Send Details form with 5 fields: name, email, company, service-select, details) → direct contact block (email, location, regions, social) → one closing note ("We usually respond within one business day"). **REPLACE structure**, **DELETE** the FAQ/response-guarantee/what-happens-after/approach-note/why-schedule-call/other-ways-to-learn sections (no JSON equivalent for any of them).

## 16. Privacy & Terms

- Don't exist as pages currently. JSON has full copy ready for both (8 sections each). **REPLACE** = straightforward net-new page build, direct copy-in from JSON, no invented content needed.

## 17. Nav / footer structure

- Current nav: Services, Work(`/#portfolio`), Process(`/#process`), Pricing(`/#pricing`), About(`/#about`), Blog(`/#blog`) — all anchor-links into the Home page.
- JSON nav: Services, Work(`/portfolio`), Pricing(`/pricing`), About(`/about`), Contact(`/contact`) — five real routes, no "Process" entry, no Blog entry (see the flagged discrepancy in section 0.1), Contact added as its own nav item (currently only reachable via CTA buttons, not the nav bar itself).
- **REPLACE entirely** — different link set, different targets (routes vs. anchors).
- Footer `quickLinks` currently: Services, Work, Blog, Contact, "Privacy" (href `"#"`, dead link). JSON footer has two columns: `solutions` (6 items, not links, just labels — Booking & Scheduling, Vendor & Distribution, HR & Recruitment, Business & Corporate, E-commerce, AI & Automation) and `company` (About Us, Services, Portfolio, Contact, Privacy, Terms — real hrefs). **REPLACE.**
- Footer social icons currently show Twitter/LinkedIn/GitHub/Dribbble — **DELETE Twitter/GitHub/Dribbble** (not in JSON), **KEEP LinkedIn** (as pending placeholder) **and ADD Instagram.**
- Footer copyright: "© 2025 Collabrate. Built for startups who move fast." (startup-punchy tone) vs JSON's "© 2025 Collabrate. Remote-first, based in Tamil Nadu, India — serving India, Singapore, Malaysia, and the Gulf." — **REPLACE.**

## 18. Navbar CTA copy

- "Let's Talk Growth" (primary nav CTA, startup-punchy) — JSON's `site.primaryCTA` is `{ label: "Get a Quote", href: "/contact" }`. **REPLACE.**
- Secondary CTA "See What We've Built" → JSON: `{ label: "View Our Work", href: "/portfolio" }`. **REPLACE.**

## 19. Metadata / SEO (title tags, meta description, keywords, OG/JSON-LD)

- Root `layout.tsx` title: "Collabrate | Marketing, Web Development & AI for Startups" and description referencing "startups... no fluff" — startup-punchy tone, wrong domain in OG data (`metadataBase` built from the fake `.ai` URL). **REPLACE**, will be rebuilt per-page in Step 7 anyway.
- JSON-LD `foundingDate` currently pulls the wrong year (2019) and lists the fake social profiles in `sameAs`. **REPLACE** once `siteConfig` is corrected — this one's actually just a KEEP-the-pattern / fix-the-data situation once the data layer is right.

## 20. Everything that's structurally fine (KEEP as-is)

- Overall page shell: Navbar + `{children}` + Footer in `layout.tsx` — **KEEP.**
- Three-category pattern for services (Marketing / Dev / AI) — **KEEP the pattern**, per section 9.
- Component-per-data-item pattern already exists in most sections (`.map()` over arrays) — **KEEP**, this is exactly what the brief asks for in Step 3, most of the codebase already works this way structurally, it's the content and a few section removals that need to change, not the component architecture itself.
- Contact page's two-parallel-options layout concept (Schedule a Call / Send Details) — **KEEP the pattern**, already exists, just needs trimming to match JSON's leaner version (see section 15).
- `/services` page's three-category-with-full-detail structure — conceptually **KEEP** (JSON explicitly wants "same category structure as Home, but full detail always visible"), but the underlying service data itself needs replacing (section 7) and the goal-based framing needs removing (section 9).

---

## Assets referenced but not provided (preview of Step 8, flagging now since it's relevant context)

- Category images for the 3 services sections (Marketing / Dev / AI) — not provided.
- Portfolio project visuals for the 6 `portfolioProjects` — not provided (current fake case studies use solid-color gradient blocks instead of real images, which happens to already match "no real screenshot" reality, but should probably stay gradient/placeholder rather than imply a screenshot exists).
- Real testimonial author names — JSON itself uses `[Client Name]` / `[Company/Industry]` bracketed placeholders by design, not a gap to fill.
- Logo file / brand colors — the current site already has a logo (`logo-mark.png`, `logo-full.png`) and a brand palette (violet/orchid/magenta/rose/coral/orange) built out in `globals.css`. Since the brief says "user has these, request them if not already in the repo" — **confirming these already exist in the repo. Do you want to keep the current logo/palette, or is new brand material coming to replace it?**

---

## Open questions before Step 3 starts

1. Blog nav link — add it or not (section 0.1)?
2. FAQ sections on Contact and Services pages have no JSON equivalent at all — drop them entirely, or is FAQ content coming separately? (Right now every existing FAQ answer also violates the no-dollar-figures rule, so at minimum the current ones can't survive as-is.)
3. `whatHappensAfter.steps[0]` / LinkedIn "founder profiles" phrasing — keep the unnamed "a founder" reference or swap to fully team-neutral language (section 12)?
4. Current logo/brand colors — keep, or is new brand material forthcoming (see Assets section above)?

I'll wait for the go-ahead (and answers to the above where you have them) before touching any code.
