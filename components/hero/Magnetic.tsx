'use client';

import { MouseEvent, ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Magnetic({
  children,
  strength = 0.28,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 160, damping: 15, mass: 0.3 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
