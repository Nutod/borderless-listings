module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled'],
      scale: ['focus-within'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
