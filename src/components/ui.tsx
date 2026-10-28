import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { asset, cn, isExternal } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "gold" | "outline" | "ghost-light" | "white";
  size?: "md" | "lg";
  className?: string;
  icon?: boolean;
};

const buttonStyles = {
  primary: "bg-primary-600 text-white hover:bg-primary-700",
  gold: "bg-gold-400 text-ink hover:bg-gold-300",
  outline: "border border-slate-300 bg-white text-ink hover:border-primary-600 hover:text-primary-700",
  "ghost-light": "border border-white/40 text-white hover:bg-white/10",
  white: "bg-white text-primary-700 hover:bg-primary-50",
};

export function Button({ href, children, variant = "primary", size = "md", className, icon = true }: ButtonProps) {
  const external = isExternal(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98]",
        size === "lg" ? "h-13 px-7 text-base" : "h-11 px-5 text-sm",
        buttonStyles[variant],
        className,
      )}
    >
      {children}
      {icon && <Icon className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </Link>
  );
}

export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 font-semibold text-primary-700 hover:text-primary-800", className)}>
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function Section({ children, className, id, tone = "white" }: { children: React.ReactNode; className?: string; id?: string; tone?: "white" | "surface" | "dark" }) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-20 lg:py-24",
        tone === "surface" && "bg-surface",
        tone === "dark" && "bg-primary-900 text-white",
        className,
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-12",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <p className={cn("eyebrow mb-3", dark && "text-gold-300")}>{eyebrow}</p>}
        <h2 className={cn("text-3xl sm:text-4xl", dark && "text-white")}>{title}</h2>
        {intro && <p className={cn("mt-4 text-lg", dark ? "text-white/70" : "text-slate-600")}>{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
  imagePosition = "center",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  children?: React.ReactNode;
  imagePosition?: string;
}) {
  return (
    <section className="border-b border-slate-100 bg-surface">
      <div className={cn("container-x grid items-center gap-10 py-12 sm:py-16", image && "lg:grid-cols-12 lg:gap-14 lg:py-16")}>
        <div className={cn("animate-fade-up", image ? "lg:col-span-6" : "max-w-3xl")}>
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 lg:col-span-6">
            <Image src={asset(image)} alt="" fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" style={{ objectPosition: imagePosition }} />
          </div>
        )}
      </div>
    </section>
  );
}

export function Badge({ children, tone = "green", className }: { children: React.ReactNode; tone?: "green" | "gold" | "slate" | "white"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tone === "green" && "bg-primary-50 text-primary-700",
        tone === "gold" && "bg-gold-100 text-gold-600",
        tone === "slate" && "bg-slate-100 text-slate-600",
        tone === "white" && "bg-white/90 text-primary-800 backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function CtaBand({
  title = "Ready to ignite your future?",
  text = "Applications for the January 2027 intake are open. Apply online in minutes, or talk to our admissions team.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-primary-600">
      <div className="container-x flex flex-col gap-8 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 text-lg text-white/80">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="https://apply.kcu.ac.ug/" variant="gold" size="lg">
            Apply now
          </Button>
          <Button href="/contact" variant="ghost-light" size="lg" icon={false}>
            Talk to admissions
          </Button>
        </div>
      </div>
    </section>
  );
}
