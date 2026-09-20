"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, resolveMediaUrl } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";

export default function BlogDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    api
      .getBlog(params.id)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.id]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-3xl px-6 pb-24 pt-36">
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
            <h1 className="text-2xl font-bold">Post not found</h1>
            <Link href="/#blog" className="mt-4 inline-block text-primary underline">
              Back to Blog
            </Link>
          </div>
        )}

        {post && (
          <article>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">{post.category}</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} /> {post.date}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold">{t(post.title)}</h1>

            {post.image && (
              <div className="mt-8 aspect-video w-full overflow-hidden rounded-3xl border border-border bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resolveMediaUrl(post.image)}
                  alt={t(post.title)}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="mt-8 whitespace-pre-line leading-8 text-muted">
              {t(post.content) || t(post.description)}
            </div>
          </article>
        )}
      </section>

      <Footer />
    </main>
  );
}
