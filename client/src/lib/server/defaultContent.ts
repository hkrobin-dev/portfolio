// Default seed content. Everything here is editable later from the Admin Panel.
// bn/en pairs let the site switch between Bangla and English.

export const defaultContent = {
  meta: {
    siteTitle: { en: "Hasan Kabir Robin — Portfolio", bn: "হাসান কবির রবিন — পোর্টফোলিও" },
    faviconUrl: "/images/profile.jpeg",
    updatedAt: new Date().toISOString(),
  },

  theme: {
    defaultMode: "dark", // "dark" | "light"
    colors: {
      primary: "#f97316",
      secondary: "#ef4444",
      accent: "#f59e0b",
      backgroundDark: "#090909",
      surfaceDark: "#111827",
      textDark: "#f5f5f5",
      backgroundLight: "#ffffff",
      surfaceLight: "#f3f4f6",
      textLight: "#111111",
    },
  },

  hero: {
    greeting: { en: "👋 Hey, I'm", bn: "👋 হ্যালো, আমি" },
    name: "Hasan Kabir Robin",
    role: { en: "Full Stack Developer", bn: "ফুল স্ট্যাক ডেভেলপার" },
    description: {
      en: "Passionate about building scalable web applications with clean architecture and modern development practices using Next.js, React, TypeScript, Node.js, Express, PostgreSQL and Prisma.",
      bn: "Next.js, React, TypeScript, Node.js, Express, PostgreSQL এবং Prisma দিয়ে স্কেলেবল ও আধুনিক ওয়েব অ্যাপ্লিকেশন তৈরি করতে আমি পছন্দ করি।",
    },
    email: "hkrobin48@gmail.com",
    phone: "+8801302012386",
    whatsapp: "https://wa.me/8801302012386",
    resumeUrl: "/FullStack-Hasan-Kabir-Robin.pdf",
    socials: {
      github: "https://github.com/hkrobin-dev",
      linkedin: "https://www.linkedin.com/in/hk-robin/",
      facebook: "https://www.facebook.com/mdhk.robin.5",
      twitter: "https://x.com/HkRobin8",
    },
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "MongoDB"],
  },

  about: {
    badge: { en: "About Me", bn: "আমার সম্পর্কে" },
    heading: { en: "Get to Know Me.", bn: "আমাকে জানুন।" },
    subheading: {
      en: "Learn more about my journey, interests, and passion for software development.",
      bn: "আমার যাত্রা, আগ্রহ এবং সফটওয়্যার ডেভেলপমেন্টের প্রতি ভালোবাসা সম্পর্কে জানুন।",
    },
    imageUrl: "/images/profile.jpeg",
    gallery: [],
    nameHighlight: "Hasan Kabir Robin",
    paragraphs: [
      {
        en: "I am a passionate Full-Stack Developer from Bangladesh who enjoys building modern, scalable, and user-friendly web applications.",
        bn: "আমি বাংলাদেশের একজন ফুল-স্ট্যাক ডেভেলপার, যিনি আধুনিক ও ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন তৈরি করতে ভালোবাসেন।",
      },
      {
        en: "My programming journey started in October 2023 while pursuing my Diploma in Computer Science & Technology.",
        bn: "আমার প্রোগ্রামিং যাত্রা শুরু হয় ২০২৩ সালের অক্টোবরে, যখন আমি কম্পিউটার সায়েন্স ও টেকনোলজিতে ডিপ্লোমা করছিলাম।",
      },
      {
        en: "I enjoy developing full-stack web applications, designing clean UIs, building secure backend APIs, and integrating databases.",
        bn: "আমি ফুল-স্ট্যাক অ্যাপ্লিকেশন, ক্লিন UI, নিরাপদ ব্যাকএন্ড API এবং ডাটাবেজ ইন্টিগ্রেশন নিয়ে কাজ করতে পছন্দ করি।",
      },
      {
        en: "Outside of programming, I enjoy playing cricket, exploring new technologies, and continuously improving my problem-solving skills.",
        bn: "প্রোগ্রামিং ছাড়াও আমি ক্রিকেট খেলতে এবং নতুন প্রযুক্তি নিয়ে জানতে পছন্দ করি।",
      },
    ],
    stats: [
      { number: "10+", label: { en: "Projects Completed", bn: "প্রজেক্ট সম্পন্ন" } },
      { number: "20+", label: { en: "Technologies & Tools", bn: "টেকনোলজি ও টুলস" } },
      { number: "1000+", label: { en: "Hours of Learning", bn: "ঘন্টার শেখা" } },
    ],
  },

  skills: [
    {
      category: { en: "Languages", bn: "ভাষা" },
      items: [
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
        { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
        { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      ],
    },
    {
      category: { en: "Frontend", bn: "ফ্রন্টএন্ড" },
      items: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
        { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
        { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Redux Toolkit", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg" },
      ],
    },
    {
      category: { en: "Backend", bn: "ব্যাকএন্ড" },
      items: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
        { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/white" },
        { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
      ],
    },
    {
      category: { en: "Database & Tools", bn: "ডাটাবেজ ও টুলস" },
      items: [
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
        { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white" },
      ],
    },
  ],

  experience: [
    {
      id: "exp-1",
      role: { en: "Frontend Developer", bn: "ফ্রন্টএন্ড ডেভেলপার" },
      company: "Bd Calling Academy",
      companyUrl: "https://bdcallingacademy.com/",
      location: { en: "Dhaka", bn: "ঢাকা" },
      period: "Sep 2025 - Dec 2025",
      points: [
        { en: "Developed responsive web applications using React and TypeScript.", bn: "React ও TypeScript দিয়ে রেস্পন্সিভ ওয়েব অ্যাপ তৈরি করেছি।" },
        { en: "Built REST APIs using Node.js and Express.js.", bn: "Node.js ও Express.js দিয়ে REST API তৈরি করেছি।" },
        { en: "Integrated MongoDB database for managing application data.", bn: "অ্যাপ্লিকেশন ডেটা পরিচালনার জন্য MongoDB ইন্টিগ্রেট করেছি।" },
      ],
      stack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    },
  ],

  education: [
    {
      id: "edu-1",
      degree: { en: "B.Sc. in Computer Science & Engineering", bn: "কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং-এ বিএসসি" },
      institute: { en: "Northern University Bangladesh", bn: "নর্দান ইউনিভার্সিটি বাংলাদেশ" },
      period: "2026 - Present",
      location: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
      extra: {
        en: "Currently pursuing a Bachelor's degree with focus on Software Engineering and system design.",
        bn: "বর্তমানে সফটওয়্যার ইঞ্জিনিয়ারিং ও সিস্টেম ডিজাইনের উপর ব্যাচেলর ডিগ্রি করছি।",
      },
      badge: "",
    },
    {
      id: "edu-2",
      degree: { en: "Diploma in Computer Science & Technology", bn: "কম্পিউটার সায়েন্স ও টেকনোলজিতে ডিপ্লোমা" },
      institute: { en: "Chattogram Polytechnic Institute", bn: "চট্টগ্রাম পলিটেকনিক ইনস্টিটিউট" },
      period: "2022 - 2026",
      location: { en: "Chattogram, Bangladesh", bn: "চট্টগ্রাম, বাংলাদেশ" },
      extra: { en: "", bn: "" },
      badge: "CGPA: 3.23 / 4.00",
    },
    {
      id: "edu-3",
      degree: { en: "Secondary School Certificate (SSC)", bn: "মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি)" },
      institute: { en: "Ashirpar High School", bn: "আশিরপাড় উচ্চ বিদ্যালয়" },
      period: "Completed in 2021",
      location: { en: "", bn: "" },
      extra: { en: "", bn: "" },
      badge: "GPA: 4.72 / 5.00",
    },
  ],

  projects: [
    {
      id: "proj-1",
      title: "GearUp - Sports & Outdoor Gear Rental Platform",
      description: {
        en: "A modern and responsive frontend for a sports & outdoor gear rental marketplace, featuring secure authentication, dynamic gear browsing, role-based dashboards, and Stripe payment integration.",
        bn: "একটি আধুনিক স্পোর্টস গিয়ার রেন্টাল প্ল্যাটফর্ম, যেখানে সিকিউর অথেনটিকেশন, রোল-বেজড ড্যাশবোর্ড এবং Stripe পেমেন্ট ইন্টিগ্রেশন রয়েছে।",
      },
      longDescription: {
        en: "GearUp connects outdoor enthusiasts with local gear owners. It includes a full authentication flow, browsing and filtering gear by category, a booking/checkout flow backed by Stripe, and separate dashboards for renters and gear owners to manage listings, bookings and earnings.",
        bn: "GearUp আউটডোর প্রেমীদের স্থানীয় গিয়ার মালিকদের সাথে সংযুক্ত করে। এতে রয়েছে সম্পূর্ণ অথেনটিকেশন ফ্লো, ক্যাটাগরি অনুযায়ী গিয়ার ব্রাউজিং, Stripe দিয়ে বুকিং ফ্লো, এবং রেন্টার ও মালিকদের জন্য আলাদা ড্যাশবোর্ড।",
      },
      image: "/images/pGear.png",
      gallery: [],
      stack: ["Next.js", "TypeScript", "Tailwind CSS", "TanStack Query", "Stripe", "Framer Motion"],
      liveUrl: "https://gear-up-neon.vercel.app",
      codeUrl: "https://github.com/hkrobin-dev/GearUp-Frontend",
      category: { en: "Full-Stack", bn: "ফুল-স্ট্যাক" },
      features: [
        { title: "🔐 Authentication", description: { en: "Secure JWT login with role-based access.", bn: "রোল-বেজড JWT লগইন সিস্টেম।" } },
        { title: "💳 Online Payment", description: { en: "Stripe integration for secure checkout.", bn: "নিরাপদ চেকআউটের জন্য Stripe ইন্টিগ্রেশন।" } },
      ],
    },
    {
      id: "proj-2",
      title: "Restaurant Management System",
      description: {
        en: "A full-stack restaurant management platform for food ordering, table reservations, menu management, and secure payment.",
        bn: "ফুড অর্ডারিং, টেবিল রিজার্ভেশন ও মেনু ম্যানেজমেন্টের জন্য একটি ফুল-স্ট্যাক রেস্টুরেন্ট ম্যানেজমেন্ট প্ল্যাটফর্ম।",
      },
      longDescription: {
        en: "Built for a real cafe client, this system covers the full ordering pipeline: browsing the digital menu, placing orders, reserving tables, and an admin dashboard for managing orders, reservations and the menu with Stripe-powered payments.",
        bn: "এই সিস্টেমে রয়েছে সম্পূর্ণ অর্ডারিং পাইপলাইন: ডিজিটাল মেনু ব্রাউজিং, অর্ডার প্লেস করা, টেবিল রিজার্ভেশন, এবং অ্যাডমিন ড্যাশবোর্ড থেকে অর্ডার ও রিজার্ভেশন ম্যানেজমেন্ট।",
      },
      image: "/images/cafe-ali.png",
      gallery: [],
      stack: ["React.js", "Tailwind CSS", "TanStack Query", "Stripe"],
      liveUrl: "https://cafe-ali-client.vercel.app/",
      codeUrl: "https://github.com/hkrobin-dev/cafe-ali-client",
      category: { en: "Full Stack", bn: "ফুল স্ট্যাক" },
      features: [
        { title: "🍽️ Menu Management", description: { en: "Browse and manage food items.", bn: "খাবারের মেনু ব্যবস্থাপনা।" } },
        { title: "📊 Admin Dashboard", description: { en: "Manage orders and reservations.", bn: "অর্ডার ও রিজার্ভেশন ম্যানেজমেন্ট।" } },
      ],
    },
  ],

  blogs: [
    {
      id: "blog-1",
      title: { en: "How I Started My Journey With React", bn: "যেভাবে React দিয়ে আমার যাত্রা শুরু হয়" },
      description: {
        en: "A short story about learning React, building projects, and improving my frontend development skills.",
        bn: "React শেখা, প্রজেক্ট তৈরি এবং ফ্রন্টএন্ড স্কিল উন্নয়নের একটি ছোট গল্প।",
      },
      content: {
        en: "It all started in October 2023 when I was pursuing my Diploma in Computer Science.\n\nI picked up React because I wanted to build interactive interfaces instead of static pages. The component model clicked with me quickly — breaking a UI into small, reusable pieces just made sense.\n\nAfter a few small projects, I moved on to state management, then to Next.js for full applications with routing and APIs built in. Today React is at the core of almost everything I build.",
        bn: "শুরুটা হয়েছিল ২০২৩ সালের অক্টোবরে, যখন আমি কম্পিউটার সায়েন্সে ডিপ্লোমা করছিলাম।\n\nআমি React বেছে নিয়েছিলাম কারণ আমি স্ট্যাটিক পেজের বদলে ইন্টারেক্টিভ ইন্টারফেস তৈরি করতে চেয়েছিলাম। Component model খুব দ্রুত আমার কাছে সহজ মনে হয়েছিল।\n\nকয়েকটা ছোট প্রজেক্টের পর আমি state management শিখি, তারপর পুরো অ্যাপ্লিকেশনের জন্য Next.js-এ চলে আসি। আজ React আমার প্রায় সব কাজের মূল ভিত্তি।",
      },
      date: "Jan 15, 2026",
      category: "React",
      image: "",
    },
    {
      id: "blog-2",
      title: { en: "Why TypeScript Is Important For Developers", bn: "কেন TypeScript ডেভেলপারদের জন্য গুরুত্বপূর্ণ" },
      description: {
        en: "Understanding how TypeScript improves code quality, productivity, and large-scale applications.",
        bn: "TypeScript কীভাবে কোড কোয়ালিটি ও প্রোডাক্টিভিটি বাড়ায় তা জানুন।",
      },
      content: {
        en: "TypeScript adds static types on top of JavaScript, which catches a huge class of bugs before the code ever runs.\n\nOn larger codebases, types act as documentation — anyone opening a function can see exactly what it expects and returns, without digging through the implementation.\n\nEditors also get much smarter autocomplete and refactoring support, which pays off hugely as a project grows.",
        bn: "TypeScript জাভাস্ক্রিপ্টের উপর স্ট্যাটিক টাইপ যোগ করে, যা কোড রান হওয়ার আগেই অনেক বাগ ধরে ফেলে।\n\nবড় কোডবেজে টাইপগুলো ডকুমেন্টেশনের মতো কাজ করে — কেউ একটা ফাংশন খুললেই বুঝতে পারে সেটা কী আশা করে এবং কী রিটার্ন করে।\n\nএডিটরের autocomplete ও refactoring সাপোর্টও অনেক ভালো হয়, যা প্রজেক্ট বড় হওয়ার সাথে সাথে অনেক উপকারী।",
      },
      date: "Feb 10, 2026",
      category: "TypeScript",
      image: "",
    },
  ],

  contact: {
    badge: { en: "Contact", bn: "যোগাযোগ" },
    heading: { en: "Get in Touch.", bn: "যোগাযোগ করুন।" },
    subheading: {
      en: "Have a project in mind or just want to say hello?",
      bn: "কোনো প্রজেক্ট নিয়ে কথা বলতে চান বা শুধু হ্যালো বলতে চান?",
    },
    email: "hkrobin48@gmail.com",
    phone: "+8801302012386",
    whatsapp: "https://wa.me/8801302012386",
    location: { en: "Dhaka, Bangladesh", bn: "ঢাকা, বাংলাদেশ" },
  },

  footer: {
    name: "Hasan Kabir Robin",
    tagline: { en: "Built with Next.js & Tailwind CSS", bn: "Next.js ও Tailwind CSS দিয়ে তৈরি" },
    socials: {
      github: "https://github.com/hkrobin-dev/",
      linkedin: "https://www.linkedin.com/in/hk-robin/",
      twitter: "https://x.com/HkRobin8",
    },
  },
};

export type SiteContentType = typeof defaultContent;
