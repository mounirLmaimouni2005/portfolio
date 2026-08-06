'use client';

import { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { heroFeatures } from '@/lib/data';
import { featureIcons } from '../icons';

function FeatureCard({ item }: { item: (typeof heroFeatures)[number] }) {
  const Icon = featureIcons[item.icon];
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 220, damping: 18 });
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 220, damping: 18 });

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
    // Outer = GSAP entrance target; perspective lives here for the inner tilt.
    <div data-anim="feature" className="[perspective:800px]">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="glass preserve-3d group h-full rounded-2xl p-[18px] transition-shadow duration-300 hover:!shadow-[0_28px_60px_-18px_rgba(15,23,42,.28)]"
      >
        <div className="mb-3.5 grid h-10 w-10 place-items-center rounded-xl bg-[var(--accent-soft)] text-accent transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="mb-1.5 font-display text-[0.92rem] font-semibold text-[var(--c-text)]">
          {item.title}
        </h3>
        <p className="text-[0.8rem] leading-[1.55] text-muted">{item.desc}</p>
      </motion.div>
    </div>
  );
}

export default function FeatureCards() {
  return (
    <div className="mt-11 grid grid-cols-2 gap-3.5 max-[400px]:grid-cols-1 lg:grid-cols-4">
      {heroFeatures.map((item) => (
        <FeatureCard key={item.key} item={item} />
      ))}
    </div>
  );
}
