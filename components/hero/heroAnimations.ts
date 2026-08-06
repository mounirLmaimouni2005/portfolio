import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = 'power4.out';

/**
 * Entrance timeline — runs once on mount.
 * Badge fade · title word-by-word reveal · paragraph fade-up · buttons stagger · cards stagger.
 * clearProps hands transforms back to CSS/Framer for continuous interaction afterwards.
 */
export function playIntro(scope: HTMLElement) {
  const q = gsap.utils.selector(scope);
  const tl = gsap.timeline({ defaults: { ease: EASE } });

  const cleanup = (t: gsap.TweenTarget) => gsap.set(t, { clearProps: 'transform,opacity' });

  tl.from(q('[data-anim="badge"]'), { y: 20, opacity: 0, duration: 0.7 }, 0.15)
    .from(
      q('.reveal-word'),
      {
        yPercent: 118,
        opacity: 0,
        rotateX: -45,
        duration: 0.9,
        stagger: 0.11,
        onComplete: () => cleanup(q('.reveal-word')),
      },
      0.25,
    )
    .from(q('[data-anim="tagline"]'), { y: 26, opacity: 0, duration: 0.8 }, 0.6)
    .from(
      q('[data-anim="buttons"] > *'),
      {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        // Buttons carry a CSS transition on opacity; hand styles back so the
        // final opacity:1 isn't overridden by the transition mid-tween.
        onComplete: () => cleanup(q('[data-anim="buttons"] > *')),
      },
      0.75,
    )
    .from(
      q('[data-anim="feature"]'),
      {
        y: 34,
        opacity: 0,
        rotateX: -12,
        transformOrigin: '50% 100%',
        duration: 0.8,
        stagger: 0.1,
        onComplete: () => cleanup(q('[data-anim="feature"]')),
      },
      0.9,
    );

  return tl;
}

/**
 * Scroll-linked parallax — background layers drift, rings rotate, the profile column
 * eases upward and the content softly fades as the hero scrolls out of view.
 */
export function initScrollParallax(section: HTMLElement) {
  const q = gsap.utils.selector(section);
  const triggers: ScrollTrigger[] = [];

  const scrub = (targets: gsap.TweenTarget, vars: gsap.TweenVars) => {
    const tw = gsap.to(targets, {
      ...vars,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    if (tw.scrollTrigger) triggers.push(tw.scrollTrigger);
    return tw;
  };

  // Background depth layers move at different speeds.
  q('[data-parallax]').forEach((el) => {
    const speed = parseFloat((el as HTMLElement).dataset.parallax || '0.2');
    scrub(el, { yPercent: -20 * speed * 10 });
  });

  // Rings rotate + rise.
  scrub(q('[data-scroll="rings"]'), { rotate: 45, y: -60 });
  // Profile column eases upward.
  scrub(q('[data-scroll="visual"]'), { y: -70 });
  // Content lifts and fades a touch.
  scrub(q('[data-scroll="content"]'), { y: -40, opacity: 0.55 });

  return () => triggers.forEach((t) => t.kill());
}
