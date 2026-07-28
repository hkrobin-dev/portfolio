export type Project = {
  title: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  codeUrl?: string;
};

export const projects: Project[] = [
  {
    title: "Project One",
    description: "One or two sentences describing what this project does and the problem it solves.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/yourname/project-one",
  },
  {
    title: "Project Two",
    description: "One or two sentences describing what this project does and the problem it solves.",
    stack: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/yourname/project-two",
  },
];
