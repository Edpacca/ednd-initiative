<script lang="ts">
    import DropdownFilter from "./DropdownFilter.svelte";

    export let list: string[];
    export let exclude: string[] = [];
    export let submit: (v?: string) => void;
    export let value = "";
    export let onFocusIn: () => void = () => {};
    export let listFocusCondition = false;
    export let input: HTMLInputElement;
    export let inputPlaceholder = ""

    let listHasFocus = false;
    let filterIndex = 0;

    $: filteredList = list.filter(item => 
        item.toLowerCase().startsWith(value.toLowerCase())
        && !exclude.includes(item));

    $: if (filterIndex >= filteredList.length - 1) {
        filterIndex = 0;
    }

    const onSubmit = (v: string) => {
        submit(v);
        listHasFocus = false;
    }

    const ascendList = () => {
        filterIndex = Math.max(filterIndex - 1, 0);
    }

    const descendList = () => {
        filterIndex = Math.min(
            filterIndex + 1, list.length - 1);
    }

    const killEvent = (event: KeyboardEvent) => {
        event.preventDefault();
        event.stopPropagation();
    }
   
    const onKeydown = (event: KeyboardEvent) => {
        switch(event.key) {
            case "ArrowUp":
                ascendList();
                listHasFocus = true;
                break;
            case "ArrowDown":
                if (listHasFocus) { 
                    descendList();
                }    
                listHasFocus = true;
                break;
            case "Enter":
                if (listHasFocus && filteredList.length > 0) {
                    value = filteredList[filterIndex] ?? "";
                    if (value) onSubmit(value);
                }
                else if (value) {
                    onSubmit(value);
                } 
                killEvent(event);
                break;
            case "Tab":
                if (value && filteredList.length > 0) {
                    value = filteredList[filterIndex] ?? "";
                    if (value) onSubmit(value);
                } else {
                    listHasFocus = false;
                }
                listHasFocus = false;
                killEvent(event);
                break;
            case "Backspace":
                if (!value) {
                    listHasFocus = false;
                }
                break;
            case "Escape":
                listHasFocus = false;
                killEvent(event);
                break;
            default:
                break;
        }
    }
</script>

{#if $$props.divClass}
    <div class={$$props.divClass}>
        <input
            type="text"
            class={$$props.inputClass}
            bind:value={value}
            bind:this={input}
            on:click={() => listHasFocus = true}
            on:focusin={onFocusIn}
            on:keydown={e => onKeydown(e)}
            tabindex={1}
            placeholder={inputPlaceholder}/>
        <slot></slot>
    </div>
{:else}
    <input
        class={$$props.inputClass}
        bind:value
        bind:this={input}
        on:click={() => listHasFocus = true}
        on:focusin={onFocusIn}
        on:keydown={e => onKeydown(e)}
        tabindex={1}
        placeholder={inputPlaceholder}/>
{/if}
{#if (listHasFocus) && listFocusCondition && filteredList.length > 0}
    <div class="filter-list">
        <DropdownFilter 
            list={filteredList}
            onLiClick={onSubmit}
            bind:highlightedIndex={filterIndex}/>
    </div>
{/if}

<style>
    .filter-list {
        position: absolute;
        background: var(--dark-grey);
        color: var(--light-grey);
        border: 1px solid var(--light-grey);
        border-top: none;
        border-radius: 0 0 var(--border-radius) var(--border-radius);
        width: calc(100%);
        max-height: 12rem;
        text-align: left;
        top: 2.7rem;
        display: flex;
        flex-direction: column;
        z-index: 20;
        overflow-y: scroll;
    }
</style>