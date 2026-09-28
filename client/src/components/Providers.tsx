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
      {/* BackgroundProvider sits above ThemeProvider because the starfield
          forces dark mode: a near-black sky behind light mode's near-black
          text is unreadable, so ThemeProvider has to read bgStyle. It is pure
          localStorage state with no dependencies, so hoisting it is safe. */}
      <BackgroundProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BackgroundProvider>
    </SiteProvider>
  );
}
