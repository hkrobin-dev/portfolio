import type { Metadata } from "next";
import { Toaster } from "sonner";
// @ts-ignore
import "./globals.css";
import Providers from "@/components/Providers";
import BackgroundDecor from "@/components/BackgroundDecor";
import BackgroundPicker from "@/components/BackgroundPicker";

export const metadata: Metadata = {
  title: "Hk's Portfolio",
  description: "Portfolio of Hasan Kabir Robin, building web experiences with React and Node.js.",
  icons: {
    icon: "/images/profile.jpeg",
  },
  openGraph: {
    title: "Hasan Kabir Robin — Full Stack Developer",
    description: "Portfolio of Hasan Kabir Robin, building web experiences with React and Node.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <BackgroundDecor />
          {children}
          <BackgroundPicker />
          <Toaster position="bottom-right" richColors closeButton duration={2000} />
        </Providers>
      </body>
    </html>
  );
}
