'use client';

import { ArrowRight } from 'lucide-react';

export default function HireButton({ className = '' }: { className?: string }) {
  return (
    <a
      href="#contact"
      aria-label="Hire Me — go to the contact section"
      className={`group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-ink px-7 text-[0.95rem] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(15,23,42,0.5)] outline-none transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-10px_rgba(15,23,42,0.55)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c-bg)] dark:bg-accent dark:hover:bg-accent-hover ${className}`}
    >
      Hire Me
      <ArrowRight
        className="h-[18px] w-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1"
        strokeWidth={2.2}
      />
    </a>
  );
}
