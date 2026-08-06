'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={dark}
      className="group grid h-11 w-11 place-items-center rounded-full border border-hairline bg-white/40 backdrop-blur-md outline-none transition-colors duration-300 hover:bg-white/70 focus-visible:ring-2 focus-visible:ring-accent dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <span className="text-[#111827] transition-transform duration-500 ease-out group-hover:rotate-180 dark:text-[var(--c-text)]">
        {mounted && dark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
      </span>
    </button>
  );
}
