"use client";

import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import {
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Newspaper,
  MessageSquareQuote,
  Mail,
  Palette,
} from "lucide-react";

const CARDS = [
  { href: "/admin/theme", label: "Theme & Colors", icon: Palette, desc: "Dark/Light default, brand colors" },
  { href: "/admin/hero", label: "Banner / Hero", icon: Sparkles, desc: "Name, title, intro, socials" },
  { href: "/admin/about", label: "About Me", icon: User, desc: "Bio, photo, stats" },
  { href: "/admin/skills", label: "Skills", icon: Sparkles, desc: "Skill categories & tags" },
  { href: "/admin/experience", label: "Experience", icon: Briefcase, desc: "Work history timeline" },
  { href: "/admin/education", label: "Education", icon: GraduationCap, desc: "Academic background" },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, desc: "Showcase & links" },
  { href: "/admin/blog", label: "Blog Posts", icon: Newspaper, desc: "Write & manage posts" },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote, desc: "Client & colleague reviews" },
  { href: "/admin/contact", label: "Contact Info", icon: Mail, desc: "Email, phone, location" },
];

export default function AdminDashboard() {
  const { content } = useSite();

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome back 👋</h1>
      <p className="mt-2 text-muted">
        Edit any part of your portfolio below. Changes save straight to your server and
        appear on the live site immediately.
      </p>

      {content?.meta?.updatedAt && (
        <p className="mt-2 text-xs text-muted">
          Last updated: {new Date(content.meta.updatedAt).toLocaleString()}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-2xl border border-border bg-surface/60 p-5 transition hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">{c.label}</h3>
                  <p className="text-xs text-muted">{c.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
