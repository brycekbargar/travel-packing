const compareFunc = require('compare-func');
import { Guid } from 'guid-typescript'
import { Item } from './Item'
import type { UniqueGuarantor } from './PossiblyUnique'

/** Category represents a named grouping of items. */
export class Category{
    readonly id: string;
    name: string;

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
        return this.items.sort(compareFunc('name'));
    }

    /**
     * Creates a new Category with the given Id and Name.
     * @param id The unique id of the Category.
     * @param name The name of the Category.
     * @param packed An (optional) list of items the Category contains.
     */
    constructor(id: string, name: string, items?: Item[]) {
        this.id = id;
        this.name = name;
        this.items = items == null ? Array<Item>() : items;
    }

    /**
     * Adds a new Item to the category with a generated id.
     * @param itemName The name of the new item to add to the Category.
     */
    addItem(itemName: string) {
        this.items.push(new Item(Guid.raw(), itemName));
        this.items = this.items;
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
}