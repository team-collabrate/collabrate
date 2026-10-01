# Competitor page matrix

Measured 2026-10-02 with claude-seo 2.4.1 (`render_page.py`, headless, full HTML) on one public page per competitor. Metrics are what a crawler sees on that one page; they say nothing about rankings or traffic (no Search Console or paid SERP data). Raw HTML is not committed.

| Site and page | Title chars | Meta desc chars | H1 | H2 | Words | Internal links | Schema types (selection) | FAQ | Reviews text | Superlative claims | Count claims |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Collabrate (us, live home) | 54 | 152 | 1 | 7 | 525 | 12 | Organization, ProfessionalService, WebSite | no | no | 0 | 0 |
| Devoted Infotech, Tirunelveli page | 69 | 148 | 0 | 11 | 782 | 1 | none | yes | yes | 3 | 0 |
| Creators Web India, Sivakasi page | 73 | 229 | 1 | 9 | 897 | 97 | AggregateRating, BreadcrumbList, LocalBusiness, Organization, Review, WebSite | no | yes | 3 | 0 |
| Nellaiseo, home | 64 | 124 | 1 | 4 | 450 | 2 | BreadcrumbList, Organization, WebSite | yes | no | 1 | 0 |
| Jaamboo, home | 104 | 152 | 0 | 1 | 113 | 1 | none | no | no | 2 | 0 |
| Layercodes, home | 61 | 150 | 1 | 14 | 1470 | 35 | BreadcrumbList, Organization, Service, WebSite | no | yes | 0 | 0 |
| DISOADS, Tamil Nadu page | 48 | 192 | 1 | 3 | 106 | 33 | LocalBusiness, ProfessionalService, Service | no | no | 0 | 0 |
| JHB Automations, home | 59 | 162 | 1 | 12 | 702 | 32 | FAQPage, LocalBusiness, Organization, ProfessionalService, WebSite | yes | yes | 5 | 0 |
| Weboin, home | 70 | 159 | 1 | 64 | 876 | 74 | Article, FAQPage, Organization, WebSite | yes | yes | 7 | 000 clients, 1000+ clients, 12 years |
| Aiingo, home | 68 | 228 | 2 | 10 | 579 | 5 | Article, Organization, WebSite | yes | yes | 1 | 10+ years |

Notes: titles over 60 characters are cut in results (Jaamboo 104, Creators Web 73, Weboin 70, Devoted 69). "Superlative claims" counts words like best, top, leading, #1 in title, description and body. "Count claims" are numbers such as "1000+ clients" or "12 years"; we cannot make equivalent claims and must not.

## Mobile Lighthouse (live pages, default throttling)

| Site | Performance | SEO | Accessibility | Best practices | LCP | TBT | CLS | Page weight |
|---|---|---|---|---|---|---|---|---|
| Collabrate (home) | 78 | 100 | 100 | 100 | 3.7 s | 240 ms | 0 | 1215 KB |
| DISOADS (Tamil Nadu page) | 74 | 100 | 94 | 92 | 3.5 s | 290 ms | 0 | 969 KB |
| Creators Web India (Sivakasi page) | 71 | 92 | 75 | 73 | 3.4 s | 420 ms | 0.162 | 2211 KB |
| Nellaiseo (home) | 65 | 92 | 89 | 96 | 8.6 s | 10 ms | 0.008 | 1293 KB |
| Devoted Infotech (Tirunelveli page) | 44 | 100 | 93 | 96 | 12.8 s | 170 ms | 0.224 | 2001 KB |
