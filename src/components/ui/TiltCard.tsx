"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, type ReactNode, type PointerEvent } from "react";

const MAX_TILT = 6; // degrees

/** A card that tilts slightly in 3D toward the pointer (desktop only), then springs flat. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 220, damping: 18 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches && !reduce);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * MAX_TILT * 2);
    rx.set(-py * MAX_TILT * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
