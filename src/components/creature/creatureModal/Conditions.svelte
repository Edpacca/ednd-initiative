<script lang="ts">
    import { CONDITIONS } from "../../../lib/conditions";
    import PlusMinusButton from "../../common/buttons/PlusMinusButton.svelte";
    export let conditions: string[];
    export let submitCondition: (condition: string) => void;
    export let removeCondition: (condition: string) => void;
    let value = "";

    $: filteredConditions = CONDITIONS.filter(c => c.startsWith(value.toLowerCase()));
    let hasFocus = false;

    const onEnter = (event: KeyboardEvent, condition: string) => {
        if (event.key === "Enter") {
            submitCondition(condition);
        }
    }

    const submit = (condition: string) => {
        console.log(condition);
        submitCondition(condition);
        value = "";
    }
   
</script>
<div class="effects">
    <div class="header-small underline">Effects & Conditions</div>
    <div class="search-header">
        <div class="controls">
            <input bind:value id="condition-input" on:focusin={() => hasFocus = true} on:focusout={() => hasFocus = false}/>
            <PlusMinusButton type="+" onClick={() => submit(value)} width="1.5rem"/>
        </div>
        {#if (value || hasFocus) && filteredConditions.length > 0}
            <div class="filter-list">
                <ul>
                    {#each filteredConditions as condition}
                        <li>
                            <button on:click={() => submit(condition)}>
                                {condition}
                            </button>
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
        border: 1px solid var(--secondary)
    }

    .search-header {
        position: relative;
    }

    .filter-list {
        position: absolute;
        background: var(--dark-grey);
        color: var(--light-grey);
        width: calc(100%);
        text-align: left;
        top: 1.8rem;
        border-radius: var(--border-radius);
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
    }
    
</style> 