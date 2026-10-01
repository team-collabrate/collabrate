# Homepage accessibility and link-text fixes

Lighthouse 13.5 mobile (default throttling) on a local production build (`next build`, `next start`) of `/`, before and after. Accessibility and SEO categories only; every failing audit is listed.

| Category | Before | After |
|---|---|---|
| Accessibility | 87 | 100 |
| SEO | 92 | 100 |
| Best practices | 100 | 100 |
| Performance | 82 | 83 (not touched; noise) |

## Before: every failing audit (5 audits, 15 elements)

1. **link-text, "Links do not have descriptive text" (7 elements, SEO).** Seven links, all `href="/services"`, with the text "Learn more". They are the screen-reader-only copies inside the seven full-artwork cards of the services bento (`src/components/sections/services-bento.tsx`).
2. **aria-required-children (1).** `div[role="table"][aria-label="Comparison"]` in `src/components/sections/comparison.tsx`: its children included `role="columnheader"` elements that were not inside a row.
3. **aria-required-parent (4).** The four `role="columnheader"` cells of that table (the empty "Capability" cell, "Collabrate", "Several vendors", "A freelancer"): a columnheader must be inside a `role="row"`.
4. **color-contrast (1).** The newsletter note "We don't spam you or sell the data." in the footer (`src/components/layout/newsletter-form.tsx`): `text-foreground/50`, foreground #8C8999 on #FEFFFF, contrast 3.4:1 at 13px, needs 4.5:1.
5. **label-content-name-mismatch (2).** In `src/components/layout/footer.tsx`:
   - the email marquee link: visible text is the address repeated four times, but `aria-label="Email hello@collabrate.digital"` did not contain it;
   - the Instagram link: visible text "@collab.rate", `aria-label="Instagram"` did not contain it.

## Fixes (design unchanged)

| Audit | Fix |
|---|---|
| link-text | The link text is now "Learn more" followed by a visually hidden " about <service name>" (`sr-only` span). Same visible text, same layout, descriptive name. |
| aria-required-children and aria-required-parent | The four header cells are wrapped in `<div role="row" className="contents">`. `display: contents` keeps the grid layout exactly as it was. |
| color-contrast | The note's colour went from 50% to 65% opacity of the foreground (about 5.4:1 on the light background). This is the one intentional visible change: that single line of 13px text is slightly darker. |
| label-content-name-mismatch | Email link: the `aria-label` was removed and a visually hidden span holds the address, so its accessible name is the address itself (the scrolling copies stay `aria-hidden`). Instagram link: the name is now "Instagram @collab.rate", which contains the visible text; links whose visible text already contains the label (LinkedIn) keep the visible text as their name. |

## After

Lighthouse reports no failing accessibility or SEO audits on `/`.

## Check that the design did not change

Full-page desktop screenshots (1280 px wide, reduced motion, before build vs after build) were diffed pixel by pixel, with a second screenshot of each build to measure run-to-run noise (fade-ins and video frames). The only difference outside the noise bands is the newsletter note line in the footer (the contrast fix above). The bento cards, comparison table and email marquee are unchanged.

## Not covered

Only the homepage was audited. The fixed components are shared, so the footer fixes also apply to every page, but other pages were not re-run through Lighthouse in this pass.
