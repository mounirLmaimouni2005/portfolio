'use client';

import { ArrowRight, CodeIcon } from '../icons';
import FeatureCards from './FeatureCards';

function Word({ children, className = '' }: { children: string; className?: string }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span className={`reveal-word ${className}`}>{children}</span>
    </span>
  );
}

export default function HeroContent() {
  return (
    <div data-scroll="content" className="min-w-0">
      {/* Badge */}
      <div
        data-anim="badge"
        className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-[var(--c-surface)] px-4 py-[7px] shadow-soft"
      >
        <span className="h-[7px] w-[7px] animate-pulseRing rounded-full bg-success" />
        <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">
          Building Scalable Digital Solutions
        </span>
      </div>

      {/* Title — word by word */}
      <h1 className="mt-6 font-display text-[clamp(3rem,6vw,5.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink dark:text-[var(--c-ink)] [perspective:800px]">
        <Word>Full</Word> <Word>Stack</Word>
        <br />
        <Word className="text-accent">Developer</Word>
      </h1>

      {/* Tagline card */}
      <div
        data-anim="tagline"
        className="mt-[30px] flex max-w-[560px] items-start gap-[18px] rounded-2xl border border-l-[3px] border-hairline border-l-accent bg-[var(--c-surface)] p-5 shadow-soft"
      >
        <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px] bg-ink text-white dark:bg-accent">
          <CodeIcon className="h-6 w-6" />
        </div>
        <div className="min-w-0">
          <p className="font-display text-[1.04rem] font-semibold leading-[1.4] text-[var(--c-text)]">
            I build modern, scalable &amp; user-focused web applications
          </p>
          <p className="mt-1.5 text-[0.92rem] leading-[1.6] text-muted">
            Passionate about turning ideas into clean, efficient code and creating seamless digital
            experiences.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div data-anim="buttons" className="mt-8 flex flex-wrap gap-3.5">
        <a
          href="#projects"
          className="btn-sweep group inline-flex items-center gap-2.5 rounded-xl bg-ink px-7 py-3.5 text-[0.94rem] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(15,23,42,.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:bg-accent dark:hover:bg-accent-hover"
        >
          View Projects
          <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2.5 rounded-xl border border-hairline bg-[var(--c-surface)] px-7 py-3.5 text-[0.94rem] font-semibold text-[var(--c-text)] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-lift"
        >
          Contact Me
        </a>
      </div>

      {/* Feature cards */}
      <FeatureCards />
    </div>
  );
}
