"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { campusTour } from "@/content/campus";
import { cn } from "@/lib/utils";

/**
 * The aerial campus film behind a poster. The video file is large, so nothing is downloaded
 * until the visitor presses play (preload="none").
 */
export function CampusTour({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  return (
    <div className={cn("relative aspect-video overflow-hidden rounded-2xl bg-primary-950 shadow-lift", className)}>
      <video
        ref={video}
        poster={campusTour.poster}
        preload="none"
        controls={playing}
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        onEnded={() => setPlaying(false)}
        aria-label={campusTour.title}
      >
        {campusTour.sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
      {!playing && (
        <button
          type="button"
          onClick={() => {
            setPlaying(true);
            video.current?.play();
          }}
          className="group absolute inset-0 grid place-items-center text-left"
        >
          <Image src={campusTour.poster} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-primary-950/85 via-primary-950/20 to-transparent" />
          <span className="relative grid size-20 place-items-center rounded-full bg-gold-400 text-ink shadow-lift ring-8 ring-white/20 transition group-hover:scale-110 group-hover:bg-gold-300 sm:size-24">
            <Play className="ml-1 size-8 fill-current sm:size-9" aria-hidden />
          </span>
          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
            <span>
              <span className="block font-semibold text-white sm:text-lg">{campusTour.title}</span>
              <span className="block text-sm text-white/75">{campusTour.caption}</span>
            </span>
            <span className="shrink-0 rounded-full bg-black/40 px-3 py-1 text-sm font-medium tabular-nums text-white backdrop-blur">{campusTour.duration}</span>
          </span>
          <span className="sr-only">Play video</span>
        </button>
      )}
    </div>
  );
}
