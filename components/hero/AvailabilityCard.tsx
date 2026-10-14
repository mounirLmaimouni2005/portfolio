'use client';

import { motion } from 'framer-motion';

const ROLES = ['Internships', 'Freelance', 'Junior Roles'];

export default function AvailabilityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
      className="w-full max-w-[380px]"
    >
      <div
        className="animate-floatCard relative overflow-hidden rounded-[30px] border border-white/70 bg-white/55 p-8 backdrop-blur-2xl backdrop-saturate-150"
        style={{
          boxShadow:
            '0 2px 6px rgba(15,40,30,0.05), 0 30px 60px -28px rgba(15,40,30,0.28), 0 60px 100px -40px rgba(15,40,30,0.3), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 0 1px rgba(255,255,255,0.25)',
        }}
      >
        {/* glass sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[45%] rounded-t-[30px]"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55), transparent)' }}
        />
        <div className="relative mb-6 flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--hg-dot)] shadow-[0_0_0_4px_rgba(79,184,127,0.2)]" />
          <span className="text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-[var(--hg-text-2)]">
            Available for
          </span>
        </div>

        <ul className="relative space-y-0.5">
          {ROLES.map((r) => (
            <li
              key={r}
              className="font-display text-[2.1rem] font-extrabold leading-[1.14] tracking-[-0.02em] text-[var(--hg-ink)]"
            >
              {r}
            </li>
          ))}
        </ul>

        <div className="relative my-6 h-px w-full bg-gradient-to-r from-[var(--hg-border)] via-[var(--hg-border)] to-transparent" />

        <p className="relative text-[1rem] leading-relaxed text-[var(--hg-text-2)]">
          Ready to collaborate on impactful projects.
        </p>

        <div className="relative mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/70 bg-white/90 px-5 py-3 shadow-[0_2px_4px_rgba(15,40,30,0.05),0_14px_28px_-16px_rgba(15,40,30,0.45),inset_0_1px_0_rgba(255,255,255,0.9)]">
          <span className="h-2 w-2 rounded-full bg-[var(--hg-dot)]" />
          <span className="text-[0.9rem] font-semibold text-[var(--hg-ink)]">
            Open to new opportunities
          </span>
        </div>
      </div>
    </motion.div>
  );
}
