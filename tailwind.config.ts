import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7600ff',
          tint: '#a566ff',
          glow: 'rgba(118, 0, 255, 0.25)',
        },
        dark: {
          bg: '#0c0a12',
          surface: '#14101c',
          surfaceHover: '#1c1727',
          border: 'rgba(244, 241, 250, 0.10)',
          text: '#f4f1fa',
          muted: '#9d96b0',
        },
        light: {
          bg: '#f8f7fc',
          surface: '#ffffff',
          surfaceHover: '#f2f0f8',
          border: '#e3def0',
          text: '#14101c',
          muted: '#585168',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter-tight)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'icon-tile': '24px',
        card: '20px',
        inner: '12px',
        mono: '6px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(-5px) rotate(-5deg)' },
          '50%': { transform: 'translateY(5px) rotate(-4deg)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        float: 'float 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

