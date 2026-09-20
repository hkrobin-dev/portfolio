"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import EditFab from "@/components/EditFab";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
} as const;

export default function Education() {
  const { content } = useSite();
  const { t, ui } = useLanguage();
  const education = content?.education || [];

  return (
    <section id="education" className="relative py-24 px-6 lg:px-16 overflow-hidden">
      <EditFab href="/admin/education" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {ui.education}
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold">My Academic Journey</h2>

          <p className="mt-5 max-w-2xl mx-auto text-muted leading-7">
            A timeline of my academic background and continuous growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {education.map((edu: any) => (
            <motion.div
              key={edu.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group rounded-3xl border border-primary/20 bg-gradient-to-br from-surface/60 to-surface/10 backdrop-blur-md p-8 shadow-lg transition-all duration-300 hover:border-primary hover:shadow-primary/20"
            >
              <div className="flex gap-6">
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-secondary shadow-lg">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold">{t(edu.degree)}</h3>
                  <p className="mt-1 font-medium text-primary">{t(edu.institute)}</p>

                  <div className="mt-5 flex flex-wrap gap-6 text-sm text-muted">
                    {edu.period && (
                      <div className="flex items-center gap-2">
                        <Calendar size={18} />
                        <span>{edu.period}</span>
                      </div>
                    )}
                    {t(edu.location) && (
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{t(edu.location)}</span>
                      </div>
                    )}
                  </div>

                  {t(edu.extra) && <p className="mt-6 leading-7 text-muted">{t(edu.extra)}</p>}

                  {edu.badge && (
                    <div className="mt-6">
                      <span className="rounded-full bg-primary/10 px-4 py-2 text-primary font-semibold">
                        {edu.badge}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
