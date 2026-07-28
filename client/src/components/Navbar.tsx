import Link from "next/link";

const links = [
  "Home",
  "About",
  "Projects",
  "Skills",
  "Experience",
  "Blog",
  "Testimonials",
  "Contact",
];

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-2xl border border-border bg-background/80 px-6 py-3 backdrop-blur">

        {/* Logo */}
        <Link
          href="#hero"
          className="font-display text-xl font-bold text-foreground"
        >
          Robin<span className="text-red-500">.</span>
        </Link>

        {/* Menu */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link, index) => (
            <Link
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`font-bold transition ${
                index === 0
                  ? "rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2 text-red-400"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link}
            </Link>
          ))}

          {/* Resume Button */}
          <Link
            href="/resume.pdf"
            target="_blank"
            className="text-sm font-medium text-red-400 transition hover:text-red-300"
          >
            Resume
          </Link>
        </div>

      </div>
    </nav>
  );
}