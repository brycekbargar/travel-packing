<script context="module">
    import { createEventDispatcher } from 'svelte'

    import DialogC from './Dialog.svelte'

    import type { Item } from '../model/Item'
    import type { UniqueGuarantor } from '../model/PossiblyUnique'

    import { read as ivReader, ItemVisibility } from '../stores/itemVisibilityStore'
</script>
<script>
    const d = createEventDispatcher();

    export let isUnique: UniqueGuarantor<Item>;
    export let item: Item;
    let itemName = item.name;

    let editing = false;
    let itemNameInput: HTMLElement;

    let hidden: boolean;
    $: {
        switch($ivReader) {
            case ItemVisibility.Packed: hidden = !item.packed; break;
            case ItemVisibility.Unpacked: hidden = item.packed; break;
            default: hidden = false; break;
        }
    }

    let message: string;
    let dialog: HTMLDialogElement;
    let dialogC: DialogC;

    /**
     * Tries to change the name of the current item, checking for uniqueness first.
     */
    function tryChangeName() {
        if(isUnique(itemName, item.id)) {
            item.name = itemName;
            editing = false;
            return;
        }

        message = `An item named '${itemName}' already exists.`;
        let detach: Function;
        detach = dialogC.$on('close', () => {
            itemNameInput.focus();
            detach();
        })
        dialog.showModal();
    }

    /** Focus on the item name input when the user chooses to edit it. */
    function focusItemName(e: HTMLElement) {
        e.focus();
    }
</script>

<li hidden="{hidden}">
    <input type="checkbox"
        bind:checked="{item.packed}" />
    {#if editing}
        <input type="text" bind:this="{itemNameInput}"
            use:focusItemName
            on:blur="{tryChangeName}"
            bind:value="{itemName}" />
    {:else}
        <span 
            on:click="{() => editing = true}">
            {item.name}
        </span>
    {/if}
    <button type="button" on:click="{() => d('delete', item.id)}">&#x1F5D1;</button>
</li>

<DialogC bind:this="{dialogC}"
    bind:dialog="{dialog}"
    title="Items">
    <div>{message}</div>
</DialogC>