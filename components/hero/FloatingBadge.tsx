'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function FloatingBadge({
  children,
  shape = 'square',
  variant = 'light',
  size = 66,
  className = '',
  delay = 0,
  floatClass = 'animate-floatY',
}: {
  children: ReactNode;
  shape?: 'square' | 'circle';
  variant?: 'light' | 'dark';
  size?: number;
  className?: string;
  delay?: number;
  floatClass?: string;
}) {
  const light = variant === 'light';
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-[28%]';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.07 }}
      transition={{ delay, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className={`absolute z-20 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className={`${floatClass} h-full w-full`}>
        <div
          className={`relative grid h-full w-full place-items-center overflow-hidden border backdrop-blur-xl ${radius} ${
            light
              ? 'border-white/80 bg-white/70 text-[var(--hg-green)]'
              : 'border-white/20 bg-gradient-to-br from-[#2c5a49] to-[var(--hg-green)] text-white'
          }`}
          style={{
            boxShadow: light
              ? '0 2px 4px rgba(15,40,30,0.05), 0 16px 30px -12px rgba(15,40,30,0.32), 0 34px 56px -26px rgba(15,40,30,0.28), 0 0 44px -10px rgba(120,200,150,0.22), inset 0 1px 0 rgba(255,255,255,0.85)'
              : '0 2px 4px rgba(15,40,30,0.12), 0 18px 34px -12px rgba(15,40,30,0.5), 0 34px 56px -26px rgba(15,40,30,0.4), inset 0 1px 0 rgba(255,255,255,0.22)',
          }}
        >
          {/* glass reflection */}
          <span
            className={`pointer-events-none absolute inset-0 ${radius}`}
            style={{
              background:
                'linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.08) 38%, transparent 60%)',
              opacity: light ? 0.9 : 0.5,
            }}
          />
          <span className="relative">{children}</span>
        </div>
      </div>
    </motion.div>
  );
}
