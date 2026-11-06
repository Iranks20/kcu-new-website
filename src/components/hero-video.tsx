"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Sources = { webm: string; mp4: string };

const PREF_KEY = "kcu-hero-motion";

/**
 * Background video for the homepage hero, built so it never slows the page down:
 * - The poster image renders first (it is the LCP image) and stays as the fallback.
 * - The video is attached only after the page has loaded and the browser is idle.
 * - It is skipped for "reduce motion", Data Saver and 2G, so those visitors just see the poster.
 * - Phones and 3G connections get the light 480p file; larger screens on fast connections get 720p. WebM (VP9) first, MP4 (H.264) for Safari.
 * - It pauses when scrolled out of view or the tab is hidden, and has a pause button (WCAG 2.2.2).
 */
export function HeroVideo({ poster, alt, desktop, mobile, className }: { poster: string; alt: string; desktop: Sources; mobile: Sources; className?: string }) {
  const [src, setSrc] = useState<Sources | null>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  // Decide after load whether this visitor should get motion at all, and which file size.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const type = conn?.effectiveType ?? "4g";
    if (reduce || conn?.saveData || type.endsWith("2g")) return;
    // On 3G even large screens get the light 480p file (about 1.3 MB).
    const light = type === "3g";

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(PREF_KEY);
    } catch {}

    let idle = 0;
    const attach = () => {
      const run = () => {
        if (stored === "paused") setPaused(true);
        setSrc(!light && window.matchMedia("(min-width: 768px)").matches ? desktop : mobile);
      };
      idle = "requestIdleCallback" in window ? window.requestIdleCallback(run, { timeout: 2000 }) : Number(setTimeout(run, 300));
    };
    if (document.readyState === "complete") attach();
    else window.addEventListener("load", attach, { once: true });
    return () => {
      window.removeEventListener("load", attach);
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [desktop, mobile]);

  // Only play while the hero is on screen and the tab is visible, to save battery and data.
  useEffect(() => {
    const v = video.current;
    if (!v || !src) return;
    let onScreen = true;
    const sync = () => {
      if (paused || !onScreen || document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    if (wrap.current) io.observe(wrap.current);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [src, paused]);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem(PREF_KEY, next ? "paused" : "playing");
    } catch {}
  };

  return (
    <>
    <div ref={wrap} className={cn("absolute inset-0 -z-10", className)}>
      <Image src={poster} alt={alt} fill priority sizes="100vw" className="object-cover" />
      {src && (
        <video
          ref={video}
          muted
          loop
          playsInline
          autoPlay={!paused}
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setVisible(true)}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-1000", visible ? "opacity-100" : "opacity-0")}
        >
          <source src={src.webm} type="video/webm" />
          <source src={src.mp4} type="video/mp4" />
        </video>
      )}
    </div>
      {/* Outside the background layer so the hero overlay never covers it. */}
      {src && (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-black/40 text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-black/60 sm:right-6 sm:top-6"
        >
          {paused ? <Play className="ml-0.5 size-4 fill-current" aria-hidden /> : <Pause className="size-4 fill-current" aria-hidden />}
        </button>
      )}
    </>
  );
}
