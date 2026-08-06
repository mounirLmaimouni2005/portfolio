'use client';

import { useEffect, useState } from 'react';
import NavLinks from './NavLinks';
import HireButton from './HireButton';
import ThemeToggle from './ThemeToggle';
import MobileMenu from './MobileMenu';

function Logo() {
  return (
    <a
      href="#hero"
      aria-label="M. Maimouni — home"
      className="group flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c-bg)]"
    >
      {/* Monogram mark */}
      <span className="grid h-9 w-9 place-items-center text-[#111827] dark:text-[var(--c-text)]">
        <svg width="31" height="31" viewBox="0 0 40 40" fill="none" aria-hidden>
          <path
            d="M6 32V10.6c0-1.1 1.3-1.6 2-.8L20 21.5l12-11.7c.8-.8 2-.3 2 .8V32"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="font-display text-[1.22rem] font-extrabold tracking-[-0.02em] text-[#111827] dark:text-[var(--c-text)]">
        M. Maimouni
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-[200] border-b transition-all duration-300 ${
        scrolled
          ? 'border-hairline bg-[var(--c-bg)]/85 shadow-[0_4px_24px_-14px_rgba(15,23,42,0.22)] backdrop-blur-xl'
          : 'border-hairline/70 bg-[var(--c-bg)]/70 backdrop-blur-md'
      }`}
    >
      <div className="relative flex h-20 w-full items-center justify-between px-10 max-md:px-5">
        {/* LEFT — logo */}
        <Logo />

        {/* CENTER — navigation */}
        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <NavLinks />
        </nav>

        {/* RIGHT — CTA + theme (+ mobile menu) */}
        <div className="flex items-center gap-3">
          <HireButton className="hidden sm:inline-flex" />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
