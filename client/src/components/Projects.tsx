"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import { resolveMediaUrl } from "@/lib/api";
import EditFab from "@/components/EditFab";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Projects() {
  const { content } = useSite();
  const { t, ui } = useLanguage();
  const projects = content?.projects || [];

  return (
    <section id="projects" className="relative px-4 py-20 text-foreground">
      <EditFab href="/admin/projects" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="mx-auto max-w-7xl text-center mb-8">
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary items-center">
              {ui.projects}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-orange-400 bg-clip-text text-transparent">
            Featured Projects.
          </h2>
          <p className="mt-3 text-base text-muted">
            A showcase of my recent full-stack & frontend projects
          </p>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-primary" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          {projects.map((project: any) => (
            <motion.article
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group flex flex-col justify-between h-full rounded-2xl border border-border bg-surface/80 backdrop-blur-xl p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex flex-col flex-grow">
                {project.image && (
                  <div className="relative h-44 w-full flex-shrink-0 overflow-hidden rounded-xl bg-background border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveMediaUrl(project.image)}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="mt-4 flex flex-col flex-grow">
                  <span className="text-[10px] font-semibold tracking-wider text-muted uppercase">
                    {t(project.category)}
                  </span>

                  <h3 className="mt-1 text-lg font-bold text-foreground leading-snug transition-colors group-hover:text-primary">
                    <Link href={`/projects/${project.id}`}>{project.title}</Link>
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3">
                    {t(project.description)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(project.stack || []).map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-full bg-foreground/5 border border-border px-2.5 py-0.5 text-[11px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.features && project.features.length > 0 && (
                    <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
                      {project.features.map((feature: any, idx: number) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-border bg-foreground/[0.02] p-2.5 transition-colors group-hover:border-border"
                        >
                          <h4 className="text-xs font-semibold text-foreground flex items-center gap-1 line-clamp-1">
                            {feature.title}
                          </h4>
                          <p className="mt-1 text-[10px] text-muted leading-tight line-clamp-2">
                            {t(feature.description)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-xs font-semibold text-primary flex-shrink-0">
                <Link
                  href={`/projects/${project.id}`}
                  className="flex items-center gap-1 hover:opacity-80 transition"
                >
                  {ui.readMore || "See More"}
                </Link>

                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:opacity-80 transition"
                    >
                      {ui.liveDemo} <ExternalLink size={12} />
                    </a>
                  )}

                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:opacity-80 transition"
                    >
                      {ui.sourceCode} <Github size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
