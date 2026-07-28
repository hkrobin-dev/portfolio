import Image from "next/image";
import { skills } from "@/data/skills";

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-content">
        <h2 className="font-display text-3xl">Skills &amp; Expertise.</h2>
        <p className="mt-2 text-muted">
          Technologies I&apos;m proficient with
        </p>

        <div className="mt-10 space-y-8">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm uppercase tracking-wide text-muted">
                {group.category}
              </h3>
              <div className="mt-4 flex flex-wrap gap-4">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2"
                  >
                    <Image src={item.icon} alt={item.name} width={20} height={20} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
