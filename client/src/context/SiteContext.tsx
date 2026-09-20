"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { api } from "@/lib/api";

type SiteState = {
  content: any;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  updateSection: (section: string, value: unknown) => Promise<void>;
};

const SiteContext = createContext<SiteState | null>(null);

// Singleton sections live on the `settings` table; everything else is its
// own Postgres table with a bulk "replace the whole list" endpoint.
const SETTINGS_SECTIONS = new Set(["meta", "theme", "hero", "about", "contact", "footer"]);
const LIST_SECTIONS: Record<string, { get: () => Promise<any>; put: (v: unknown) => Promise<any> }> = {
  skills: { get: api.getSkills, put: api.updateSkills },
  experience: { get: api.getExperience, put: api.updateExperience },
  education: { get: api.getEducation, put: api.updateEducation },
  projects: { get: api.getProjects, put: api.updateProjects },
  blogs: { get: api.getBlogs, put: api.updateBlogs },
  testimonials: { get: api.getTestimonials, put: api.updateTestimonials },
};

export function SiteProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setError(null);
      const [settings, skills, experience, education, projects, blogs, testimonials] = await Promise.all([
        api.getSettings(),
        api.getSkills(),
        api.getExperience(),
        api.getEducation(),
        api.getProjects(),
        api.getBlogs(),
        api.getTestimonials(),
      ]);
      setContent({ ...settings, skills, experience, education, projects, blogs, testimonials });
    } catch (e: any) {
      setError(
        e?.message ||
          "Could not reach the server. Make sure the backend (server folder) is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const updateSection = async (section: string, value: unknown) => {
    if (SETTINGS_SECTIONS.has(section)) {
      const updated = await api.updateSettings(section, value);
      setContent((prev: any) => ({ ...prev, ...updated }));
      return;
    }

    const resource = LIST_SECTIONS[section];
    if (!resource) throw new Error(`Unknown content section "${section}".`);

    const updated = await resource.put(value);
    setContent((prev: any) => ({ ...prev, [section]: updated }));
  };

  return (
    <SiteContext.Provider value={{ content, loading, error, refresh, updateSection }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside SiteProvider");
  return ctx;
}
