"use client";
import { experience } from "@/data/experience";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24 text-white">
      <div className="mx-auto max-w-content">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-content text-center">
            <div className="mx-auto max-w-7xl text-center mb-8">
              <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400 items-center">
                Experience
              </span>
            </div>
            <h2 className="font-display text-5xl font-bold bg-gradient-to-r from-orange-400 via-amber-500 to-red-500 bg-clip-text text-transparent">
             Professional Experience.
            </h2>

            <p className="mt-3 text-lg text-gray-400">
              My professional journey and technical growth
            </p>
            <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-14 border-l-2 border-orange-500/30 pl-10 space-y-12">
          {experience.map((item, index) => (
            <motion.div
              key={item.role + item.company}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Timeline Dot */}
              <span className="absolute -left-[51px] top-2 h-5 w-5 rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />

              {/* Card */}
              <div
                className="
                rounded-2xl 
                border border-white/10
                bg-gradient-to-br 
                from-white/5 
                to-white/0
                p-7
                backdrop-blur
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-orange-500/50
                hover:shadow-xl
                hover:shadow-orange-500/10
                "
              >
                <p className="text-sm text-orange-400 font-medium">
                  {item.period}
                </p>

                <h3
                  className="
                  mt-2
                  text-3xl
                  font-bold
                  text-white
                "
                >
                  {item.role}
                </h3>

                <p
                  className="
                  mt-1
                  text-lg
                  text-gray-400
                "
                >
                  {item.company}
                  <span className="mx-2">•</span>
                  {item.location}
                </p>

                {/* Description */}
                <ul
                  className="
                  mt-5
                  space-y-3
                  text-gray-300
                  text-base
                "
                >
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-orange-400">✦</span>

                      {point}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {item.stack.map((tech) => (
                    <span
                      key={tech}
                      className="
                      rounded-full
                      border
                      border-orange-500/30
                      bg-orange-500/10
                      px-4
                      py-1.5
                      text-sm
                      text-orange-300
                      transition
                      hover:bg-orange-500
                      hover:text-black
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
