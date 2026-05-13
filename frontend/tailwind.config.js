/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgba(0,0,255,1)',
        'custom-green': 'rgba(117, 255, 51)',
      },
      textShadow: {
        glow: '0 0 10px rgba(255, 255, 255, 0.8)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('tailwindcss-textshadow'),
  ],
}

