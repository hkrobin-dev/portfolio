import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Your Name — Full Stack Developer",
  description: "Portfolio of Your Name, building web experiences with React and Node.js.",
  openGraph: {
    title: "Your Name — Full Stack Developer",
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
