"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  User,
  Sparkles,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Newspaper,
  MessageSquareQuote,
  Mail,
  Settings,
  Palette,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { useEffect } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/theme", label: "Theme & Colors", icon: Palette },
  { href: "/admin/hero", label: "Banner / Hero", icon: Sparkles },
  { href: "/admin/about", label: "About Me", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/contact", label: "Contact Info", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { isAdmin, loading, logout, username } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !isAdmin && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [loading, isAdmin, isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <p className="text-muted">Loading admin panel...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-72 flex-shrink-0 flex-col border-r border-border bg-surface/50 p-6 lg:flex">
        <Link href="/" className="mb-8 text-xl font-bold">
          Robin<span className="text-primary">.</span>{" "}
          <span className="text-sm font-normal text-muted">Admin</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 space-y-3 border-t border-border pt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-sm text-muted transition hover:text-foreground"
          >
            <ExternalLink size={16} /> View Site
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Logged in as {username}</span>
            <button
              onClick={logout}
              className="flex items-center gap-1 text-xs font-semibold text-red-400 transition hover:text-red-300"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-border bg-surface/90 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-bold">Admin Panel</span>
          <button onClick={logout} className="text-xs font-semibold text-red-400">
            Logout
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                pathname === item.href ? "bg-primary text-white" : "bg-white/5 text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 pb-16 pt-20 sm:px-8 lg:pt-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
