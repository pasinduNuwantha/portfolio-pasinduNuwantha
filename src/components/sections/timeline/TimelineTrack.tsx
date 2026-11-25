"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import type { TimelineEntry } from "@/data/content";

const TYPE_LABEL: Record<TimelineEntry["type"], string> = {
  education: "Education",
  experience: "Experience",
  internship: "Internship",
  project: "Team project",
  activity: "Activity",
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Vertical timeline. The center line draws itself as you scroll
 * (scroll-linked scaleY); entries alternate sides on desktop and sit to the
 * right of a left-hand line on mobile.
 */
export function TimelineTrack({ entries, availability }: { entries: TimelineEntry[]; availability: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className="relative mt-16 sm:mt-20">
      {/* Track + drawn line */}
      <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-ink/10 md:left-1/2 md:-translate-x-1/2">
        <motion.div
          className="absolute inset-0 origin-top bg-ink"
          style={reduce ? undefined : { scaleY }}
        />
      </div>

      <ol className="relative space-y-12 md:space-y-16">
        {entries.map((entry, i) => {
          const cardLeft = i % 2 === 1; // desktop: alternate sides
          return (
            <motion.li
              key={`${entry.year}-${entry.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative grid pl-10 md:grid-cols-2 md:gap-x-20 md:pl-0"
            >
              <Dot />

              {/* Year */}
              <p
                className={`mb-3 text-[clamp(2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-mauve md:mb-0 md:pt-1 ${
                  cardLeft ? "md:order-2 md:text-left" : "md:text-right"
                }`}
              >
                {entry.year}
              </p>

              {/* Card */}
              <div className={cardLeft ? "md:order-1" : ""}>
                <article className="card p-6 sm:p-7">
                  <p className="inline-flex rounded-full border border-ink/10 bg-bg/70 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase">
                    {TYPE_LABEL[entry.type]}
                  </p>
                  <h3 className="mt-4 text-xl leading-snug font-semibold tracking-tight text-ink">{entry.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{entry.org}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{entry.period}</p>
                  {entry.detail && <p className="mt-4 text-sm leading-relaxed text-ink-soft">{entry.detail}</p>}
                  {entry.badge && (
                    <p className="mt-5 inline-flex rounded-full bg-ink px-3 py-1 text-xs font-medium text-surface">
                      {entry.badge}
                    </p>
                  )}
                </article>
              </div>
            </motion.li>
          );
        })}

        {/* What's next */}
        <motion.li
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative grid pl-10 md:grid-cols-2 md:gap-x-20 md:pl-0"
        >
          <Dot filled />
          <p
            className={`mb-3 text-[clamp(2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-ink md:mb-0 md:pt-1 ${
              entries.length % 2 === 1 ? "md:order-2" : "md:text-right"
            }`}
          >
            Next
          </p>
          <div className={entries.length % 2 === 1 ? "md:order-1" : ""}>
            <div className="rounded-3xl border border-dashed border-ink/20 p-6 sm:p-7">
              <p className="font-serif text-3xl text-ink italic">Your team?</p>
              <p className="mt-2 text-sm text-ink-soft">{availability}</p>
              <a
                href="#contact"
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-surface transition-colors hover:bg-ink/85"
              >
                Let&apos;s talk
                <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </motion.li>
      </ol>
    </div>
  );
}

function Dot({ filled = false }: { filled?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute top-3 left-0 h-[15px] w-[15px] rounded-full border-2 border-ink md:left-1/2 md:-translate-x-1/2 ${
        filled ? "bg-ink" : "bg-bg"
      }`}
    />
  );
}
