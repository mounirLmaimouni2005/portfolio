---
description: Visual tokens, type, and motion language for the portfolio UI
---

# Design system

Use tokens from `tailwind.config.ts`. Do not introduce one-off hex colors when a token exists.

| Token | Use |
|---|---|
| `ink` / `graphite` | Primary text |
| `accent` / `accent-hover` | Links, CTAs, highlights (`#2563EB` / `#3B82F6`) |
| `success` | Availability pulse (`#22C55E`) |
| `canvas` / `surface` | Page / card backgrounds |
| `muted` | Secondary text |
| `hairline` | Borders |
| `shadow-soft` / `lift` / `glass` | Elevation |
| `rounded-xl2` | Large cards (20px) |
| `ease-expo` | Signature easing |

## Type

- Display: `font-display` (Clash Display) — hero headlines only
- Body: `font-sans` (Cabinet Grotesk)
- Code/labels: `font-mono` (JetBrains Mono)

Fonts are loaded in `app/layout.tsx` (Fontshare + Google). Do not switch to `next/font` unless asked.

## Theme

`darkMode: 'class'` on `<html>`. Theme boot script in `layout.tsx`; toggle in `ThemeToggle.tsx`. Preserve no-flash behavior.

## Motion

- Prefer existing keyframes: `animate-floatY`, `animate-floatCard`, `animate-pulseRing`.
- Hover lift and magnetic buttons already exist (`Magnetic.tsx`). Reuse them.
- Respect reduced motion when adding new animation.
- Premium, restrained, editorial — not playful or noisy.
