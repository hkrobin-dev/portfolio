"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; phase: number; speed: number };

type Layer = {
  count: number;
  radius: number;
  alpha: number;
  depth: number;
  twinkle: number;
  accent: boolean;
};

// Three depths so the field has genuine parallax: the far layer barely moves
// while the near layer drifts noticeably, which is what sells the depth when
// the pointer moves or the page scrolls.
//
// `depth` multiplies both the mouse and the scroll displacement. `twinkle` is
// a speed multiplier, so near stars pulse faster than distant ones.
const LAYERS: Layer[] = [
  { count: 120, radius: 0.8, alpha: 0.35, depth: 0.15, twinkle: 0.5, accent: false },
  { count: 70, radius: 1.3, alpha: 0.6, depth: 0.35, twinkle: 0.9, accent: false },
  { count: 30, radius: 2.0, alpha: 0.95, depth: 0.7, twinkle: 1.5, accent: true },
];

const MOUSE_RANGE = 30; // px of horizontal drift at depth 1
const SCROLL_RANGE = 60; // px of vertical drift across a full page scroll at depth 1
const SMOOTHING = 0.06; // pointer easing per frame — lower is smoother and slower
const TAU = Math.PI * 2;

// Keeps a star on screen no matter how far its layer has been offset, so the
// field never thins out at the edges as the pointer moves.
function wrap(v: number, max: number) {
  return ((v % max) + max) % max;
}

function seedStars(layer: Layer, width: number, height: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < layer.count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      phase: Math.random() * TAU,
      speed: (0.4 + Math.random() * 0.8) * layer.twinkle,
    });
  }
  return stars;
}

export default function SpaceField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let stars: Star[][] = [];

    // Normalised to -1..1 around the viewport centre, plus a smoothed copy
    // that the render loop eases towards. Drawing the raw pointer position
    // makes the whole field snap to the cursor, which looks jittery.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    // Star colours follow the admin's theme, so a rebrand carries through.
    // Read once per change rather than per frame — getComputedStyle inside
    // the loop would force a style recalculation on every single frame.
    let baseColour = "#f5f5f4";
    let accentColour = "#f97316";

    function readColours() {
      const style = getComputedStyle(document.documentElement);
      baseColour = style.getPropertyValue("--color-text").trim() || "#f5f5f4";
      accentColour = style.getPropertyValue("--color-primary").trim() || baseColour;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      // Capping DPR matters: on a 3x phone an uncapped canvas rasterises 9x
      // the pixels for a field of 2px dots that are indistinguishable anyway.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      stars = LAYERS.map((layer) => seedStars(layer, width, height));
    }

    function draw(time: number) {
      const t = time / 1000;

      pointer.x += (pointer.tx - pointer.x) * SMOOTHING;
      pointer.y += (pointer.ty - pointer.y) * SMOOTHING;

      // Scroll is read inside the loop rather than in a listener: one read per
      // frame, and no risk of the handler firing between layout and paint.
      const root = document.documentElement;
      const maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
      const scroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      ctx!.clearRect(0, 0, width, height);

      for (let li = 0; li < LAYERS.length; li++) {
        const layer = LAYERS[li];
        const ox = pointer.x * MOUSE_RANGE * layer.depth;
        const oy =
          pointer.y * MOUSE_RANGE * layer.depth - scroll * SCROLL_RANGE * layer.depth;

        for (const star of stars[li]) {
          const x = wrap(star.x + ox, width);
          const y = wrap(star.y + oy, height);
          const pulse = 0.65 + 0.35 * Math.sin(t * star.speed + star.phase);

          ctx!.globalAlpha = layer.alpha * pulse;
          ctx!.fillStyle = layer.accent ? accentColour : baseColour;
          ctx!.beginPath();
          ctx!.arc(x, y, layer.radius, 0, TAU);
          ctx!.fill();
        }
      }

      ctx!.globalAlpha = 1;
    }

    let frame = 0;
    let running = false;

    function loop(time: number) {
      if (!running) return;
      draw(time);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion.matches) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent) {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }

    // Drift back to centre when the pointer leaves, so the field settles
    // instead of staying frozen at the edge.
    function onPointerLeave() {
      pointer.tx = 0;
      pointer.ty = 0;
    }

    // A hidden tab still runs timers, so the loop is suspended rather than
    // burning battery animating stars nobody is looking at.
    function onVisibilityChange() {
      if (document.hidden) stop();
      else start();
    }

    function onReduceMotionChange() {
      if (reduceMotion.matches) {
        stop();
        draw(0);
      } else {
        start();
      }
    }

    // ThemeContext writes the CSS variables onto <html>; this picks up a
    // colour change without having to poll for it every frame.
    const themeObserver = new MutationObserver(readColours);

    resize();
    readColours();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMotion.addEventListener("change", onReduceMotionChange);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"],
    });

    if (reduceMotion.matches) {
      // Honour the OS setting: one static frame, no animation loop at all.
      draw(0);
    } else {
      start();
    }

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotion.removeEventListener("change", onReduceMotionChange);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <canvas ref={canvasRef} className="block h-full w-full" />
      {/* Static vignette — free depth cue, no per-frame cost. Keeps the
          corners from competing with the content sitting on top. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 0%, transparent 35%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
