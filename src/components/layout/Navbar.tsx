"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NavItem, SectionId } from "@/data/content";

/**
 * Scroll-spy: the active section is the last nav section whose top has
 * crossed 40% of the viewport height. Before the first one → none (hero).
 */
function useActiveSection(ids: SectionId[]) {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: SectionId | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last section wins even if it's short.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

const pillTransition = { type: "spring", stiffness: 380, damping: 32 } as const;

/**
 * Receives only what it needs as props — importing `content` here would ship
 * the whole content file to the browser as JavaScript.
 */
export function Navbar({ nav, siteName }: { nav: NavItem[]; siteName: string }) {
  const navIds = useMemo(() => nav.map((n) => n.id), [nav]);
  const active = useActiveSection(navIds);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the mobile menu on Escape or outside click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="container-page flex items-center justify-between pt-4 sm:pt-5">
        {/* Logo / name */}
        <a
          href="#hero"
          className="pointer-events-auto flex h-11 items-center rounded-full border border-border bg-surface/70 px-4 text-sm font-semibold tracking-tight text-ink shadow-soft backdrop-blur-md"
        >
          {siteName}
          <span className="font-serif font-normal text-ink-soft italic">.</span>
        </a>

        {/* Desktop pill */}
        <nav
          aria-label="Primary"
          className="pointer-events-auto hidden rounded-full border border-border bg-surface/70 p-1 shadow-soft backdrop-blur-md md:block"
        >
          <ul className="flex items-center">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={pillTransition}
                      className="absolute inset-0 rounded-full bg-ink"
                      aria-hidden
                    />
                  )}
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
                      isActive ? "text-surface" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 text-ink shadow-soft backdrop-blur-md md:hidden"
        >
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto container-page mt-2 origin-top md:hidden"
          >
            <nav
              aria-label="Primary"
              className="rounded-3xl border border-border bg-surface/95 p-2 shadow-soft backdrop-blur-md"
            >
              <ul className="flex flex-col">
                {nav.map((item) => {
                  const isActive = active === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive ? "bg-ink text-surface" : "text-ink hover:bg-ink/5"
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-surface" aria-hidden />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
