/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        moondance: ["'Moon Dance'", 'cursive'], // Define font name
        greatvibes: ["'Great Vibes'", 'cursive'],
        ptsans:["'PT Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
