/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          DEFAULT: '#0F5132',
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#4CAF50',
          500: '#0F5132',
          600: '#1B5E20',
          700: '#0B301B',
          800: '#072112',
          900: '#030D07',
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
        soft: '0 10px 40px -10px rgba(15, 81, 50, 0.15)',
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
