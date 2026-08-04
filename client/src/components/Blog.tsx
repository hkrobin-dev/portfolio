"use client";

import { blogs } from "@/data/blogs";

export default function Blog() {
  return (
    <section
      id="blog"
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
          <div className="mx-auto max-w-7xl text-center mb-8">
        
      <span className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-400 items-center">
        Bolog
          </span>
      </div>
          <h2
            className="
          text-5xl
          font-bold
          bg-gradient-to-r
          from-orange-400
          via-amber-500
          to-red-500
          bg-clip-text
          text-transparent
          "
          >
            Latest Blogs.
          </h2>

          <p className="mt-3 text-lg text-gray-400">
            Sharing my thoughts, learning and experiences.
          </p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500" />
        </div>

        {/* Blog Cards */}

        <div
          className="
        mt-12
        grid
        gap-8
        md:grid-cols-2
        lg:grid-cols-3
        "
        >
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="
            group
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-6
            backdrop-blur-xl
            transition-all
            duration-500
            hover:-translate-y-3
            hover:border-orange-500/40
            hover:shadow-xl
            hover:shadow-orange-500/10
            "
            >
              <div
                className="
              flex
              justify-between
              items-center
              "
              >
                <span
                  className="
                rounded-full
                bg-orange-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-orange-400
                "
                >
                  {blog.category}
                </span>

                <span
                  className="
                text-xs
                text-gray-500
                "
                >
                  {blog.date}
                </span>
              </div>

              <h3
                className="
              mt-5
              text-2xl
              font-bold
              text-white
              group-hover:text-orange-400
              transition
              "
              >
                {blog.title}
              </h3>

              <p
                className="
              mt-4
              text-gray-400
              leading-relaxed
              "
              >
                {blog.description}
              </p>

              <a
                href={blog.link}
                className="
              inline-block
              mt-6
              text-orange-400
              font-medium
              hover:text-orange-300
              transition
              "
              >
                Read More →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}