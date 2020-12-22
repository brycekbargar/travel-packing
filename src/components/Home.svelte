<script context="module">
	import { setContext, SvelteComponent } from 'svelte';

	import LoginC from './Login.svelte'
	import ChecklistC from './Checklist.svelte'
	import NotFoundC from './NotFound.svelte'
</script>
<script>
	let isLoggedIn = false;
	let username: string;

	$: setContext('currentUser', username);

	let component: typeof SvelteComponent = LoginC;
	const routes: Record<string, typeof SvelteComponent> = {
		'#Logout': LoginC,
		'#Packing': ChecklistC
	}

	/** Performs naive hash based routing. */
	function doRoute(_: HashChangeEvent) {
		if(location.hash) {
			component = routes[location.hash] || NotFoundC;
		}
		else {
			component = LoginC;
		}
	}

</script>

<svelte:window on:hashchange="{doRoute}" />

<header>
	<h1>Travel Packing Checklist</h1>
	<button type="button" 
		hidden="{!isLoggedIn}"
		on:click="{() => {
			isLoggedIn = false;
			location.replace('#Logout');
		}}">Logout</button>
</header>
<main>
	<svelte:component this="{component}" 
		bind:username
		on:login="{() => {
			isLoggedIn = true;
			location.hash = '#Packing'
		}}"/>
</main>

<style>
	header { @apply 
		bg-black
		flex
		justify-between
		p-5
		align-top
	}

	header button { @apply
		text-gray-800
	}

	header h1 { @apply 
		text-white 
		text-xl
	}

	main { @apply
		dark:bg-gray-800
		dark:text-gray-200
		bg-gray-200
		text-gray-800
		h-screen
		overflow-auto
		pb-20
	}
</style>