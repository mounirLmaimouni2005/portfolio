'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from './NavLinks';
import HireButton from './HireButton';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-white/40 text-[#111827] backdrop-blur-md outline-none transition-colors duration-300 hover:bg-white/70 focus-visible:ring-2 focus-visible:ring-accent dark:border-white/15 dark:bg-white/5 dark:text-[var(--c-text)]"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-20 z-40 bg-black/20 backdrop-blur-sm"
              aria-hidden
            />
            <motion.nav
              id="mobile-nav"
              aria-label="Mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
              className="fixed right-0 top-20 z-50 flex h-[calc(100vh-5rem)] w-[280px] flex-col gap-1 border-l border-hairline bg-[var(--c-bg)] p-6 dark:border-white/10"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-[1.02rem] font-medium text-[var(--c-text)] outline-none transition-colors hover:bg-black/[0.04] hover:text-accent focus-visible:ring-2 focus-visible:ring-accent dark:hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
              <HireButton className="mt-4 w-full" />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
