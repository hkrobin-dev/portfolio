"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import { resolveMediaUrl } from "@/lib/api";
import EditFab from "@/components/EditFab";

// Hidden entirely until the admin adds at least one testimonial — so it
// stays out of the way on day one and appears the moment it's needed.
export default function Testimonials() {
  const { content } = useSite();
  const { t } = useLanguage();
  const testimonials = content?.testimonials || [];

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative px-6 py-24">
      <EditFab href="/admin/testimonials" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Testimonials
          </span>
          <h2 className="mt-5 text-4xl font-bold md:text-5xl">What People Say</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item: any, i: number) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-xl"
            >
              <Quote className="mb-3 text-primary/40" size={28} />
              <p className="flex-1 text-sm leading-relaxed text-muted">{t(item.quote)}</p>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                {item.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resolveMediaUrl(item.avatar)}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                    {item.name?.[0] || "?"}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-muted">
                    {item.role}
                    {item.role && item.company ? " · " : ""}
                    {item.companyUrl ? (
                      <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
