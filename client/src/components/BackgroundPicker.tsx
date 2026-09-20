"use client";

import { useState } from "react";
import { Palette, Check, X } from "lucide-react";
import { useBackground, BG_OPTIONS } from "@/context/BackgroundContext";

const PREVIEW_CLASS: Record<string, string> = {
  aurora: "bg-gradient-to-br from-primary/60 via-secondary/40 to-accent/40",
  stars: "bg-gradient-to-br from-slate-800 to-slate-950",
  grid: "bg-[linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[length:8px_8px] bg-surface",
  dots: "bg-[radial-gradient(rgba(255,255,255,0.35)_1.5px,transparent_1.5px)] bg-[length:8px_8px] bg-surface",
  none: "bg-surface",
};

export default function BackgroundPicker() {
  const { bgStyle, setBgStyle } = useBackground();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-64 rounded-2xl border border-border bg-surface/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Background</p>
            <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
              <X size={14} />
            </button>
          </div>
          <p className="mb-3 text-xs text-muted">
            Just for you — this only changes what you see in your own browser.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {BG_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setBgStyle(opt.id)}
                className="group flex flex-col items-center gap-1.5"
                title={opt.label}
              >
                <span
                  className={`relative flex h-12 w-full items-center justify-center rounded-xl border transition ${
                    bgStyle === opt.id ? "border-primary ring-2 ring-primary/40" : "border-border"
                  } ${PREVIEW_CLASS[opt.id]}`}
                >
                  {bgStyle === opt.id && (
                    <Check size={14} className="rounded-full bg-primary p-0.5 text-white" />
                  )}
                </span>
                <span className="text-[10px] text-muted group-hover:text-foreground">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change background"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-xl transition hover:scale-110"
      >
        <Palette size={20} />
      </button>
    </div>
  );
}
