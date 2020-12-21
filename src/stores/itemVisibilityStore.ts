import type { Item } from 'src/model/Item';
import { writable, Writable, Readable } from 'svelte/store'

/**
 * ItemVisibility represents a way to control which items should be visible.
 */
export enum ItemVisibility {
    All = 'ALL',
    Packed = 'PACKED',
    Unpacked = 'UNPACKED',
}

/**
 * A read/write store of ItemVisibilities.
 */
export const write: Writable<ItemVisibility> = writable(ItemVisibility.All);

/**
 * A readonly store of ItemVisibilities.
 */
export const read: Readable<ItemVisibility> = write;