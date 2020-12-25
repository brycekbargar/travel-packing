<header>
    <h1>Travel Packing Checklist</h1>
    <a href="/">Logout</a>
</header>
<main>
    <slot />
</main>

<style global>
   :global(button) { @apply
		bg-gray-400
		border-gray-400
		p-1
        rounded
    } 

	:global(input) { @apply
        border-gray-600
	    text-gray-800
        rounded
    }

	header { @apply 
		bg-black
		flex
		justify-between
		p-5
		align-top
	}

	header a { @apply
		text-gray-800
		bg-gray-400
		border-gray-400
		p-1
        rounded
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