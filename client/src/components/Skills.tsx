"use client";

import Image from "next/image";

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "JavaScript (ES6+)", icon: "/icons/javascript.svg" },
      { name: "TypeScript", icon: "/icons/typescript.svg" },
      { name: "SQL", icon: "/icons/sql.svg" },
      { name: "HTML5", icon: "/icons/html.svg" },
      { name: "CSS3", icon: "/icons/css.svg" },
      { name: "Python", icon: "/icons/python.svg" },
    ],
  },

  {
    category: "Frontend",
    items: [
      { name: "React.js", icon: "/icons/react.svg" },
      { name: "Next.js", icon: "/icons/next.svg" },
      { name: "React Router", icon: "/icons/react-router.svg" },
      { name: "Tailwind CSS", icon: "/icons/tailwind.svg" },
      { name: "TanStack Query", icon: "/icons/tanstack.svg" },
      { name: "Axios", icon: "/icons/axios.svg" },
      { name: "Redux Toolkit", icon: "/icons/redux.svg" },
    ],
  },

  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "/icons/node.svg" },
      { name: "Express.js", icon: "/icons/express.svg" },
      { name: "RESTful APIs", icon: "/icons/api.svg" },
      { name: "JWT", icon: "/icons/jwt.svg" },
      { name: "Prisma", icon: "/icons/prisma.svg" },
      { name: "Firebase Auth", icon: "/icons/firebase.svg" },
      { name: "Stripe", icon: "/icons/stripe.svg" },
    ],
  },


  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "MongoDB", icon: "/icons/mongodb.svg" },
      { name: "Mongoose", icon: "/icons/mongoose.svg" },
    ],
  },


  {
    category: "Tools",
    items: [
      { name: "Git", icon: "/icons/git.svg" },
      { name: "GitHub", icon: "/icons/github.svg" },
      { name: "Postman", icon: "/icons/postman.svg" },
      { name: "VS Code", icon: "/icons/vscode.svg" },
      { name: "Vercel", icon: "/icons/vercel.svg" },
      { name: "Render", icon: "/icons/render.svg" },
      { name: "Netlify", icon: "/icons/netlify.svg" },
    ],
  },


  {
    category: "Concepts",
    items: [
      { name: "Responsive Design", icon: "/icons/responsive.svg" },
      { name: "CRUD Operations", icon: "/icons/crud.svg" },
      { name: "Authentication", icon: "/icons/auth.svg" },
      { name: "Authorization", icon: "/icons/security.svg" },
    ],
  },
];
export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">

      <div className="mx-auto max-w-content">

        <div className="text-center">
          <h2 className="font-display text-4xl font-bold">
            SKILLS
          </h2>
          <p className="mt-2 text-muted">What I can do</p>
        
          

          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500"/>
        </div>


        <div className="mt-14 flex flex-wrap justify-center gap-10">

          {skills.map((group)=>(
            group.items.map((item)=>(
              
              <div
                key={item.name}
                className="
                group
                relative
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-2xl
                border
                border-border
                bg-surface
                transition-all
                duration-300
                hover:-translate-y-2
                "
              >

                <Image
                  src={item.icon}
                  alt={item.name}
                  width={55}
                  height={55}
                  className="object-contain"
                />


                {/* name show on hover */}

                <span
                  className="
                  absolute
                  -bottom-8
                  scale-0
                  rounded-md
                  bg-black
                  px-3
                  py-1
                  text-xs
                  text-white
                  transition
                  duration-300
                  group-hover:scale-100
                  whitespace-nowrap
                  "
                >
                  {item.name}
                </span>


              </div>

            ))
          ))}


        </div>


        <p className="mt-20 text-center text-muted">
          Currently learning:
          <span className="ml-2 text-orange-500">
            Rust
          </span>
        </p>


      </div>

    </section>
  );
}