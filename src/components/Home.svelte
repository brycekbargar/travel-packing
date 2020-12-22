<script context="module">
	import { setContext } from 'svelte';

	import LoginC from './Login.svelte'
	import ChecklistC from './Checklist.svelte'
</script>
<script>
	let isLoggedIn = false;
	let username: string;

	$: setContext('currentUser', username);
</script>

<header>
	<h1>Travel Packing Checklist</h1>
	<button type="button" 
		hidden="{!isLoggedIn}"
		on:click="{() => isLoggedIn = false}">Logout</button>
</header>
<main>
	{#if isLoggedIn}
	<ChecklistC />
	{:else}
	<LoginC 
		bind:username
		on:login="{() => isLoggedIn = true}"/>
	{/if}
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