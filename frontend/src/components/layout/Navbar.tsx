"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/#services", label: "Services" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/technologies", label: "Technologies" },
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-wire/60 bg-paper/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight text-ink">
          Anchorpoint
          <span className="ml-0.5 text-signal">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-sm text-graphite/70 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden rounded-sm bg-ink px-5 py-2.5 font-mono text-sm text-paper transition-colors hover:bg-signal md:inline-block"
        >
          Start a project
        </Link>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6 text-ink" /> : <Menu className="h-6 w-6 text-ink" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-wire/60 bg-paper md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-mono text-sm text-graphite/70 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-sm bg-ink px-5 py-2.5 text-center font-mono text-sm text-paper"
              >
                Start a project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
