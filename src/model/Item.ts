/** Item represents a unique something intended to be packed. */
export class Item {
    readonly id: string;
    name: string;
    packed: boolean;

    /**
     * Creates a new item with the given Id and Name.
     * @param id The unique id of the Item.
     * @param name The name of the Item.
     * @param packed An (optional) value indicating whether the item has been packed.
     */
    constructor(id: string, name: string, packed?:boolean) {
        this.id = id;
        this.name = name;
        this.packed = packed == null ? false : packed;
    }
}

/** 
 * A function for checking whether the Item's name is unique.
 * @param itemName The name of the Item to check.
 * @param itemId An (optional) id of the Item to allow for an item to keep it's own name.
 * @returns A value indicating whether the name of the Item is unique.
 */
export interface UniqueItemGuarantor {
    (itemName: string, itemId?: string): boolean;
}
