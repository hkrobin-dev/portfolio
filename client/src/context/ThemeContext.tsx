"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { useSite } from "./SiteContext";

export type ModePref = "dark" | "light" | "system";
type ResolvedMode = "dark" | "light";

type ThemeState = {
  modePref: ModePref;
  mode: ResolvedMode; // the actually-applied mode after resolving "system"
  setModePref: (m: ModePref) => void;
  cycleMode: () => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

const DEFAULT_COLORS = {
  primary: "#f97316",
  secondary: "#ef4444",
  accent: "#f59e0b",
  backgroundDark: "#090909",
  surfaceDark: "#111827",
  textDark: "#f5f5f5",
  backgroundLight: "#ffffff",
  surfaceLight: "#f3f4f6",
  textLight: "#111111",
};

function getSystemPref(): ResolvedMode {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { content } = useSite();
  const [modePref, setModePrefState] = useState<ModePref>("system");
  const [systemMode, setSystemMode] = useState<ResolvedMode>("dark");
  const [ready, setReady] = useState(false);

  // Initial preference: saved choice > site default > "system"
  useEffect(() => {
    const saved = window.localStorage.getItem("site_theme_mode") as ModePref | null;
    setSystemMode(getSystemPref());

    if (saved === "dark" || saved === "light" || saved === "system") {
      setModePrefState(saved);
    } else if (content?.theme?.defaultMode) {
      setModePrefState(content.theme.defaultMode);
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.theme?.defaultMode]);

  // Keep in sync with OS-level changes while "system" is selected.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => setSystemMode(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setModePref = useCallback((m: ModePref) => {
    setModePrefState(m);
    window.localStorage.setItem("site_theme_mode", m);
  }, []);

  const cycleMode = useCallback(() => {
    setModePref(modePref === "dark" ? "light" : modePref === "light" ? "system" : "dark");
  }, [modePref, setModePref]);

  const mode: ResolvedMode = modePref === "system" ? systemMode : modePref;

  // Apply CSS variables + light/dark class to <html>
  useEffect(() => {
    if (!ready) return;
    const colors = { ...DEFAULT_COLORS, ...(content?.theme?.colors || {}) };
    const root = document.documentElement;

    root.classList.remove("dark", "light");
    root.classList.add(mode);

    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty(
      "--color-background",
      mode === "dark" ? colors.backgroundDark : colors.backgroundLight
    );
    root.style.setProperty(
      "--color-surface",
      mode === "dark" ? colors.surfaceDark : colors.surfaceLight
    );
    root.style.setProperty("--color-text", mode === "dark" ? colors.textDark : colors.textLight);
  }, [mode, content?.theme?.colors, ready]);

  return (
    <ThemeContext.Provider value={{ modePref, mode, setModePref, cycleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
