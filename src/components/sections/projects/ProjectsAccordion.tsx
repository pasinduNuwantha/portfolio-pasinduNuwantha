"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/content";
import { ProjectDetails, ProjectPreview } from "@/components/sections/projects/ProjectDetails";

const pad = (n: number) => String(n).padStart(2, "0");

const PANEL_SPRING = { type: "spring", stiffness: 210, damping: 30, mass: 0.9 } as const;
const HOVER_INTENT_MS = 160;

/**
 * Desktop: a horizontal accordion of tall panels — exactly one open.
 * Mobile: a vertical stack of cards that expand/collapse.
 */
export function ProjectsAccordion({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  };
  // Hover opens a panel only if the pointer rests on it briefly (avoids flicker when sweeping across).
  const hoverOpen = (i: number) => {
    clearHover();
    hoverTimer.current = setTimeout(() => setActive(i), HOVER_INTENT_MS);
  };
  useEffect(() => clearHover, []);

  // The collapsed button disappears when its panel opens, so move focus to the
  // new heading — otherwise keyboard users are dropped back to <body>.
  const focusAfterOpen = useRef<number | null>(null);
  useEffect(() => {
    if (focusAfterOpen.current !== active) return;
    focusAfterOpen.current = null;
    document.getElementById(`project-${active}-title`)?.focus({ preventScroll: true });
  }, [active]);

  return (
    <>
      {/* ---------------- Desktop ---------------- */}
      {/* min-height (not fixed height): the row grows if a project has more text, and flex keeps every panel equally tall */}
      <div className="mt-14 hidden min-h-[41rem] gap-3 lg:flex" onMouseLeave={clearHover}>
        {projects.map((project, i) => {
          const open = i === active;
          return (
            <motion.article
              key={project.title}
              layout
              transition={PANEL_SPRING}
              style={{ borderRadius: 28 }}
              onMouseEnter={() => !open && hoverOpen(i)}
              aria-labelledby={`project-${i}-title`}
              className={`relative overflow-hidden border ${
                open
                  ? "min-w-0 flex-1 border-border bg-surface shadow-soft"
                  : "w-[5.5rem] shrink-0 border-ink/10 bg-surface/45 transition-colors duration-300 hover:bg-surface"
              }`}
            >
              {open ? (
                <motion.div
                  layout="position"
                  key="open"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="relative grid h-full grid-cols-1 gap-8 p-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)] xl:p-10"
                >
                  <div className="relative flex min-w-0 flex-col justify-center">
                    <ProjectDetails project={project} headingId={`project-${i}-title`} number={pad(i + 1)} />
                  </div>
                  <div className="hidden xl:block">
                    <ProjectPreview project={project} index={i} />
                  </div>
                </motion.div>
              ) : (
                <motion.button
                  layout="position"
                  key="closed"
                  type="button"
                  onClick={() => {
                    clearHover();
                    focusAfterOpen.current = i;
                    setActive(i);
                  }}
                  aria-expanded={false}
                  className="absolute inset-0 flex flex-col items-center justify-between rounded-[28px] py-7 text-ink"
                >
                  <span className="font-mono text-sm text-muted">{pad(i + 1)}</span>
                  <span
                    id={`project-${i}-title`}
                    className="text-lg font-semibold tracking-tight whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
                  >
                    {project.title}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15">
                    <Plus size={14} aria-hidden />
                    <span className="sr-only">Open {project.title}</span>
                  </span>
                </motion.button>
              )}
            </motion.article>
          );
        })}
      </div>

      {/* ---------------- Mobile ---------------- */}
      <div className="mt-10 flex flex-col gap-3 lg:hidden">
        {projects.map((project, i) => {
          const open = i === mobileOpen;
          const panelId = `project-m-${i}`;
          return (
            <article key={project.title} className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
              <h3>
                <button
                  type="button"
                  onClick={() => setMobileOpen(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="flex w-full items-center gap-4 rounded-3xl p-5 text-left"
                >
                  <span className="font-mono text-xs text-muted">{pad(i + 1)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xl font-semibold tracking-tight text-ink">{project.title}</span>
                    <span className="block truncate font-serif text-lg text-ink-soft italic">{project.subtitle}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    aria-hidden
                    className={`shrink-0 text-ink transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex flex-col gap-6 px-5 pb-6">
                      <ProjectDetails project={project} showTitle={false} />
                      <ProjectPreview project={project} index={i} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </>
  );
}
