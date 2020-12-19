<script context="module">
    import CategoryC from './Category.svelte'

    import { Guid } from 'guid-typescript'
    import { Category } from '../model/Category'
    import { ItemVisibility } from '../model/Item'
</script>
<script>
    let categories = Array<Category>();
    let categoryName: string;
    let itemVisibility: ItemVisibility;

    const isUniqueCategory = Category.IsCategoryUnique(categories);
    const isUniqueItem = Category.IsItemUnique(categories);
    const unpackAll = Category.UnpackAllItems(categories);
    const changeVisibility = Category.ChangeItemVisibility(categories)

    $: {
        changeVisibility(itemVisibility);
    }

    /**
     * Tries to create the current categoryName, checking for uniqueness first.
     */
    function tryAddCategory() {
        if(isUniqueCategory(categoryName)) {
            categories.push(new Category(Guid.raw(), categoryName, itemVisibility));
            categories = categories;
            categoryName = '';
            return;
        }

        alert(`An category named '${categoryName}' already exists.`);
    }
</script>

<section>
    <form on:submit|preventDefault="{tryAddCategory}">
        <label for="categoryName">New Category</label>
        <input type="text"
            id="categoryName" name="categoryName"
            bind:value="{categoryName}" />
        <button disabled="{!categoryName}">Add Category</button>
    </form>
    <p>
        Suggested categories include Backpack, Clothes, Last Minute, Medicines, Running Gear, and Toiletries.
    </p>

    <div>
        <label>
            <input type="radio" checked
                name="visibility"
                value="{ItemVisibility.All}"
                bind:group="{itemVisibility}"/>
            All
        </label>
        <label>
            <input type="radio"
                name="visibility"
                value="{ItemVisibility.Packed}"
                bind:group="{itemVisibility}"/>
            Packed
        </label>
        <label>
            <input type="radio"
                name="visibility"
                value="{ItemVisibility.Unpacked}"
                bind:group="{itemVisibility}"/>
            Unpacked
        </label>
        <button type="button"
            on:click="{unpackAll}">
            Unpack All Items
        </button>
    </div>

    <div>
        {#each categories as thisCategory (thisCategory.id)}
            <CategoryC 
                category="{thisCategory}"
                isUniqueItem="{isUniqueItem}"
                isUniqueCategory="{isUniqueCategory}"/>
        {/each}
    </div>
</section>
