"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle, Sparkles, Activity, Zap, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuroraBackground, GridBackground } from "@/components/shared/aurora-background";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { heroContent } from "@/data/site";

export function Hero() {
  const [before, highlight, after] = splitHeadline(heroContent.headline, heroContent.highlightWord);

  return (
    <section className="relative overflow-hidden pt-40 pb-24 sm:pt-48 sm:pb-32">
      <AuroraBackground />
      <GridBackground />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="glass" className="border-border !bg-surface/80 text-foreground">
            <Sparkles className="size-3.5 text-brand-orange" />
            {heroContent.badge}
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
        >
          {before}
          <span className="text-gradient">{highlight}</span>
          {after}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl"
        >
          {heroContent.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button variant="gradient" size="lg" asChild>
            <a href={heroContent.primaryCTA.href}>
              {heroContent.primaryCTA.label} <ArrowUpRight className="size-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={heroContent.secondaryCTA.href}>
              <PlayCircle className="size-4" /> {heroContent.secondaryCTA.label}
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          {heroContent.trustBadges.map((badge) => (
            <span key={badge} className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-brand-violet" />
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Floating AI dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-20 w-full max-w-4xl"
        >
          <div className="absolute -inset-x-10 -top-10 h-40 bg-[linear-gradient(90deg,#FF9F43,#F7686F,#CF6CAD,#B154B3,#8A2BE2)] opacity-30 blur-[80px]" />

          <div className="glass relative rounded-3xl border border-border p-3 shadow-[0_40px_100px_-30px_rgba(138,43,226,0.35)] sm:p-4">
            <div className="flex items-center gap-1.5 px-2 pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-coral/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-orange/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-brand-violet/40" />
            </div>

            <div className="grid grid-cols-1 gap-3 rounded-2xl bg-background/60 p-4 sm:grid-cols-3 sm:p-6">
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Agent Performance</span>
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-500">
                    <Activity className="size-3" /> Live
                  </span>
                </div>
                <div className="flex h-28 items-end gap-1.5 sm:h-32">
                  {[38, 52, 44, 68, 58, 74, 66, 82, 71, 90, 84, 96].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: 0.9 + i * 0.05, ease: "easeOut" }}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-brand-violet to-brand-orange/80"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-1 flex-col justify-between rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <Zap className="size-4 text-brand-orange" />
                    <TrendingUp className="size-3.5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-foreground">
                      <AnimatedCounter value={2.4} decimals={1} suffix="M" duration={2} />
                    </div>
                    <p className="text-[11px] text-muted-foreground">Requests handled</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-muted-foreground">Uptime</span>
                  </div>
                  <div className="text-2xl font-semibold text-foreground">
                    <AnimatedCounter value={99.98} decimals={2} suffix="%" duration={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating chip cards */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass absolute -left-6 top-10 hidden rounded-2xl border border-border px-4 py-3 shadow-xl sm:block"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand-diagonal text-white">
                <Sparkles className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground">AI Agent deployed</p>
                <p className="text-[11px] text-muted-foreground">2 seconds ago</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass absolute -right-6 bottom-16 hidden rounded-2xl border border-border px-4 py-3 shadow-xl sm:block"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                <CheckCircle2 className="size-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-foreground">Deploy successful</p>
                <p className="text-[11px] text-muted-foreground">Build #248 · 41s</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Animated stats */}
        {heroContent.stats.length > 0 && (
        <div className="mt-24 grid w-full grid-cols-2 gap-8 border-t border-border pt-12 sm:grid-cols-4">
          {heroContent.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="text-3xl font-semibold text-foreground sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <p className="text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

function splitHeadline(headline: string, highlight: string): [string, string, string] {
  const idx = headline.indexOf(highlight);
  if (idx === -1) return [headline, "", ""];
  return [headline.slice(0, idx), highlight, headline.slice(idx + highlight.length)];
}
