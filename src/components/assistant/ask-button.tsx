"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { OPEN_EVENT } from "./chat-assistant";

/** Opens the KCU Assistant, optionally asking a question straight away. */
export function AskAssistantButton({ question, children = "Ask the KCU Assistant", variant = "outline", size = "md", className }: { question?: string; children?: React.ReactNode; variant?: "outline" | "primary" | "light"; size?: "md" | "lg"; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: question }))}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition",
        size === "lg" ? "h-13 px-7 text-base" : "h-11 px-5 text-sm",
        variant === "outline" && "border border-slate-300 bg-white text-ink hover:border-ink",
        variant === "primary" && "bg-primary-600 text-white hover:bg-primary-700",
        variant === "light" && "border border-white/40 text-white hover:bg-white/10",
        className,
      )}
    >
      <MessageCircle className="size-4" aria-hidden /> {children}
    </button>
  );
}
