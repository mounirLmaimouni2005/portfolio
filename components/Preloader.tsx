'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { lenisRef } from './SmoothScroll';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface PreloaderProps {
  /** Called once the curtain-up exit animation is fully complete. */
  onExitComplete: () => void;
}

// ─── Star data – computed once per mount ───────────────────────────────────────

interface StarDatum {
  id:       number;
  top:      string;  // % from top (can be negative)
  left:     string;  // % from left
  width:    number;  // px
  angle:    number;  // deg – rotation of the streak
  duration: number;  // s
  delay:    number;  // s
  glow:     boolean; // true → red-tipped accent star
}

function buildStars(n = 16): StarDatum[] {
  return Array.from({ length: n }, (_, i) => ({
    id:       i,
    top:      `${-8 + Math.random() * 75}%`,
    left:     `${5  + Math.random() * 90}%`,
    width:    70 + Math.random() * 180,
    angle:    148 + (Math.random() - 0.5) * 20,
    duration: 2.2 + Math.random() * 3.4,
    delay:    Math.random() * 7,
    glow:     i % 5 === 0,
  }));
}

// ─── Reduced-motion check ──────────────────────────────────────────────────────

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ─── Real loading progress ─────────────────────────────────────────────────────
// Coordinated with visual phases across a 4.6 s sequence.
// Monitors real site readiness (load & readyState) so progress is genuine,
// never completes prematurely, and transitions without dead waiting.

function trackCinematicProgress(
  floorMs:    number,
  onProgress: (v: number) => void,
  onReady:    () => void,
): () => void {
  let done = false;
  let raf: number;
  const startTs = Date.now();
  let current = 0;

  // Real readiness checks
  let isSiteReady = typeof document !== 'undefined' && document.readyState === 'complete';
  const handleReady = () => { isSiteReady = true; };
  if (!isSiteReady && typeof window !== 'undefined') {
    window.addEventListener('load', handleReady, { once: true });
    document.addEventListener('readystatechange', () => {
      if (document.readyState === 'complete') isSiteReady = true;
    });
  }

  const step = () => {
    if (done) return;
    const elapsed = Date.now() - startTs;
    const timeRatio = Math.min(elapsed / floorMs, 1);

    // Coordinated percentage mapping with the visual phases:
    // 0.00 - 0.40 (0.0s - 1.85s): Welcome text reveal:  0% -> 45%
    // 0.40 - 0.49 (1.85s - 2.25s): Transition handoff: 45% -> 55%
    // 0.49 - 0.65 (2.25s - 3.00s): Comet entrance:     55% -> 70%
    // 0.65 - 0.89 (3.00s - 4.10s): Central name reveal: 70% -> 90%
    // 0.89 - 1.00 (4.10s - 4.60s): Flyby exit:         90% -> 100%
    let target = 0;
    if (timeRatio <= 0.40) {
      target = (timeRatio / 0.40) * 45;
    } else if (timeRatio <= 0.49) {
      target = 45 + ((timeRatio - 0.40) / 0.09) * 10;
    } else if (timeRatio <= 0.65) {
      target = 55 + ((timeRatio - 0.49) / 0.16) * 15;
    } else if (timeRatio <= 0.89) {
      target = 70 + ((timeRatio - 0.65) / 0.24) * 20;
    } else {
      target = 90 + ((timeRatio - 0.89) / 0.11) * 10;
    }

    // If site is still loading heavy assets, hold at 90% until isSiteReady
    if (!isSiteReady && target > 90) {
      target = 90;
    }

    current += (target - current) * 0.16;
    const displayed = Math.round(current);
    onProgress(displayed);

    if (elapsed >= floorMs && isSiteReady && displayed >= 99) {
      done = true;
      onProgress(100);
      setTimeout(onReady, 60);
      return;
    }

    raf = requestAnimationFrame(step);
  };

  raf = requestAnimationFrame(step);

  return () => {
    done = true;
    cancelAnimationFrame(raf);
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', handleReady);
    }
  };
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WELCOME      = 'WELCOME TO MY PORTFOLIO';
const COMET_PREFIX = 'GET TO KNOW';
const COMET_NAME   = 'MOUNIR L. MAIMOUNI';

// ─── Component ────────────────────────────────────────────────────────────────

