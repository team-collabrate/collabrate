import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, XLogo } from "@/components/shared/brand-icons";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { CookieSettingsLink } from "@/components/analytics/cookie-settings-link";
import { publishedBlogPosts } from "@/content/blog-posts";
import { isPending, site, footer, serviceCategories } from "@/lib/content";
import type { SiteNavData } from "@/lib/site-links";

const eyebrow = "text-xs font-semibold uppercase tracking-[2px] text-brand-violet";
const linkCls = "inline-flex min-h-11 items-center gap-2 text-[15px] lg:min-h-6 text-foreground/80 transition-colors hover:text-foreground";
const divider = "relative z-[1] mx-6 h-px bg-[linear-gradient(90deg,#8A2BE2_0%,rgba(138,43,226,0.1)_100%)] sm:mx-10";

const AI_PROMPT = `Tell me everything about Collabrate (${site.domain}), a digital development, marketing and AI agency that is ${site.location}. Cover: (1) what services they offer, (2) the kinds of businesses they work with, (3) how they work with clients, and (4) why a business should choose one accountable team over separate vendors.`;
const q = encodeURIComponent(AI_PROMPT);

const AI_TOOLS = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${q}`, icon: "/ai-icons/chatgpt.png" },
  { name: "Claude", href: `https://claude.ai/new?q=${q}`, icon: "/ai-icons/claude.png" },
  { name: "Gemini", href: `https://gemini.google.com/app?q=${q}`, icon: "/ai-icons/gemini.png" },
];

const Sparkle = () => (
  <svg viewBox="0 0 24 24" className="size-[0.55em] shrink-0 text-brand-violet" fill="currentColor" aria-hidden>
    <path d="M12 2c.6 4.9 2.6 7.4 8 8-5.4.6-7.4 3.1-8 8-.6-4.9-2.6-7.4-8-8 5.4-.6 7.4-3.1 8-8Z" />
  </svg>
);

const company = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/portfolio" },
  { label: "About us", href: "/about" },
];
// Blog is linked only once a post is published (until then /blog is noindex and out of the sitemap).
const resources = [
  ...(publishedBlogPosts.length > 0 ? [{ label: "Blog", href: "/blog" }] : []),
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];
const legal = footer.columns.company.filter((l) => l.href === "/privacy" || l.href === "/terms");

/** Brand-coloured social button. A missing (PENDING_LINK) profile renders as a muted, non-clickable button. */
function Social({
  href,
  label,
  icon: Icon,
  text,
  textClass,
}: {
  href?: string;
  label: string;
  icon: React.ElementType;
  text: string;
  textClass: string;
}) {
  const inner = (
    <>
      <Icon className="size-4" />
      <span className={textClass}>{text}</span>
    </>
  );
  if (!href || isPending(href)) {
    return (
      <li>
        <span
          aria-disabled="true"
          title={`${label} coming soon`}
          className="inline-flex min-h-6 cursor-not-allowed items-center gap-2 text-sm opacity-45"
        >
          {inner}
        </span>
      </li>
    );
  }
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={text.toLowerCase().includes(label.toLowerCase()) ? text : `${label} ${text}`}
        className="inline-flex min-h-11 items-center gap-2 text-sm transition-opacity hover:opacity-70 lg:min-h-6"
      >
        {inner}
      </a>
    </li>
  );
}

