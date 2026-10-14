---
name: code-review
description: Reviews portfolio diffs against this repo’s architecture, tokens, and motion/3D constraints. Use when reviewing PRs, uncommitted changes, or when the user asks for a code review.
---

# Code review

Review only what changed. Do not suggest rewriting the stack.

## Checks

1. **Scope** — Unrelated files, `legacy/`, or new routes without a request.
2. **Architecture** — Hero code in `components/hero/`, sections in `components/sections/`, copy in `lib/data.ts`, assets in `public/`.
3. **Client boundary** — `'use client'` only where needed; no Three in server layout.
4. **Motion** — GSAP vs Framer not fighting; Lenis still the scroller; reduced motion considered.
5. **3D** — Dynamic `ssr: false`; no extra Canvas; `useFrame` without React state spam.
6. **UI** — Tokens from `tailwind.config.ts`; dark mode; existing type scale.
7. **Deps** — New packages only if justified.

## Feedback format

- 🔴 **Critical**: Breaks build, SSR, a11y, or existing behavior
- 🟡 **Suggestion**: Fits the system better
- 🟢 **Nice to have**: Optional polish

For each item: file, what’s wrong, what to do instead. No generic style nits already handled by the project.
