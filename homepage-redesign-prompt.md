# Homepage Redesign Prompt

Copy everything below the line into a new session with your AI agent of choice (Claude, v0, 21st.dev, etc.) to design and build the homepage from scratch.

---

Design and build the best possible UI/UX homepage for **Collabrate**, a digital agency that offers web/app development, marketing, and AI automation as one accountable team instead of multiple vendors. Build it from scratch — you may discard the current homepage entirely, but treat it as a technical and content reference, not a design constraint.

**Stack (non-negotiable):**
- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- shadcn-style component structure (`/components/ui`, `cn()` helper in `/lib/utils`)
- framer-motion for animation
- lucide-react for icons

**Brand identity (locked — do not change):**
- Primary gradient spectrum: violet `#8A2BE2` → orchid `#B154B3` → magenta `#CF6CAD` → rose `#E29AB4` → coral `#F7686F` → orange `#FF9F43`
- Light background `#FFFFFF`, dark background `#09090B` (site supports both light and dark mode — preserve that)
- Tone of voice: corporate, trustworthy, plain-language. Complete sentences, no fragments, no hype punctuation (no exclamation-mark-driven copy, no "🚀 game-changing" filler).
- Logo and wordmark stay as-is.

**Content — source of truth, do not fabricate:**
All copy must come from `src/content/collabrate-content.json` (site info, nav, service categories, industries, portfolio projects, testimonials, footer). Do not invent statistics, revenue figures, client logos, team-size claims, or founding stories beyond what's in that file. Never display numeric pricing (quote-only). The founder is not named or pictured. Any `PENDING_LINK` / `PENDING_CALENDLY_LINK` placeholder must render as a visibly disabled control, never a fabricated URL.

**Assets available to use:**
- 45 official tool/tech logos in `/public/logos/` (Simple Icons + SVGL + direct-from-brand), already mapped to services in `src/lib/service-logos.ts`
- Existing reusable components worth reusing or evolving: 3D tilt cards (`animated-3d-card.tsx`), tabbed accordion service explorer (`services-explorer.tsx`), hover-tooltip logo row (`social-media.tsx`)

**UI/UX bar to hit:**
1. **Hierarchy first** — one clear message per viewport, obvious primary CTA above the fold, no competing focal points.
2. **Motion with restraint** — scroll-reveal and micro-interactions are welcome, but nothing should block reading or feel gratuitous; respect `prefers-reduced-motion`.
3. **Accessibility** — WCAG AA contrast minimum, semantic headings (one H1), keyboard-navigable, visible focus states, alt text on every image/logo.
4. **Performance** — mobile-first responsive, optimized images (`next/image` where practical), minimal layout shift, fast LCP.
5. **Conversion-aware** — every major section should either build trust or move the visitor toward a quote request; no dead-end sections.
6. **Real content, not lorem ipsum** — every section must be fully populated with real copy from the content JSON, not placeholders.

**Suggested section flow (adjust if you have a better structural idea, but justify the change):**
1. Hero — value proposition + primary CTA (Get a Quote) + secondary CTA
2. Trust/credibility strip — industries served or a quiet proof element (no fabricated logos/numbers)
3. Services overview — the three categories (Marketing, Web & App, AI), tool logos included
4. How we work / process — plain, scannable steps
5. Portfolio/case studies — anonymized project outcomes from the JSON
6. Testimonials
7. FAQ snippet or objection-handling section
8. Final CTA banner

**Deliverable:**
A cohesive, production-ready homepage (`app/page.tsx` + supporting section components), fully responsive, dark-mode compatible, with a short before/after rationale explaining the key UI/UX decisions you made and why they improve on a generic agency template.
