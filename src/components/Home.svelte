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