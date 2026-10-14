---
name: threejs-3d
description: Works on the React Three Fiber hero scene (Drei, Three.js) in this Next.js app. Use when editing Scene3D, ThreeScene, Canvas, lights, or 3D performance.
---

# Three.js / R3F

## Files

- `components/hero/Scene3D.tsx` — current scene (`Canvas`, `Float`, `RoundedBox`, `ContactShadows`)
- `components/hero/ThreeScene.tsx` — alternate/related scene
- Loaded with `next/dynamic(..., { ssr: false })` from `HeroRight.tsx` / `HeroImage.tsx`
- Gated by `enable3d` state in `Hero.tsx`

## Rules

1. Keep Three/R3F inside those scene files. Do not import `three` into layout or sections.
2. Preserve `ssr: false` dynamic import. Canvas cannot SSR.
3. Keep `transpilePackages: ['three']` in `next.config.mjs`.
4. Prefer Drei helpers already used (`Float`, `RoundedBox`, `ContactShadows`) over custom shaders unless asked.
5. Use `useFrame` for per-frame updates; do not `setState` every frame.
6. Dispose geometries/materials if you create them imperatively.
7. Respect reduced motion / `enable3d` false: DOM fallback must still look complete.

## Performance

- One `Canvas` in the hero.
- Avoid extra lights, high-poly meshes, and `dpr` above device limits.
- Do not add `@react-three/postprocessing` unless requested.
