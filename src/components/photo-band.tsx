import Image from "next/image";
import { Highlighted } from "./ui";
import { asset, cn } from "@/lib/utils";

/**
 * Full-width photograph with an overlapping white panel (benchmark: ASU "Carve your path").
 * Used two or three times per key page so photography, not boxes, carries the layout.
 */
export function PhotoBand({
  image,
  alt,
  eyebrow,
  title,
  highlight,
  text,
  children,
  align = "left",
  position = "center",
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  highlight?: string;
  text: string;
  children?: React.ReactNode;
  align?: "left" | "right";
  position?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900">
      <Image src={asset(image)} alt={alt} fill sizes="100vw" className="-z-10 object-cover" style={{ objectPosition: position }} />
      <div className={cn("container-x flex py-16 sm:py-24", align === "right" && "justify-end")}>
        <div className="max-w-xl bg-white p-8 shadow-lift sm:p-10">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h2 className="text-3xl sm:text-4xl">
            <Highlighted text={title} highlight={highlight} />
          </h2>
          <p className="mt-4 text-lg text-slate-600">{text}</p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
