module.exports = {
  purge: { 
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./src/**/*.svelte', './public/*.html'],
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
