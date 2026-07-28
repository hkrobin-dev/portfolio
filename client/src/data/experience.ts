export type ExperienceItem = {
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  points: string[];
  stack: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Frontend Developer",
    company: "Bd Calling Academy",
    companyUrl: "https://bdcallingacademy.com/",
    location: "Dhaka",
    period: "Sep 2025 - Dec 2025",
    points: [
      "Developed responsive web applications using React and TypeScript.",
      "Built REST APIs using Node.js and Express.js.",
      "Integrated MongoDB database for managing application data.",
      "Improved website performance and user experience."
    ],
    stack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
  },
];
