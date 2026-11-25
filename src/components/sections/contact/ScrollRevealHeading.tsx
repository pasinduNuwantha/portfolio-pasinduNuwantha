"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * Huge two-line heading. The second line comes into focus word by word as
 * you scroll (opacity + blur, scroll-linked). Reduced motion: fully visible.
 */
export function ScrollRevealHeading({ lead, accent, id }: { lead: string; accent: string; id: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  // Finishes while the heading is still in the lower half of the screen, so it
  // fully clears even though Contact is the last section (the page can't scroll further).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 55%"] });
  const words = accent.split(" ");

  return (
    <h2
      ref={ref}
      id={id}
      className="text-[clamp(3rem,10vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-balance text-ink"
    >
      <span className="block">{lead}</span>
      <span className="block pb-[0.08em] font-serif font-normal tracking-[-0.02em] text-ink-soft italic">
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            still={!!reduce}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </Word>
        ))}
      </span>
    </h2>
  );
}

function Word({
  children,
  progress,
  range,
  still,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const filter = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);
  return (
    <motion.span style={still ? undefined : { opacity, filter }} className="inline-block whitespace-pre">
      {children}
    </motion.span>
  );
}
