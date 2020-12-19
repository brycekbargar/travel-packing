/**
 * Represents something that can be checked for uniqueness.
 */
interface PossiblyUnique{
    /** The unique identifier.  */
    readonly id: string;
    /** The unique name.  */
    readonly name: string;
}

/** 
 * A function for checking whether the name is unique.
 * @param name The name to check.
 * @param itemId An (optional) id to allow for something have it's own name.
 * @returns A value indicating whether the name is unique.
 */
export interface UniqueGuarantor<T extends PossiblyUnique> {
    (name: string, id?: string): boolean;
}
