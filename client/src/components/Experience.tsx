import { experience } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-content">
        <h2 className="font-display text-3xl">Experience.</h2>
        <p className="mt-2 text-muted">My professional journey</p>

        <div className="mt-10 space-y-10 border-l border-border pl-6">
          {experience.map((item) => (
            <div key={item.role + item.company}>
              <p className="text-sm text-muted">{item.period}</p>
              <h3 className="mt-1 font-display text-xl">{item.role}</h3>
              <p className="text-sm text-muted">
                {item.company} • {item.location}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-muted">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
