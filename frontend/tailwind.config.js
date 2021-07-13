const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.coolGray,
      blue: colors.indigo,
      realblue: colors.blue,
      indigo: colors.indigo,
      red: colors.rose,
      pink: colors.fuchsia,
      white: colors.white,
      purple: colors.purple,
    },
    fontFamily: {
      sans: ['Jua', 'Nanum Gothic Coding', 'monospace'],
      flower: ['Sunflower', 'sans-serif'],
    },
    extend: {
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          // '@screen sm': {
          //   maxWidth: '500px',
          // },
          '@screen md': {
            maxWidth: '500px',
          },
          '@screen lg': {
            maxWidth: '500px',
          },
          '@screen xl': {
            maxWidth: '500px',
          },
        },
      });
    },
    require('tailwind-scrollbar-hide'),
  ],
};