export default function Preloader({ onExitComplete }: PreloaderProps) {
  const rootRef      = useRef<HTMLDivElement>(null);
  const fillRef      = useRef<HTMLDivElement>(null);
  const pctRef       = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const sparkRef     = useRef<HTMLSpanElement>(null);
  const pillRef      = useRef<HTMLDivElement>(null);
  const welcomeRef   = useRef<HTMLDivElement>(null);
  const cometRef     = useRef<HTMLDivElement>(null);
  /** Guards runExit from firing more than once. */
  const exitFiredRef = useRef(false);

  const [stars]   = useState(() => buildStars());
  const [reduced] = useState(prefersReducedMotion);

  useEffect(() => {
    // ── Skip for returning visitors in the same session ────────────────────────
    try {
      if (sessionStorage.getItem('pre_seen')) {
        onExitComplete();
        return;
      }
    } catch { /* storage may be blocked */ }

    // ── Lock body scroll via Lenis while overlay is visible ───────────────────
    lenisRef.current?.stop();

    const root = rootRef.current;
    if (!root) { onExitComplete(); return; }

    // ── Helper: update DOM counter + fill bar ─────────────────────────────────
    function setProgress(v: number) {
      if (pctRef.current)  pctRef.current.textContent  = `${v}%`;
      if (fillRef.current) fillRef.current.style.width = `${v}%`;
    }

    // ── Reduced-motion path ────────────────────────────────────────────────────
    if (reduced) {
      // Reveal labels & pill immediately
      root.querySelectorAll<HTMLElement>('.pre-label').forEach(el => {
        el.style.opacity = '1';
      });
      if (pillRef.current) pillRef.current.style.opacity = '1';

      // Gentle cross-fade sequence without motion sickness
      const timer = setTimeout(() => {
        if (welcomeRef.current) {
          welcomeRef.current.style.opacity = '0';
          welcomeRef.current.style.transition = 'opacity 0.4s ease';
        }
        if (cometRef.current) {
          cometRef.current.style.visibility = 'visible';
          cometRef.current.style.opacity = '1';
          cometRef.current.style.transform = 'none';
          cometRef.current.style.transition = 'opacity 0.4s ease';
        }
      }, 1500);

      const cleanup = trackCinematicProgress(3000, setProgress, () => {
        setProgress(100);
        window.dispatchEvent(new CustomEvent('preloader:reveal'));
        runExit(root);
      });
      return () => {
        clearTimeout(timer);
        cleanup();
        lenisRef.current?.start();
      };
    }

    // ── Full animation path (targeted 4.6 s visual sequence + curtain reveal) ──
    let cleanupProgress: (() => void) | null = null;
    let floorTween:      gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      const chars  = q('.pre-char')  as HTMLElement[];
      const labels = q('.pre-label') as HTMLElement[];
      const pill   = pillRef.current!;

      const EASE = 'power4.out';
      const tl   = gsap.timeline({ defaults: { ease: EASE } });

      // 0. Top labels fade in from top
      tl.from(labels, {
        y: -14, opacity: 0, duration: 0.55, stagger: 0.15,
      }, 0.1);

      // 1. Message 1: "WELCOME TO MY PORTFOLIO" characters fly up (3-D flip)
      tl.from(chars, {
        yPercent: 120, opacity: 0, rotateX: -55,
        stagger: 0.026, duration: 0.75,
        transformOrigin: '50% 100%',
      }, 0.30);

      // 2. Red underline sweeps left → right
      tl.to(underlineRef.current, {
        width: '100%', duration: 0.65, ease: 'power3.inOut',
      }, 1.05);

      // 3. Spark rides along underline
      tl.fromTo(sparkRef.current,
        { left: '-2%', opacity: 1 },
        { left: '101%', opacity: 0, duration: 0.65, ease: 'power2.in' },
        1.05,
      );

      // 4. Pill progress indicator fades in smoothly at bottom
      tl.from(pill, {
        y: 18, opacity: 0, duration: 0.5,
      }, 1.15);

      // 5. Wire cinematic loading progress across the sequence (~4.6 s floor)
      const FLOOR_MS = 4600;
      tl.call(() => {
        cleanupProgress = trackCinematicProgress(FLOOR_MS, setProgress, () => {
          floorTween = gsap.delayedCall(0.08, () => runExit(root));
        });
      }, [], 1.15);

      // 6. Smooth sequence transition: Welcome block fades & lifts slightly
      tl.to(welcomeRef.current, {
        opacity: 0,
        y: -16,
        scale: 0.96,
        duration: 0.42,
        ease: 'power2.inOut',
      }, 1.95);

      // 7. Message 2: Cinematic shooting star comet shoots across the screen
      //    Rapid entry from offscreen left with strong deceleration into dead-center
      tl.set(cometRef.current, {
        visibility: 'visible',
        opacity: 1,
        x: '-110vw',
      }, 2.25);

      tl.to(cometRef.current, {
        x: '0vw',
        duration: 0.80,
        ease: 'power3.out',
      }, 2.25);

      // 8. Comet glides majestically across the center with vibrant red trail
      //    Full name is clearly visible and central for ~1.1 seconds
      tl.to(cometRef.current, {
        x: '3.5vw',
        duration: 1.1,
        ease: 'sine.inOut',
      }, 3.05);

      // 9. Comet accelerates across the screen to offscreen right like a shooting star
      tl.to(cometRef.current, {
        x: '110vw',
        opacity: 0,
        duration: 0.55,
        ease: 'power3.in',
      }, 4.15);

    }, root);

    return () => {
      cleanupProgress?.();
      floorTween?.kill();
      ctx.revert();
      lenisRef.current?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Exit sequence ────────────────────────────────────────────────────────────

  function runExit(root: HTMLDivElement) {
    if (exitFiredRef.current) return;
    exitFiredRef.current = true;

    const pill = pillRef.current;

    // 1. Completion pulse: pill border and glow pulse red
    if (pill) {
      gsap.to(pill, {
        borderColor: 'rgba(192,57,43,0.95)',
        boxShadow: '0 0 32px rgba(192,57,43,0.65), inset 0 0 20px rgba(192,57,43,0.18)',
        duration: 0.22,
        ease: 'power2.out',
      });
    }

    const exitTl = gsap.timeline({
      onComplete() {
        try {
          sessionStorage.setItem('pre_seen', '1');
        } catch { /* storage blocked – ignore */ }
        lenisRef.current?.start();
        onExitComplete();
      },
    });

    // 2. Preloader content smoothly fades and scales down
    const q = gsap.utils.selector(root);
    exitTl.to(q('.pre-content'), {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: 'power2.in',
    }, 0.12);

    // 3. Curtain sweeps upward smoothly into the Hero
    exitTl.to(root, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut',
    }, 0.32);

    // 4. Dispatch reveal event right as curtain begins uncovering the Hero
    exitTl.call(() => {
      window.dispatchEvent(new CustomEvent('preloader:reveal'));
    }, [], 0.42);
  }

  // ─── JSX helpers ────────────────────────────────────────────────────────────

  const chars = WELCOME.split('').map((ch, i) => (
    <span key={i} className="pre-char">
      {ch === ' ' ? '\u00A0' : ch}
    </span>
  ));

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9000] overflow-hidden bg-preloader-bg"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio, please wait"
    >

      {/* ── Vignette overlay ─────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.72) 100%)',
        }}
        aria-hidden
      />

      {/* ── Shooting stars ────────────────────────────────────────────────────── */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {stars.map((s) => (
            // Outer wrapper holds the static rotation; inner span runs the animation
            <span
              key={s.id}
              className="absolute block"
              style={{
                top:    s.top,
                left:   s.left,
                width:  `${s.width}px`,
                height: '1.5px',
                transform: `rotate(${s.angle}deg)`,
                transformOrigin: 'center center',
              }}
            >
              <span
                className="pre-star"
                style={{
                  width:    '100%',
                  position: 'absolute',
                  top:      0,
                  left:     0,
                  background: s.glow
                    ? 'linear-gradient(to right, transparent 0%, rgba(192,57,43,0.55) 20%, rgba(255,255,255,0.92) 65%, #fff 100%)'
                    : 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.45) 38%, rgba(255,255,255,0.92) 78%, #fff 100%)',
                  boxShadow: s.glow
                    ? '0 0 12px 3px rgba(192,57,43,0.45)'
                    : '0 0 6px 1px rgba(255,255,255,0.25)',
                  animationName:     'shootingStar',
                  animationDuration: `${s.duration}s`,
                  animationDelay:    `${s.delay}s`,
                }}
              />
            </span>
          ))}
        </div>
      )}

      {/* ── Subtle dot-grid texture ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden
      />

      {/* ── Centre content ───────────────────────────────────────────────────── */}
      <div className="pre-content absolute inset-0 flex flex-col items-center justify-center px-6">

        {/* Top label: PREPARING EXPERIENCE */}
        <p
          className="pre-label mb-9 font-mono text-[0.6rem] uppercase tracking-[0.32em]"
          style={{ color: 'var(--pre-red)', opacity: 0 }}
          aria-hidden
        >
          Preparing Experience
        </p>

        {/* ── Central Stage for Sequenced Messages ─────────────────────────── */}
        <div className="relative flex min-h-[140px] md:min-h-[160px] w-full max-w-4xl items-center justify-center overflow-visible">

          {/* Message 1: WELCOME headline block */}
          <div ref={welcomeRef} className="relative text-center">
            {/* Character row */}
            <p
              className="font-display font-extrabold uppercase leading-none tracking-[0.18em]"
              style={{
                fontSize: 'clamp(1.35rem, 4.2vw, 3rem)',
                color: 'var(--pre-text)',
                perspective: '700px',
              }}
              aria-label={WELCOME}
            >
              {chars}
            </p>

            {/* Red underline + spark */}
            <span className="relative mt-3 block" aria-hidden>
              <span ref={underlineRef} className="pre-underline" />
              <span ref={sparkRef} className="pre-spark" />
            </span>
          </div>

          {/* Message 2: Cinematic Shooting Star Comet */}
          <div
            ref={cometRef}
            className="pre-comet-wrapper"
            style={{ opacity: 0, visibility: 'hidden' }}
            aria-label={`${COMET_PREFIX} ${COMET_NAME}`}
          >
            <div className="pre-comet-inner">
              {/* Elegant red comet trail extending behind the motion */}
              <div className="pre-comet-trail-wrap" aria-hidden>
                <span className="pre-comet-beam" />
                <span className="pre-comet-glow" />
                <span className="pre-comet-particle pre-p-1" />
                <span className="pre-comet-particle pre-p-2" />
                <span className="pre-comet-particle pre-p-3" />
                <span className="pre-comet-particle pre-p-4" />
              </div>

              {/* Leading spark flare */}
              <span className="pre-comet-flare" aria-hidden />

              {/* Prefix: GET TO KNOW */}
              <span className="pre-comet-prefix font-mono text-[0.65rem] md:text-xs uppercase tracking-[0.36em]">
                {COMET_PREFIX}
              </span>

              {/* Full Name: MOUNIR L. MAIMOUNI */}
              <span className="pre-comet-name font-display font-extrabold uppercase tracking-[0.16em]">
                {COMET_NAME}
              </span>

              {/* Red speed-streak underline below the name */}
              <span className="pre-comet-substreak" aria-hidden />
            </div>
          </div>

        </div>

        {/* ── Pill progress indicator ───────────────────────────────────────── */}
        <div
          ref={pillRef}
          className="pre-pill mt-10 md:mt-12 flex w-full max-w-[380px] items-center justify-between gap-4 px-7 py-[18px]"
          style={{ opacity: 0 }}
          aria-hidden
        >
          {/* Fill bar — driven by GSAP */}
          <div ref={fillRef} className="pre-fill" />

          {/* Left label */}
          <span
            className="relative z-10 font-mono text-[0.6rem] uppercase tracking-[0.22em]"
            style={{ color: 'var(--pre-text2)' }}
          >
            Please Wait
          </span>

          {/* Percentage counter */}
          <span
            ref={pctRef}
            className="relative z-10 min-w-[3ch] text-right font-mono text-sm font-semibold tabular-nums"
            style={{ color: 'var(--pre-text)' }}
          >
            0%
          </span>
        </div>

        {/* Bottom label: LOADING */}
        <p
          className="pre-label mt-5 font-mono text-[0.55rem] uppercase tracking-[0.35em]"
          style={{ color: 'rgba(255,255,255,0.2)', opacity: 0 }}
          aria-hidden
        >
          © Mounir L. Maimouni — Portfolio
        </p>
      </div>

    </div>
  );
}
