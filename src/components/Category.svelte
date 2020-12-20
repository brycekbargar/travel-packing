<script context="module">
    import { createEventDispatcher } from 'svelte'

    import ItemC from './Item.svelte'

    import type { Category } from '../model/Category'
    import type { Item } from '../model/Item'
    import type { UniqueGuarantor } from '../model/PossiblyUnique'
</script>
<script>
    const d = createEventDispatcher();

    export let isUniqueCategory: UniqueGuarantor<Category>;
    export let isUniqueItem: UniqueGuarantor<Item>;
    export let category: Category;
    let categoryName = category.name;

    let editing = false;
    let itemName: string;

    let displayItems = category.displayItems;
    let remaining: number, total: number;
    $: {
        displayItems;
        remaining = category.remainingItems;
        total = category.totalItems;
    }

    /** Tries to add the current itemName to the category, checking for uniqueness first. */
    function tryAddItem() {
        if(isUniqueItem(itemName)) {
            category.addItem(itemName);
            displayItems = category.displayItems;
            itemName = '';
            d('updated');
            return;
        }

        alert(`An item named '${itemName}' already exists.`);
    }
    /** Tries to change the name of the current category, checking for uniqueness first. */
    function tryChangeName() {
        if(isUniqueCategory(categoryName, category.id)) {
            category.name = categoryName;
            editing = false;
            d('updated');
            return;
        }
        alert(`A category named '${categoryName}' already exists.`);
    }

    /** Deletes an item by a given Item Id. */
    function deleteItem(e: CustomEvent) {
        category.removeItemById(e.detail);
        displayItems = category.displayItems;
        d('updated');
    }
</script>

<section>
    <h3>
        {#if editing}
            <input type="text" 
                on:blur="{tryChangeName}"
                bind:value="{categoryName}" />
        {:else}
            <span 
                on:click="{() => editing = true}">
                {category.name}
            </span>
        {/if}
        <span>{remaining} of {total} remaining</span>
        <button type="button" on:click="{() => d('delete', category.id)}">&#x1F5D1;</button>
    </h3>

    <form on:submit|preventDefault="{tryAddItem}">
        <label for="itemName-{category.id}">New Item</label>
        <input type="text"
            id="itemName-{category.id}" name="itemName"
            bind:value="{itemName}" />
        <button disabled="{!itemName}">Add Item</button>
    </form>

    <ul>
        {#each displayItems as thisItem (thisItem.id)}
            <ItemC 
                item="{thisItem}"
                isUnique="{isUniqueItem}"
                on:delete="{deleteItem}"/>
        {:else}
            <div>No items in this category : (</div>
        {/each}
    </ul>
</section>