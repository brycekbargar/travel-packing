import compareFunc from 'compare-func';
import { Guid } from 'guid-typescript'
import { Item, ItemVisibility } from './Item'
import type { UniqueGuarantor } from './PossiblyUnique'

/** Category represents a named grouping of items. */
export class Category{
    readonly id: string;
    name: string;

    private visibility: ItemVisibility;

    private items: Item[];
    /**
     * The number of items in this category which haven't been packed.
     */
    get remainingItems(): number {
        return this.items.filter(i => !i.packed).length;
    }
    /**
     * The total number of items in this category.
     */
    get totalItems(): number {
        return this.items.length;
    }
    /**
     * The list of items in this category for display.
     */
    get displayItems(): Item[] {
        return this.items
            .filter(i => {
                switch(this.visibility) {
                    case ItemVisibility.Packed: return i.packed;
                    case ItemVisibility.Unpacked: return !i.packed;
                }
                return true;
            })
            .sort(compareFunc('name'));
    }

    /**
     * Creates a new Category with the given Id and Name.
     * @param id The unique id of the Category.
     * @param name The name of the Category.
     * @param packed An (optional) list of items the Category contains.
     */
    constructor(id: string, name: string, visibility: ItemVisibility, items?: Item[]) {
        this.id = id;
        this.name = name;
        this.visibility = visibility;
        this.items = items == null ? Array<Item>() : items;
    }

    /**
     * Adds a new Item to the category with a generated id.
     * @param itemName The name of the new item to add to the Category.
     */
    addItem(itemName: string) {
        this.items = [new Item(Guid.raw(), itemName), ...this.items]
    }
    /**
     * Removes an existing Item from the category with the given id.
     * @param id The id of the item to remove from the Category.
     */
    removeItemById(id: string) {
        this.items = this.items.filter(i => i.id != id);
    }

    /**
     * Generates a Guarantor by looking at all items in a set of Categories.
     * @param categories A collection of categories to check for unique item names.
     */
    static IsItemUnique(categories: Category[]): UniqueGuarantor<Item> {
        return (n: string, id?: string) => !categories
            .flatMap(c => c.items)
            .some(i => i.name === n && i.id !== id);
    }

    /**
     * Generates a Guarantor by looking at all the categories in a set of Categories.
     * @param categories A collection of categories to check for unique category names.
     */
    static IsCategoryUnique(categories: Category[]): UniqueGuarantor<Category> {
        return (n: string, id?: string) => !categories
            .some(c => c.name === n && c.id !== id);
    }

    /**
     * Unpacks all items in a given collection.
     * @param categories A collection of categories to unpack.
     */
    static UnpackAllItems(categories: Category[]): () => void {
        return () => categories
            .flatMap(c => c.items)
            .forEach(i => i.packed = false);
    }

    /**
     * Changes the item visibility of a given collection.
     * @param categories A collection of categories to change the visibility for.
     */
    static ChangeItemVisibility(categories: Category[]): (v: ItemVisibility) => void {
        return (v) => categories
            .forEach(c => c.visibility = v);
    }
}