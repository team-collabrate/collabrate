# Collabrate — AI-First Technology Partner Landing Page

Premium, production-ready marketing site for Collabrate, built with Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui-style primitives, Framer Motion, and Lucide Icons.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, TypeScript)
- **Styling:** Tailwind CSS v4 (CSS-first theme in `src/app/globals.css`)
- **UI Primitives:** shadcn/ui-pattern components in `src/components/ui` (Radix UI + CVA)
- **Animation:** Framer Motion (scroll reveals, stagger, floating UI, animated counters)
- **Icons:** Lucide React
- **Fonts:** Self-hosted variable fonts via `@fontsource-variable/inter` and `@fontsource-variable/sora` (no external requests at build or runtime)

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

> Note: `lucide-react` is pinned to `0.383.0` (the version with brand icons like Twitter/LinkedIn/GitHub/Dribbble, which newer major versions removed). Its peer range doesn't yet list React 19, so this repo ships a `.npmrc` with `legacy-peer-deps=true` so `npm install` resolves cleanly without extra flags.

## Project structure

```
src/
  app/                 # App Router entry, layout, metadata, global styles
  components/
    layout/             # Navbar, Footer, Logo
    sections/            # All 17 landing page sections
    shared/               # Reveal/stagger animation wrappers, aurora bg, counters, icon map
    ui/                    # shadcn-style primitives (button, card, accordion, etc.)
  data/
    site.ts               # All copy, content, and structured data for every section
```

## Editing content

All copy — headlines, service descriptions, case studies, testimonials, pricing, FAQ, blog previews — lives in `src/data/site.ts`. Update that file to change content without touching component code.

## Brand

Colors and gradients are defined as CSS variables in `src/app/globals.css` under `:root` / `.dark`, matching the supplied brand palette (`#8A2BE2` → `#FF9F43` gradient). Logo assets (mark, full lockup, favicon, OG image) are derived from the supplied logo and live in `/public`.

## Build

```bash
npm run build
npm run start
```

Verified: TypeScript strict-checks clean, ESLint clean, static build succeeds, all 17 sections render server-side.
