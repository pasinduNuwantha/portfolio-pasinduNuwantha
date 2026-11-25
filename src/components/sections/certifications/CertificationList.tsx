"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Certification } from "@/data/content";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Certification rows. Hovering (or focusing) a row slides a navy band under
 * it — one shared `layoutId` background that follows the pointer between rows.
 */
export function CertificationList({ items }: { items: Certification[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <ul className="border-t border-ink/10" onMouseLeave={() => setHovered(null)}>
      {items.map((cert, i) => {
        const on = hovered === i;
        const inner = (
          <>
            {on && (
              <motion.span
                layoutId="cert-highlight"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-2xl bg-ink"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <motion.span
              animate={{ x: on ? 8 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="flex w-full items-center gap-4 sm:gap-6"
            >
              <span className={`font-mono text-xs transition-colors duration-300 ${on ? "text-surface/70" : "text-muted"}`}>
                {pad(i + 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block text-base font-semibold tracking-tight transition-colors duration-300 sm:text-lg ${on ? "text-surface" : "text-ink"}`}
                >
                  {cert.name}
                </span>
                <span className={`block text-sm transition-colors duration-300 ${on ? "text-surface/75" : "text-ink-soft"}`}>
                  {cert.issuer}
                </span>
              </span>
              {cert.year && (
                <span className={`font-mono text-xs transition-colors duration-300 ${on ? "text-surface/75" : "text-muted"}`}>
                  {cert.year}
                </span>
              )}
              <ArrowUpRight
                size={18}
                aria-hidden
                className={`shrink-0 transition-all duration-300 ${
                  on ? "translate-x-0 text-surface opacity-100" : "-translate-x-1 text-ink opacity-0"
                } ${cert.url ? "" : "hidden"}`}
              />
            </motion.span>
          </>
        );

        const rowClass = "relative isolate flex items-center rounded-2xl px-4 py-5 sm:px-5";
        return (
          <li
            key={cert.name}
            className="border-b border-ink/10"
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
          >
            {cert.url ? (
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
                {inner}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <div className={rowClass}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
