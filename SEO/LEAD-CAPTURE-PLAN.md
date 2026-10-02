# Collabrate lead capture plan (add-on to SEO-PLAYBOOK.md)

Goal: turn every visitor from search, Instagram, LinkedIn, WhatsApp and local listings into a conversation, with South Tamil Nadu businesses as the main audience. Same rules as the playbook: no real client names, no invented numbers or social proof, no numeric pricing, founder unnamed, no em dashes in site copy.

Written 2026-10-01 after reading the code in this repo.

---

## 0. Urgent: the contact form does not send anything

Found in the code:
- `src/components/sections/contact-options.tsx` (the form used on `/contact`) calls `setTimeout(() => setStatus("done"), 1200)` and shows "Sent". **No request is made. Every enquiry typed into the site is lost.**
- `src/components/sections/contact-form.tsx` and `contact.tsx` do the same (they are not used on the live page, but delete them to avoid reuse).
- The footer newsletter route `src/app/api/newsletter/route.ts` returns 503 until `NEWSLETTER_WEBHOOK_URL` is set. I found no such variable in `.env.local`, so newsletter signups also go nowhere.
- `DEPLOY.md` already says the contact form is front-end only.

Until this is fixed, adding more traffic or lead magnets only produces more lost leads. **Fix this before anything else in this file, ideally before Phase B.**

---

## 1. Lead capture map

| # | Where | What the visitor gets | What we capture |
|---|---|---|---|
| 1 | `/contact` form | A reply within one business day (already promised on the site) | name, email, company, service, details, town, how they heard about us, optional WhatsApp number |
| 2 | WhatsApp button on every page | Instant chat, pre-filled message that includes the page they were on | number (WhatsApp gives it), message |
| 3 | Short 2-field form (name + WhatsApp number) on service, industry and town pages | "Call me back" without a long form | name, number, page, town |
| 4 | Free mini audit | A free check of their website or Google Maps listing with 5 to 10 findings sent on WhatsApp or email | business name, website or Maps link, town, number, consent |
| 5 | Downloadable checklist (English and Tamil) | A useful PDF | name, email or WhatsApp, business type, town |
| 6 | Booking link (Calendly or Cal.com) | A 20-minute call, in Tamil if wanted | name, email, topic |
| 7 | AI chat widget (later) | Quick answers in Tamil or English, then handoff to WhatsApp | service, town, timeline, number |
| 8 | Google Business Profile buttons | Call, message, website | calls, messages |
| 9 | QR codes and tracked short links for client shops, events, Instagram bio | A landing page for that town or campaign | source, town |

---

## 2. Priorities

### P0. Make the contact form real (this week)
Requirements:
- A server route `src/app/api/contact/route.ts` (Next 16 route handler, read `node_modules/next/dist/docs/01-app/03-api-reference/` docs first) that validates input on the server, rate-limits, rejects bots, and then does **all three**: (a) emails you, (b) saves the lead somewhere permanent (Google Sheet or a free database), (c) returns an honest error if either fails.
- Never show "Sent" unless the server returned success. Reuse the honest-error pattern already used in `src/app/api/newsletter/route.ts`.
- Spam protection that does not hurt conversions: a honeypot field, Cloudflare Turnstile (free), and server rate limiting.
- Sending options on free tiers (check current limits yourself): Resend for email, a Google Sheets append through a small n8n or Make workflow, or a plain webhook to n8n. Keep keys in Vercel environment variables, never in the repo.
- Hidden fields captured automatically: page URL, referrer, UTM source, medium, campaign, the "Which town are you in?" answer and "How did you hear about us?" answer.
- Immediate confirmation to the visitor (on screen and by email) that says what happens next and when.
- A notification to you in real time (email and a WhatsApp or Telegram message through n8n).
- GA4 events: `form_start`, `generate_lead` (only after server success).
- A 1-minute test checklist: submit a real test, confirm email, confirm sheet row, confirm the GA4 event, confirm a failed send shows an error.

