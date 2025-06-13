/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#3F3D99',
          DEFAULT: '#4B48B7',
          light: '#6260C8',
          lighter: '#9F9DE3'
        },
        secondary: {
          dark: '#00D38A',
          DEFAULT: '#00F5A0',
          light: '#4FFBB7'
        },
        accent: {
          dark: '#E64578',
          DEFAULT: '#FF5C8A',
          light: '#FF8AAD'
        },
        gray: {
          100: '#F7F7FC',
          200: '#EDF0F7',
          300: '#E1E4ED',
          400: '#C7CAD9',
          500: '#9EA5B8',
          600: '#6F7897',
          700: '#4D5675',
          800: '#2D3553',
          900: '#14192D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 }
        }
      }
    }
  },
  plugins: []
};