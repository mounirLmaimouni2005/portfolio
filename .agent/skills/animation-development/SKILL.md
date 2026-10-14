---
name: animation-development
description: Adds or edits motion using Framer Motion, GSAP/ScrollTrigger, and Lenis already in this repo. Use when working on intro, scroll, magnetic, parallax, or hover animation.
---

# Animation development

## Ownership

| Concern | Library | Where |
|---|---|---|
| Intro timeline, scroll parallax | GSAP + ScrollTrigger | `heroAnimations.ts` |
| Smooth scroll | Lenis + GSAP ticker | `SmoothScroll.tsx` |
| Pointer springs, tilt, presence | Framer Motion | hero widgets, `Reveal`, menus |
| Magnetic hover | Framer springs | `Magnetic.tsx` |

Do not drive the same transform with both GSAP and Framer.

## Rules

1. Extend `playIntro` / `initScrollParallax` instead of mounting a second hero timeline.
2. Register ScrollTrigger once (already in `SmoothScroll.tsx`). Kill tweens on unmount.
3. Reuse `useSpring` settings already in `Hero.tsx` (`stiffness: 60, damping: 18, mass: 0.6`) unless a different feel is requested.
4. Share pointer via `PointerContext` (`pointer.tsx`); do not add a second mouse listener on the hero.
5. Honor `prefers-reduced-motion`: skip or shorten non-essential motion.
6. Keep motion on client components only.

## Don't

- Add anime.js, Motion One, or Lottie unless asked.
- Animate layout with both Lenis and native `scroll-behavior: smooth` (conflicts).
