/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.sky
      },
      animation: {
        'scale-in-right':
          'scale-in-right 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)  both',
        'scale-in-right-reverse':
          'scale-in-right 0.2s cubic-bezier(0.250, 0.460, 0.450, 0.940)   reverse both'
      },
      keyframes: {
        'scale-in-right': {
          '0%': {
            transform: 'scale(0)',
            'transform-origin': '100% 50%',
            opacity: '1'
          },
          to: {
            transform: 'scale(1)',
            'transform-origin': '100% 50%',
            opacity: '1'
          }
        },
        'scale-in-right-reverse': {
          '0%': {
            transform: 'scale(0)',
            'transform-origin': '100% 50%',
            opacity: '1'
          },
          to: {
            transform: 'scale(1)',
            'transform-origin': '100% 50%',
            opacity: '1'
          }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            pre: null
          }
        }
      }
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
};
