import Link from "next/link";

const FOOTER_LINKS = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/#work", label: "Work" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/#services", label: "Platform engineering" },
    { href: "/#services", label: "API design" },
    { href: "/#services", label: "System migration" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms of service" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-wire/60 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-semibold">
              Anchorpoint<span className="text-signal">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-paper/60">
              We architect and build the software systems enterprise teams
              depend on to run.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-mono text-xs uppercase tracking-wider text-paper/40">
                {heading}
              </p>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 font-mono text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Anchorpoint Systems. All rights reserved.</p>
          <p>Built with Next.js &amp; ASP.NET Core</p>
        </div>
      </div>
    </footer>
  );
}
