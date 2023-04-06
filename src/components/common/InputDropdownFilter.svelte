<script lang="ts">
    import DropdownFilter from "./DropdownFilter.svelte";

    export let list: string[];
    export let key: string | undefined = undefined;
    export let submit: (t?: any) => void;
    export let value = "";
    export let onFocusIn: () => void;
    export let listFocusCondition = false;

    let input: HTMLInputElement
    let listHasFocus = false;
    let filterIndex = 0;

    const ascendList = () => {
        filterIndex = Math.max(filterIndex - 1, 0);
    }

    const descendList = () => {
        filterIndex = Math.min(
            filterIndex + 1, list.length - 1);
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
                listHasFocus 
                    ? submit(list[filterIndex])
                    : submit(value);
                break;
            case "Tab":
                if (value && list.length > 0) {
                    value = list[filterIndex];
                    input.select();
                } else {
                    listHasFocus = false;
                }
                break;
            case "Backspace":
                if (!value) {
                    listHasFocus = false;
                }
                break;
            default:
                break;
        }
    }
</script>

<div class={$$props.divClass}>
    <input
        class={$$props.inputClass}
        bind:value
        bind:this={input}
        on:click={() => listHasFocus = true}
        on:focusin={onFocusIn}
        on:keydown={e => onKeydown(e)}
        tabindex={1}/>
    <slot></slot>
</div>
{#if (value || listHasFocus) && listFocusCondition && list.length > 0}
    <DropdownFilter list={list} onLiClick={submit} key={key}
        bind:highlightedIndex={filterIndex}/>
{/if}