<script context="module">
    import type { Item } from '../model/Item'
</script>
<script>
    export let item: Item;

    let editing = false;
</script>

<li>
    <input type="checkbox"
        bind:checked="{item.packed}" />
    {#if editing}
        <input type="text" 
            on:blur="{() => editing = false}"
            bind:value="{item.name}" />
    {:else}
        <span 
            on:click="{() => editing = true}">
            {item.name}
        </span>
    {/if}
    <button>&#x1F5D1;</button>
</li>