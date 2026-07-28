export type Project = {
  title: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  codeUrl?: string;
  image: string;
  slug: string;
  category: string;
  features: {
    title: string;
    description: string;
  }[];
};

export const projects : Project[] = [
  {
    title: "Restaurant Management System",
    description: "Full-stack restaurant management platform...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    liveUrl: "",
    codeUrl: "",
    slug: "restaurant-management",
    category: "Full Stack",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Two",
    description: "Description for project two...",
    image: "/images/profile.jpeg",
    stack: ["React", "Node.js", "MongoDB"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-two",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description for project three...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "Tailwind"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-three",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description for project three...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "Tailwind"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-three",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description for project three...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "Tailwind"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-three",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
  {
    title: "Project Three",
    description: "Description for project three...",
    image: "/images/profile.jpeg",
    stack: ["Next.js", "Tailwind"],
    liveUrl: "",
    codeUrl: "",
    slug: "project-three",
    category: "Frontend",
    features: [
      {
        title: "🔐 JWT Authentication",
        description: "Secure login with role-based authorization.",
      },
      {
        title: "💳 Payment",
        description: "SSLCommerz / Stripe integration.",
      },
      {
        title: "📊 Dashboard",
        description: "Separate Admin & User Dashboard.",
      },
      {
        title: "⚡ Performance",
        description: "Fast loading & responsive UI.",
      },
    ],
  },
];
