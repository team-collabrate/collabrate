"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { StaggerGroup, staggerItem } from "@/components/shared/reveal";
import { portfolioProjects, type PortfolioProject } from "@/lib/content";
import { track } from "@/lib/analytics";

export function PortfolioGrid({ pageHrefs = {} }: { pageHrefs?: Record<string, string> }) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2" stagger={0.08}>
      {portfolioProjects.map((project) => (
        <PortfolioCard key={project.title} project={project} href={pageHrefs[project.title]} />
      ))}
    </StaggerGroup>
  );
}

function PortfolioCard({ project, href }: { project: PortfolioProject; href?: string }) {
  return (
    <motion.article
      variants={staggerItem}
      whileHover={{ y: -4 }}
      onViewportEnter={() => track("view_portfolio_item", { item: project.title })}
      viewport={{ once: true, amount: 0.6 }}
      className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-7 shadow-sm transition-colors duration-300 hover:border-brand-purple/40 sm:p-8"
    >
      <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
        {project.industry}
      </span>
      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground sm:text-2xl">
        {project.title}
      </h3>
      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Problem: </span>
          {project.problem}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Solution: </span>
          {project.solution}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Outcome: </span>
          {project.outcome}
        </p>
      </div>
      {href && (
        <Link href={href} className="text-sm font-semibold text-brand-violet underline-offset-4 hover:underline">
          Read the case study: {project.title}
        </Link>
      )}
    </motion.article>
  );
}
