/** @type {import('next').NextConfig} */
const nextConfig = {
  // The API lives in src/app/api and uses Node-only libraries. Keeping them
  // out of the bundler avoids tracing native/optional deps (pg's pg-native,
  // sharp's platform binaries) and the "Critical dependency" warnings.
  // On Next 15 this option is renamed to `serverExternalPackages`.
  experimental: {
    serverComponentsExternalPackages: [
      "pg",
      "pg-native",
      "sharp",
      "@vercel/blob",
      "nodemailer",
      "jsonwebtoken",
    ],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
       {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

module.exports = nextConfig;
