<script context="module">
    import type { Item } from '../model/Item'
    import type { UniqueGuarantor } from '../model/PossiblyUnique'
</script>
<script>
    export let isUnique: UniqueGuarantor<Item>;
    export let item: Item;

    let editing = false;

    $: name = item.name;

    /**
     * Tries to change the name of the current item, checking for uniqueness first.
     */
    function tryChangeName() {
        if(isUnique(name, item.id)) {
            item.name = name;
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
            bind:value="{name}" />
    {:else}
        <span 
            on:click="{() => editing = true}">
            {item.name}
        </span>
    {/if}
    <button type="button">&#x1F5D1;</button>
</li>