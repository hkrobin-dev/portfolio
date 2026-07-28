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
    role: "Your Role",
    company: "Company Name",
    companyUrl: "https://example.com",
    location: "City",
    period: "Jan 2024 - Present",
    points: [
      "Key responsibility or achievement in this role",
      "Another measurable impact you had",
    ],
    stack: ["React", "TypeScript", "Node.js"],
  },
];
