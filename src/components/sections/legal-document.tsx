import Link from "next/link";
import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";
import { LegalToc } from "@/components/sections/legal-toc";
import { slugify } from "@/lib/slug";

/** A paragraph, a definition whose term is shown in bold, or a bulleted list. */
export type Para = string | { term: string; text: string } | { items: string[] };

export interface LegalSection {
  heading: string;
  paras?: Para[];
  subsections?: { heading: string; paras: Para[] }[];
}

function Paragraphs({ paras }: { paras: Para[] }) {
  // Consecutive definitions are grouped into one list; everything else is a paragraph.
  type Block =
    | { kind: "p"; text: string }
    | { kind: "dl"; items: { term: string; text: string }[] }
    | { kind: "ul"; items: string[] };
  const blocks: Block[] = [];
  for (const para of paras) {
    if (typeof para === "string") blocks.push({ kind: "p", text: para });
    else if ("items" in para) blocks.push({ kind: "ul", items: para.items });
    else {
      const last = blocks[blocks.length - 1];
      if (last?.kind === "dl") last.items.push(para);
      else blocks.push({ kind: "dl", items: [para] });
    }
  }

  return (
    <>
      {blocks.map((block, i) =>
        block.kind === "p" ? (
          <p key={i} className="mt-4 text-[15px] leading-7 text-muted-foreground first:mt-0">
            {block.text}
          </p>
        ) : block.kind === "ul" ? (
          <ul key={i} className="mt-4 flex list-disc flex-col gap-2 pl-5 text-[15px] leading-7 text-muted-foreground marker:text-brand-violet first:mt-0">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <dl key={i} className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface first:mt-0">
            {block.items.map((item) => (
              <div key={item.term} className="grid gap-1 px-4 py-3.5 sm:grid-cols-[170px_1fr] sm:gap-5">
                <dt className="text-sm font-semibold text-foreground">{item.term}</dt>
                <dd className="text-[15px] leading-7 text-muted-foreground">{item.text}</dd>
              </div>
            ))}
          </dl>
        )
      )}
    </>
  );
}

/**
 * Long-form legal page: title block, "On this page" navigation, numbered section cards and a
 * contact card. Content comes in as data so the wording stays in the page file.
 */
export function LegalDocument({
  title,
  updated,
  lead,
  sections,
  contactIntro,
  email,
}: {
  title: string;
  updated: string;
  lead: string;
  sections: LegalSection[];
  contactIntro: string;
  email: string;
}) {
  const items = [
    ...sections.map((s) => ({ id: slugify(s.heading), label: s.heading })),
    { id: "contact-us", label: "Contact Us" },
  ];

  return (
    <section className="relative pb-16 pt-32 sm:pb-20 sm:pt-36">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <header className="mb-8 sm:mb-10">
          <h1 className="display-2 text-balance">{title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-2 rounded-lg bg-tint-violet px-3 py-1.5 text-xs font-semibold text-brand-violet">
              <CalendarDays className="size-3.5" aria-hidden /> Last updated: {updated}
            </span>
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{lead}</p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[230px_1fr] lg:gap-10">
          <aside>
            <LegalToc items={items} />
          </aside>

          <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
            {sections.map((section, index) => (
              <section
                key={section.heading}
                id={slugify(section.heading)}
                aria-labelledby={`${slugify(section.heading)}-title`}
                className="scroll-mt-28 rounded-3xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(26,20,51,0.04)] sm:p-8"
              >
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-tint-violet text-sm font-semibold tabular-nums text-brand-violet">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`${slugify(section.heading)}-title`} className="pt-1 text-xl font-semibold leading-snug tracking-tight text-foreground">
                    {section.heading}
                  </h2>
                </div>

                <div className="mt-4 sm:pl-[3.125rem]">
                  {section.paras && <Paragraphs paras={section.paras} />}
                  {section.subsections?.map((sub) => (
                    <div key={sub.heading} className="mt-6 first:mt-0">
                      <h3 className="mb-3 border-l-2 border-brand-violet/60 pl-3 text-base font-semibold text-foreground">{sub.heading}</h3>
                      <Paragraphs paras={sub.paras} />
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section
              id="contact-us"
              aria-labelledby="contact-us-title"
              className="scroll-mt-28 rounded-3xl bg-[linear-gradient(160deg,#9B3BEF_0%,#8A2BE2_45%,#6A1DB8_100%)] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] sm:p-8"
            >
              <h2 id="contact-us-title" className="text-xl font-semibold tracking-tight !text-white">
                Contact Us
              </h2>
              <p className="mt-2 max-w-lg text-[15px] leading-7 text-white/85">{contactIntro}</p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-[#1A1433] transition-transform hover:-translate-y-0.5"
                >
                  <Mail className="size-4" aria-hidden /> {email}
                </a>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  Visit the contact page <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
