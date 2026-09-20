"use client";

import { ReactNode } from "react";
import { SiteProvider } from "@/context/SiteContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { BackgroundProvider } from "@/context/BackgroundContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <BackgroundProvider>{children}</BackgroundProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </SiteProvider>
  );
}
