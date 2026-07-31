"use client";

import { motion, type Variants } from "framer-motion";

const stats = [
  { number: "10+", label: "Projects Built" },
  { number: "2+", label: "Years Learning Web Dev" },
  { number: "15+", label: "Technologies Used" },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const imageVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotate: -3,
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-bold">ABOUT ME</h2>
          <p className="mt-2 text-muted">Get to know me</p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "7rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto mt-3 h-1 rounded-full bg-orange-500"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-10 md:grid-cols-2 md:items-center"
        >
          <motion.div
            variants={imageVariant}
            whileHover={{
              scale: 1.03,
              rotate: 1,
            }}
            transition={{ duration: 0.3 }}
            className="group aspect-square overflow-hidden rounded-2xl bg-surface"
          >
            <img
              src="/images/profile.jpeg"
              alt="Hasan Kabir"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="leading-relaxed text-muted">
              I'm Hasan Kabir, a passionate Full-Stack Developer from Bangladesh
              specializing in building modern, scalable web applications. I
              started my journey in Computer Science and Technology and have
              developed strong skills in React, Next.js, TypeScript, Node.js,
              Express.js, and database technologies.
              <br />
              <br />
              I enjoy creating clean user interfaces, developing secure backend
              systems, and solving real-world problems through technology. I
              have built multiple full-stack projects including authentication
              systems, role-based dashboards, payment integration, REST APIs,
              and database-driven applications.
              <br />
              <br />
              Currently, I'm focused on improving my skills as a professional
              software developer and looking for opportunities where I can
              contribute, learn, and build impactful products.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="rounded-xl border border-border bg-surface p-5 text-center"
                >
                  <h3 className="font-display text-3xl font-bold text-orange-500">
                    {stat.number}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}