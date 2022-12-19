<script lang="ts">
    import { CONDITIONS } from "../../../lib/conditions";
    import PlusMinusButton from "../../common/buttons/PlusMinusButton.svelte";
    export let conditions: string[];
    export let conditionInput: HTMLInputElement;
    export let submitCondition: (condition: string) => void;
    export let removeCondition: (condition: string) => void;
    let value = "";
    let inputHasFocus = false;
    let listHasFocus = false;
    let filteredIndex = 0;

    $: filteredConditions = CONDITIONS.filter(c => c.startsWith(value.toLowerCase()));

    const submitEnter = (event: KeyboardEvent, condition: string) => {
        
        if (event.key === "Enter") {
            submitCondition(condition);
        }
    }

    const submit = (condition: string) => {
        console.log(condition);
        submitCondition(condition);
        value = "";
        listHasFocus = false;
        inputHasFocus = false;
    }

    const delayFocusOut = async() => {
        setTimeout(() => inputHasFocus = false, 100);
    }
   
    const changeIndex = (event: KeyboardEvent) => {
        if (event.key === "ArrowUp") {
            filteredIndex = Math.max(filteredIndex - 1, 0);
        } else if (event.key === "ArrowDown") {
            if (listHasFocus) {
                filteredIndex = Math.min(filteredIndex + 1, filteredConditions.length - 1);
            } else {
                listHasFocus = true;
            }
        } else if (event.key === "Enter") {
            if (listHasFocus) {
                console.log("enter")
                submit(filteredConditions[filteredIndex]);
            }
        }
    }

    const focusInputList = (event: KeyboardEvent) => {
        if (!inputHasFocus && event.key === "ArrowDown") { 
            conditionInput.focus();
            listHasFocus = true;
        }
    }
</script>
<div class="effects" on:keyup={e => focusInputList(e)}>
    <div class="header-small underline">Effects & Conditions</div>
    <div class="search-header">
        <div class="controls">
            <input 
                bind:value
                bind:this={conditionInput}
                on:focusin={() => inputHasFocus = true}
                on:focusout={delayFocusOut}
                on:keydown={e => changeIndex(e)}
                tabindex={1}/>
            <PlusMinusButton type="+" onClick={() => submit(value)} width="1.5rem"/>
        </div>
        {#if (inputHasFocus || listHasFocus) && filteredConditions.length > 0}
            <div class="filter-list">
                <ul>
                    {#each filteredConditions as condition, i}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <li on:click={() => submit(condition)} class:highlighted={listHasFocus && i === filteredIndex}>
                            {condition}
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    </div>
    {#if conditions && conditions.length > 0}
    <div class="condition-grid">
        {#each conditions as condition}
            <div>icon</div>
            <div>{condition}</div>
            <PlusMinusButton type="-" onClick={() => removeCondition(condition)} width="1.5rem"/>
        {/each}
    </div>
    {:else}
        <div>No effects</div>
    {/if}
</div>

<style>
    .effects {
        border: 2px solid var(--primary);
        border-radius: var(--border-radius);
        text-align: center;
        padding: 1rem;
    }

    input {
        height: 1.8rem;
    }

    .controls {
        display: flex;
        flex-direction: row;
        column-gap: 0.2rem;
        align-items: center;
        margin: 0.5rem 0;        
    }

    .condition-grid {
        display: grid;
        grid-template-columns: 1.5rem 1fr 1.5rem;
        border: 1px solid var(--secondary);
        text-align: left;
        column-gap: 2rem;
    }

    .search-header {
        position: relative;
    }

    .filter-list {
        position: absolute;
        background: var(--dark-grey);
        color: var(--light-grey);
        border: 1px solid var(--light-grey);
        width: calc(100%);
        text-align: left;
        top: 1.8rem;
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
    }

    li {
        list-style: none;
        border-top: 1px solid var(--light-grey);
        text-transform: capitalize;
        cursor: pointer;
    }

    li:hover {
        color: var(--white);
        background-color: var(--light-grey);
    }

    ul {
        padding: 0 0.5rem;
        max-height: 20rem;
        overflow-y: scroll;
        margin: 0.5rem 0;
    }

    .highlighted {
        background: var(--light-grey);
        color: var(--white);
    }
</style> 