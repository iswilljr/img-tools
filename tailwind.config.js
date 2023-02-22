/** @type {import('tailwindcss').Config} */

const tailwindConfig = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: [
          '#494F55',
          '#41474E',
          '#3A4149',
          '#333B44',
          '#2C3540',
          '#26313C',
          '#202C39',
          '#1F2831',
          '#1E242B',
          '#1C2025',
          '#1A1D21',
          '#181A1D',
          '#161819',
        ],
        primary: ['#FEFEFE', '#DCE8F2', '#B8D5EC', '#91C4ED', '#64B5F7', '#55A3E3', '#4A93CF', '#4484B9', '#48769C'],
        secondary: ['#8495B1', '#6C85AC', '#5376AC', '#4169A6', '#305DA3', '#1F52A1', '#0D47A1', '#194384', '#203E6D'],
      },
      screens: {
        xs: '450px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

module.exports = tailwindConfig;
