import type { Metadata } from "next";
import { Toaster } from "sonner";
// @ts-ignore
import "./globals.css";

export const metadata: Metadata = {
  title: "Hk's Portfolio",
  description: "Portfolio of Your Name, building web experiences with React and Node.js.",
  icons: {
    icon: "/images/profile.jpeg",
  },

  openGraph: {
    title: "Hasan Kabir Robin — Full Stack Developer",
    description: "Portfolio of Your Name, building web experiences with React and Node.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}<Toaster
          position="bottom-right"
          richColors
          closeButton
          duration={2000}
        /></body>
    </html>
  );
}
