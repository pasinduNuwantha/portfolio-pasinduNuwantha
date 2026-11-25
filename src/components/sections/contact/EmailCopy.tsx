"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** The email as a big mailto link, plus a copy-to-clipboard button with "Copied!" feedback. */
export function EmailCopy({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for browsers/contexts without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      <a
        href={`mailto:${email}`}
        className="text-[clamp(1.125rem,2.4vw,2rem)] font-medium tracking-tight [overflow-wrap:anywhere] text-ink underline decoration-ink/20 decoration-2 underline-offset-[0.2em] transition-colors hover:decoration-ink"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full border border-ink/15 px-4 text-sm font-medium text-ink transition-colors hover:border-ink/40"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <motion.span
              key="done"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              className="inline-flex items-center gap-2"
            >
              <Check size={15} aria-hidden /> Copied!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              className="inline-flex items-center gap-2"
            >
              <Copy size={15} aria-hidden /> Copy email
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
