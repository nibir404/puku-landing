/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#FFFFFF',
        'bg-alt': '#FAFAFC',
        surface: '#FFFFFF',
        card: '#FFFFFF',
        border: '#E6E6EB',
        ink: {
          DEFAULT: '#0A0A0A',
          muted: '#666666',
          dim: '#888888',
          dark: '#0A0A0A',
        },
        'bg-dark': '#09090C',
        'card-dark': '#121216',
        'border-dark': 'rgba(255, 255, 255, 0.08)',
        accent: {
          DEFAULT: '#5B42F3',
          purple: '#5B42F3',
          violet: '#ece9ffff',
          deep: '#1e145aff',
          light: '#EEECFE',
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
        'lg': '2px',
        'xl': '2px',
        '2xl': '2px',
        '3xl': '2px',
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
};