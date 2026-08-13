"use client";

import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    url: "https://github.com/hkrobin-dev/",
    icon: Github,
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/hk-robin/",
    icon: Linkedin,
  },
  {
    label: "Twitter",
    url: "https://x.com/HkRobin8",
    icon: Twitter,
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-gradient-to-b from-background to-slate-950/80">
      {/* Subtle Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        {/* Branding / Copyright */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">Hasan Kabir Robin</span>
            <span className="text-gray-500">. All rights reserved.</span>
          </p>

          <p className="flex items-center gap-1.5 text-xs text-gray-500">
            Built with
            <Heart
              size={13}
              className="fill-red-500 text-red-500"
            />
            using Next.js & Tailwind CSS
          </p>
        </div>

        {/* Social Links */}
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
                className="
                  group
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-2
                  text-sm
                  text-gray-400
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/40
                  hover:bg-cyan-400/5
                  hover:text-cyan-400
                  hover:shadow-[0_8px_30px_rgba(34,211,238,0.12)]
                "
              >
                <Icon
                  size={17}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>{social.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}