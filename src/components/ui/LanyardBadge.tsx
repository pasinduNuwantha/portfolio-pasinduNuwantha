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
import Image from "next/image";
import { Check, RefreshCw } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

type LanyardBadgeProps = {
  title: string;
  items: { label: string; sub: string }[];
  signature: string;
  /** Text printed along the strap */
  strapText: string;
  footnote?: string;
  /** Front face — the photo ID */
  idCard: {
    name: string;
    /** Only passed when the file exists in /public */
    photo?: string;
    role: string;
    idNumber: string;
    department: string;
    validTill: string;
  };
};

const FLIP_SPRING = { type: "spring", stiffness: 140, damping: 18, mass: 0.9 } as const;

/** Decorative barcode whose bars are derived from the ID text (stable between renders). */
function barcodeBars(seed: string) {
  const bars: number[] = [];
  for (let i = 0; i < 46; i++) {
    const c = seed.charCodeAt(i % seed.length) + i * 7;
    bars.push((c % 3) + 1);
  }
  return bars;
}

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
export function LanyardBadge({ title, items, signature, strapText, footnote, idCard }: LanyardBadgeProps) {
  const reduce = useReducedMotion();
  // Front = photo ID, back = "What I am". Hover flips on desktop; tap / Enter elsewhere.
  const [flipped, setFlipped] = useState(false);
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
          <span className="pt-2 font-mono text-[7px] leading-none tracking-[0.3em] whitespace-nowrap text-surface/60 uppercase [writing-mode:vertical-rl]">
            {`${strapText} · `.repeat(4)}
          </span>
        </div>

        {/* Clip */}
        <div aria-hidden className="relative -mt-1 flex flex-col items-center">
          <div className="h-3 w-9 rounded-sm bg-gradient-to-b from-ink to-[#2c3246] shadow-sm" />
          <div className="-mt-0.5 h-4 w-4 rounded-full border-[3px] border-ink/80" />
        </div>

        {/* Card (drag + stretch) → flipper (3D rotateY) → two faces stacked in one grid cell */}
        <motion.div
          style={reduce ? undefined : { y: stretch }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && !drag.current && setFlipped(false)}
          onClick={() => !canInteract && setFlipped((f) => !f)}
          onKeyDown={(e: ReactKeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setFlipped((f) => !f);
            }
          }}
          tabIndex={0}
          role="button"
          aria-pressed={flipped}
          aria-label={`${idCard.name}'s ID card. ${flipped ? "Showing what I am" : "Showing photo ID"} — press to flip.`}
          className={`relative -mt-1.5 w-[17.5rem] rounded-[1.75rem] select-none [perspective:1400px] sm:w-[19rem] ${
            canInteract ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
          }`}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={FLIP_SPRING}
            style={{ transformStyle: "preserve-3d" }}
            className="grid"
          >
            {/* ---------- Front: photo ID ---------- */}
            <div
              aria-hidden={flipped}
              className="col-start-1 row-start-1 flex flex-col overflow-hidden rounded-[1.75rem] border border-border bg-white shadow-[0_2px_4px_rgba(30,35,51,0.04),0_24px_48px_-20px_rgba(30,35,51,0.28)] [backface-visibility:hidden]"
            >
              <div className="relative bg-ink px-6 pt-4 pb-5 text-surface sm:px-7">
                <div aria-hidden className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-surface/25" />
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-xs font-semibold text-ink">
                    {initials(idCard.name)}
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold tracking-[0.14em] uppercase">Developer ID</span>
                    <span className="block font-mono text-[10px] text-surface/70">Portfolio</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center px-6 pt-6 pb-5 text-center sm:px-7">
                <div className="relative h-40 w-32 overflow-hidden rounded-2xl border-[3px] border-ink/80 bg-bg shadow-sm">
                  {idCard.photo ? (
                    <Image
                      src={idCard.photo}
                      alt={`Photo of ${idCard.name}`}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-serif text-5xl text-ink/40 italic">
                      {initials(idCard.name)}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-lg font-semibold tracking-[0.06em] text-ink uppercase">{idCard.name}</p>
                <p className="text-xs text-ink-soft">{idCard.role}</p>

                <dl className="mt-5 grid w-full grid-cols-3 gap-2 text-[10px]">
                  {[
                    ["ID No.", idCard.idNumber],
                    ["Dept.", idCard.department],
                    ["Valid till", idCard.validTill],
                  ].map(([k, v]) => (
                    <div key={k} className="flex flex-col items-center">
                      <dt className="font-mono tracking-wide text-muted uppercase">{k}</dt>
                      <dd className="mt-1 text-[11px] leading-tight font-semibold text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div aria-hidden className="mt-5 flex h-9 items-stretch gap-[2px]">
                  {barcodeBars(idCard.idNumber + idCard.name).map((w, i) => (
                    <span key={i} className={i % 2 ? "bg-transparent" : "bg-ink"} style={{ width: w }} />
                  ))}
                </div>

                <FlipHint canHover={canInteract} />
              </div>
            </div>

            {/* ---------- Back: what I am ---------- */}
            <div
              aria-hidden={!flipped}
              className="col-start-1 row-start-1 flex flex-col rounded-[1.75rem] border border-border bg-white p-6 shadow-[0_2px_4px_rgba(30,35,51,0.04),0_24px_48px_-20px_rgba(30,35,51,0.28)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-7"
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

              <div className="mt-auto border-t border-dashed border-ink/15 pt-4">
                <p className="font-serif text-[1.75rem] leading-none whitespace-nowrap text-ink italic">
                  {signature}
                </p>
                {footnote && (
                  <p className="mt-2 font-mono text-[10px] tracking-wide text-muted uppercase">{footnote}</p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function FlipHint({ canHover }: { canHover: boolean }) {
  return (
    <p aria-hidden className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted uppercase">
      <RefreshCw size={11} />
      {canHover ? "Hover to flip" : "Tap to flip"}
    </p>
  );
}
