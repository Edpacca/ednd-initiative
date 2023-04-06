<script lang="ts">
    import { CONDITIONS } from "../../../lib/conditions";
    import PlusMinusButton from "../../common/buttons/PlusMinusButton.svelte";
    import DropdownFilter from "../../common/DropdownFilter.svelte";
    import ConditionIcon from "../../common/icons/ConditionIcon.svelte";
    import InputDropdownFilter from "../../common/InputDropdownFilter.svelte";
    import type { FocusType } from "./focusType";
    
    export let conditions: string[];
    export let conditionInput: HTMLInputElement;
    export let focused: FocusType = "none";
    export let submitCondition: (condition: string) => void;
    export let removeCondition: (condition: string) => void;
    export let value = "";
    let listHasFocus = false;
    let filterIndex = 0;

    $: filteredConditions = CONDITIONS.filter(c => c.startsWith(value.toLowerCase()) && !conditions.includes(c));
    
    const submit = (condition: string) => {
        submitCondition(condition);
        value = "";
        listHasFocus = false;
    }

    const ascendList = () => {
        filterIndex = Math.max(filterIndex - 1, 0);
    }

    const descendList = () => {
        filterIndex = Math.min(
            filterIndex + 1, filteredConditions.length - 1);
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
                    ? submit(filteredConditions[filterIndex])
                    : submit(value);
                break;
            case "Tab":
                if (value && filteredConditions.length > 0) {
                    value = filteredConditions[filterIndex];
                    conditionInput.select();
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

    $: listFocusCondition = focused === "condition";
</script>
<div class="effects-conditions">
    <div class="header-small underline">Effects & Conditions</div>
    <slot>
    </slot>
    <div class="search-header">
        <InputDropdownFilter 
            divClass="conditions-controls"
            inputClass="conditions-input"
            onFocusIn={() => focused = "condition"}
            listFocusCondition={listFocusCondition}
            submit={submit}
            list={filteredConditions}
            >
            <PlusMinusButton type="+" onClick={() => submit(value)} width="2rem"/>
        </InputDropdownFilter>

        <!-- <div class="controls">
            <input 
                bind:value
                bind:this={conditionInput}
                on:click={() => listHasFocus = true}
                on:focusin={() => focused = "condition"}
                on:keydown={e => onKeydown(e)}
                tabindex={1}/>
                <PlusMinusButton type="+" onClick={() => submit(value)} width="2rem"/>
        </div>
        {#if (value || listHasFocus) && focused === "condition" && filteredConditions.length > 0}
        <DropdownFilter list={filteredConditions} onLiClick={submit} bind:highlightedIndex={filterIndex}/>    
        {/if} -->
    </div>
    {#if conditions && conditions.length > 0}
    <div class="condition-grid">
        {#each conditions as condition}
            <div><ConditionIcon condition={condition} class="condition-icon" width="3rem" hasTooltip={false}/></div>
            <div>{condition}</div>
            <PlusMinusButton type="-" onClick={() => removeCondition(condition)} width="2rem"/>
        {/each}
    </div>
    {:else}
        <div>No effects</div>
    {/if}
</div>

<style>
    .effects-conditions {
        border-radius: var(--border-radius);
        text-align: center;
        padding: 1rem;
    }


    .condition-grid {
        display: grid;
        grid-template-columns: 3rem 1fr 2rem;
        padding-right: 0.5rem;
        text-align: left;
        column-gap: 2rem;
        align-items: center;
        font-size: var(--fontsize-L);
        text-transform: capitalize;
        max-height: 30vh;
        overflow-y: scroll;
    }

    .search-header {
        position: relative;
    }
</style> 