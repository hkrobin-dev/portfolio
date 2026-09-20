"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import { api } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { t, ui } = useLanguage();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .getProject(params.id)
      .then(setProject)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 pb-24 pt-36">
        <button
          onClick={() => router.back()}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={16} /> Back
        </button>

        {loading && (
          <div className="flex items-center gap-2 text-muted">
            <Loader2 className="animate-spin" size={18} /> Loading...
          </div>
        )}

        {notFound && !loading && (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Project not found</h1>
            <Link href="/#projects" className="mt-4 inline-block text-primary underline">
              Back to Projects
            </Link>
          </div>
        )}

        {project && (
          <article>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t(project.category)}
            </span>
            <h1 className="mt-3 text-4xl font-bold">{project.title}</h1>

            {(project.gallery?.length > 0 || project.image) && (
              <div className="mt-8">
                <ImageSlider
                  images={project.gallery?.length > 0 ? project.gallery : [project.image]}
                  alt={project.title}
                />
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-2">
              {(project.stack || []).map((tech: string) => (
                <span key={tech} className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted">
                  {tech}
                </span>
              ))}
            </div>

            <p className="mt-8 whitespace-pre-line leading-8 text-muted">
              {t(project.longDescription) || t(project.description)}
            </p>

            {project.features?.length > 0 && (
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {project.features.map((f: any, i: number) => (
                  <div key={i} className="rounded-2xl border border-border bg-surface p-5">
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm text-muted">{t(f.description)}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-6 py-3 font-semibold text-white transition hover:scale-105"
                >
                  {ui.liveDemo} <ExternalLink size={16} />
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 font-semibold text-foreground transition hover:border-primary"
                >
                  {ui.sourceCode} <Github size={16} />
                </a>
              )}
            </div>
          </article>
        )}
      </section>

      <Footer />
    </main>
  );
}
