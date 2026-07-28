const stats = [
  { number: "10+", label: "Projects Built" },
  { number: "2+", label: "Years Learning Web Dev" },
  { number: "15+", label: "Technologies Used" },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-content">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold">
            ABOUT ME
          </h2>
          <p className="mt-2 text-muted">Get to know me</p>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-orange-500"/>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
          {/* Replace with your image */}
          <div className="aspect-square overflow-hidden rounded-2xl bg-surface">
            <img
              src="/images/profile.jpeg"
              alt="Hasan Kabir"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="leading-relaxed text-muted">
              I'm Hasan Kabir, a passionate Full-Stack Developer from Bangladesh
              specializing in building modern, scalable web applications. I
              started my journey in Computer Science and Technology and have
              developed strong skills in React, Next.js, TypeScript, Node.js,
              Express.js, and database technologies.

              <br />
              <br />

              I enjoy creating clean user interfaces, developing secure backend
              systems, and solving real-world problems through technology. I
              have built multiple full-stack projects including authentication
              systems, role-based dashboards, payment integration, REST APIs,
              and database-driven applications.

              <br />
              <br />

              Currently, I'm focused on improving my skills as a professional
              software developer and looking for opportunities where I can
              contribute, learn, and build impactful products.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl">{stat.number}</p>
                  <p className="text-sm text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}