/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#0a0806',
          900: '#14100c',
          800: '#1e1813',
          700: '#2b221a',
          600: '#3e3227',
          500: '#5c4b3b',
        },
        blood: {
          900: '#52141c',
          800: '#8b2635',
          700: '#aa2e41',
          600: '#c53030',
          500: '#ff6b6b'
        },
        parchment: {
          100: '#fbf8f2',
          200: '#f4efe6',
          300: '#e8dec9',
          400: '#d7c7aa'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.25s ease-out forwards',
        pulseSlow: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
