"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global smooth scrolling (Lenis) + Motion config.
 * - In-page anchor links (`href="#about"`) scroll smoothly via Lenis `anchors`.
 * - With `prefers-reduced-motion`, Lenis is skipped entirely and Motion
 *   swaps transform animations for instant final states.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduceMotion ? (
        children
      ) : (
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            anchors: true,
            autoRaf: true,
          }}
        >
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
