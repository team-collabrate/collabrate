import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import styles from "./scroll-word-hero.module.css";

/**
 * "We help you ___" band: the words scroll through a highlight band while the lead stays pinned,
 * then a closing panel grows in. Pure CSS (no client JS). The cycling words are decorative and
 * hidden from assistive tech; `summary` carries the same words as one readable sentence.
 */
export function ScrollWordHero({
  lead,
  words,
  summary,
  statement,
  ctaLabel,
  ctaHref,
}: {
  lead: string;
  words: string[];
  summary: string;
  statement: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className={styles.root} style={{ "--count": words.length } as CSSProperties} aria-labelledby="word-hero-title">
      <div className={`${styles.header} ${styles.fluid}`}>
        <div className={styles.stage}>
          <h2 id="word-hero-title" className={styles.lead}>
            <span aria-hidden="true">{lead}&nbsp;</span>
            <span className="sr-only">{summary}</span>
          </h2>
          <ul className={styles.words} aria-hidden="true">
            {words.map((word) => (
              <li key={word} className={styles.word}>
                {word}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`${styles.panel} ${styles.fluid}`}>
        <div className={styles.panelInner}>
          <p className={styles.statement}>{statement}</p>
          <Link href={ctaHref} className={styles.link}>
            {ctaLabel} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
