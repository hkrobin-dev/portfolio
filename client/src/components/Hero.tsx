"use client";
import { toast } from "sonner";
import { motion } from "motion/react";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: -50,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hkrobin48@gmail.com");

      toast.success("✅ Email copied to clipboard.! 📋");
    } catch {
      toast.error("Failed to copy email!");
    }
  };
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white px-6 flex items-center justify-center ">
      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center"
      >
        <motion.p variants={item} className="text-lg text-gray-400 mb-3">
          👋 Hi, I'm
        </motion.p>

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold">
          Hasan Kabir Robin
        </motion.h1>

        <motion.h2
          variants={item}
          className="mt-4 text-2xl md:text-4xl font-semibold text-blue-400"
        >
          Full Stack Developer
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl mx-auto text-gray-400"
        >
          I build fast, responsive, and scalable web applications using Next.js,
          React, TypeScript, Node.js, Express, PostgreSQL, and Prisma.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex justify-center gap-4">
         <Link href="#contact">
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition">
              Let's Connect 
            </button>
          </Link>

          <button
            onClick={copyEmail}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            hkrobin48@gmail.com
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
      {/* Bottom Glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1200px] h-[300px] rounded-full bg-gradient-to-t from-red-500/40 via-orange-500/20 to-transparent blur-[120px]" />
    </section>
  );
}
