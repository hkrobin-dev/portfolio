"use client";

import { motion } from "framer-motion";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import EditFab from "@/components/EditFab";

export default function Skills() {
  const { content } = useSite();
  const { t, ui } = useLanguage();
  const skills = content?.skills || [];

  return (
    <section id="skills" className="relative py-24 px-6">
      <EditFab href="/admin/skills" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <span className="rounded-full bg-primary/10 border border-primary/30 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
            {ui.skills}
          </span>

          <h2 className="mt-6 text-4xl font-bold">Skills &amp; Expertise.</h2>

          <p className="mt-4 text-muted">
            Technologies and tools I use to build modern web applications.
          </p>
        </div>

        <div className="mt-16 space-y-10">
          {skills.map((group: any) => (
            <motion.div
              key={t(group.category)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border border-border bg-surface p-8"
            >
              <h3 className="mb-8 text-2xl font-bold text-primary">{t(group.category)}</h3>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.items.map((skill: any) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group rounded-2xl border border-border bg-background/60 p-6 text-center transition-all duration-300 hover:border-primary"
                  >
                    {skill.icon && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="mx-auto h-12 w-12 object-contain transition group-hover:scale-110"
                      />
                    )}
                    <p className="mt-4 text-sm font-medium">{skill.name}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
