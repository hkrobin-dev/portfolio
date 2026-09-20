"use client";

import { useBackground } from "@/context/BackgroundContext";

export default function BackgroundDecor() {
  const { bgStyle } = useBackground();

  if (bgStyle === "none") return null;

  if (bgStyle === "aurora") {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute left-1/4 top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute right-1/4 top-[20%] h-[400px] w-[400px] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-1/2 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      </div>
    );
  }

  if (bgStyle === "stars") {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 bg-background">
        {[...Array(70)].map((_, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-foreground/30"
            style={{ top: `${(i * 29) % 100}%`, left: `${(i * 53) % 100}%` }}
          />
        ))}
      </div>
    );
  }

  if (bgStyle === "grid") {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-background"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
        }}
      />
    );
  }

  if (bgStyle === "dots") {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-background"
        style={{
          backgroundImage: "radial-gradient(var(--color-border) 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
      />
    );
  }

  return null;
}
