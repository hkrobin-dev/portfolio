"use client";

import { useState, FormEvent } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-content">
        <h2 className="font-display text-3xl">Get in Touch.</h2>
        <p className="mt-2 text-muted">
          Have a project in mind or just want to say hello?
        </p>

        <form onSubmit={handleSubmit} className="mt-10 max-w-lg space-y-4">
          <input
            name="name"
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none"
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={5}
            required
            className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-accent">Message sent — thank you!</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Please email me directly instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
