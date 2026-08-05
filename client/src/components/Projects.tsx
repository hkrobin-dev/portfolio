"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/projects";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="px-4 py-20  text-white">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="mx-auto max-w-7xl text-center mb-8">
        
      <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400 items-center">
        Projects
          </span>
      </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 bg-clip-text text-transparent">
            Featured Projects.
          </h2>
          <p className="mt-3 text-base text-gray-400">
            A showcase of my recent full-stack & frontend projects
          </p>
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-orange-500" />
        </motion.div>

        {/* Projects Grid with Equal Heights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch"
        >
          {projects.map((project) => (
            <motion.article
              key={project.slug}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="
                group flex flex-col justify-between h-full
                rounded-2xl border border-white/10 
                bg-[#111622]/80 backdrop-blur-xl 
                p-4 transition-all duration-300
                hover:border-orange-500/40 hover:shadow-xl hover:shadow-orange-500/10
              "
            >
              <div className="flex flex-col flex-grow">
                {/* Image Container */}
                <div className="relative h-44 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-900 border border-white/5">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Container */}
                <div className="mt-4 flex flex-col flex-grow">
                  {/* Category Tag */}
                  <span className="text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="mt-1 text-lg font-bold text-white leading-snug transition-colors group-hover:text-orange-400">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-gray-400 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* 2x2 Features Grid (Pushed to bottom of content area) */}
                  {project.features && project.features.length > 0 && (
                    <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
                      {project.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5 transition-colors group-hover:border-white/10"
                        >
                          <h4 className="text-xs font-semibold text-white flex items-center gap-1 line-clamp-1">
                            {feature.title}
                          </h4>
                          <p className="mt-1 text-[10px] text-gray-400 leading-tight line-clamp-2">
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Action Links */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-orange-500 flex-shrink-0">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-orange-400 transition"
                  >
                    Live Demo <ExternalLink size={12} />
                  </a>
                ) : (
                  <span />
                )}

                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-orange-400 transition"
                  >
                    Source Code <Github size={12} />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}