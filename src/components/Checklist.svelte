<script context="module">
    import { getContext } from 'svelte'

    import CategoryC from './Category.svelte'
    import DialogC from './Dialog.svelte'

    import { Guid } from 'guid-typescript'
    import { Category } from '../model/Category'
    import { Item } from '../model/Item'

    import { write as ivWriter, ItemVisibility } from '../stores/itemVisibilityStore'
</script>
<script>
    const username: string = getContext('currentUser');

    const savedCategories = localStorage.getItem('travel-packing' + username);
    let categories = Array<Category>();
    if(savedCategories) {
        categories = JSON.parse(savedCategories).map((c: any) => {
            const items = c.items.map((i: any) => new Item(i.id, c.id, i.name, i.packed))
            return new Category(c.id, c.name, items);
        });
    }

    let categoryName: string;

    const isUniqueCategory = Category.IsCategoryUnique(categories);
    const isUniqueItem = Category.IsItemUnique(categories);
    const unpackAll = Category.UnpackAllItems(categories);

    $: { 
        categories;
        save();
    }

    let message: string;
    let dialog: HTMLDialogElement;
    
    /** Tries to create the current categoryName, checking for uniqueness first. */
    function tryAddCategory() {
        if(isUniqueCategory(categoryName)) {
            categories.push(new Category(Guid.raw(), categoryName));
            categories = categories;
            categoryName = '';
            return;
        }

        message = `An category named '${categoryName}' already exists.`;
        dialog.showModal();
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

    /** Switches the given item between the given categories. */
    function changeCategory(e: CustomEvent) {
        const [source] = categories.filter(c => c.id === e.detail.categoryId);
        source.removeItemById(e.detail.id);
        const [target] = categories.filter(c => c.id === e.detail.destination);
        target.addItem(e.detail.name, e.detail.packed);

        categories = categories;
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
                bind:group="{$ivWriter}"/>
            All
        </label>
        <label>
            <input type="radio"
                name="visibility"
                value="{ItemVisibility.Packed}"
                bind:group="{$ivWriter}"/>
            Packed
        </label>
        <label>
            <input type="radio"
                name="visibility"
                value="{ItemVisibility.Unpacked}"
                bind:group="{$ivWriter}"/>
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
                bind:category="{thisCategory}"
                isUniqueItem="{isUniqueItem}"
                isUniqueCategory="{isUniqueCategory}"
                on:delete="{deleteCategory}"
                on:updated="{save}"
                on:changeCategory="{changeCategory}"/>
        {/each}
    </div>
</section>

<DialogC 
    bind:dialog="{dialog}"
    title="Packing List">
    <div>{message}</div>
</DialogC>
