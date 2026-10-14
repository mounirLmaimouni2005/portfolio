---
description: Core identity, stack, and constraints for this Next.js portfolio
---

# Project

Personal portfolio for Mounir L Maimouni. Single-page marketing site, not an app or API.

## Stack (do not swap)

Next.js 15 App Router · React 19 · TypeScript · Tailwind CSS 3 (class dark mode) · Framer Motion · GSAP + ScrollTrigger · Lenis · Three.js + R3F + Drei · Lucide React

## Constraints

- Do not add backend, CMS, auth, or extra routes unless asked.
- Do not convert the site to the Pages Router.
- Do not replace Tailwind, Framer Motion, GSAP, Lenis, or R3F with alternatives.
- Do not edit `legacy/` unless the user asks to restore or migrate it.
- Do not change `lib/data.ts` copy unless the user asks for content updates.
- Keep `@/*` path aliases (`tsconfig.json`).
- `next.config.mjs` already transpiles `three`; keep that.

## Entry points

- Page: `app/page.tsx`
- Shell/fonts/theme: `app/layout.tsx`
- Content: `lib/data.ts`
- Smooth scroll: `components/SmoothScroll.tsx`
