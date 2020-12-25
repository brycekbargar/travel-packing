const sveltePreprocess = require('svelte-preprocess');
module.exports = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: sveltePreprocess({
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
	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: '@sveltejs/adapter-node',

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};
