<script context="module">
    import ItemC from './Item.svelte'
    import type { Category } from '../model/Category'
    import type { Item } from '../model/Item'
    import type { UniqueGuarantor } from '../model/PossiblyUnique'
</script>
<script>
    export let isUniqueCategory: UniqueGuarantor<Category>;
    export let isUniqueItem: UniqueGuarantor<Item>;
    export let category: Category;

    let editing = false;
    let itemName: string;

    $: categoryName = category.name;

    /**
     * Tries to add the current itemName to the category, checking for uniqueness first.
     */
    function tryAddItem() {
        if(isUniqueItem(itemName)) {
            category.addItem(itemName);
            itemName = '';
            return;
        }

        alert(`An item named '${itemName}' already exists.`);
    }
    /**
     * Tries to change the name of the current category, checking for uniqueness first.
     */
    function tryChangeName() {
        if(isUniqueCategory(categoryName, category.id)) {
            category.name = categoryName;
            editing = false;
            return;
        }
        alert(`A category named '${categoryName}' already exists.`);
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
                item="{thisItem}"
                isUnique="{isUniqueItem}"/>
        {:else}
            <div>No items in this category : (</div>
        {/each}
    </ul>
</section>