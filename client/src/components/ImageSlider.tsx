"use client";

import { useEffect, useState } from "react";
import { resolveMediaUrl } from "@/lib/api";

export default function ImageSlider({
  images,
  alt,
  autoPlay = false,
  intervalMs = 3500,
  aspectClassName = "aspect-video",
}: {
  images: string[];
  alt: string;
  autoPlay?: boolean;
  intervalMs?: number;
  aspectClassName?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const valid = (images || []).filter(Boolean);

  // Auto-advance one image at a time. Pauses while the visitor is hovering
  // (desktop) so it doesn't fight with someone trying to read/click.
  useEffect(() => {
    if (!autoPlay || paused || valid.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % valid.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [autoPlay, paused, intervalMs, valid.length]);

  // If the number of images shrinks (e.g. one removed in admin), keep the index valid.
  useEffect(() => {
    if (index >= valid.length) setIndex(0);
  }, [valid.length, index]);

  if (valid.length === 0) return null;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fixed aspect ratio so any uploaded image size looks consistent and never breaks the layout */}
      <div className={`relative ${aspectClassName} w-full overflow-hidden rounded-3xl border border-border bg-surface`}>
        {/* All images are stacked and cross-fade via opacity — no DOM swap, so the
            transition is smooth instead of an instant jump-cut. */}
        {valid.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img + i}
            src={resolveMediaUrl(img)}
            alt={`${alt} — image ${i + 1}`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity ease-in-out"
            style={{
              opacity: i === index ? 1 : 0,
              transitionDuration: "1200ms",
              zIndex: i === index ? 1 : 0,
            }}
          />
        ))}

        {valid.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {valid.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