export function Footer({ navData }: { navData: SiteNavData }) {
  const { services, industries, areas } = navData;
  const marquee = [0, 1, 2, 3];

  return (
    <footer className="relative z-10 overflow-hidden px-4 pb-12 pt-20 max-md:pt-16">
      {/* Soft brand glow rising from the bottom edge, in place of a photo backdrop. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top,#000_0%,#000_35%,rgba(0,0,0,0.5)_60%,transparent_90%)]"
      >
        <div className="absolute -left-[10%] bottom-[-15%] h-[70%] w-[55%] rounded-full bg-[#B98CF0] opacity-70 blur-[110px] dark:opacity-35" />
        <div className="absolute bottom-[-20%] right-[-5%] h-[65%] w-[50%] rounded-full bg-[#FFC9A3] opacity-80 blur-[120px] dark:opacity-30" />
        <div className="absolute bottom-[-25%] left-[30%] h-[55%] w-[45%] rounded-full bg-[#F6B5D6] opacity-70 blur-[120px] dark:opacity-30" />
      </div>

      {/* Glass frame around the white card. */}
      <div className="relative mx-auto max-w-[1312px] overflow-hidden rounded-[28px] border border-white/50 bg-white/25 p-3 shadow-[0_20px_60px_-20px_rgba(60,30,120,0.35)] backdrop-blur-xl max-md:rounded-[24px] max-md:p-2 dark:border-white/10 dark:bg-white/[0.06]">
        <div className="relative overflow-hidden rounded-2xl bg-background">
          <div className="relative z-[1] px-6 pb-16 pt-8 sm:px-10 sm:pt-10">
            <div className="flex items-start justify-between gap-10 max-lg:flex-col">
              {/* Brand + AI explore */}
              <div className="flex flex-col items-start gap-6">
                <Logo className="px-0" imageClassName="h-12" />
                <p className="max-w-[28ch] text-balance text-base leading-[1.55] text-foreground/70">
                  Build, market, and grow with one accountable team.
                </p>
                <div className="flex w-full flex-col items-start gap-4">
                  <div className="h-px w-full bg-[linear-gradient(90deg,#8A2BE2_0%,rgba(138,43,226,0.1)_100%)]" />
                  <span className={eyebrow}>Explore Collabrate with AI</span>
                  <ul className="flex items-center gap-3">
                    {AI_TOOLS.map((t) => (
                      <li key={t.name}>
                        <a
                          href={t.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Explore Collabrate on ${t.name}`}
                          className="footer-tile group grid size-12 place-items-center rounded-xl transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5"
                        >
                          <Image src={t.icon} alt="" width={24} height={24} className="size-6 transition-transform duration-200 group-hover:scale-105" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Link columns */}
              <div className="flex gap-16 lg:ml-auto lg:justify-end max-md:grid max-md:w-full max-md:grid-cols-2 max-md:gap-x-4 max-md:gap-y-8 md:max-lg:grid md:max-lg:w-full md:max-lg:grid-cols-3 md:max-lg:gap-x-8 md:max-lg:gap-y-10">
                <nav aria-label="Company">
                  <div className={`${eyebrow} mb-5`}>Company</div>
                  <ul className="flex flex-col gap-3 max-lg:gap-0">
                    {company.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className={linkCls}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <nav aria-label="Resources">
                  <div className={`${eyebrow} mb-5`}>Resources</div>
                  <ul className="flex flex-col gap-3 max-lg:gap-0">
                    {resources.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className={linkCls}>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <nav aria-label="Services" className="max-md:col-span-2 md:max-lg:order-last md:max-lg:col-span-3">
                  <div className={`${eyebrow} mb-5`}>Services</div>
                  <ul className="flex flex-col gap-3 max-lg:gap-0 md:max-lg:grid md:max-lg:grid-cols-3 md:max-lg:gap-x-8">
                    {serviceCategories.map((c) => (
                      <li key={c.id}>
                        <Link href="/services" className={linkCls}>
                          {c.heading}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                {services.length > 0 && (
                  <nav aria-label="All services" className="max-md:col-span-2 md:max-lg:col-span-3">
                    <div className={`${eyebrow} mb-5`}>All services</div>
                    <ul className="flex flex-col gap-3 max-lg:gap-0 md:max-lg:grid md:max-lg:grid-cols-3 md:max-lg:gap-x-8 lg:grid lg:grid-cols-2 lg:gap-x-10">
                      {services.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className={linkCls}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                {industries.length > 0 && (
                  <nav aria-label="Industries" className="max-md:col-span-2 md:max-lg:col-span-3">
                    <div className={`${eyebrow} mb-5`}>Industries</div>
                    <ul className="flex flex-col gap-3 max-lg:gap-0 md:max-lg:grid md:max-lg:grid-cols-3 md:max-lg:gap-x-8">
                      {industries.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className={linkCls}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
                {areas.length > 0 && (
                  <nav aria-label="Areas we serve" className="max-md:col-span-2 md:max-lg:col-span-3">
                    <div className={`${eyebrow} mb-5`}>Areas we serve</div>
                    <ul className="flex flex-col gap-4 max-lg:gap-3">
                      {areas.map((area) => (
                        <li key={area.name}>
                          {area.district ? (
                            <Link href={area.district.href} className="text-[15px] font-medium text-foreground transition-colors hover:text-brand-violet">
                              {area.name}
                            </Link>
                          ) : (
                            <span className="text-[15px] font-medium text-foreground">{area.name}</span>
                          )}
                          <ul className="mt-1 flex flex-col gap-1">
                            {area.towns.map((t) => (
                              <li key={t.href}>
                                <Link href={t.href} className={linkCls}>
                                  {t.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>

          <div className={divider} />

          {/* Newsletter */}
          <div className="relative z-[1] flex items-center justify-between gap-8 px-6 py-8 max-lg:flex-col max-lg:items-start max-lg:gap-5 sm:px-10">
            <div className="flex flex-col gap-1">
              <span className={eyebrow}>Newsletter</span>
              <p className="m-0 font-[family-name:var(--font-display)] text-[20px] leading-[1.3] text-foreground">
                Development, marketing and AI notes, straight to your inbox.
              </p>
            </div>
            <NewsletterForm />
          </div>

          <div className={divider} />

          {/* Email marquee: pauses on hover/focus, static for reduced motion. */}
          <a href={`mailto:${site.email}`} className="group/mq relative z-[1] block overflow-hidden py-8">
            {/* The scrolling copies below are aria-hidden; this is the link's accessible name (the address itself). */}
            <span className="sr-only">{site.email}</span>
            <div
              aria-hidden
              className="flex w-max animate-marquee items-center whitespace-nowrap motion-reduce:animate-none group-hover/mq:[animation-play-state:paused] group-focus-visible/mq:[animation-play-state:paused]"
            >
              {marquee.map((n) => (
                <span key={n} className="inline-flex items-center gap-3 pr-3 [font-size:clamp(40px,7vw,100px)] [line-height:0.9]">
                  <span className="select-none font-[family-name:var(--font-display)] tracking-[-2px] text-foreground transition-colors duration-200 hover:text-brand-violet">
                    {site.email}
                  </span>
                  <Sparkle />
                </span>
              ))}
            </div>
          </a>

          <div className={divider} />

          {/* Bottom bar */}
          <div className="relative z-[1] flex items-center justify-between gap-6 px-6 pb-8 pt-8 max-md:flex-col max-md:items-start sm:px-10 sm:pb-10">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Social
                href={site.social.linkedin}
                label="LinkedIn"
                icon={Linkedin}
                text={isPending(site.social.linkedin) ? "LinkedIn" : "@" + site.social.linkedin.replace(/\/+$/, "").split("/").pop()}
                textClass="text-[#0A66C2]"
              />
              <Social
                href={site.social.x}
                label="X"
                icon={XLogo}
                text={"@" + site.social.x.replace(/\/+$/, "").split("/").pop()}
                textClass="text-foreground"
              />
              <Social
                href={site.social.instagram}
                label="Instagram"
                icon={Instagram}
                text={"@" + site.social.instagram.replace(/\/+$/, "").split("/").pop()}
                textClass="bg-[linear-gradient(45deg,#feda75_0%,#fa7e1e_25%,#d62976_50%,#962fbf_75%,#4f5bd5_100%)] bg-clip-text text-transparent"
              />
            </ul>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 max-md:flex-col max-md:items-start">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {legal.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-flex min-h-11 items-center text-[13px] lg:min-h-6 text-foreground/60 transition-colors hover:text-foreground">
                      {l.label === "Privacy" ? "Privacy policy" : "Terms and conditions"}
                    </Link>
                  </li>
                ))}
                <li>
                  <CookieSettingsLink className="inline-flex min-h-11 items-center text-[13px] lg:min-h-6 text-foreground/60 transition-colors hover:text-foreground" />
                </li>
              </ul>
              <p className="text-xs uppercase tracking-[1.5px] text-foreground/45">{footer.copyright}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
