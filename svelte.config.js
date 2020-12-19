module.exports = {
  preprocess: require('svelte-preprocess')({
    sourceMaps: process.env.NODE_ENV === 'development',
    defaults: {
      script: 'typescript',
      style: 'postcss',
    },
    postcss: {
      plugins: [
        require('tailwindcss')(require('./tailwind.config')),
        require('autoprefixer'),
      ]
    },
  }),
};