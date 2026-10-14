---
name: portfolio-planning
description: Plans changes to this single-page Next.js portfolio without expanding scope. Use when the user wants a feature, redesign, section, content update, or implementation plan.
---

# Portfolio planning

## Workflow

1. Read `app/page.tsx` and `lib/data.ts` to see current sections and copy.
2. Identify the smallest surface: `lib/data.ts` (copy), `components/sections/` (page blocks), `components/hero/` (hero/3D), or `components/` chrome.
3. Propose a plan that fits the existing stack. Do not invent a new architecture.
4. List files to touch. Prefer edit-in-place over new folders.
5. Only then implement, unless the user asked for a plan only.

## Scope guards

- One route (`/`). New content is a section or modal, not a new page, unless requested.
- Do not migrate `legacy/` into the Next app unless asked.
- Do not add a blog, CMS, or contact API unless asked.
- Keep Lenis + GSAP scroll and R3F hero unless the task is to remove them.

## Output

When planning, use:

```markdown
## Goal
## Files
## Approach
## Out of scope
```
