"use client";

import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiReactrouter,
  SiTailwindcss,
  SiRedux,
  SiAxios,
  SiNodedotjs,
  SiExpress,
  SiPrisma,
  SiFirebase,
  SiStripe,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRender,
  SiNetlify,
  SiJsonwebtokens,
  SiReactquery,
} from "react-icons/si";

import { FaDatabase, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import { IconType } from "react-icons";

type Skill = {
  name: string;
  icon: IconType;
};

type SkillGroup = {
  category: string;
  items: Skill[];
};

const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "Python", icon: SiPython },
      { name: "SQL", icon: FaDatabase },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React Router", icon: SiReactrouter },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Redux Toolkit", icon: SiRedux },
      { name: "TanStack Query", icon: SiReactquery },
      { name: "Axios", icon: SiAxios },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "Prisma", icon: SiPrisma },
      { name: "JWT", icon: SiJsonwebtokens },
      { name: "Firebase", icon: SiFirebase },
      { name: "Stripe", icon: SiStripe },
    ],
  },
  {
    category: "Database & Tools",
    items: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "Vercel", icon: SiVercel },
      { name: "Render", icon: SiRender },
      { name: "Netlify", icon: SiNetlify },
    ],
  },
  {
    category: "Concepts",
    items: [
      { name: "Responsive Design", icon: FaMobileAlt },
      { name: "Authentication", icon: FaShieldAlt },
      { name: "Authorization", icon: FaShieldAlt },
      { name: "REST API", icon: FaDatabase },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <span className="rounded-full bg-orange-500/10 border border-orange-500/30 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-orange-400">
            Skills
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Technical Skills
          </h2>

          <p className="mt-4 text-muted">
            Technologies and tools I use to build modern web applications.
          </p>
        </div>

        <div className="mt-16 space-y-10">
          {skills.map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-white/10 bg-surface p-8"
            >
              <h3 className="mb-8 text-2xl font-bold text-orange-500">
                {group.category}
              </h3>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.items.map((skill) => {
                  const Icon = skill.icon;

                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{
                        y: -8,
                        scale: 1.05,
                      }}
                      className="group rounded-2xl border border-white/10 bg-[#111] p-6 text-center transition-all duration-300 hover:border-orange-500"
                    >
                      <Icon className="mx-auto text-5xl text-orange-500 transition group-hover:scale-110" />

                      <p className="mt-4 text-sm font-medium">
                        {skill.name}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted">
            Currently Learning
          </p>

          <p className="mt-2 text-lg font-semibold text-orange-500">
            Docker • DevOps • AWS
          </p>
        </div>
      </div>
    </section>
  );
}