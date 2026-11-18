/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#060913',
          900: '#0B132B',
          850: '#0E1738',
          800: '#141E46',
          700: '#1C2A5C',
          600: '#263777',
        },
        gold: {
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#F59E0B',
          600: '#D97706',
          mustard: '#F3A712',
          divine: '#FFD700',
        },
        coral: {
          400: '#FB7185',
          500: '#F95738',
          600: '#E11D48',
        },
        ice: {
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0284C7',
          soft: '#A8DADC',
        },
        ivory: {
          50: '#FDFCF7',
          100: '#FAF7EE',
          200: '#F4EFE0',
          300: '#EAE1C8',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        script: ['Dancing Script', 'cursive'],
      },
      boxShadow: {
        'divine': '0 0 35px -5px rgba(245, 158, 11, 0.25)',
        'divine-lg': '0 0 50px 0px rgba(245, 158, 11, 0.35)',
        'cyan-glow': '0 0 30px -5px rgba(56, 189, 248, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
