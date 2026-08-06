'use client';

import { MutableRefObject } from 'react';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePointer } from './pointer';

// WebGL scene is loaded lazily, client-only — never blocks first paint.
const ThreeScene = dynamic(() => import('./ThreeScene'), { ssr: false });

export default function HeroImage({
  pointerRef,
  enable3d,
}: {
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  enable3d: boolean;
}) {
  const p = usePointer();
  const fx = useMotionValue(0);
  const fy = useMotionValue(0);
  const px = p?.x ?? fx;
  const py = p?.y ?? fy;

  const rotateY = useSpring(useTransform(px, (v) => v * 12), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(py, (v) => v * -9), { stiffness: 120, damping: 18 });
  const tx = useSpring(useTransform(px, (v) => v * 20), { stiffness: 120, damping: 20 });
  const ty = useSpring(useTransform(py, (v) => v * 20), { stiffness: 120, damping: 20 });

  return (
    <div className="relative w-full" style={{ perspective: 1000 }}>
      {/* soft glow + circle (depth base) */}
      <div className="pointer-events-none absolute inset-[-8%] -z-10" aria-hidden>
        <span className="absolute left-1/2 top-1/2 h-[100%] w-[100%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.14),transparent_62%)] blur-[14px]" />
        <span className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(37,99,235,0.06)] dark:bg-[rgba(59,130,246,0.08)]" />
        <span className="absolute left-1/2 top-1/2 h-[97%] w-[97%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-hairline opacity-60" />
      </div>

      {/* WebGL rings + particles (desktop only) */}
      {enable3d && (
        <div data-scroll="rings" className="pointer-events-none absolute inset-[-14%] -z-[5]" aria-hidden>
          <ThreeScene pointer={pointerRef} />
        </div>
      )}

      {/* dotted pattern accent */}
      <span
        className="pointer-events-none absolute -right-[3%] top-[6%] -z-[4] h-[118px] w-[118px] rounded-[10px] opacity-25"
        style={{
          color: 'var(--c-text-2)',
          backgroundImage: 'radial-gradient(currentColor 1.4px, transparent 1.4px)',
          backgroundSize: '15px 15px',
        }}
        aria-hidden
      />

      {/* Entrance → tilt → idle float → image (nested so animations never fight) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
      >
        <motion.div style={{ rotateX, rotateY, x: tx, y: ty }} className="preserve-3d">
          <div className="animate-floatY">
            {/* MY EXACT IMAGE — full head-to-feet, uncropped */}
            <img
              src="/profileImage.png"
              alt="Mounir L Maimouni — Full Stack Developer"
              draggable={false}
              className="block h-auto w-full select-none"
              style={{ filter: 'drop-shadow(var(--img-shadow))' }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
