import tailwindcssAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Standard shadcn CSS variable mappings
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        ring: 'hsl(var(--ring))',
        input: 'hsl(var(--input))',

        // Existing design system tokens preserved
        bg: '#FFFFFF',
        'bg-alt': '#FAFAFC',
        surface: '#FFFFFF',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        ink: {
          DEFAULT: '#0A0A0A',
          muted: '#1A1A1E',
          dim: '#333338',
          dark: '#0A0A0A',
        },
        'bg-dark': '#09090C',
        'card-dark': '#121216',
        'border-dark': 'rgba(255, 255, 255, 0.08)',
        accent: {
          DEFAULT: '#6E56CF',
          foreground: '#FFFFFF',
          purple: '#6E56CF',
          violet: '#5B42F3',
          deep: '#1e145aff',
          light: '#5B42F3',
        },
      },
      fontFamily: {
        display: ['"Inter"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'hero-heading': ['48px', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-2xl': ['48px', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display-xl': ['38px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['30px', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      borderRadius: {
        radius: 'var(--radius)',
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 12px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};