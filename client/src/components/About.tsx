"use client";

import { motion, type Variants } from "framer-motion";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import ImageSlider from "@/components/ImageSlider";
import EditFab from "@/components/EditFab";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const imageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function About() {
  const { content } = useSite();
  const { t } = useLanguage();
  const about = content?.about;

  if (!about) return <section id="about" className="py-24" />;

  return (
    <section id="about" className="relative px-6 py-24">
      <EditFab href="/admin/about" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-primary">
            {t(about.badge)}
          </span>

          <h2 className="mt-6 text-4xl font-bold md:text-5xl">{t(about.heading)}</h2>

          <p className="mx-auto mt-5 max-w-2xl text-muted">{t(about.subheading)}</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center"
        >
          <motion.div
            variants={imageVariant}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md"
          >
            <ImageSlider
              images={about.gallery?.length > 0 ? about.gallery : [about.imageUrl]}
              alt={about.nameHighlight || "Profile"}
              autoPlay
              intervalMs={4000}
              aspectClassName="aspect-square sm:aspect-[4/5]"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="text-3xl font-bold">
              Hi, I'm <span className="text-primary">{about.nameHighlight}</span>
            </h3>

            {(about.paragraphs || []).map((p: any, i: number) => (
              <p key={i} className="mt-5 leading-8 text-muted first:mt-6">
                {t(p)}
              </p>
            ))}

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {(about.stats || []).map((stat: any) => (
                <motion.div
                  key={stat.number + t(stat.label)}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="rounded-2xl border border-border bg-surface p-6 text-center shadow-lg transition hover:border-primary/40"
                >
                  <h3 className="text-3xl font-bold text-primary">{stat.number}</h3>
                  <p className="mt-2 text-sm text-muted">{t(stat.label)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
