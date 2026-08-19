"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const distanceFor = (direction: Direction) => {
  switch (direction) {
    case "up":
      return { y: 28 };
    case "down":
      return { y: -28 };
    case "left":
      return { x: 28 };
    case "right":
      return { x: -28 };
    default:
      return {};
  }
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  blur = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  blur?: boolean;
}) {
  const reducedMotion = useReducedMotion();

  // A user who has asked the OS for reduced motion should still see content
  // appear (no permanently-hidden sections), just without the blur/translate
  // entrance animation — a plain, near-instant fade.
  const variants: Variants = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
      }
    : {
        hidden: {
          opacity: 0,
          filter: blur ? "blur(8px)" : "blur(0px)",
          ...distanceFor(direction),
        },
        visible: {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          y: 0,
          transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
