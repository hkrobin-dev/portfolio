"use client";

import { motion, useReducedMotion } from "framer-motion";

// A half-moon drawn with an SVG mask rather than an image.
//
// The mask matters: cutting the crescent with a second circle painted in
// --color-background would punch an opaque disc through whatever the visitor
// has chosen behind the page (the starfield, the aurora glow). Masking makes
// the cut genuinely transparent, so the background shows through the crescent.
//
// stopColor is set via style rather than the stop-color attribute because CSS
// custom properties are not reliably resolved in presentation attributes.
export default function CrescentMoon({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`relative flex h-28 w-28 items-center justify-center ${className}`}>
      {/* Soft glow so the moon reads as lit rather than as a flat sticker. */}
      <span
        aria-hidden="true"
        className="absolute inset-2 rounded-full bg-primary/40 blur-2xl"
      />

      <motion.svg
        viewBox="0 0 120 120"
        aria-hidden="true"
        className="relative h-24 w-24 drop-shadow-[0_0_18px_rgba(0,0,0,0.35)]"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <defs>
          <linearGradient id="crescent-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--color-primary)" }} />
            <stop offset="100%" style={{ stopColor: "var(--color-secondary)" }} />
          </linearGradient>

          {/* White circle is the moon, black circle bites a crescent out of
              it. Offset up-and-right so the opening faces that way. */}
          <mask id="crescent-mask">
            <rect width="120" height="120" fill="black" />
            <circle cx="60" cy="60" r="46" fill="white" />
            <circle cx="76" cy="50" r="44" fill="black" />
          </mask>
        </defs>

        <rect
          width="120"
          height="120"
          fill="url(#crescent-fill)"
          mask="url(#crescent-mask)"
        />
      </motion.svg>
    </div>
  );
}
