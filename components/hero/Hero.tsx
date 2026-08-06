'use client';

import {
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { PointerContext } from './pointer';
import { playIntro, initScrollParallax } from './heroAnimations';
import Background from './Background';
import HeroContent from './HeroContent';
import HeroImage from './HeroImage';
import FloatingCard from './FloatingCard';

const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [enable3d, setEnable3d] = useState(false);

  // Shared spring-smoothed pointer field for DOM parallax layers.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    rawX.set(nx);
    rawY.set(ny);
    pointerRef.current.x = nx;
    pointerRef.current.y = ny;
  };

  // Decide whether to spin up WebGL (desktop · fine pointer · motion allowed).
  useEffect(() => {
    const forced = new URLSearchParams(window.location.search).has('force3d');
    const webglOk = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
      } catch {
        return false;
      }
    })();
    const ok =
      webglOk &&
      window.matchMedia('(min-width: 1024px)').matches &&
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnable3d(ok || forced);
  }, []);

  // GSAP entrance + scroll parallax, scoped & auto-reverted.
  useIso(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!reduce) playIntro(el);
      initScrollParallax(el);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <PointerContext.Provider value={{ x, y }}>
      <section
        ref={sectionRef}
        id="hero"
        onMouseMove={onMouseMove}
        className="relative flex min-h-screen items-center overflow-hidden px-[6%] pb-24 pt-[calc(68px+72px)] [perspective:1400px] max-[960px]:pt-[calc(68px+48px)]"
      >
        <Background />

        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-16 max-[960px]:gap-14 lg:grid-cols-[minmax(0,1.05fr)_440px]">
          <HeroContent />

          <div data-scroll="visual" className="relative mx-auto w-full max-w-[420px]">
            <HeroImage pointerRef={pointerRef} enable3d={enable3d} />
            <FloatingCard />
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted lg:flex">
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">Scroll</span>
          <span className="h-9 w-[1px] bg-gradient-to-b from-muted to-transparent" />
        </div>
      </section>
    </PointerContext.Provider>
  );
}
