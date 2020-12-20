import type { Item } from 'src/model/Item';
import { writable } from 'svelte/store'

/**
 * ItemVisibility represents a way to control which items should be visible.
 */
export enum ItemVisibility {
    All = 'ALL',
    Packed = 'PACKED',
    Unpacked = 'UNPACKED',
}

/**
 * A store of ItemVisibilities.
 */
export const store = writable(ItemVisibility.All);