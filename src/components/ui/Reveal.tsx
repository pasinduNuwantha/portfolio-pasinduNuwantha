"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger },
  }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each <RevealItem> child */
  stagger?: number;
  /**
   * How much of the element must be visible before revealing (0–1).
   * Default: reveal as soon as its top is 12% into the screen — works for
   * very tall blocks (a ratio like 0.2 would wait too long on mobile).
   */
  amount?: number;
  as?: "div" | "section" | "ul" | "ol" | "header";
};

/**
 * Fades + slides children up as they enter the viewport (once).
 * Wrap individual pieces in <RevealItem> to stagger them.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">
 * (the slide is dropped, only the fade remains).
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  amount,
  as = "div",
}: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={container}
      custom={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={amount === undefined ? { once: true, margin: "0px 0px -12% 0px" } : { once: true, amount }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
