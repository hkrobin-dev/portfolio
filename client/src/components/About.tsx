"use client";

import { motion, type Variants } from "framer-motion";

const stats = [
  { number: "10+", label: "Projects Completed" },
  { number: "20+", label: "Technologies & Tools" },
  { number: "1000+", label: "Hours of Learning" },
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
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-orange-400">
            About Me
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">
            Get to Know Me
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-muted">
            Learn more about my journey, interests, and passion for software
            development.
          </p>
        </motion.div>

        {/* Content */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          {/* Image */}

          <motion.div
            variants={imageVariant}
            whileHover={{
              scale: 1.03,
              rotate: 1,
            }}
            transition={{ duration: 0.3 }}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-xl"
          >
            <img
              src="/images/profile.jpeg"
              alt="Hasan Kabir Robin"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
          </motion.div>

          {/* Text */}

          <motion.div variants={fadeUp}>
            <h3 className="text-3xl font-bold">
              Hi, I'm <span className="text-orange-500">Hasan Kabir Robin</span>
            </h3>

            <p className="mt-6 leading-8 text-muted">
              I am a passionate Full-Stack Developer from Bangladesh who enjoys
              building modern, scalable, and user-friendly web applications.
              Technology inspires me to solve real-world problems through clean
              code, creative thinking, and continuous learning.
            </p>

            <p className="mt-5 leading-8 text-muted">
              My programming journey started in{" "}
              <span className="font-semibold text-white">October 2023</span>{" "}
              while pursuing my Diploma in Computer Science & Technology. Since
              then, I have been dedicated to learning modern web development by
              building real-world projects, exploring new technologies, and
              continuously improving my problem-solving and software development
              skills.
            </p>

            <p className="mt-5 leading-8 text-muted">
              I enjoy developing full-stack web applications, designing clean
              and responsive user interfaces, building secure backend APIs,
              integrating databases, implementing authentication systems, and
              writing maintainable code. I always strive to create applications
              that are efficient, scalable, and provide a great user experience.
            </p>

            <p className="mt-5 leading-8 text-muted">
              Outside of programming, I enjoy playing cricket, exploring new
              technologies, watching software engineering and tech content,
              learning about modern development practices, and continuously
              improving my problem-solving skills. I believe that curiosity,
              discipline, and consistency are the foundation of becoming a
              better software engineer.
            </p>

            {/* Stats */}

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                  className="rounded-2xl border border-white/10 bg-surface p-6 text-center shadow-lg transition hover:border-orange-500/40"
                >
                  <h3 className="text-3xl font-bold text-orange-500">
                    {stat.number}
                  </h3>

                  <p className="mt-2 text-sm text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
