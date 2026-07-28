"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Copy } from "lucide-react";
import { toast } from "sonner";

export default function Hero() {
  const copyEmail = async () => {
    await navigator.clipboard.writeText("hkrobin48@gmail.com");
    toast.success("Email copied!");
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#090909] px-6 text-white">

      {/* Background Glow */}
      {/* <div className="absolute top-1/3 left-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/15 blur-[120px]" /> */}

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

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        <p className="mb-4 text-lg text-gray-400">
          👋 Hey, I'm
        </p>

        <h1 className="text-6xl font-extrabold tracking-tight md:text-8xl">
          Hasan Kabir Robin
        </h1>

        <div className="mt-5">
          <span className="rounded-full bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">
            Full Stack Developer
          </span>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-400">
          I build fast, responsive and scalable web applications with{" "}
          <span className="text-white font-medium">Next.js</span>,
          {" "}React, TypeScript, Node.js, Express, PostgreSQL &
          {" "}Prisma.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">

          <Link
            href="#contact"
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 font-semibold transition hover:scale-105"
          >
            Let's Connect
            <ArrowRight
              size={18}
              className="transition group-hover:translate-x-1"
            />
          </Link>

          <button
            onClick={copyEmail}
            className="flex items-center gap-2 text-gray-400 transition hover:text-white"
          >
            hkrobin48@gmail.com
            <Copy size={16} />
          </button>
        </div>
      </motion.div>

      {/* Bottom Glow */}
      <div className="pointer-events-none absolute -bottom-44 left-1/2 h-[320px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-t from-orange-500/30 via-orange-500/10 to-transparent blur-3xl" />
    </section>
  );
}