'use client';

import { MutableRefObject } from 'react';
import dynamic from 'next/dynamic';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePointer } from './pointer';
import AvailabilityCard from './AvailabilityCard';
import FloatingBadge from './FloatingBadge';
import { CodeIcon, TerminalGlyph, DatabaseGlyph, ReactLogo, NodeHexLogo } from '../icons';

const Scene3D = dynamic(() => import('./Scene3D'), { ssr: false });

function Dots({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-0 ${className}`}
      style={{
        color: 'var(--hg-text-2)',
        backgroundImage: 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
        backgroundSize: '18px 18px',
        opacity: 0.22,
      }}
    />
  );
}

function Ring({ size, className = '', dashed = false }: { size: number; className?: string; dashed?: boolean }) {
  return (
    <span
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--hg-ring)] ${
        dashed ? 'border-dashed' : ''
      } ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

function GlassBall({ className, size, dark = false }: { className: string; size: number; dark?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute z-20 rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: dark
          ? 'radial-gradient(circle at 34% 28%, #4a7d65, #21473b 58%, #142b23)'
          : 'radial-gradient(circle at 34% 28%, #ffffff, #edece6 60%, #d6d5cb)',
        boxShadow:
          '0 2px 4px rgba(15,40,30,0.12), 0 14px 22px -10px rgba(15,40,30,0.4), inset 0 2px 3px rgba(255,255,255,0.55)',
      }}
    />
  );
}

export default function HeroRight({
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

  const ringX = useSpring(useTransform(px, (v) => v * -16), { stiffness: 70, damping: 20 });
  const ringY = useSpring(useTransform(py, (v) => v * -16), { stiffness: 70, damping: 20 });
  const imgX = useSpring(useTransform(px, (v) => v * 10), { stiffness: 90, damping: 20 });

  return (
    <div className="relative mx-auto aspect-[1.12/1] w-full max-w-[920px] max-lg:max-w-[580px]">
      {/* soft radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(40% 42% at 40% 42%, rgba(198,207,193,0.55), transparent 70%), radial-gradient(55% 55% at 42% 44%, rgba(255,255,255,0.5), transparent 65%)',
        }}
      />

      {/* dotted patterns */}
      <Dots className="left-[1%] top-[4%] h-[95px] w-[130px]" />
      <Dots className="right-[14%] top-[2%] h-[95px] w-[135px]" />

      {/* concentric rings + glowing dots */}
      <motion.div
        aria-hidden
        data-scroll="rings"
        style={{ x: ringX, y: ringY }}
        className="absolute left-[34%] top-[42%] z-0 -translate-x-1/2 -translate-y-1/2"
      >
        <span
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 46% 38%, rgba(216,225,212,0.95), rgba(198,207,193,0.82) 46%, rgba(198,207,193,0.16) 80%, transparent)',
          }}
        />
        <Ring size={330} className="opacity-90" />
        <Ring size={360} className="opacity-60" />
        <Ring size={470} className="opacity-80" />
        <Ring size={410} dashed className="opacity-55" />
        <Ring size={560} className="opacity-35" />
        {/* glowing dots on rings */}
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(120,200,150,0.7)]" style={{ transform: 'translate(150px, -218px)' }} />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_2px_rgba(120,200,150,0.6)]" style={{ transform: 'translate(232px, 40px)' }} />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--hg-green)] shadow-[0_0_8px_2px_rgba(120,200,150,0.5)]" style={{ transform: 'translate(-170px, 150px)' }} />
      </motion.div>

      {/* soft key-light glow behind the subject */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[26%] top-[33%] z-[5] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.55), transparent 62%)', filter: 'blur(8px)' }}
      />

      {/* portrait — upper-body crop with soft bottom fade */}
      <motion.div
        data-scroll="visual"
        style={{ x: imgX }}
        className="absolute bottom-[0%] left-[2%] z-[10] w-[47%] max-lg:w-[62%]"
      >
        <div className="animate-floatY">
          <img
            src="/profileImage.png"
            alt="Mounir L Maimouni — Full Stack Developer"
            draggable={false}
            className="block h-auto w-full select-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, #000 71%, transparent 90%)',
              maskImage: 'linear-gradient(to bottom, #000 71%, transparent 90%)',
              filter:
                'contrast(1.05) saturate(1.06) brightness(1.02) drop-shadow(0 16px 22px rgba(15,40,30,0.16)) drop-shadow(0 42px 60px rgba(15,40,30,0.14))',
            }}
          />
        </div>
      </motion.div>

      {/* floating tech-icon badges */}
      <FloatingBadge shape="square" variant="light" size={74} className="left-[1%] top-[21%]" delay={0.5}>
        <CodeIcon className="h-8 w-8" />
      </FloatingBadge>
      <FloatingBadge shape="square" variant="dark" size={74} className="left-[-2%] top-[47%]" delay={0.62} floatClass="animate-floatCard">
        <TerminalGlyph className="h-8 w-8" />
      </FloatingBadge>
      <FloatingBadge shape="circle" variant="light" size={62} className="left-[1%] top-[69%]" delay={0.72}>
        <DatabaseGlyph className="h-7 w-7" />
      </FloatingBadge>
      <FloatingBadge shape="circle" variant="light" size={80} className="left-[40%] top-[9%]" delay={0.55} floatClass="animate-floatCard">
        <ReactLogo className="h-10 w-10" />
      </FloatingBadge>
      <FloatingBadge shape="circle" variant="light" size={70} className="left-[41%] top-[61%]" delay={0.68}>
        <NodeHexLogo className="h-9 w-9" />
      </FloatingBadge>

      {/* glass spheres */}
      <GlassBall className="left-[42%] top-[5%]" size={26} dark />
      <GlassBall className="left-[44%] top-[34%]" size={22} />
      <GlassBall className="left-[14%] top-[77%]" size={26} />

      {/* availability card (top-right) */}
      <div className="absolute right-0 top-[11%] z-30 w-[42%] max-w-[380px] max-lg:static max-lg:mx-auto max-lg:mt-6 max-lg:w-full max-lg:max-w-[380px]">
        <AvailabilityCard />
      </div>

      {/* podium + code cube (bottom-right) */}
      {enable3d && (
        <div className="pointer-events-none absolute bottom-[-5%] right-[1%] z-[15] h-[42%] w-[46%]">
          <Scene3D pointer={pointerRef} />
        </div>
      )}
    </div>
  );
}
