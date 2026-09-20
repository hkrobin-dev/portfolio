"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type BgStyle = "none" | "aurora" | "grid" | "dots" | "stars";

type BackgroundState = {
  bgStyle: BgStyle;
  setBgStyle: (s: BgStyle) => void;
};

const BackgroundContext = createContext<BackgroundState | null>(null);

export const BG_OPTIONS: { id: BgStyle; label: string }[] = [
  { id: "aurora", label: "Aurora Glow" },
  { id: "stars", label: "Starfield" },
  { id: "grid", label: "Grid Lines" },
  { id: "dots", label: "Dot Pattern" },
  { id: "none", label: "Plain" },
];

// Purely a personal visual preference for whoever is browsing — kept in
// this browser only (localStorage), never sent to the server, so every
// visitor can pick whatever background they like without affecting anyone
// else or the site owner's saved content.
export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [bgStyle, setBgStyleState] = useState<BgStyle>("aurora");

  useEffect(() => {
    const saved = window.localStorage.getItem("site_bg_style") as BgStyle | null;
    if (saved) setBgStyleState(saved);
  }, []);

  const setBgStyle = (s: BgStyle) => {
    setBgStyleState(s);
    window.localStorage.setItem("site_bg_style", s);
  };

  return <BackgroundContext.Provider value={{ bgStyle, setBgStyle }}>{children}</BackgroundContext.Provider>;
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error("useBackground must be used inside BackgroundProvider");
  return ctx;
}
