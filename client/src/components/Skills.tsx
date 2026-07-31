"use client";

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
  SiReactquery,
  SiAxios,
  SiRedux,
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
} from "react-icons/si";

import { FaDatabase, FaShieldAlt, FaMobileAlt } from "react-icons/fa";
import { IconType } from "react-icons";
type Skill = {
  name: string;
  icon: IconType;
};

type SkillGroup = {
  category: string;
  items: Skill[];
};
export const skills = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "SQL", icon: FaDatabase },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
      { name: "Python", icon: SiPython },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React.js", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React Router", icon: SiReactrouter },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "TanStack Query", icon: SiReactquery },
      { name: "Axios", icon: SiAxios },
      { name: "Redux Toolkit", icon: SiRedux },
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
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-content">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold">SKILLS</h2>
          <p className="mt-2 text-muted">What I can do</p>

          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500" />
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-10">
          {skills.map((group) =>
            group.items.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.name}
                  className="group relative flex h-24 w-24 items-center justify-center rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-2"
                >
                  <Icon className="h-12 w-12 text-green-500 transition-transform duration-300 group-hover:scale-110" />

                  <span
                    className="
            absolute
            -bottom-8
            scale-0
            whitespace-nowrap
            rounded-md
            bg-black
            px-3
            py-1
            font-bold
            text-xs
            text-white
            transition
            duration-300
            group-hover:scale-100
          "
                  >
                    {item.name}
                  </span>
                </div>
              );
            }),
          )}
        </div>

        <p className="mt-20 text-center text-muted">
          Currently learning:
          <span className="ml-2 text-orange-500">Docker & DevOps</span>
        </p>
      </div>
    </section>
  );
}
