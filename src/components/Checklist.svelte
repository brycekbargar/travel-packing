<script context="module">
    import { getContext } from 'svelte'

    import CategoryC from './Category.svelte'

    import { Guid } from 'guid-typescript'
    import { Category } from '../model/Category'
    import { Item, ItemVisibility } from '../model/Item'
</script>
<script>
    const username: string = getContext('currentUser');

    let itemVisibility = ItemVisibility.All;

    const savedCategories = localStorage.getItem('travel-packing' + username);
    let categories = Array<Category>();
    if(savedCategories) {
        categories = JSON.parse(savedCategories).map((c: any) => {
            const items = c.items.map((i: any) => new Item(i.id, i.name, i.packed))
            return new Category(c.id, c.name, itemVisibility, items);
        });
    }

    let categoryName: string;

    const isUniqueCategory = Category.IsCategoryUnique(categories);
    const isUniqueItem = Category.IsItemUnique(categories);
    const unpackAll = Category.UnpackAllItems(categories);
    const changeVisibility = Category.ChangeItemVisibility(categories)

    $: {
        changeVisibility(itemVisibility);
        categories = categories;
    }

    $: { 
        categories;
        save();
    }

    /** Tries to create the current categoryName, checking for uniqueness first. */
    function tryAddCategory() {
        if(isUniqueCategory(categoryName)) {
            categories.push(new Category(Guid.raw(), categoryName, itemVisibility));
            categories = categories;
            categoryName = '';
            return;
        }

        alert(`An category named '${categoryName}' already exists.`);
    }

    /** Deletes a category by a given Item Id. */
    function deleteCategory(e: CustomEvent) {
        categories = categories.filter(c => c.id != e.detail);
    }

    /** Saves the current state of the categories. */
    function save() {
        localStorage.setItem(
            'travel-packing' + username,
             JSON.stringify(categories));
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
            <input type="radio"
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
                isUniqueCategory="{isUniqueCategory}"
                on:delete="{deleteCategory}"
                on:updated="{save}"/>
        {/each}
    </div>
</section>
