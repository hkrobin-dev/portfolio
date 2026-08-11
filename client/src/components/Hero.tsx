"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";
import { toast } from "sonner";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Hero() {
  const copyEmail = async () => {
    await navigator.clipboard.writeText("hkrobin48@gmail.com");
    toast.success("Email copied!");
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-6 text-white">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(45)].map((_, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute -bottom-44 left-1/2 h-[320px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-500/30 via-orange-500/10 to-transparent blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center"
      >
        <p className="mb-4 text-lg text-gray-400">
          👋 Hey, I'm
        </p>

        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
          Hasan Kabir Robin
        </h1>

        <div className="mt-6">
          <span className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-lg">
            Full Stack Developer
          </span>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400 md:text-xl">
          Passionate about building scalable web applications with clean
          architecture and modern development practices using
          <span className="font-semibold text-white">
            {" "}
            Next.js
          </span>
          , React, TypeScript, Node.js, Express, PostgreSQL and Prisma.
        </p>

        {/* Buttons */}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="#contact"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 font-semibold transition duration-300 hover:scale-105"
          >
            Let's Connect
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

          <button
            onClick={copyEmail}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-4 text-gray-300 transition hover:border-orange-500 hover:text-white"
          >
            hkrobin48@gmail.com
            <Copy size={16} />
          </button>
        </div>

        {/* Social Icons */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            href="https://github.com/hkrobin-dev"
            target="_blank"
            className="group rounded-full border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500 hover:bg-orange-500"
          >
            <FaGithub
              size={22}
              className="text-gray-300 group-hover:text-white"
            />
          </Link>

          <Link
            href="https://www.linkedin.com/in/hk-robin/"
            target="_blank"
            className="group rounded-full border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:bg-green-600"
          >
            <FaLinkedin
              size={22}
              className="text-gray-300 group-hover:text-white"
            />
          </Link>

          <Link
            href="https://www.facebook.com/mdhk.robin.5"
            target="_blank"
            className="group rounded-full border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-blue-500"
          >
            <FaFacebook
              size={22}
              className="text-gray-300 group-hover:text-white"
            />
          </Link>

          <Link
            href="/FullStack-Hasan-Kabir-Robin .pdf"
            target="_blank"
            className="rounded-xl border border-orange-500/40 px-6 py-3 font-semibold text-orange-400 transition-all duration-300 hover:bg-orange-500 hover:text-white"
          >
            Download Resume
          </Link>
        </motion.div>

        {/* Tech Stack */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {[
            "Next.js",
            "React",
            "TypeScript",
            "Node.js",
            "Express",
            "Prisma",
            "PostgreSQL",
            "MongoDB",
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm transition hover:border-orange-500 hover:text-white"
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}