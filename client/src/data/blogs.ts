export type BlogPost = {
  id: number;
  title: string;
  description: string;
  date: string;
  category: string;
  link: string;
};


export const blogs: BlogPost[] = [

  {
    id: 1,
    title: "How I Started My Journey With React",
    description:
      "A short story about learning React, building projects, and improving my frontend development skills.",
    date: "Jan 15, 2026",
    category: "React",
    link: "#",
  },


  {
    id: 2,
    title: "Why TypeScript Is Important For Developers",
    description:
      "Understanding how TypeScript improves code quality, productivity, and large-scale applications.",
    date: "Feb 10, 2026",
    category: "TypeScript",
    link: "#",
  },


  {
    id: 3,
    title: "Building Modern Apps With Next.js",
    description:
      "Exploring Next.js features like server components, routing, and performance optimization.",
    date: "Mar 05, 2026",
    category: "Next.js",
    link: "#",
  },

];