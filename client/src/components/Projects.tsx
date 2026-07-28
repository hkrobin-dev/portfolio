import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-content">
        <h2 className="font-display text-3xl">Projects.</h2>
        <p className="mt-2 text-muted">A selection of my recent work</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="font-display text-xl">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="text-sm text-accent"
                    target="_blank"
                  >
                    Live Demo
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    className="text-sm text-muted"
                    target="_blank"
                  >
                    Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
