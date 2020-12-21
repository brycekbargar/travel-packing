/** Item represents a unique something intended to be packed. */
export class Item {
    readonly id: string;
    categoryId: string;
    name: string;
    packed: boolean;

    /**
     * Creates a new item with the given Id and Name.
     * @param id The unique id of the Item.
     * @param categoryId The unique categoryId of the Category containing this Item.
     * @param name The name of the Item.
     * @param packed An (optional) value indicating whether the item has been packed.
     */
    constructor(id: string, categoryId: string, name: string, packed?:boolean) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.packed = packed == null ? false : packed;
    }
}
