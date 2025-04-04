/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#121212',
        bgAccent: '#1E1E1E',
        bgAccentHover: '#292929',
        textPrimary: '#F3F3F3',
        textAccent: '#A8A8A8',
        textHover: '#cccccc',
        magenta: '#e102fa',
        magentaLight: '#ee68fd',
        aqua: '#00FFFF',
      },
      fontSize: {
        smTitle: '1.063rem',
      },
      borderRadius: {
        'custom-tl': '50px 25px',
        'custom-bl': '50px 25px',
      },
    },
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.rounded-custom-border-left': {
          'border-top-left-radius': '50px 25px',
          'border-bottom-left-radius': '50px 25px',
        },
      };

      addUtilities(newUtilities);
    }),
  ],
};
