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

export const projects: Project[] = [
  {
    title: "GearUp - Sports & Outdoor Gear Rental Platform",
    description:
      "A modern and responsive frontend for a sports & outdoor gear rental marketplace, featuring secure authentication, dynamic gear browsing, role-based dashboards, Stripe payment integration, and an intuitive user experience.",

    image: "/images/pGear.png",

    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "React Hook Form",
      "Zod",
      "Axios",
      "Stripe",
      "Framer Motion"
    ],

    liveUrl: "https://gear-up-neon.vercel.app",

    codeUrl: "https://github.com/hkrobin-dev/GearUp-Frontend",

    slug: "gearup",

    category: "Full-Stack",

    features: [
      {
        title: "🔐 Authentication",
        description: "Secure JWT login with role-based access.",
      },
      {
        title: "🔍 Smart Search",
        description: "Search, filter, and browse gear easily.",
      },
      {
        title: "💳 Online Payment",
        description: "Stripe integration for secure checkout.",
      },
      {
        title: "📱 Responsive UI",
        description: "Modern, fast, and mobile-friendly interface.",
      },
    ],
  },
  {
    title: "Restaurant Management System",

    description:
      "A full-stack restaurant management platform for food ordering, table reservations, menu management, and secure payment.",

    image: "/images/cafe-ali.png",

    stack: [
      "React.js",
      "Tailwind CSS",
      "TanStack Query",
      "React Hook Form",
      "Axios",
      "Strip"
    ],

    liveUrl: "https://cafe-ali-client.vercel.app/",

    codeUrl: "https://github.com/hkrobin-dev/cafe-ali-client",

    slug: "restaurant-management",

    category: "Full Stack",

    features: [
      {
        title: "🍽️ Menu Management",
        description: "Browse and manage food items with categories.",
      },
      {
        title: "📅 Order Food",
        description: "Order Food On Online.",
      },
      {
        title: "💳 Secure Payment",
        description: "Stripe integration for online payments.",
      },
      {
        title: "📊 Admin Dashboard",
        description: "Manage orders, reservations, and menu items.",
      },
    ],
  },
  
{
  title: "Football Club Management System",

  description:
    "A full-stack football club management platform for managing players, matches, news posts, and club activities with role-based dashboards.",

  image: "/images/footballclub.png",

  stack: [
    "React.js",
    "javaScript",
    "Tailwind CSS",
    "Axios",
    "JWT"
  ],

  liveUrl: "https://ashir-par-football-club.vercel.app/",

  codeUrl: "https://github.com/hkrobin-dev/Ashir-Par-FoodBall-Club",

  slug: "football-club-management",

  category: "Full Stack",

  features: [
    {
      title: "📊 Role-Based Dashboard",
      description: "Separate Admin and User dashboards.",
    },
    {
      title: "⚽ Player & Match",
      description: "View players, upcoming matches, and match results.",
    },
    {
      title: "📝 News & Posts",
      description: "Admins can publish club news and announcements.",
    },
    {
      title: "🔐 Authentication",
      description: "Secure JWT authentication with role-based access.",
    },
  ],
},
{
  title: "Free Food Donation Platform",

  description:
    "A full-stack food donation platform that connects food donors with people in need, helping reduce food waste through easy donation and request management.",

  image: "/images/freefood.png",

  stack: [
    "React",
    "axios",
    "React-hook-from",
    "Firebase",
    "Tailwind CSS"
  ],

  liveUrl: "https://free-food-client-vm9f.vercel.app/",

  codeUrl: "https://github.com/hkrobin-dev/Free-food-client",

  slug: "food-donation",

  category: "Full Stack",

  features: [
    {
      title: "🍛 Food Donation",
      description: "Donate surplus food with pickup details.",
    },
    {
      title: "🙌 Food Requests",
      description: "Users can request available food donations.",
    },
    {
      title: "📦 Donation Tracking",
      description: "Manage donation status and request history.",
    },
    {
      title: "🔐 Authentication",
      description: "Secure login with Firebase authentication.",
    },
  ],
},
{
  title: "MovieHub - Online Movie Platform",

  description:
    "A modern movie browsing platform with trending movies, detailed information, search, and responsive UI for an engaging viewing experience.",

  image: "/images/movie.png",

  stack: [
    "React",
    "javaScript",
    "Tailwind CSS",
    "React Router",
    "Axios",
    
  ],

  liveUrl: "https://online-movie-all.netlify.app/",

  codeUrl: "https://github.com/hkrobinbrother/online-movie",

  slug: "DRAMATIC",

  category: "Frontend",

  features: [
    {
      title: "🎬 Movie Explorer",
      description: "Browse trending and popular movies.",
    },
    {
      title: "🔍 Smart Search",
      description: "Search movies with real-time results.",
    },
    {
      title: "📄 Movie Details",
      description: "View ratings, overview, and trailers.",
    },
    {
      title: "📱 Responsive UI",
      description: "Modern design optimized for all devices.",
    },
  ],
}
 
];
