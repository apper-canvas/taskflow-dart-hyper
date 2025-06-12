/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5B47E0',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B7FE8',
          600: '#5B47E0',
          700: '#4C1D95',
          800: '#3C1A78',
          900: '#2D1B69'
        },
        secondary: {
          DEFAULT: '#8B7FE8',
          50: '#F8F7FF',
          100: '#F1EFFF',
          200: '#E5E1FF',
          300: '#D1CBFF',
          400: '#B8B0FF',
          500: '#8B7FE8',
          600: '#7C6FE0',
          700: '#6B5BD6',
          800: '#5A47CC',
          900: '#4A35B8'
        },
        accent: {
          DEFAULT: '#FF6B6B',
          50: '#FFF5F5',
          100: '#FED7D7',
          200: '#FEB2B2',
          300: '#FC8181',
          400: '#F56565',
          500: '#FF6B6B',
          600: '#E53E3E',
          700: '#C53030',
          800: '#9B2C2C',
          900: '#742A2A'
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        background: '#F8F9FC',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      },
      fontFamily: { 
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      fontSize: {
        'xs': ['12px', '16px'],
        'sm': ['14px', '20px'],
        'base': ['14px', '24px'],
        'lg': ['18px', '28px'],
        'xl': ['22px', '32px'],
        '2xl': ['28px', '36px']
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}