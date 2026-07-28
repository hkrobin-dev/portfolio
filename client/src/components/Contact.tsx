"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Please enter a valid email"),

  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
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
      console.log(data);

      setTimeout(() => {
        setStatus("sent");
        reset();
      }, 1000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="
      px-6 
      py-24
      bg-gradient-to-b
      from-background
      via-slate-900/40
      to-background
      "
    >
      <div className="mx-auto max-w-content">
        {/* Heading */}

        <div className="text-center">
          <h2
            className="
          text-5xl
          font-bold
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-purple-500
          bg-clip-text
          text-transparent
          "
          >
            Get in Touch.
          </h2>

          <p className="mt-4 text-lg text-gray-400">
            Have a project in mind or just want to say hello?
          </p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500"/>
        </div>

        {/* Form */}

        <div className="mt-12 flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="
        w-full
        max-w-xl
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
        shadow-2xl
        transition-all
        duration-500
        hover:border-cyan-400/40
        "
          >
            <div className="space-y-5">
              {/* Name */}

              <div>
                <input
                  {...register("name")}
                  placeholder="Your name"
                  className="
          w-full
          rounded-xl
          border
          border-gray-700
          bg-slate-900/70
          px-5
          py-4
          text-white
          outline-none
          transition-all
          duration-300
          focus:border-cyan-400
          focus:ring-2
          focus:ring-cyan-400/30
          "
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
                  className="
          w-full
          rounded-xl
          border
          border-gray-700
          bg-slate-900/70
          px-5
          py-4
          text-white
          outline-none
          transition-all
          duration-300
          focus:border-purple-400
          focus:ring-2
          focus:ring-purple-400/30
          "
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
                  className="
          w-full
          rounded-xl
          border
          border-gray-700
          bg-slate-900/70
          px-5
          py-4
          text-white
          outline-none
          resize-none
          transition-all
          duration-300
          focus:border-pink-400
          focus:ring-2
          focus:ring-pink-400/30
          "
                />

                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Button */}

              <button
                disabled={status === "sending"}
                className="
          w-full
          rounded-xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-[1.03]
          hover:shadow-lg
          hover:shadow-cyan-500/30
          disabled:opacity-50
          "
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>

              {status === "sent" && (
                <p className="text-center text-green-400">
                  Message sent successfully!
                </p>
              )}

              {status === "error" && (
                <p className="text-center text-red-400">
                  Something went wrong!
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
