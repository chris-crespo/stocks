/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ['Circular', 'sans-serif']
    },
    extend: {},
  },
  plugins: [
    require('@headlessui/tailwindcss')
  ],
}
