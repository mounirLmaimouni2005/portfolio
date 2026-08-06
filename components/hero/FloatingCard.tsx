'use client';

import { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { availability } from '@/lib/data';

export default function FloatingCard() {
  // Local 3D tilt driven by the cursor position over the card.
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 18 });
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 18 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      initial={{ x: 80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 1 }}
      className="absolute -right-3 bottom-11 z-20 w-[212px] [perspective:900px] max-[640px]:static max-[640px]:mx-auto max-[640px]:mt-6 max-[640px]:w-full max-[640px]:max-w-[280px]"
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
        className="glass preserve-3d animate-floatCard rounded-2xl p-[18px]"
      >
        <div className="mb-3.5 flex items-center gap-2.5">
          <span className="h-2 w-2 animate-pulseRing rounded-full bg-success" />
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
            {availability.label}
          </span>
        </div>
        <ul className="mb-3.5 flex flex-col gap-2">
          {availability.roles.map((r) => (
            <li key={r} className="flex items-center gap-2.5 font-display text-[0.96rem] font-semibold text-[var(--c-text)]">
              <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-accent" />
              {r}
            </li>
          ))}
        </ul>
        <p className="border-t border-hairline pt-3 text-[0.78rem] leading-[1.5] text-muted">
          {availability.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}
