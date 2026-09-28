"use client";

import { useBackground } from "@/context/BackgroundContext";
import SpaceField from "./SpaceField";

export default function BackgroundDecor() {
  const { bgStyle } = useBackground();

  if (bgStyle === "none") return null;

  // Canvas starfield with pointer + scroll parallax and per-star twinkle.
  // Isolated in its own component so the rAF loop, the resize/DPR handling
  // and the reduced-motion branch are torn down with it — the four CSS-only
  // styles below never pay for a single frame of animation.
  if (bgStyle === "stars") return <SpaceField />;

  if (bgStyle === "aurora") {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
        <div className="absolute left-1/4 top-[-10%] h-[500px] w-[500px] rounded-full bg-primary/25 blur-[120px]" />
        <div className="absolute right-1/4 top-[20%] h-[400px] w-[400px] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-1/2 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
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
