/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      gridRow: {
        'span-13': 'span 13 / span 13',
      }
    },
  },
  plugins: [require("daisyui")],
}
