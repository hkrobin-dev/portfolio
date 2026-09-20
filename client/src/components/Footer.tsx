"use client";

import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { content } = useSite();
  const { t } = useLanguage();
  const footer = content?.footer;

  if (!footer) return null;

  const socials = [
    { label: "GitHub", url: footer.socials?.github, icon: Github },
    { label: "LinkedIn", url: footer.socials?.linkedin, icon: Linkedin },
    { label: "Twitter", url: footer.socials?.twitter, icon: Twitter },
  ].filter((s) => s.url);

  return (
    <footer className="relative border-t border-border">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} <span className="font-semibold text-foreground">{footer.name}</span>
            <span className="text-muted">. All rights reserved.</span>
          </p>

          <p className="flex items-center gap-1.5 text-xs text-muted">
            <Heart size={13} className="fill-red-500 text-red-500" />
            {t(footer.tagline)}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${social.label} profile`}
                className="group flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-4 py-2 text-sm text-muted backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <Icon size={17} strokeWidth={1.8} className="transition-transform duration-300 group-hover:scale-110" />
                <span>{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
