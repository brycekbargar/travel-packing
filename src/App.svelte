<script context="module">
	import HomeC from './components/Home.svelte'
</script>

<HomeC />

<!-- Changes to this file require a long reload as tailwind is re-built -->
<style global>
  /* purgecss start ignore */
  @tailwind base;
  @tailwind components;
  /* purgecss end ignore */
 
  @tailwind utilities;

   button { @apply
		bg-gray-400
		border-gray-400
		  p-1
      rounded
    } 

	  input { @apply
		border-gray-600
	  text-gray-800
      rounded
    }
</style>