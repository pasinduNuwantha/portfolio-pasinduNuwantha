"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type HeroMediaProps = {
  webm?: string;
  mp4?: string;
  poster?: string;
  alt: string;
};

type Mode = "video" | "poster" | "placeholder";

/**
 * Full-body character on the right of the hero.
 * Fallback chain: video → poster image → placeholder silhouette.
 * `mix-blend-multiply` lets a white/cream video background melt into --bg.
 */
export function HeroMedia({ webm, mp4, poster, alt }: HeroMediaProps) {
  const reduce = useReducedMotion();
  const initial: Mode = webm || mp4 ? "video" : poster ? "poster" : "placeholder";
  const [mode, setMode] = useState<Mode>(initial);
  const videoRef = useRef<HTMLVideoElement>(null);

  // The server renders autoPlay (it can't know the visitor's setting), so
  // pause explicitly once we know reduced motion is on.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => {});
  }, [reduce, mode]);

  const fallBack = () => setMode((m) => (m === "video" && poster ? "poster" : "placeholder"));

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-20 bottom-[38%] flex animate-fade-in justify-center sm:bottom-[30%] md:top-16 md:bottom-0 md:justify-end md:pr-[6vw] lg:pr-[10vw]"
      style={{ animationDelay: "500ms" }}
    >
      <div className="relative aspect-[9/16] h-full max-w-full">
        {mode === "video" && (
          <video
            ref={videoRef}
            className="h-full w-full object-contain mix-blend-multiply"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-label={alt}
            disablePictureInPicture
          >
            {webm && <source src={webm} type="video/webm" onError={mp4 ? undefined : fallBack} />}
            {mp4 && <source src={mp4} type="video/mp4" onError={fallBack} />}
          </video>
        )}

        {mode === "poster" && poster && (
          <Image
            src={poster}
            alt={alt}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 80vw"
            className="object-contain mix-blend-multiply"
            onError={() => setMode("placeholder")}
          />
        )}

        {mode === "placeholder" && <Silhouette />}
      </div>
    </div>
  );
}

/** Soft, tasteful stand-in until the real character video is added. */
function Silhouette() {
  return (
    <div className="relative flex h-full w-full items-end justify-center" aria-hidden>
      <svg viewBox="0 0 200 440" className="h-full w-auto" fill="none">
        <defs>
          <linearGradient id="hero-silhouette" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.10" />
            <stop offset="100%" stopColor="var(--ink)" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="62" r="34" fill="url(#hero-silhouette)" />
        <path
          d="M100 104c-38 0-62 22-66 58l-10 112c-1 10 6 18 16 18h8l6 136c0 6 5 12 12 12h68c7 0 12-6 12-12l6-136h8c10 0 17-8 16-18l-10-112c-4-36-28-58-66-58Z"
          fill="url(#hero-silhouette)"
        />
      </svg>
      {process.env.NODE_ENV !== "production" && (
        <p className="absolute bottom-[30%] rounded-full bg-surface/80 px-3 py-1 font-mono text-[10px] tracking-wide text-muted uppercase">
          Add public/hero/hero.webm
        </p>
      )}
    </div>
  );
}
