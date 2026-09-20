"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import EditFab from "@/components/EditFab";

export default function Blog() {
  const { content } = useSite();
  const { t, ui } = useLanguage();
  const blogs = content?.blogs || [];

  return (
    <section
      id="blog"
      className="relative px-6 py-24"
    >
      <EditFab href="/admin/blog" />
      <div className="mx-auto max-w-content">
        <div className="text-center">
          <div className="mx-auto max-w-7xl text-center mb-8">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary items-center">
              {ui.blog}
            </span>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary via-amber-500 to-red-500 bg-clip-text text-transparent">
            Latest Blogs.
          </h2>

          <p className="mt-3 text-lg text-muted">
            Sharing my thoughts, learning and experiences.
          </p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-primary" />
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post: any) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group flex flex-col rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {post.date}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold leading-snug transition-colors group-hover:text-primary">
                {t(post.title)}
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted line-clamp-3">
                {t(post.description)}
              </p>

              <Link
                href={`/blog/${post.id}`}
                className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2.5"
              >
                {ui.readMore} <ArrowRight size={14} />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
