"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, MessageCircle, RotateCcw, Send, Sparkles, X } from "lucide-react";
import { whatsappLink } from "@/content/site";
import type { SearchItem } from "@/content/search";
import { cn, isExternal } from "@/lib/utils";
import { BrandIcon } from "../social-icons";
import { respond, welcome, type Flow, type Reply } from "./brain";

type Message = { id: number; from: "bot" | "user"; reply: Reply };

/** Fire this from anywhere (e.g. an "Ask the assistant" button) to open the chat, optionally with a question. */
export const OPEN_EVENT = "kcu:open-assistant";

/**
 * The one floating "Ask KCU" button (WhatsApp is offered inside the panel). The assistant answers from the website's content and can walk
 * an applicant through choosing a programme and preparing an application.
 */
export function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", reply: welcome }]);
  const [flow, setFlow] = useState<Flow | null>(null);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const index = useRef<SearchItem[] | null>(null);
  const nextId = useRef(1);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const flowRef = useRef(flow);
  useEffect(() => {
    flowRef.current = flow;
  }, [flow]);

  const loadIndex = () => {
    if (index.current) return;
    fetch("/search-index.json")
      .then((r) => r.json())
      .then((d: SearchItem[]) => (index.current = d))
      .catch(() => {});
  };

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setInput("");
    setMessages((m) => [...m, { id: nextId.current++, from: "user", reply: { text: clean } }]);
    setTyping(true);
    const { reply, flow: next } = respond(clean, flowRef.current, { index: index.current });
    // A short pause reads as the assistant "thinking" rather than a canned instant reply.
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "bot", reply }]);
      setFlow(next);
      setTyping(false);
    }, 450 + Math.min(900, reply.text.length * 3));
  };
  const sendRef = useRef(send);
  useEffect(() => {
    sendRef.current = send;
  });

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      loadIndex();
      const q = (e as CustomEvent<string | undefined>).detail;
      if (q) window.setTimeout(() => sendRef.current(q), 250);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    field.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = () => {
    setOpen((o) => !o);
    loadIndex();
  };

  const reset = () => {
    setMessages([{ id: nextId.current++, from: "bot", reply: welcome }]);
    setFlow(null);
  };

  const lastBot = [...messages].reverse().find((m) => m.from === "bot");

  return (
    <div className="pointer-events-none fixed bottom-24 right-4 z-50 print:hidden flex flex-col items-end gap-3 sm:right-6 lg:bottom-6">
      {open && (
        <section
          role="dialog"
          aria-label="KCU Assistant"
          className="pointer-events-auto fixed inset-0 z-[60] flex h-dvh w-full flex-col overflow-hidden bg-white sm:static sm:h-[min(38rem,calc(100dvh-8.5rem))] sm:w-[24.5rem] sm:origin-bottom-right sm:animate-fade-up sm:rounded-2xl sm:shadow-2xl sm:ring-1 sm:ring-slate-200"
        >
          <header className="flex items-center gap-3 bg-primary-900 px-4 py-3.5 pt-[max(0.875rem,env(safe-area-inset-top))] text-white">
            <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-gold-400 text-ink">
              <Sparkles className="size-5" aria-hidden />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-400 ring-2 ring-primary-900" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold leading-tight">KCU Assistant</p>
              <p className="truncate text-xs text-white/65">Answers from kcu.ac.ug · usually instant</p>
            </div>
            <button type="button" onClick={reset} className="grid size-9 place-items-center rounded-full text-white/75 hover:bg-white/10 hover:text-white" aria-label="Start a new conversation">
              <RotateCcw className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full text-white/75 hover:bg-white/10 hover:text-white" aria-label="Close assistant">
              <X className="size-5" aria-hidden />
            </button>
          </header>

          <div ref={scroller} className="flex-1 space-y-4 overflow-y-auto bg-surface px-4 py-5" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[88%] rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed",
                    m.from === "user" ? "rounded-br-md bg-primary-600 text-white" : "rounded-bl-md bg-white text-ink shadow-card ring-1 ring-slate-100",
                  )}
                >
                  <RichText text={m.reply.text} />
                  {m.reply.links && m.reply.links.length > 0 && (
                    <ul className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
                      {m.reply.links.map((l) => (
                        <li key={l.href + l.label}>
                          <ChatAnchor href={l.href} className="inline-flex items-center gap-1 font-semibold text-primary-700 underline-offset-4 hover:underline" onNavigate={() => setOpen(false)}>
                            {l.label}
                            {isExternal(l.href) ? <ArrowUpRight className="size-3.5 shrink-0" aria-hidden /> : <ArrowRight className="size-3.5 shrink-0" aria-hidden />}
                          </ChatAnchor>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex">
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-4 shadow-card ring-1 ring-slate-100" aria-label="Assistant is typing">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${i * 150}ms` }} />
                  ))}
                </div>
              </div>
            )}
            {!typing && lastBot?.reply.chips && (
              <div className="flex flex-wrap gap-2 pt-1">
                {lastBot.reply.chips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => send(c)}
                    className="rounded-full border border-primary-600/30 bg-white px-3.5 py-2 text-left text-sm font-medium text-primary-700 transition hover:border-primary-600 hover:bg-primary-600 hover:text-white"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
          >
            <label className="sr-only" htmlFor="assistant-input">Ask a question</label>
            <input
              id="assistant-input"
              ref={field}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fees, courses, intakes…"
              autoComplete="off"
              className="h-11 min-w-0 flex-1 rounded-full bg-surface px-4 text-[0.9375rem] outline-none ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-primary-600"
            />
            <button type="submit" disabled={!input.trim() || typing} className="grid size-11 shrink-0 place-items-center rounded-full bg-primary-600 text-white transition hover:bg-primary-700 disabled:opacity-40" aria-label="Send">
              <Send className="size-4" aria-hidden />
            </button>
          </form>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#e7f8ee] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] text-center text-sm font-semibold text-[#0b7a3a] hover:bg-[#d4f3e0]">
            <BrandIcon name="whatsapp" className="size-4" /> Prefer a person? Chat with admissions on WhatsApp
          </a>
        </section>
      )}

      <div className={cn("pointer-events-auto flex items-center gap-3", open && "max-sm:hidden")}>
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-label={open ? "Close KCU Assistant" : "Open KCU Assistant"}
          className="group flex h-12 items-center gap-2 rounded-full bg-primary-600 pl-4 pr-5 font-semibold text-white shadow-lift transition hover:bg-primary-700 sm:h-14"
        >
          {open ? <X className="size-5" aria-hidden /> : <MessageCircle className="size-5" aria-hidden />}
          <span className="text-sm sm:text-base">{open ? "Close" : "Ask KCU"}</span>
        </button>
      </div>
    </div>
  );
}

function ChatAnchor({ href, className, children, onNavigate }: { href: string; className?: string; children: React.ReactNode; onNavigate?: () => void }) {
  if (isExternal(href))
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

/** Renders the assistant's light markup: **bold**, [label](href) and "- " bullet lines. */
function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((block, bi) => {
        const lines = block.split("\n");
        const bullets = lines.filter((l) => l.startsWith("- "));
        const intro = lines.filter((l) => !l.startsWith("- "));
        return (
          <div key={bi} className={bi > 0 ? "mt-2.5" : undefined}>
            {intro.map((l, i) => (
              <p key={i}>
                <Inline text={l} />
              </p>
            ))}
            {bullets.length > 0 && (
              <ul className={cn("space-y-1", intro.length > 0 && "mt-1.5")}>
                {bullets.map((l, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-current opacity-50" aria-hidden />
                    <span>
                      <Inline text={l.slice(2)} />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </>
  );
}

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i} className="font-semibold">{bold[1]}</strong>;
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link)
          return (
            <ChatAnchor key={i} href={link[2]} className="font-medium underline underline-offset-2">
              {link[1]}
            </ChatAnchor>
          );
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
