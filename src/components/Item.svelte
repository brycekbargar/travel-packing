<script context="module">
    import { createEventDispatcher } from 'svelte'

    import type { Item } from '../model/Item'
    import type { UniqueGuarantor } from '../model/PossiblyUnique'
</script>
<script>
    const d = createEventDispatcher();

    export let isUnique: UniqueGuarantor<Item>;
    export let item: Item;
    let itemName = item.name;

    let editing = false;


    /**
     * Tries to change the name of the current item, checking for uniqueness first.
     */
    function tryChangeName() {
        if(isUnique(itemName, item.id)) {
            item.name = itemName;
            editing = false;
            return;
        }
        alert(`An item named '${name}' already exists.`);
    }
</script>

<li>
    <input type="checkbox"
        bind:checked="{item.packed}" />
    {#if editing}
        <input type="text" 
            on:blur="{tryChangeName}"
            bind:value="{itemName}" />
    {:else}
        <span 
            on:click="{() => editing = true}">
            {item.name}
        </span>
    {/if}
    <button type="button" on:click="{() => d('delete', item.id)}">&#x1F5D1;</button>
</li>