import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',        // primary
        graphite: '#111827',   // secondary / text-primary
        accent: {
          DEFAULT: '#2563EB',
          hover: '#3B82F6',
        },
        success: '#22C55E',
        canvas: '#FAFAFA',     // background
        surface: '#FFFFFF',
        muted: '#6B7280',      // text-secondary
        hairline: '#E5E7EB',   // border
      },
      fontFamily: {
        display: ['"Clash Display"', 'var(--font-fallback)', 'sans-serif'],
        sans: ['"Cabinet Grotesk"', 'var(--font-fallback)', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,23,42,.04), 0 10px 24px -8px rgba(15,23,42,.10)',
        lift: '0 20px 48px -16px rgba(15,23,42,.22), 0 4px 12px -6px rgba(15,23,42,.10)',
        glass: '0 8px 32px -8px rgba(15,23,42,.18), inset 0 1px 0 rgba(255,255,255,.6)',
      },
      borderRadius: {
        xl2: '20px',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(.23,1,.32,1)',
      },
      keyframes: {
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        floatCard: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(34,197,94,.45)' },
          '70%': { boxShadow: '0 0 0 8px rgba(34,197,94,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%)' },
          '100%': { transform: 'translateX(220%)' },
        },
      },
      animation: {
        floatY: 'floatY 6s ease-in-out infinite',
        floatCard: 'floatCard 5s ease-in-out infinite',
        pulseRing: 'pulseRing 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
