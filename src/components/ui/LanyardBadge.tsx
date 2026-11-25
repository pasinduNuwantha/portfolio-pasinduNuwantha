"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type LanyardBadgeProps = {
  title: string;
  items: { label: string; sub: string }[];
  signature: string;
  /** Text printed along the strap */
  strapText: string;
  footnote?: string;
};

const MAX_DRAG_ANGLE = 22; // degrees
const MAX_TILT = 4; // degrees, follow-the-mouse
const SWING_SPRING = { type: "spring", stiffness: 55, damping: 5, mass: 1 } as const;

/**
 * A 2D ID badge hanging from a strap, pivoting at the top.
 * - Swings when it scrolls into view (and on load).
 * - Desktop: tilts a few degrees toward the mouse; can be grabbed and
 *   swung, then springs back with a natural pendulum motion.
 * - Reduced motion: completely static.
 */
export function LanyardBadge({ title, items, signature, strapText, footnote }: LanyardBadgeProps) {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });

  // Pendulum angle (swing + drag) and mouse tilt are separate so they can mix.
  const swing = useMotionValue(0);
  const tiltTarget = useMotionValue(0);
  const tilt = useSpring(tiltTarget, { stiffness: 70, damping: 14 });
  const rotate = useTransform(() => swing.get() + tilt.get());
  const stretch = useMotionValue(0);

  const [canInteract, setCanInteract] = useState(false);
  const drag = useRef<{ x: number; y: number; length: number; lastAngle: number; lastT: number; vel: number } | null>(null);

  // Fine pointer (mouse/trackpad) only — touch users keep normal scrolling.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanInteract(mq.matches && !reduce);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [reduce]);

  // Kick the badge into a swing every time it enters the viewport.
  useEffect(() => {
    if (!inView || reduce || drag.current) return;
    swing.set(9);
    const controls = animate(swing, 0, { ...SWING_SPRING, velocity: -40 });
    return () => controls.stop();
  }, [inView, reduce, swing]);

  // Lean gently toward the mouse.
  useEffect(() => {
    if (!canInteract) return;
    const onMove = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el || drag.current) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const near = Math.abs(dx) < window.innerWidth * 0.6 && e.clientY > r.top - 200 && e.clientY < r.bottom + 200;
      // Negative rotation swings the bottom of the card to the right (pivot is at the top).
      tiltTarget.set(near ? Math.max(-MAX_TILT, Math.min(MAX_TILT, -dx / 80)) : 0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [canInteract, tiltTarget]);

  // --- Drag to swing -------------------------------------------------------
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!canInteract || e.button !== 0) return;
    const el = rootRef.current;
    if (!el) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Capture can fail for already-released pointers; dragging still works without it.
    }
    swing.stop();
    tiltTarget.set(0);
    const r = el.getBoundingClientRect();
    drag.current = {
      x: e.clientX,
      y: e.clientY,
      // distance from the pivot (top of strap) to the grab point
      length: Math.max(120, e.clientY - r.top),
      lastAngle: swing.get(),
      lastT: performance.now(),
      vel: 0,
    };
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    // Pulling sideways rotates around the pivot (pendulum), like a real lanyard.
    const angle = Math.max(
      -MAX_DRAG_ANGLE,
      Math.min(MAX_DRAG_ANGLE, (-Math.atan2(dx, d.length) * 180) / Math.PI),
    );
    const now = performance.now();
    d.vel = ((angle - d.lastAngle) / Math.max(1, now - d.lastT)) * 1000;
    d.lastAngle = angle;
    d.lastT = now;
    swing.set(angle);
    // A little elastic stretch when pulled down.
    stretch.set(Math.max(-6, Math.min(18, dy * 0.15)));
  };

  const onPointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    animate(swing, 0, { ...SWING_SPRING, velocity: Math.max(-300, Math.min(300, d.vel)) });
    animate(stretch, 0, { type: "spring", stiffness: 400, damping: 15 });
  };

  return (
    <div ref={rootRef} className="relative flex justify-center">
      <motion.div
        style={reduce ? undefined : { rotate, transformOrigin: "50% 0%" }}
        className="flex flex-col items-center will-change-transform"
      >
        {/* Strap */}
        <div
          aria-hidden
          className="relative flex h-24 w-5 justify-center overflow-hidden rounded-b-sm bg-ink shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] sm:h-32"
        >
          <span className="pt-2 font-mono text-[7px] leading-none tracking-[0.3em] whitespace-nowrap text-surface/45 uppercase [writing-mode:vertical-rl]">
            {`${strapText} · `.repeat(4)}
          </span>
        </div>

        {/* Clip */}
        <div aria-hidden className="relative -mt-1 flex flex-col items-center">
          <div className="h-3 w-9 rounded-sm bg-gradient-to-b from-ink to-[#2c3246] shadow-sm" />
          <div className="-mt-0.5 h-4 w-4 rounded-full border-[3px] border-ink/80" />
        </div>

        {/* Card */}
        <motion.div
          style={reduce ? undefined : { y: stretch }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className={`relative -mt-1.5 w-[17.5rem] rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_2px_4px_rgba(30,35,51,0.04),0_24px_48px_-20px_rgba(30,35,51,0.28)] select-none sm:w-[19rem] sm:p-7 ${
            canInteract ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          {/* Slot where the clip goes through */}
          <div aria-hidden className="mx-auto -mt-2 mb-5 h-1.5 w-12 rounded-full bg-bg shadow-[inset_0_1px_2px_rgba(30,35,51,0.12)]" />

          <p className="eyebrow mb-2">ID · Developer</p>
          <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>

          <ul className="mt-5 space-y-3.5">
            {items.map((item) => (
              <li key={item.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-surface">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-ink">{item.label}</span>
                  <span className="mt-0.5 block text-xs text-ink-soft">{item.sub}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-dashed border-ink/15 pt-4">
            <p className="font-serif text-[1.75rem] leading-none whitespace-nowrap text-ink italic">
              {signature}
            </p>
            {footnote && (
              <p className="mt-2 font-mono text-[10px] tracking-wide text-muted uppercase">{footnote}</p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
