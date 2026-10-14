'use client';

import { ArrowRight, Mail } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Buttons() {
  return (
    <div data-anim="buttons" className="flex flex-wrap items-center gap-4">
      {/* outer = GSAP stagger target · inner Magnetic = hover (no transform conflict) */}
      <div>
        <Magnetic>
          <a
            href="#projects"
            className="group inline-flex h-[56px] items-center gap-2.5 rounded-full bg-[var(--hg-green)] px-7 text-[0.95rem] font-semibold text-white shadow-[0_16px_30px_-12px_rgba(15,40,30,0.55)] outline-none transition-[background,box-shadow,border-color] duration-300 ease-out hover:bg-[var(--hg-green-hover)] hover:shadow-[0_26px_44px_-14px_rgba(15,40,30,0.6)] focus-visible:ring-2 focus-visible:ring-[var(--hg-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--hg-bg)]"
          >
            View My Work
            <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </a>
        </Magnetic>
      </div>
      <div>
        <Magnetic>
          <a
            href="#contact"
            className="group inline-flex h-[56px] items-center gap-2.5 rounded-full border border-[var(--hg-border)] bg-[var(--hg-surface)] px-7 text-[0.95rem] font-semibold text-[var(--hg-ink)] shadow-[0_10px_24px_-16px_rgba(15,40,30,0.4)] outline-none transition-[background,box-shadow,border-color] duration-300 ease-out hover:border-[var(--hg-green)] hover:shadow-[0_18px_34px_-18px_rgba(15,40,30,0.45)] focus-visible:ring-2 focus-visible:ring-[var(--hg-green)]"
          >
            Get in Touch
            <Mail className="h-[17px] w-[17px]" strokeWidth={1.9} />
          </a>
        </Magnetic>
      </div>
    </div>
  );
}
