---
name: frontend-design
description: Implements UI on this Tailwind portfolio using existing tokens, type, and section patterns. Use when designing, restyling, or building layout, cards, nav, or sections.
---

# Frontend design

## Do

- Use tokens: `ink`, `graphite`, `accent`, `success`, `canvas`, `surface`, `muted`, `hairline`.
- Use `font-display` for hero titles, `font-sans` for body, `font-mono` for labels.
- Match existing section rhythm: `SectionHeading` + content. See `components/sections/`.
- Reuse `Reveal.tsx` for scroll-in. Reuse `HireButton` / `Buttons` for CTAs.
- Keep dark mode: pair `dark:` with the class strategy on `<html>`.
- Verify layout at desktop and a mobile width after UI changes.

## Don't

- New color palettes, gradient-heavy “AI slop”, or extra type families.
- CSS modules or styled-components.
- Hardcoded copy that belongs in `lib/data.ts`.
- Break the max-width / divider pattern in `app/page.tsx` without intent.

## Checklist

- [ ] Tokens only (no stray hex unless a new token is added in `tailwind.config.ts`)
- [ ] Dark mode still readable
- [ ] Hash nav targets (`#about`, …) still match section ids
- [ ] Touch targets usable on mobile
