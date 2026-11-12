"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/** One rendition of the loop: an H.264 MP4 every browser can play, and an optional, smaller AV1 MP4. */
export type HeroRendition = { h264: string; av1?: string; width: number; height: number };

const PREF_KEY = "kcu-hero-motion";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** Picks the rendition for this screen: a portrait cut for phone-shaped heroes, then by real (device) pixels needed. */
function pickRendition(r: { large: HeroRendition; medium: HeroRendition; portrait: HeroRendition }, slow: boolean) {
  const w = window.innerWidth;
  if (w < 768 && window.innerHeight > w) return r.portrait;
  const devicePixels = w * Math.min(window.devicePixelRatio || 1, 2);
  return !slow && devicePixels > 1500 ? r.large : r.medium;
}

/** Uses AV1 only where the device says it can decode it smoothly and power-efficiently (hardware); otherwise H.264. */
async function pickSource(r: HeroRendition) {
  if (!r.av1 || !navigator.mediaCapabilities?.decodingInfo) return r.h264;
  try {
    const info = await navigator.mediaCapabilities.decodingInfo({
      type: "file",
      video: { contentType: 'video/mp4; codecs="av01.0.08M.08"', width: r.width, height: r.height, bitrate: 1_500_000, framerate: 30 },
    });
    return info.supported && info.smooth && info.powerEfficient ? r.av1 : r.h264;
  } catch {
    return r.h264;
  }
}

/**
 * Background video for the homepage hero, built to load fast and play in every browser:
 * - The poster image renders first (it is the LCP image) and stays underneath as the fallback.
 * - The video is attached only after the page has loaded and the browser is idle.
 * - Each screen gets the right file: portrait for phones, 1280px or 1920px for wider screens.
 * - H.264 MP4 plays everywhere with hardware decoding; AV1 is used only where it decodes smoothly.
 * - If the browser blocks autoplay (iPhone Low Power Mode, "reduce motion", Data Saver, 2G), the poster stays and a
 *   play button lets the visitor start it. It pauses off-screen and in hidden tabs, and has a pause button (WCAG 2.2.2).
 */
export function HeroVideo({ poster, alt, large, medium, portrait, className }: { poster: string; alt: string; large: HeroRendition; medium: HeroRendition; portrait: HeroRendition; className?: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  // Decide after load which file this visitor gets, and whether it may start on its own.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const type = conn?.effectiveType ?? "4g";
    const noAutoplay = window.matchMedia("(prefers-reduced-motion: reduce)").matches || conn?.saveData || type.endsWith("2g");

    let stored: string | null = null;
    try {
      stored = localStorage.getItem(PREF_KEY);
    } catch {}

    let idle = 0;
    let cancelled = false;
    const attach = () => {
      const run = async () => {
        const file = await pickSource(pickRendition({ large, medium, portrait }, type === "3g"));
        if (cancelled) return;
        // Without autoplay we still offer the video, paused, behind a play button.
        if (noAutoplay || stored === "paused") setPaused(true);
        setSrc(file);
      };
      idle = "requestIdleCallback" in window ? window.requestIdleCallback(() => void run(), { timeout: 2000 }) : Number(setTimeout(() => void run(), 300));
    };
    if (document.readyState === "complete") attach();
    else window.addEventListener("load", attach, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", attach);
      if ("cancelIdleCallback" in window) window.cancelIdleCallback(idle);
      else clearTimeout(idle);
    };
  }, [large, medium, portrait]);

  // Play only while on screen and the tab is visible. If the browser refuses to autoplay, fall back to the play button.
  useEffect(() => {
    const v = video.current;
    if (!v || !src) return;
    // React sets `muted` as a property only; Safari's autoplay rules also check the attribute.
    v.muted = true;
    v.setAttribute("muted", "");
    let onScreen = true;
    const sync = () => {
      if (paused || !onScreen || document.hidden) v.pause();
      else v.play().catch(() => setPaused(true));
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
            src={src}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden
            tabIndex={-1}
            onPlaying={() => setVisible(true)}
            onError={() => {
              // An AV1 file the device turned out not to handle: retry with H.264, otherwise keep the poster.
              const fallback = [large, medium, portrait].find((r) => r.av1 === src)?.h264;
              if (fallback) setSrc(fallback);
              else setSrc(null);
            }}
            className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-1000", visible ? "opacity-100" : "opacity-0")}
          />
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
