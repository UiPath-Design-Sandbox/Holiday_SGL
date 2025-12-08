/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Outfit', 'sans-serif'], // Override serif to use Outfit too as requested "no serifs"
        'merry-christmas': ['MiraculousChristmas', 'cursive'],
      },
    },
  },
  plugins: [],
}
