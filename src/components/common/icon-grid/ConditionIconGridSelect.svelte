<script lang="ts">
    import { CONDITIONS } from "../../../data/conditionsData";
    import { appendConditionToCurrentLog } from "../../../lib/logger";
    import type { Creature } from "../../../lib/models/creature";
    import ConditionIcon from "../icons/ConditionIcon.svelte";

    export let conditions: string[];
    export let name = "";
    export let isOpen = false;
    export let creature: Creature;
    export let index = 0;

    const handleClick = (condition: string) => {
        if (conditions.includes(condition)) {
            conditions = conditions.filter(c => c !== condition);
        } else {
            conditions = [...conditions, condition];
            appendConditionToCurrentLog(creature, condition, index);
        }
        isOpen = false;
    }

</script>

{#if isOpen}
    <div class="icon-grid-container">
        <div class="text-center">{name}</div>
        <div class="icon-grid">
            {#each CONDITIONS as condition}
                <button 
                    class="blank-button"
                    class:highlighted={conditions.includes(condition)}
                    on:click={() => handleClick(condition)}>
                    <ConditionIcon condition={condition}/>
                </button>
            {/each}
        </div>
    </div>
{/if}

<style>
    .icon-grid-container {
        position: absolute;
        top: 0;
        left: 3.5rem;
        z-index: var(--z-modal);
        background-color: var(--dark-grey-90);
        border-radius: var(--border-radius);
        padding: 0.5rem;
        border: 2px solid var(--light-grey);
    }

    .icon-grid {
        display: grid;
        grid-template-columns: repeat(5, 2rem);
        row-gap: 0.5rem;
        column-gap: 0.5rem;
    }

    button {
        fill: var(--light-grey);
        opacity: 0.5;
        padding: 0;
        margin: 0;
        height: 2rem;
        width: 2rem;
    }

    button:hover {
        fill: var(--white);
        opacity: 1;
    }

    .highlighted {
        opacity: 1;
        fill: var(--white);
    }
</style>