"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "bn";
export type Bilingual = { en: string; bn: string };

type LanguageState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (field?: Bilingual | string) => string;
  ui: Record<string, string>;
};

const LanguageContext = createContext<LanguageState | null>(null);

// Static UI strings (buttons, labels) that aren't part of the editable content.
const UI_STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    login: "Login",
    logout: "Logout",
    dashboard: "Dashboard",
    edit: "Edit",
    save: "Save Changes",
    saving: "Saving...",
    saved: "Saved!",
    cancel: "Cancel",
    add: "Add",
    remove: "Remove",
    home: "Home",
    about: "About",
    skills: "Skills",
    education: "Education",
    projects: "Projects",
    experience: "Experience",
    blog: "Blog",
    testimonials: "Testimonials",
    contact: "Contact",
    resume: "Resume",
    readMore: "Read More",
    liveDemo: "Live Demo",
    sourceCode: "Source Code",
    currentlyLearning: "Currently Learning",
  },
  bn: {
    login: "লগইন",
    logout: "লগআউট",
    dashboard: "ড্যাশবোর্ড",
    edit: "এডিট",
    save: "পরিবর্তন সংরক্ষণ করুন",
    saving: "সংরক্ষণ হচ্ছে...",
    saved: "সংরক্ষিত হয়েছে!",
    cancel: "বাতিল",
    add: "যোগ করুন",
    remove: "মুছুন",
    home: "হোম",
    about: "সম্পর্কে",
    skills: "দক্ষতা",
    education: "শিক্ষা",
    projects: "প্রজেক্ট",
    experience: "অভিজ্ঞতা",
    blog: "ব্লগ",
    testimonials: "প্রশংসাপত্র",
    contact: "যোগাযোগ",
    resume: "রিজিউম",
    readMore: "আরও পড়ুন",
    liveDemo: "লাইভ ডেমো",
    sourceCode: "সোর্স কোড",
    currentlyLearning: "বর্তমানে শিখছি",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("site_lang") as Lang | null;
    if (saved === "en" || saved === "bn") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("site_lang", l);
  };

  const toggleLang = () => setLang(lang === "en" ? "bn" : "en");

  const t = (field?: Bilingual | string): string => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field.en || field.bn || "";
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, ui: UI_STRINGS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
