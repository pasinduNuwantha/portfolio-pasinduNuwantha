"use client";

import { useMotionValue, useMotionValueEvent, useReducedMotion, type MotionValue } from "motion/react";
import { useEffect, useRef } from "react";

/**
 * Mirrors a 0→1 progress motion value — except with prefers-reduced-motion,
 * where it jumps to 1 (the finished state) and stays there.
 *
 * Why not just drop the `style` prop when reduced? The server always renders
 * the "motion on" version (it can't know the visitor's setting). If the client
 * then omits `style`, React keeps the server's inline style (e.g. scaleY(0) or
 * blur(10px)), freezing the element in its *starting* state. Driving the
 * value instead always updates the DOM.
 */
export function useReducedMotionProgress(source: MotionValue<number>) {
  const reduce = useReducedMotion();
  const out = useMotionValue(source.get());
  const reduceRef = useRef(false);

  useMotionValueEvent(source, "change", (v) => {
    if (!reduceRef.current) out.set(v);
  });

  useEffect(() => {
    reduceRef.current = !!reduce;
    out.set(reduce ? 1 : source.get());
  }, [reduce, source, out]);

  return out;
}
