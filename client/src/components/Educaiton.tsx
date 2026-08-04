"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
} as const;

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-24 px-6 lg:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            Education
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold">
            My Academic Journey
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-muted-foreground leading-7">
            A timeline of my academic background and continuous growth in
            computer science and software engineering.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* University */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.01,
            }}
            className="group rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900/40 to-slate-800/10 backdrop-blur-md p-8 shadow-lg transition-all duration-300 hover:border-orange-400 hover:shadow-orange-500/20"
          >
            <div className="flex gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold">
                  B.Sc. in Computer Science & Engineering
                </h3>

                <p className="mt-1 font-medium text-orange-400">
                  Northern University Bangladesh
                </p>

                <div className="mt-5 flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>2026 - Present</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>

                <p className="mt-6 leading-7 text-muted-foreground">
                  Currently pursuing a Bachelor's degree in Computer Science &
                  Engineering with a strong focus on Software Engineering,
                  software architecture, system design, and modern software
                  development practices.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Diploma */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.01,
            }}
            className="group rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900/40 to-slate-800/10 backdrop-blur-md p-8 shadow-lg transition-all duration-300 hover:border-orange-400 hover:shadow-orange-500/20"
          >
            <div className="flex gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold">
                  Diploma in Computer Science & Technology
                </h3>

                <p className="mt-1 font-medium text-orange-400">
                  Chattogram Polytechnic Institute
                </p>

                <div className="mt-5 flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>2022 - 2026</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>Chattogram, Bangladesh</span>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="rounded-full bg-orange-500/10 px-4 py-2 text-orange-400 font-semibold">
                    CGPA: 3.23 / 4.00
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SSC */}
          <motion.div
            variants={cardVariants}
            whileHover={{
              y: -8,
              scale: 1.01,
            }}
            className="group rounded-3xl border border-orange-500/20 bg-gradient-to-br from-slate-900/40 to-slate-800/10 backdrop-blur-md p-8 shadow-lg transition-all duration-300 hover:border-orange-400 hover:shadow-orange-500/20"
          >
            <div className="flex gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold">
                  Secondary School Certificate (SSC)
                </h3>

                <p className="mt-1 font-medium text-orange-400">
                  Ashirpar High School
                </p>

                <div className="mt-5 flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>Completed in 2021</span>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="rounded-full bg-orange-500/10 px-4 py-2 text-orange-400 font-semibold">
                    GPA: 4.72 / 5.00
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
