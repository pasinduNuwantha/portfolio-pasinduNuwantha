"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Giant, faded first name behind the hero. Drifts down slower than the page
 * scrolls (parallax) and fades out. Static when reduced motion is on.
 */
export function ParallaxName({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 220]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[18%] -z-10 flex justify-center select-none md:top-1/2 md:-translate-y-1/2"
    >
      <motion.p
        style={reduce ? undefined : { y, opacity }}
        className="animate-fade-in text-[22vw] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-ink/[0.05] uppercase will-change-transform"
      >
        {text}
      </motion.p>
    </div>
  );
}
