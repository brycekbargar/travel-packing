<script context="module">
    import ItemC from './Item.svelte'
    import type { Category } from '../model/Category'
    import type { UniqueItemGuarantor } from '../model/Item'
</script>
<script>
    export let isUnique: UniqueItemGuarantor;
    export let category: Category;

    let editing = false;
    let itemName: string;

    /**
     * Tries to add the current itemName to the category, checking for uniqueness first.
     */
    function tryAddItem() {
        if(isUnique(itemName)) {
            category.addItem(itemName);
            itemName = '';
            return;
        }

        alert(`${itemName} has already been added.`);
    }
</script>

<section>
    <h3>
        {#if editing}
            <input type="text" 
                on:blur="{() => editing = false}"
                bind:value="{category.name}" />
        {:else}
            <span 
                on:click="{() => editing = true}">
                {category.name}
            </span>
        {/if}
        <span>{category.remainingItems} of {category.totalItems} remaining</span>
        <button>&#x1F5D1;</button>
    </h3>

    <form on:submit|preventDefault="{tryAddItem}">
        <label for="itemName">New Item</label>
        <input type="text"
            id="itemName" name="itemName"
            bind:value="{itemName}" />
        <button disabled="{!itemName}">Add Item</button>
    </form>

    <ul>
        {#each category.displayItems as thisItem (thisItem.id)}
            <ItemC 
                item="{thisItem}" />
        {:else}
            <div>No items in this category : (</div>
        {/each}
    </ul>
</section>