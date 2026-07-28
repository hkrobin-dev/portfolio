const socials = [
  { label: "GitHub", url: "https://github.com/yourname" },
  { label: "LinkedIn", url: "https://linkedin.com/in/yourname" },
  { label: "Twitter", url: "https://x.com/yourname" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <div className="flex gap-4">
          {socials.map((social) => (
            <a key={social.label} href={social.url} target="_blank">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
