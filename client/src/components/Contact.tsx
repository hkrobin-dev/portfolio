"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useLanguage } from "@/context/LanguageContext";
import EditFab from "@/components/EditFab";

const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { content } = useSite();
  const { t, ui } = useLanguage();
  const contact = content?.contact;

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");

    try {
      const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`);
      const body = encodeURIComponent(
        `Name: ${data.name}\nEmail: ${data.email}\nMessage:\n${data.message}`
      );

      window.location.href = `mailto:${contact?.email || ""}?subject=${subject}&body=${body}`;

      setStatus("sent");
      reset();

      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  };

  if (!contact) return <section id="contact" className="py-24" />;

  return (
    <section
      id="contact"
      className="px-6 py-24 text-foreground"
    >
      <div className="mx-auto max-w-7xl text-center mb-8">
        <EditFab href="/admin/contact" />
        <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary items-center">
          {t(contact.badge)}
        </span>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-foreground">{t(contact.heading)}</h2>
          <p className="mt-4 text-lg text-muted">{t(contact.subheading)}</p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-primary" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Side: Contact Information */}
          <div className="space-y-6">
            {contact.email && (
              <div className="group rounded-2xl border border-border bg-foreground/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-foreground/10">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-primary/20 p-4">
                    <Mail className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email</h4>
                    <a href={`mailto:${contact.email}`} className="text-muted hover:text-primary transition-colors">
                      {contact.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {contact.phone && (
              <div className="rounded-2xl border border-border bg-foreground/5 p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-primary/20 p-4">
                    <Phone className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Phone</h4>
                    <a href={`tel:${contact.phone}`} className="text-muted hover:text-primary transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {contact.whatsapp && (
              <div className="rounded-2xl border border-border bg-foreground/5 p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-primary/20 p-4">
                    <MessageCircle className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">WhatsApp</h4>
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      className="text-muted hover:text-primary transition-colors"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {t(contact.location) && (
              <div className="rounded-2xl border border-border bg-foreground/5 p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-primary/20 p-4">
                    <MapPin className="text-primary h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Location</h4>
                    <p className="text-muted">{t(contact.location)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full rounded-3xl border border-border bg-foreground/5 p-10 shadow-2xl backdrop-blur-xl"
            >
              <div className="space-y-6">
                <div>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-border bg-background/70 px-5 py-4 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
                </div>

                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Your email"
                    className="w-full rounded-xl border border-border bg-background/70 px-5 py-4 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Your message"
                    className="w-full resize-none rounded-xl border border-border bg-background/70 px-5 py-4 text-foreground outline-none transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/30"
                  />
                  {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? "Opening Mail..." : "Send Message"}
                </button>

                {status === "sent" && <p className="text-center text-green-400">Your email app has been opened.</p>}
                {status === "error" && <p className="text-center text-red-400">Something went wrong.</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
