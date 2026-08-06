'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import { usePointer } from './pointer';

/**
 * Layered depth background: radial gradients + soft mesh + grid texture +
 * floating blurred circles + volumetric light. All in the same light palette.
 * `data-parallax` hooks let GSAP drift each layer on scroll.
 */
export default function Background() {
  const p = usePointer();
  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const px = p?.x ?? fx;
  const py = p?.y ?? fy;

  // Unconditional parallax transforms (depth in px).
  const c1x = useTransform(px, (v) => v * -26);
  const c1y = useTransform(py, (v) => v * -26);
  const c2x = useTransform(px, (v) => v * 22);
  const c2y = useTransform(py, (v) => v * 22);
  const c3x = useTransform(px, (v) => v * -16);
  const c3y = useTransform(py, (v) => v * -16);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* base wash */}
      <div className="absolute inset-0 bg-[var(--c-bg)]" />

      {/* soft mesh gradient */}
      <div
        data-parallax="0.15"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 18% 12%, rgba(37,99,235,0.10), transparent 60%),' +
            'radial-gradient(50% 50% at 88% 20%, rgba(59,130,246,0.10), transparent 60%),' +
            'radial-gradient(55% 60% at 75% 85%, rgba(34,197,94,0.06), transparent 60%)',
        }}
      />

      {/* tiny grid texture, masked to fade at edges */}
      <div
        data-parallax="0.1"
        className="grid-texture absolute inset-0 opacity-50"
        style={{
          WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 30%, #000 40%, transparent 78%)',
          maskImage: 'radial-gradient(ellipse 85% 65% at 50% 30%, #000 40%, transparent 78%)',
        }}
      />

      {/* volumetric light beam */}
      <div
        className="absolute -top-40 right-[8%] h-[130%] w-[42%] rotate-[18deg] opacity-70"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.65), rgba(255,255,255,0) 55%)',
          filter: 'blur(46px)',
        }}
      />

      {/* floating blurred circles */}
      <motion.span
        data-parallax="0.35"
        style={{ x: c1x, y: c1y }}
        className="absolute left-[-6%] top-[16%] h-[380px] w-[380px] rounded-full blur-[30px]"
      >
        <span className="block h-full w-full rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.16),transparent_66%)]" />
      </motion.span>
      <motion.span
        data-parallax="0.5"
        style={{ x: c2x, y: c2y }}
        className="absolute right-[-4%] top-[8%] h-[300px] w-[300px] rounded-full blur-[30px]"
      >
        <span className="block h-full w-full rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.14),transparent_66%)]" />
      </motion.span>
      <motion.span
        data-parallax="0.28"
        style={{ x: c3x, y: c3y }}
        className="absolute bottom-[-12%] left-[38%] h-[340px] w-[340px] rounded-full blur-[34px]"
      >
        <span className="block h-full w-full rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.10),transparent_66%)]" />
      </motion.span>

      {/* bottom vignette into page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--c-bg)]" />
    </div>
  );
}
