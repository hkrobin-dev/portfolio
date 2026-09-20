"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { useSite } from "@/context/SiteContext";

// Purely presentational — reuses the resume link already set in Hero, so
// there's nothing new to manage in the admin panel.
export default function ResumeCta() {
  const { content } = useSite();
  const resumeUrl = content?.hero?.resumeUrl;

  if (!resumeUrl) return null;

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface/60 px-8 py-12 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Want to know more?</h2>
        <p className="mx-auto mt-3 max-w-xl text-muted">
          Download my resume for a detailed look at my experience, skills, and education.
        </p>
        <Link
          href={resumeUrl}
          target="_blank"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white transition hover:scale-105"
        >
          View Resume <Download size={16} />
        </Link>
      </div>
    </section>
  );
}
