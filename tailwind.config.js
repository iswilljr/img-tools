/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: [
          '#24272D',
          '#20232A',
          '#1C1F28',
          '#181C25',
          '#141924',
          '#111622',
          '#0D1321',
          '#0E121C',
          '#0D1118',
          '#0D0F14',
          '#0C0E12',
          '#0C0D10',
          '#0B0C0E',
        ],
        primary: ['#8495B1', '#6C85AC', '#5376AC', '#4169A6', '#305DA3', '#1F52A1', '#0D47A1', '#194384', '#203E6D'],
        secondary: ['#1F3E5D', '#15385B', '#0B335B', '#112E4B', '#15293E', '#162534', '#17212C', '#161E26', '#161B21'],
      },
      screens: {
        xs: '450px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

module.exports = tailwindConfig;
