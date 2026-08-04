"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

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

      window.location.href = `mailto:hkrobin48@gmail.com?subject=${subject}&body=${body}`;

      setStatus("sent");
      reset();

      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="px-6 py-24 bg-gradient-to-b from-background via-slate-900/40 to-background text-white"
    >
      <div className="mx-auto max-w-7xl text-center mb-8">
        
      <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400 items-center">
        Contact
          </span>
      </div>
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="bg-gradient-to-r text-white bg-clip-text text-5xl font-bold text-transparent">
            Get in Touch.
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Have a project in mind or just want to say hello?
          </p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500" />
        </div>

        {/* 
          Main Grid Container.
          'items-start' keeps the two columns aligned at the top (solves "uchu nichu").
        */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Side: Contact Information */}
          <div className="space-y-6">
            <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-white/10">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-orange-500/20 p-4">
                  <Mail className="text-orange-500 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <a
                    href="mailto:hkrobin48@gmail.com"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    hkrobin48@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-orange-500/20 p-4">
                  <Phone className="text-orange-500 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <a
                    href="tel:+8801XXXXXXXXX"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    +8801302012386
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-orange-500/20 p-4">
                  <MessageCircle className="text-orange-500 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">WhatsApp</h4>
                  <a
                    href="https://wa.me/8801302012386"
                    target="_blank"
                    className="text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-orange-500/20 p-4">
                  <MapPin className="text-orange-500 h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Location</h4>
                  <p className="text-gray-400">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form (Changed to Orange Theme) */}
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl"
            >
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    // Changed focus border and ring to orange
                    className="w-full rounded-xl border border-gray-700 bg-slate-900/70 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Your email"
                    // Changed focus border and ring to orange
                    className="w-full rounded-xl border border-gray-700 bg-slate-900/70 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Your message"
                    // Changed focus border and ring to orange
                    className="w-full resize-none rounded-xl border border-gray-700 bg-slate-900/70 px-5 py-4 text-white outline-none transition-all duration-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30"
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Button (Changed to Orange Gradient) */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-600 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-orange-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "sending" ? "Opening Mail..." : "Send Message"}
                </button>

                {status === "sent" && (
                  <p className="text-center text-green-400">
                    Your email app has been opened.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-center text-red-400">
                    Something went wrong.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}