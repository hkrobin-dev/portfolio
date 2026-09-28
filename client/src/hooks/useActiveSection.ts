"use client";

import { useEffect, useRef, useState } from "react";

// Sits just under the navbar and close to the global `scroll-margin-top: 6.5rem`
// on `section[id]`, so a link lights up roughly as smooth scrolling settles on
// its target rather than noticeably before or after it.
const PROBE_OFFSET = 120;

/**
 * Returns the href of the section currently in view, for navbar highlighting.
 *
 * Pass the nav hrefs in page order (`["#hero", "#about", ...]`). The probe
 * finds the section containing it; when the probe lands in a section that has
 * no nav link — Education is the only one today — the last linked section
 * above it stays selected, so the navbar never goes blank mid-scroll. The same
 * fallback keeps Contact lit once you scroll past it into the footer.
 *
 * Returns null when nothing matches (e.g. on /admin, which has no sections),
 * which callers can treat as "no link is active".
 */
export default function useActiveSection(hrefs: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const frame = useRef(0);
  const lastEmitted = useRef<string | null>(null);

  // Navbar rebuilds its link array on every render, so the effect depends on
  // the joined value. Depending on the array itself would tear down and re-add
  // every listener on every single frame.
  const key = hrefs.join(",");

  useEffect(() => {
    const measure = () => {
      frame.current = 0;
      const probe = window.scrollY + PROBE_OFFSET;
      let current: string | null = null;
      let previous: string | null = null;

      for (const href of key.split(",")) {
        const el = document.getElementById(href.replace(/^#/, ""));
        if (!el) continue;

        // getBoundingClientRect is viewport-relative while the probe is in
        // document space, so shift the section into the same frame.
        const { top, bottom } = el.getBoundingClientRect();
        const absTop = top + window.scrollY;
        const absBottom = bottom + window.scrollY;

        if (absTop <= probe) previous = href;
        if (absTop <= probe && probe < absBottom) {
          current = href;
          break; // hrefs are in page order, so nothing after this can match
        }
      }

      const next = current ?? previous;
      // Guard the setter: a still page measures every frame, and setting state
      // to an identical value still costs a render pass.
      if (next !== lastEmitted.current) {
        lastEmitted.current = next;
        setActive(next);
      }
    };

    // Scroll events fire far faster than the screen refreshes, so coalesce
    // bursts into a single measurement per animation frame.
    const schedule = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // Section heights change as content streams in from the API, which would
    // otherwise leave the highlight stale until the next scroll event.
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return active;
}
