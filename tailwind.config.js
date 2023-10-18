/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],
  extend: {
    transitionProperty: {
      'height': 'height',
      'spacing': 'margin, padding',
    }
  },
  plugins: [require("tailwindcss-animate")],
}
