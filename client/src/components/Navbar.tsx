"use client";

import { useState } from "react";
import Link from "next/link";
import { Sun, Moon, Monitor, Menu, X, LogIn, LayoutDashboard, LogOut, Languages } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSite } from "@/context/SiteContext";
import LoginModal from "@/components/LoginModal";

const BASE_LINK_KEYS: { key: string; href: string }[] = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "experience", href: "#experience" },
  { key: "blog", href: "#blog" },
  { key: "contact", href: "#contact" },
];

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const { modePref, mode, cycleMode } = useTheme();
  const { lang, toggleLang, ui } = useLanguage();
  const { content } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const resumeUrl = content?.hero?.resumeUrl || "/FullStack-Hasan-Kabir-Robin.pdf";

  const LINK_KEYS =
    content?.testimonials?.length > 0
      ? [...BASE_LINK_KEYS.slice(0, 6), { key: "testimonials", href: "#testimonials" }, ...BASE_LINK_KEYS.slice(6)]
      : BASE_LINK_KEYS;

  return (
    <>
      <nav className="fixed left-0 right-0 top-4 z-50 px-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-border bg-background/80 px-5 py-3 shadow-lg backdrop-blur-xl">
          <Link href="#hero" className="font-display text-xl font-bold text-foreground">
            Robin<span className="text-primary">.</span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {LINK_KEYS.map((link, index) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm font-semibold transition ${
                  index === 0
                    ? "rounded-xl border border-primary/40 bg-primary/10 px-3 py-1.5 text-primary"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {ui[link.key]}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              aria-label="Toggle language"
              className="flex items-center gap-1 rounded-xl border border-border px-2.5 py-2 text-xs font-bold text-muted transition hover:border-primary hover:text-foreground"
            >
              <Languages size={15} />
              {lang === "en" ? "EN" : "বাং"}
            </button>

            {/* Theme toggle: cycles Dark -> Light -> System (device default) */}
            <button
              onClick={cycleMode}
              aria-label="Toggle theme"
              title={`Theme: ${modePref === "system" ? "Device default" : modePref}`}
              className="rounded-xl border border-border p-2 text-muted transition hover:border-primary hover:text-foreground"
            >
              {modePref === "system" ? <Monitor size={16} /> : mode === "dark" ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Resume - desktop only */}
            <Link
              href={resumeUrl}
              target="_blank"
              className="hidden text-sm font-semibold text-primary transition hover:opacity-80 md:inline-block"
            >
              {ui.resume}
            </Link>

            {/* Auth */}
            {isAdmin ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-primary to-secondary px-3 py-2 text-xs font-semibold text-white shadow"
                >
                  <LayoutDashboard size={14} /> {ui.dashboard}
                </Link>
                <button
                  onClick={logout}
                  aria-label="Logout"
                  className="rounded-xl border border-border p-2 text-muted transition hover:border-red-400 hover:text-red-400"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="hidden items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted transition hover:border-primary hover:text-foreground sm:flex"
              >
                <LogIn size={14} /> {ui.login}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="rounded-xl border border-border p-2 text-foreground lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur-xl lg:hidden">
            {LINK_KEYS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-white/5 hover:text-foreground"
              >
                {ui[link.key]}
              </Link>
            ))}
            <Link
              href={resumeUrl}
              target="_blank"
              className="rounded-xl px-3 py-2.5 text-sm font-semibold text-primary"
            >
              {ui.resume}
            </Link>
            {isAdmin ? (
              <div className="mt-2 flex gap-2 border-t border-border pt-3">
                <Link
                  href="/admin"
                  className="flex-1 rounded-xl bg-gradient-to-r from-primary to-secondary px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  {ui.dashboard}
                </Link>
                <button
                  onClick={logout}
                  className="rounded-xl border border-red-400/40 px-4 py-2 text-sm font-semibold text-red-400"
                >
                  {ui.logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setLoginOpen(true);
                }}
                className="mt-2 rounded-xl border border-border px-3 py-2.5 text-left text-sm font-semibold text-muted"
              >
                {ui.login}
              </button>
            )}
          </div>
        )}
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
