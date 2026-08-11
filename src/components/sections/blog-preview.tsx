"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { blogPosts } from "@/data/site";

export function BlogPreview() {
  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="From the blog"
            title="Notes on AI, product, and engineering"
            className="sm:items-start sm:text-left"
          />
          <a
            href="#"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand-violet sm:flex"
          >
            View all posts <ArrowRight className="size-4" />
          </a>
        </div>

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {blogPosts.map((post) => (
            <motion.article
              key={post.title}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 transition-shadow duration-500 hover:shadow-[0_24px_60px_-24px_rgba(138,43,226,0.35)]"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="rounded-full bg-surface px-2.5 py-1 font-medium text-brand-violet">{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-base font-semibold leading-snug text-foreground">{post.title}</h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand-violet" />
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
