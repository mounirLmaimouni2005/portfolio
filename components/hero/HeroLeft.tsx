'use client';

import { CodeIcon } from '../icons';
import Badge from './Badge';
import Buttons from './Buttons';
import FeatureCards from './FeatureCards';

function Word({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
      <span className={`reveal-word inline-block ${className}`}>{children}</span>
    </span>
  );
}

export default function HeroLeft() {
  return (
    <div data-scroll="content" className="relative z-10 min-w-0">
      <Badge />

      <h1 className="mt-6 font-display text-[clamp(2.9rem,6vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.025em] drop-shadow-[0_8px_20px_rgba(18,48,38,0.12)]">
        <span className="block">
          <Word className="text-[var(--hg-ink)]">Full</Word>{' '}
          <Word className="text-[var(--hg-ink)]">Stack</Word>
        </span>
        <span className="block">
          <Word className="bg-gradient-to-br from-[var(--hg-grad-from)] via-[var(--hg-green)] to-[var(--hg-grad-to)] bg-clip-text text-transparent">
            Developer
          </Word>
        </span>
      </h1>

      {/* Description card */}
      <div
        data-anim="tagline"
        className="mt-9 flex w-full max-w-[760px] items-center gap-6 rounded-2xl border border-[var(--hg-border)] border-l-[4px] border-l-[var(--hg-green)] bg-[var(--hg-surface)] p-7 shadow-[0_18px_44px_-26px_rgba(15,40,30,0.28)]"
      >
        <div className="grid h-[72px] w-[72px] shrink-0 place-items-center rounded-full bg-[var(--hg-green)] text-white">
          <CodeIcon className="h-8 w-8" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-[1.18rem] font-bold leading-snug text-[var(--hg-ink)]">
            I build modern, scalable &amp; user-focused web applications
          </p>
          <p className="mt-2.5 text-[1rem] leading-relaxed text-[var(--hg-text-2)]">
            Passionate about turning ideas into clean, efficient code and creating seamless digital
            experiences.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Buttons />
      </div>

      <div className="mt-10 w-full max-w-[760px]">
        <FeatureCards />
      </div>
    </div>
  );
}
