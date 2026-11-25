"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";
import type { Skill } from "@/data/content";
import { familyById } from "@/lib/skillFamilies";

type ElementTileProps = {
  skill: Skill;
  dimmed: boolean;
  active: boolean;
  onActivate: () => void;
  style?: CSSProperties;
  className?: string;
};

/** A periodic-table style tile: number, two-letter symbol, name. */
export function ElementTile({ skill, dimmed, active, onActivate, style, className = "" }: ElementTileProps) {
  const family = familyById[skill.family];
  const light = family.fg === "light";

  return (
    <motion.button
      type="button"
      style={{ ...style, backgroundColor: family.bg }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      aria-pressed={active}
      aria-label={`${skill.name} — ${family.label}`}
      animate={{ opacity: dimmed ? 0.15 : 1, y: active ? -4 : 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, opacity: { duration: 0.35 } }}
      className={`relative flex aspect-square w-full flex-col justify-between rounded-xl p-1.5 text-left shadow-[0_1px_2px_rgba(30,35,51,0.06)] transition-shadow duration-300 focus-visible:rounded-xl sm:rounded-2xl sm:p-2 ${
        light ? "text-surface" : "text-ink"
      } ${active ? "shadow-[0_12px_24px_-10px_rgba(30,35,51,0.45)] ring-2 ring-ink ring-offset-2 ring-offset-bg" : ""} ${className}`}
    >
      <span className={`font-mono text-[9px] leading-none sm:text-[10px] ${light ? "text-surface/85" : "text-ink"}`}>
        {skill.number}
      </span>
      <span className="self-center text-xl leading-none font-semibold tracking-tight sm:text-2xl">
        {skill.symbol}
      </span>
      <span
        className={`truncate text-center text-[8px] leading-none sm:text-[9px] ${light ? "text-surface/85" : "text-ink"}`}
      >
        {skill.name}
      </span>
    </motion.button>
  );
}