Prompt to give Claude Code:
```
Read SEO/LEAD-CAPTURE-PLAN.md section 0 and P0, AGENTS.md, and the Next 16 route-handler docs in
node_modules/next/dist/docs. The /contact form (src/components/sections/contact-options.tsx) fakes success with
setTimeout and loses every lead. Fix it:
1. Create src/app/api/contact/route.ts: JSON in, server-side validation (name, email format, required fields,
   max lengths), honeypot field, simple in-memory or header-based rate limit, Cloudflare Turnstile verification
   when TURNSTILE_SECRET_KEY is set. Then forward the lead to CONTACT_WEBHOOK_URL (n8n/Make/Sheets webhook) and,
   if RESEND_API_KEY and CONTACT_TO_EMAIL are set, also send an email through Resend. If neither is configured
   return 503 with an honest message (same pattern as src/app/api/newsletter/route.ts). Never log personal data.
2. Update the form to call the route with fetch, show a spinner, success only on a real 200, and a clear error
   with a fallback (the email address and the WhatsApp link) on failure. Add the optional fields "Which town are
   you in?", "WhatsApp number (optional)", "How did you hear about us?", plus hidden page, referrer and UTM fields.
3. Add a short consent line under the button linking to /privacy.
4. Delete the unused fake forms (contact-form.tsx, contact.tsx) once nothing imports them.
5. Fire GA4 events form_start and generate_lead only after server success (only if GA is configured).
6. Document every new env var in .env.example (names only) and in SEO/lead-setup-notes.md, with the exact steps
   for me to create the Resend key, Turnstile keys and the n8n or Sheets webhook.
Do not invent a phone number or addresses. Run lint and build. Commit separately. Do not push or deploy.
```

### P1. Make contacting you instant (week 1 to 2)
- **WhatsApp**: floating button on mobile and a button in the header and footer. Link format `https://wa.me/<number>?text=<url-encoded message>`. Pre-fill the message with the page, for example "Hi Collabrate, I am interested in website development in Tenkasi." Add `click_whatsapp` GA4 event. **Only publish a number that you monitor.**
- **Phone link** `tel:` next to it, if you can answer calls.
- **Sticky bottom bar on mobile** with two buttons (WhatsApp, Get a Quote). Do **not** use a full-screen popup on mobile: Google treats intrusive interstitials as a negative page-experience signal and visitors close them.
- **Booking link**: replace the `PENDING_LINK` with the real Calendly or Cal.com URL; add a "20-minute call, Tamil or English" line.

### P2. Lead magnets (weeks 2 to 6)
Ideas that fit your audience and cost almost nothing to deliver. Everything must be real and useful, with no invented statistics.

1. **Free online presence check**: "Send your website or Google Maps link and we will send you 5 to 10 concrete improvements on WhatsApp within 2 business days." Highest conversion for service businesses and a perfect fit for South Tamil Nadu shops, clinics and small manufacturers. Needs a form: business name, link, town, WhatsApp number, consent.
2. **Checklist (English and Tamil)**: "Online presence checklist for shops and small businesses in Tamil Nadu" (Google Maps listing, WhatsApp Business, website basics, reviews).
3. **WhatsApp automation starter pack**: "10 messages every business should automate" with ready templates and a simple n8n flow.
4. **Industry templates** (your proof areas): booking platform requirements template, vendor management app requirements, HR dashboard requirements.
5. **"Is my website ready for Google?" mini scorecard** (10 yes/no questions on one page with a results summary). Capture contact at the end.

Rules: gate with the minimum fields (name plus WhatsApp or email). Say what they will receive and how often you will contact them. No pre-ticked consent. Deliver the file immediately.

### P3. Conversational lead capture (week 6+, dogfooding your own AI service)
- An AI chat widget that answers only from site content, in Tamil and English, asks 3 questions (what do you need, which town, when), then offers WhatsApp or a booking.
- It must never state prices, delivery promises or client names. If unsure, hand off to a person.
- This doubles as a live demo of the AI chatbot service you sell.

### P4. Page-level conversion (with Phase B pages)
- Each service, industry and town page: one primary CTA above the fold, one after the main section, one at the end, plus the short 2-field form on mobile.
- Place trust items next to the CTA: real Google reviews when you have them, permissioned testimonials, an anonymised case study line, "reply within one business day".
- Town pages: a CTA in the town context ("Talk to us about your Tirunelveli business"), WhatsApp button, optional Tamil line.
- Pricing page: "Get a quote" with the cost-factor list so the form arrives pre-qualified.

### P5. Follow-up so leads do not go cold (week 2 onward)
- Auto-reply email and, if you use the WhatsApp Business app, a saved quick reply.
- Reply SLA: under one business day (already your public promise), same day for WhatsApp in working hours.
- Lead tracker with columns: date, name, contact, town, service, source, page, status (new, contacted, call booked, quoted, won, lost), next action date, notes. A Google Sheet is enough at the start. HubSpot free is an option because it is already in your tool list.
- 3 to 5 email follow-ups for people who downloaded something (day 0, 2, 5, 10). This is also a live sample of your email-marketing service.
- Weekly: review every open lead and every lost lead reason.

