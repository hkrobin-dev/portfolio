"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// A slim divider that leads into Contact, not a banner. This used to be a
// full resume card, but the resume is already offered by Hero and the Navbar,
// so a third copy of the same pitch just interrupted the page.
export default function ScrollCue() {
  const { ui } = useLanguage();
  // Honour the OS setting rather than bobbing regardless.
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex items-center gap-4 px-6 py-8">
      {/* Rules fade in toward the middle so the colour reads as one line
          passing behind the arrow. primary/70 keeps them tied to whatever
          the admin has set in /admin/theme. */}
      <span
        aria-hidden="true"
        className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/70"
      />

      <motion.a
        href="#contact"
        aria-label={ui.scrollDown}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
      >
        <motion.span
          initial={{ y: 0 }}
          // whileInView rather than a bare repeat: the loop only starts once
          // the cue is near the viewport, and framer drops it again when it
          // scrolls away instead of animating off-screen forever.
          whileInView={reduceMotion ? { y: 0 } : { y: [0, 5, 0] }}
          viewport={{ once: true }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown size={20} />
        </motion.span>
      </motion.a>

      <span
        aria-hidden="true"
        className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/70"
      />
    </div>
  );
}
