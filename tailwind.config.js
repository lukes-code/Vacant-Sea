/** @type {import('tailwindcss').Config} */
const { blackA, green, mauve, violet } = require('@radix-ui/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'mobile': '450px',
    },
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...mauve,
        ...violet,
        lightBlue: '#006992',
        softYellow: '#EEC584',
      },
    },
  },
  plugins: [],
}
