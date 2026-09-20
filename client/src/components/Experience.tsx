"use client";

import { motion } from "framer-motion";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import EditFab from "@/components/EditFab";

export default function Experience() {
  const { content } = useSite();
  const { t, ui } = useLanguage();
  const experience = content?.experience || [];

  return (
    <section id="experience" className="relative px-6 py-24 text-foreground">
      <EditFab href="/admin/experience" />
      <div className="mx-auto max-w-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-content text-center">
            <div className="mx-auto max-w-7xl text-center mb-8">
              <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary items-center">
                {ui.experience}
              </span>
            </div>
            <h2 className="font-display text-5xl font-bold bg-gradient-to-r from-secondary via-primary to-orange-400 bg-clip-text text-transparent">
              Professional Experience.
            </h2>

            <p className="mt-3 text-lg text-muted">My professional journey and technical growth</p>
            <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-primary" />
          </div>
        </motion.div>

        <div className="relative mt-14 border-l-2 border-primary/30 pl-10 space-y-12">
          {experience.map((item: any, index: number) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="absolute -left-[51px] top-2 h-5 w-5 rounded-full bg-primary shadow-lg shadow-primary/50" />

              <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface/0 p-7 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                <p className="text-sm text-primary font-medium">{item.period}</p>

                <h3 className="mt-2 text-3xl font-bold text-foreground">{t(item.role)}</h3>

                <p className="mt-1 text-lg text-muted">
                  {item.company}
                  {item.location && (
                    <>
                      <span className="mx-2">•</span>
                      {t(item.location)}
                    </>
                  )}
                </p>

                <ul className="mt-5 space-y-3 text-muted text-base">
                  {(item.points || []).map((point: any, pi: number) => (
                    <li key={pi} className="flex gap-3">
                      <span className="text-primary">✦</span>
                      {t(point)}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-3">
                  {(item.stack || []).map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary transition hover:bg-primary hover:text-black"
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
