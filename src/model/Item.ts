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
 * ItemVisibility represents a way to control which items should be visible.
 */
export enum ItemVisibility {
    All = 'ALL',
    Packed = 'PACKED',
    Unpacked = 'UNPACKED',
}
