"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryImage } from "@/content/gallery";
import { asset, cn } from "@/lib/utils";

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const albums = ["All", ...Array.from(new Set(images.map((i) => i.album)))];
  const [album, setAlbum] = useState("All");
  const [index, setIndex] = useState<number | null>(null);
  const list = album === "All" ? images : images.filter((i) => i.album === album);

  const step = useCallback((dir: number) => setIndex((i) => (i === null ? i : (i + dir + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, step]);

  const current = index === null ? null : list[index];

  return (
    <div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="group" aria-label="Filter by album">
        {albums.map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={album === a}
            onClick={() => setAlbum(a)}
            className={cn(
              "h-10 shrink-0 rounded-full px-5 text-sm font-medium transition",
              album === a ? "bg-primary-600 text-white" : "bg-surface text-slate-600 hover:bg-slate-100 hover:text-primary-700",
            )}
          >
            {a}
          </button>
        ))}
      </div>

      <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {list.map((img, i) => (
          <li key={img.image} className="mb-4 break-inside-avoid">
            <button type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-2xl bg-surface text-left">
              <Image
                src={asset(img.image)}
                alt={img.title}
                width={800}
                height={i % 3 === 0 ? 1000 : 600}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary-950/85 via-transparent to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-300">{img.album}</span>
                <span className="mt-1 font-semibold text-white">{img.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur" role="dialog" aria-modal="true" aria-label={current.title}>
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-sm text-white/60">{(index ?? 0) + 1} / {list.length}</span>
            <button type="button" onClick={() => setIndex(null)} className="grid size-11 place-items-center rounded-full hover:bg-white/10" aria-label="Close">
              <X className="size-6" />
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={asset(current.image)} alt={current.title} fill sizes="100vw" className="object-contain" />
            <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6" aria-label="Previous image">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6" aria-label="Next image">
              <ChevronRight className="size-6" />
            </button>
          </div>
          <div className="mx-auto max-w-3xl p-6 text-center">
            <p className="font-semibold text-white">{current.title}</p>
            <p className="mt-1 text-sm text-white/70">{current.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