### P6. Offline and social loops (South Tamil Nadu advantage)
- **QR codes and short links** on printed material, client shop counters, event stalls and invoices, each pointing to a tracked page like `/r/tirunelveli` that redirects to the right town page with UTM parameters.
- **Instagram and LinkedIn**: bio link to a page with WhatsApp, quote and free check; pin a post for the free check; every post ends with one clear action.
- **Referral page** `/refer`: existing clients send you contacts. Agree any thank-you with the client yourself; do not promise rewards on the site that you have not decided.
- **Google Business Profile**: turn on messaging and calls, add the free-check offer as a post.

### P7. Compliance and trust
- India's Digital Personal Data Protection Act, 2023 applies to personal data you collect (names, phone numbers). Add a plain consent line at each form, update `/privacy` to describe what you collect, why, how long you keep it, and how to ask for deletion. Ask a lawyer to confirm the exact wording; this is not legal advice.
- WhatsApp: message people only after they have contacted you or opted in.
- No fake urgency (countdowns, "only 2 slots left"), no fake counters, no "join 500+" claims (these are already banned in your content rules).
- Do not buy or scrape phone numbers.

### P8. Measurement
GA4 events: `form_start`, `generate_lead`, `click_whatsapp`, `click_call`, `click_calendly`, `lead_magnet_view`, `lead_magnet_submit`, `chat_start`. Mark `generate_lead` and `click_whatsapp` as key events. UTM convention: `utm_source` (google, instagram, linkedin, whatsapp, qr, directory), `utm_medium` (organic, social, referral, offline), `utm_campaign` (town or offer name).
Monthly numbers to track: visits, leads by source, leads by town, visit-to-lead rate, reply time, call-booked rate, won rate. As a rough rule of thumb service sites often convert a small single-digit percentage of visitors, but compare against your own baseline instead of chasing a benchmark.

---

## 3. Order of work

```
Now        P0 real contact form (blocks everything)  + real LinkedIn and booking links
Week 1-2   P1 WhatsApp, phone, sticky mobile bar, booking link
Week 2-4   P2 free online presence check (lead magnet #1) + P5 lead tracker + auto-reply
Week 4-6   P4 page CTAs on the new service, industry and town pages
Week 6+    P2 checklist and templates, P3 AI chat widget, P6 QR and referral loop
Always     P7 compliance, P8 measurement
```

## 4. Decisions needed

| ID | Question |
|---|---|
| D6 | Which WhatsApp number can you publish and answer? |
| D13 | Where should leads land: email only, Google Sheet, HubSpot free, or a mix? |
| D14 | Which lead magnet first: free online presence check (recommended), Tamil checklist, or WhatsApp automation pack? |
| D15 | Can you deliver the free check at no charge for the first N requests per week? Pick N so you can keep the promise |
| D16 | Tamil on the forms and magnets now, or later? |

---

## 5. Lead traps: capturing something from visitors who would otherwise leave

Researched 2026-10-01. Most visitors never fill a contact form, so the aim is to give them something useful in exchange for a contact, or to capture non-personal signals automatically so you can reach them later. The numbers quoted by vendors in these sources (quiz conversion above 40 percent, WhatsApp click-to-conversation 80 to 92 percent) come from tool vendors and agencies selling those tools. Treat them as optimistic upper limits and measure your own.

### 5.1 What you can capture automatically, and what you cannot

| Capture | How | Needs consent? |
|---|---|---|
| Anonymous behaviour: page, source, device, city-level location, scroll, clicks | GA4, Clarity, Search Console, Vercel Analytics | Non-essential cookies need opt-in under India's DPDP rules as commonly interpreted; cookieless analytics is lower risk. Confirm with a lawyer |
| Which page, campaign and town a lead came from | Hidden form fields and UTM capture | No extra consent beyond the form |
| Retargeting audiences (people who visited a page) | Meta Pixel, Google Ads tag after consent | Yes, before the tag loads |
| Name, phone, email | Only when the visitor types them in | Yes, clear affirmative action and stated purpose |
| Covert identification (fingerprinting, reverse-IP "who visited" tools, scraped numbers) | Not recommended | Legally risky in India and damages trust. Do not do this |

So "automatically get something from every visitor" really means: capture anonymous signals automatically, and make the offer so useful that visitors hand over their number or email themselves.

### 5.2 Lead traps ranked for Collabrate

