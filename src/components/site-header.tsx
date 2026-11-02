"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { portals, site } from "@/content/site";
import { cn, isExternal } from "@/lib/utils";

function NavAnchor({ href, className, children, onClick }: { href: string; className?: string; children: React.ReactNode; onClick?: () => void }) {
  const external = isExternal(href);
  return (
    <Link href={href} className={className} onClick={onClick} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      {external && <ArrowUpRight className="ml-1 inline size-3.5 opacity-50" aria-hidden />}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setActive(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isCurrent = (href: string) => pathname !== "/" && pathname.startsWith(href.split(/[?#]/)[0]);
  const openMenu = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setActive(label);
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActive(null), 120);
  };
  const closeAll = () => {
    setActive(null);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Utility bar — live site gold #ffc66b */}
      <div className="hidden bg-[#ffc66b] text-[0.8125rem] text-black/80 lg:block">
        <div className="container-x flex h-9 items-center justify-between">
          <a href={site.contact.phoneHref} className="flex items-center gap-1.5 font-medium transition-colors hover:text-black">
            <Phone className="size-3.5" aria-hidden /> {site.contact.phone}
          </a>
          <ul className="flex items-center divide-x divide-black/15">
            {portals.slice(0, 3).map((p) => (
              <li key={p.href} className="px-4">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-medium transition-colors hover:text-black">
                  {p.label.replace(" (Student Portal)", " Portal").replace(" (E-learning)", "")}
                </a>
              </li>
            ))}
            <li className="px-4">
              <Link href="/careers" className="font-medium transition-colors hover:text-black">Careers</Link>
            </li>
            <li className="pl-4">
              <Link href="/contact" className="font-medium transition-colors hover:text-black">Contact</Link>
            </li>
          </ul>
        </div>
      </div>

      <header
        className={cn("sticky top-0 z-50 border-b bg-white transition-shadow duration-300", scrolled ? "border-slate-200 shadow-[0_6px_24px_-12px_rgb(15_23_42/0.14)]" : "border-slate-100")}
        onMouseLeave={scheduleClose}
      >
        <div className="container-x flex h-[4.5rem] items-center justify-between gap-8 xl:h-20">
          <Link href="/" className="shrink-0" aria-label="King Ceasor University home" onClick={closeAll}>
            <Image src="/brand/kcu-logo.png" alt="King Ceasor University" width={560} height={211} priority className="h-12 w-auto xl:h-[3.75rem]" />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden h-full xl:block">
            <ul className="flex h-full items-center">
              {mainNav.map((item) => {
                const open = active === item.label;
                return (
                  <li key={item.label} className="flex h-full items-center" onMouseEnter={() => openMenu(item.label)}>
                    <button
                      type="button"
                      onClick={() => setActive(open ? null : item.label)}
                      aria-expanded={open}
                      aria-controls={`mega-${item.label}`}
                      className={cn(
                        "relative flex h-full items-center gap-1 px-3.5 text-[0.9375rem] font-medium transition-colors",
                        open || isCurrent(item.href) ? "text-primary-600" : "text-slate-700 hover:text-primary-600",
                        "after:absolute after:inset-x-3.5 after:bottom-0 after:h-[3px] after:rounded-t-full after:bg-primary-600 after:transition-transform",
                        open || isCurrent(item.href) ? "after:scale-x-100" : "after:scale-x-0",
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn("size-4 opacity-50 transition-transform", open && "rotate-180")} aria-hidden />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center rounded-full bg-primary-600 px-6 text-sm font-semibold text-white transition hover:bg-primary-700 sm:inline-flex"
            >
              Apply now
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="grid size-11 place-items-center rounded-full text-ink hover:bg-slate-50 xl:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>

        {/* Mega menu panels */}
        {mainNav.map((item) => (
          <div
            key={item.label}
            id={`mega-${item.label}`}
            onMouseEnter={() => openMenu(item.label)}
            className={cn(
              "absolute inset-x-0 top-full hidden border-t border-slate-100 bg-white shadow-[0_24px_48px_-24px_rgb(3_32_15/0.25)] xl:block",
              "transition-[opacity,transform] duration-200",
              active === item.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
            )}
          >
            <div className="container-x grid grid-cols-12 gap-10 py-10">
              <div className="col-span-3 border-r border-slate-100 pr-8">
                <p className="heading text-2xl text-ink">{item.label}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-slate-600">{item.intro}</p>
                <Link href={item.href} onClick={closeAll} className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Explore {item.label.toLowerCase()} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
              <div className={cn("grid gap-10", item.feature ? "col-span-5 grid-cols-2" : "col-span-9 grid-cols-3")}>
                {item.columns.map((col) => (
                  <div key={col.title}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{col.title}</p>
                    <ul className="mt-4 space-y-1">
                      {col.links.map((link) => (
                        <li key={link.href}>
                          <NavAnchor href={link.href} onClick={closeAll} className="-mx-3 block rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-ink">
                            {link.label}
                          </NavAnchor>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {item.feature && (
                <Link href={item.feature.href} onClick={closeAll} className="group col-span-4 block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface">
                    <Image src={item.feature.image} alt="" fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-4 font-semibold text-ink">{item.feature.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.feature.text}</p>
                </Link>
              )}
            </div>
          </div>
        ))}
      </header>

      {/* Mobile menu */}
      <div
        className={cn("fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm transition-opacity xl:hidden", mobileOpen ? "opacity-100" : "pointer-events-none opacity-0")}
        onClick={() => setMobileOpen(false)}
        aria-hidden
      />
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!mobileOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 xl:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-[4.5rem] items-center justify-between border-b border-slate-100 px-4">
          <Image src="/brand/kcu-logo.png" alt="" width={560} height={211} className="h-10 w-auto" />
          <button type="button" onClick={() => setMobileOpen(false)} className="grid size-11 place-items-center rounded-full hover:bg-slate-50" aria-label="Close menu">
            <X className="size-6" />
          </button>
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="divide-y divide-slate-100">
            {mainNav.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                  className="flex w-full items-center justify-between px-2 py-4 text-left text-[1.0625rem] font-semibold text-ink"
                  aria-expanded={expanded === item.label}
                >
                  {item.label}
                  <ChevronDown className={cn("size-5 text-slate-400 transition-transform", expanded === item.label && "rotate-180")} />
                </button>
                <div className={cn("grid transition-all duration-300", expanded === item.label ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <ul className="overflow-hidden">
                    <li>
                      <Link href={item.href} onClick={closeAll} className="block px-4 py-2.5 font-medium text-ink">
                        {item.label} overview
                      </Link>
                    </li>
                    {item.columns.flatMap((c) => c.links).map((link) => (
                      <li key={link.href}>
                        <NavAnchor href={link.href} onClick={closeAll} className="block px-4 py-2.5 text-slate-600 hover:text-ink">
                          {link.label}
                        </NavAnchor>
                      </li>
                    ))}
                    <li className="h-3" />
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-slate-100 pt-6">
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Portals</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {portals.map((p) => (
                <li key={p.href}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="block rounded-lg bg-surface px-3 py-3 text-sm font-medium text-slate-700">
                    {p.label.replace(" (Student Portal)", " Portal").replace(" (E-learning)", "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <div className="border-t border-slate-100 p-4">
          <a href={site.applyUrl} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center rounded-full bg-primary-600 font-semibold text-white">
            Apply for {site.currentIntake.name}
          </a>
        </div>
      </div>
    </>
  );
}
