"use client";

import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
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
 * `feather-edges` fades the media's edges so its background melts into --bg
 * (works whatever colour the video background is).
 *
 * The video plays once (muted — browsers block autoplay with sound), then a
 * Replay button appears. The speaker button turns sound on; because that's a
 * click, browsers allow the audio. Reduced motion: no autoplay, just Play.
 */
export function HeroMedia({ webm, mp4, poster, alt }: HeroMediaProps) {
  const reduce = useReducedMotion();
  const initial: Mode = webm || mp4 ? "video" : poster ? "poster" : "placeholder";
  const [mode, setMode] = useState<Mode>(initial);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [muted, setMuted] = useState(true);

  // The server renders autoPlay (it can't know the visitor's setting), so
  // decide here: play once, muted — or stay paused with reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Mirror the element's real state. Autoplay often starts before React is
    // ready, so we also sync once on the next frame instead of trusting events.
    const sync = () => {
      setPlaying(!v.paused && !v.ended);
      if (!v.paused || v.currentTime > 0) setHasPlayed(true);
    };
    const events = ["play", "playing", "pause", "ended"] as const;
    events.forEach((ev) => v.addEventListener(ev, sync));
    // A timer (not requestAnimationFrame) so it also runs in background tabs.
    const timer = setTimeout(sync, 0);

    if (reduce) {
      v.pause();
      v.currentTime = 0;
    } else {
      v.muted = true;
      if (!v.ended) v.play().catch(() => {});
    }

    return () => {
      events.forEach((ev) => v.removeEventListener(ev, sync));
      clearTimeout(timer);
    };
  }, [reduce, mode]);

  const replay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = muted;
    v.play().catch(() => {});
  };

  const toggleSound = () => {
    const v = videoRef.current;
    const next = !muted;
    setMuted(next);
    if (v) v.muted = next;
  };

  const fallBack = () => setMode((m) => (m === "video" && poster ? "poster" : "placeholder"));

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-20 bottom-[38%] flex animate-fade-in justify-center sm:bottom-[30%] md:top-16 md:bottom-0 md:justify-end md:pr-[6vw] lg:pr-[10vw]"
      style={{ animationDelay: "500ms" }}
    >
      <div className="relative aspect-[9/16] h-full max-w-full">
        {mode === "video" && (
          <>
            <video
              ref={videoRef}
              className="feather-edges h-full w-full object-contain"
              autoPlay
              muted
              playsInline
              preload="metadata"
              poster={poster}
              aria-label={alt}
              disablePictureInPicture
            >
              {webm && <source src={webm} type="video/webm" onError={mp4 ? undefined : fallBack} />}
              {mp4 && <source src={mp4} type="video/mp4" onError={fallBack} />}
            </video>

            {/* Controls — outside the feathered video so they stay crisp */}
            {/* Phones: top-right corner (always empty background, never hits the text
                below whatever the screen height). Desktop: lower-left corner. */}
            <div className="pointer-events-auto absolute top-[2%] right-0 flex flex-col items-center gap-2 md:top-auto md:right-auto md:bottom-[3%] md:left-[4%] md:flex-row">
              {!playing && (
                <button
                  type="button"
                  onClick={replay}
                  className="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-surface shadow-soft transition-colors hover:bg-ink/85 md:w-auto md:px-4"
                >
                  {hasPlayed ? <RotateCcw size={15} aria-hidden /> : <Play size={15} aria-hidden />}
                  {/* Icon-only on phones (narrow video); label from md up */}
                  <span className="sr-only md:not-sr-only">{hasPlayed ? "Replay" : "Play"}</span>
                </button>
              )}
              <button
                type="button"
                onClick={toggleSound}
                aria-pressed={!muted}
                aria-label={muted ? "Turn sound on" : "Turn sound off"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-surface/80 text-ink shadow-soft backdrop-blur-md transition-colors hover:border-ink/40"
              >
                {muted ? <VolumeX size={16} aria-hidden /> : <Volume2 size={16} aria-hidden />}
              </button>
            </div>
          </>
        )}

        {mode === "poster" && poster && (
          <Image
            src={poster}
            alt={alt}
            fill
            priority
            sizes="(min-width: 768px) 40vw, 80vw"
            className="feather-edges object-contain"
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