| # | Lead trap | How it works on your site | Why it fits you | Effort |
|---|---|---|---|---|
| 1 | **Instant website and Google Maps check** | Visitor pastes their website URL (and business name and town). You run the free Google PageSpeed API plus a few checks (title, mobile, HTTPS, Maps link) and show a short result. The full report goes to their WhatsApp or email | Same idea as HubSpot's Website Grader. Shows your SEO skill, costs nothing per lead, and the data tells you who is a hot prospect | Medium |
| 2 | **Project scope planner (no prices)** | 6 to 8 questions: what to build (website, booking app, vendor app, chatbot), features, integrations, timeline, town. Result: a one-page scope summary and a "next step" CTA. Captures contact to send the PDF | Your pricing is quote-only, so this replaces a cost calculator without showing numbers. Pre-qualifies leads for you | Medium |
| 3 | **"Is my business visible online?" quiz** | 10 yes/no questions (Google Maps listing, WhatsApp Business, website, reviews, Instagram). A score and 3 tips, details sent on WhatsApp | Easy for small shop owners in South Tamil Nadu, available in Tamil | Low to medium |
| 4 | **Exit-intent offer (desktop)** | When the cursor leaves the page, a small offer: "Get a free online presence check on WhatsApp" | Google does not penalise exit-intent popups, and desktop is unaffected | Low |
| 5 | **Slide-in after engagement (mobile)** | After about 50 percent scroll or 30 seconds, a small bottom card (under 30 percent of the screen, visible close button). Never on the first screen when arriving from Google | Avoids Google's mobile intrusive-interstitial demotion | Low |
| 6 | **Content upgrade inside blog posts** | Each post offers the matching checklist or template in return for WhatsApp or email | Highest-intent readers self-select | Low per post |
| 7 | **WhatsApp as the default lead path** | Click-to-chat on every page with a pre-filled message about that page | WhatsApp is where your clients already talk to you. First fast reply wins the job | Low |
| 8 | **Multi-step short form** | Step 1: only a phone number or email (saved immediately even if they stop), step 2: details | Partial leads are not lost | Medium |
| 9 | **Booking link in the thank-you step** | After any form, show "book a 20-minute call now" | Converts warm leads on the spot | Low |
| 10 | **Retargeting audiences** | After consent, build "visited pricing or a town page" audiences for Meta and Google | Reaches visitors who left without a form, later with Click-to-WhatsApp ads | Medium, needs ad budget |
| 11 | **Web push opt-in** | One-tap "tell me when you publish a new guide" | Reaches repeat readers, but can feel intrusive; only after engagement | Low, optional |
| 12 | **Click-to-WhatsApp ads** | Instagram or Facebook ads that open WhatsApp directly, targeted by town | Very common for small businesses in India. Budget needed, so a later phase | Later |

Recommended first three: **WhatsApp path (7), instant website and Maps check (1), exit-intent plus mobile slide-in (4 and 5)**.

### 5.3 Rules so lead traps do not hurt rankings or trust

- No full-screen popup on mobile when someone arrives from Google. Allowed: exit-intent on desktop, and small slide-ins after engagement.
- Always a visible close button and no popup again for 7 days after it is closed.
- Use specific button text ("Get my free check") not "Submit".
- Ask for the minimum: name plus WhatsApp or email.
- No pre-ticked consent boxes. One purpose per consent. Link to `/privacy`.
- Pop-ups must not delay the main content (keep Lighthouse performance in mind; the site already scores 55 on mobile).
- No fake urgency, fake counters or fake testimonials.
- Every captured contact gets a human reply within one business day.

### 5.4 Prompt to give Claude Code for the instant check (after P0 is done)

```
Read SEO/LEAD-CAPTURE-PLAN.md section 5. Build "Free online presence check" at /free-check:
1. A form: business name, website URL (optional), Google Maps link (optional), town, WhatsApp number or email,
   consent checkbox (not pre-ticked) linking to /privacy.
2. A server route src/app/api/free-check/route.ts that validates input with a strict URL check (https only,
   block private IPs and localhost to prevent SSRF), fetches the page HTML with a short timeout and size limit,
   and checks: title length, meta description, H1 count, HTTPS, mobile viewport tag, image alt coverage,
   robots/sitemap presence, structured data presence. If PAGESPEED_API_KEY is set, also call the Google PageSpeed
   Insights API (mobile) and include the performance and SEO scores.
3. Show the visitor a short on-screen result (5 to 8 findings in plain language, no jargon) and save the lead plus
   findings through the same pipeline as /api/contact (honest errors, no fake success).
4. Rate limit per IP, Cloudflare Turnstile if configured, no personal data in logs.
5. Add GA4 events free_check_start and free_check_submit. Add the page to the sitemap and nav as a CTA, not a
   top-level menu item.
Follow AGENTS.md, the Next 16 docs and the content rules. Run lint and build. Commit separately.
```

### 5.5 Additional decisions

| ID | Question |
|---|---|
| D17 | Which first lead trap: instant website check (recommended), scope planner, or "is my business visible online" quiz? |
| D18 | Do you accept an exit-intent popup on desktop and a small slide-in on mobile, with a 7-day cooldown? |
| D19 | Will you use cookies for retargeting (needs a consent banner), or stay cookieless for now? |
