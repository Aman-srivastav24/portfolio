"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const nav = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "bg-canvas/85 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1664px] items-center justify-between px-4 sm:px-8">
        <a href="#top" className="font-display text-sm font-bold tracking-[0.3em]" onClick={() => setOpen(false)}>
          AMAN SRIVASTAV<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="group relative text-sm font-medium">
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href={`mailto:${profile.email}`}
          className="hidden text-label font-medium transition-colors hover:text-accent lg:block"
        >
          {profile.email}
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="relative h-8 w-8 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`absolute left-1 right-1 h-0.5 bg-ink transition-transform duration-300 ${
              open ? "top-1/2 rotate-45" : "top-[11px]"
            }`}
          />
          <span
            className={`absolute left-1 right-1 h-0.5 bg-ink transition-transform duration-300 ${
              open ? "top-1/2 -rotate-45" : "top-[19px]"
            }`}
          />
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-4 pb-6 pt-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-4xl font-medium tracking-tight"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`} className="mt-4 text-label text-muted">
            {profile.email}
          </a>
        </nav>
      )}
    </header>
  );
}
