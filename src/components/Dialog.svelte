<script context="module">
    import { onMount, createEventDispatcher } from 'svelte';
</script>
<script>
    const d = createEventDispatcher();

    export let title = '';

    export let dialog: HTMLDialogElement;
    onMount(async () => {
        const {default: polyfill} = await require('dialog-polyfill');
        polyfill.registerDialog(dialog);
    });

    function close() {
        dialog.close();
        d('close');
    }
</script>

<dialog bind:this="{dialog}">
    <header>
        <span>
            {@html title}
        </span>
        <button type="button" on:click="{close}">
            &#x2716
        </button>
    </header>
    <main>
        <slot />
    </main>
</dialog>