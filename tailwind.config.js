/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#5B3A8E',
          50: '#F4EEFC',
          100: '#E6D9F5',
          200: '#CDB3EB',
          300: '#AE87DC',
          400: '#8F61C8',
          500: '#5B3A8E',
          600: '#4C3079',
          700: '#3D2761',
          800: '#2E1D49',
          900: '#1F1432',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF6E7',
          100: '#F5E8C2',
          200: '#EBD491',
          300: '#E0BF61',
          400: '#D4AF37',
          500: '#B8932A',
          600: '#94761F',
        },
        beige: '#F8F4EE',
        ink: '#333333',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'thread-divider': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 20'%3E%3Cpath d='M0 10 Q 50 0, 100 10 T 200 10' stroke='%23D4AF37' fill='none' stroke-width='2'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(91, 58, 142, 0.15)',
        card: '0 8px 30px -8px rgba(51, 51, 51, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
