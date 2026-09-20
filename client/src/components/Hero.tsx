"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";
import { toast } from "sonner";
import { FaGithub, FaLinkedin, FaFacebook, FaTwitter } from "react-icons/fa";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import EditFab from "@/components/EditFab";

export default function Hero() {
  const { content } = useSite();
  const { t } = useLanguage();
  const hero = content?.hero;

  const copyEmail = async () => {
    if (!hero?.email) return;
    await navigator.clipboard.writeText(hero.email);
    toast.success("Email copied!");
  };

  if (!hero) return <section id="hero" className="min-h-screen" />;

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 text-foreground"
    >
      <EditFab href="/admin/hero" className="right-4 top-24 sm:right-8 sm:top-28" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center"
      >
        <p className="mb-4 text-lg text-muted">{t(hero.greeting)}</p>

        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
          {hero.name}
        </h1>

        <div className="mt-6">
          <span className="rounded-full bg-gradient-to-r from-secondary to-primary px-6 py-2 text-sm font-semibold text-white shadow-lg">
            {t(hero.role)}
          </span>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted md:text-xl">
          {t(hero.description)}
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="#contact"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-secondary to-primary px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105"
          >
            Let's Connect
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>

          {hero.email && (
            <button
              onClick={copyEmail}
              className="flex items-center gap-2 rounded-xl border border-border px-6 py-4 text-muted transition hover:border-primary hover:text-foreground"
            >
              {hero.email}
              <Copy size={16} />
            </button>
          )}
        </div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          {hero.socials?.github && (
            <Link
              href={hero.socials.github}
              target="_blank"
              className="group rounded-full border border-border bg-foreground/5 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:bg-primary"
            >
              <FaGithub size={22} className="text-muted group-hover:text-white" />
            </Link>
          )}
          {hero.socials?.linkedin && (
            <Link
              href={hero.socials.linkedin}
              target="_blank"
              className="group rounded-full border border-border bg-foreground/5 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:bg-green-600"
            >
              <FaLinkedin size={22} className="text-muted group-hover:text-white" />
            </Link>
          )}
          {hero.socials?.facebook && (
            <Link
              href={hero.socials.facebook}
              target="_blank"
              className="group rounded-full border border-border bg-foreground/5 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-blue-500"
            >
              <FaFacebook size={22} className="text-muted group-hover:text-white" />
            </Link>
          )}
          {hero.socials?.twitter && (
            <Link
              href={hero.socials.twitter}
              target="_blank"
              className="group rounded-full border border-border bg-foreground/5 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-sky-500 hover:bg-sky-500"
            >
              <FaTwitter size={22} className="text-muted group-hover:text-white" />
            </Link>
          )}

          {hero.resumeUrl && (
            <Link
              href={hero.resumeUrl}
              target="_blank"
              className="rounded-xl border border-primary/40 px-6 py-3 font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white"
            >
              Download Resume
            </Link>
          )}
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {(hero.techStack || []).map((tech: string) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-foreground/5 px-4 py-2 text-sm text-muted backdrop-blur-sm transition hover:border-primary hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
