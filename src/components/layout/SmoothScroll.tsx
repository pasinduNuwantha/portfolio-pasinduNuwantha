"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global smooth scrolling (Lenis) + Motion setup.
 * - In-page anchor links (`href="#about"`) scroll smoothly via Lenis `anchors`.
 * - With `prefers-reduced-motion`, Lenis smoothing is switched off (native
 *   scrolling) and Motion swaps transform animations for instant final states.
 *   Lenis stays mounted either way — swapping the wrapper in and out would
 *   make React rebuild the whole page.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = !!useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis
        root
        options={{
          lerp: 0.1,
          smoothWheel: !reduceMotion,
          anchors: !reduceMotion,
          autoRaf: true,
        }}
      >
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
