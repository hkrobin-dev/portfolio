"use client";
import { experience } from "@/data/experience";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-content">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-content text-center">
            <h2 className="font-display text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Experience.
          </h2>

          <p className="mt-3 text-lg text-muted">
            My professional journey and technical growth
          </p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500"/>

          
          </div>
        </motion.div>


        {/* Timeline */}
        <div className="relative mt-14 border-l-2 border-cyan-500/30 pl-10 space-y-12">

          {experience.map((item, index) => (

            <motion.div
              key={item.role + item.company}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.2 
              }}
              viewport={{ once: true }}
              className="relative"
            >

              {/* Timeline Dot */}
              <span className="absolute -left-[52px] top-2 h-5 w-5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />


              {/* Card */}
              <div
                className="
                rounded-2xl 
                border border-border
                bg-gradient-to-br 
                from-white/5 
                to-white/0
                p-7
                backdrop-blur
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-cyan-400/50
                hover:shadow-xl
                "
              >

                <p className="text-sm text-cyan-400 font-medium">
                  {item.period}
                </p>


                <h3 className="
                  mt-2
                  text-3xl
                  font-bold
                  text-white
                ">
                  {item.role}
                </h3>


                <p className="
                  mt-1
                  text-lg
                  text-gray-400
                ">
                  {item.company} 
                  <span className="mx-2">•</span>
                  {item.location}
                </p>



                {/* Description */}
                <ul className="
                  mt-5
                  space-y-3
                  text-gray-300
                  text-base
                ">
                  {item.points.map((point)=>(
                    <li 
                      key={point}
                      className="flex gap-3"
                    >
                      <span className="text-cyan-400">
                        ✦
                      </span>

                      {point}
                    </li>
                  ))}
                </ul>



                {/* Tech Stack */}
                <div className="mt-6 flex flex-wrap gap-3">

                  {item.stack.map((tech)=>(
                    <span
                      key={tech}
                      className="
                      rounded-full
                      border
                      border-cyan-400/30
                      bg-cyan-400/10
                      px-4
                      py-1.5
                      text-sm
                      text-cyan-300
                      transition
                      hover:bg-cyan-400
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