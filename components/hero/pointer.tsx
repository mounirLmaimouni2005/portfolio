'use client';

import { createContext, useContext } from 'react';
import type { MotionValue } from 'framer-motion';

/**
 * Shared, spring-smoothed pointer position for the whole hero.
 * Values are normalised to roughly [-0.5, 0.5] from the hero centre so
 * every layer can react at its own depth for a coherent parallax field.
 */
export type PointerCtx = {
  x: MotionValue<number>;
  y: MotionValue<number>;
};

export const PointerContext = createContext<PointerCtx | null>(null);

export function usePointer() {
  const ctx = useContext(PointerContext);
  return ctx;
}
