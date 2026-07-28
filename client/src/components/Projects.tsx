"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export const projects = [
  {
    title: "Restaurant Management System",
    description: "Full-stack restaurant management platform...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "",
    codeUrl: "",
    slug: "restaurant-management",
    category: "Full Stack",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Two",
    description: "Description for project two...",
    image: "/images/profile.jpeg",
    stack: ["React", "Node.js", "MongoDB"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-two",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description for project three...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "Tailwind"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-three",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description for project three...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "Tailwind"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-three",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description for project three...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "Tailwind"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-three",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description for project three...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "Tailwind"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-three",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-content">
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl font-bold">
            PROJECTS
          </h2>
          <p className="mt-2 text-muted">Some of my recent work</p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500"/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.slice(0, 5).map((project, index) => (
            <motion.div
              key={project.slug}
              className={`group rounded-3xl border border-border bg-surface overflow-hidden ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex flex-col gap-4 p-6">
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wide text-muted">
                    {project.category}
                  </span>
                  <h3 className="mt-1 text-xl font-semibold">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {project.description}
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Feature highlight grid only for the first (featured) project */}
                {project.features.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {project.features.map((feature) => (
                      <div
                        key={feature.title}
                        className="rounded-xl border border-border p-4"
                      >
                        <h4 className="font-semibold">{feature.title}</h4>

                        <p className="mt-1 text-xs text-muted">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between border-t border-border p-6">
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="flex items-center gap-2 text-sm font-medium text-red-400 transition hover:text-red-300"
                >
                  Live Demo <ExternalLink size={16} />
                </Link>

                <Link
                  href={project.codeUrl}
                  target="_blank"
                  className="flex items-center gap-2 text-sm font-medium text-red-400 transition hover:text-red-300"
                >
                  Source Code <Github size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
