<script lang="ts">
    import { CONDITIONS } from "../../lib/conditions";
    import ConditionIcon from "./icons/ConditionIcon.svelte";

    export let conditions: string[];
    export let isOpen = false;

    const handleClick = (condition: string) => {
        if (conditions.includes(condition)) {
            conditions = conditions.filter(c => c !== condition);
        } else {
            conditions = [...conditions, condition];
        }
        isOpen = false;
    }

</script>

{#if isOpen}
    <div class="icon-grid">
        {#each CONDITIONS as condition}
            <button class="blank-button" class:highlighted={conditions.includes(condition)} on:click={() => handleClick(condition)}>
                <ConditionIcon condition={condition}/>
            </button>
        {/each}
    </div>
{/if}

<style>
    .icon-grid {
        display: grid;
        grid-template-columns: repeat(5, 2rem);
        background-color: var(--dark-grey-90);
        border-radius: var(--border-radius);
        position: absolute;
        row-gap: 0.5rem;
        column-gap: 0.5rem;
        padding: 0.5rem;
        border: 2px solid var(--light-grey);
        z-index: var(--z-modal);
        top: 0;
        left: 3.5rem;
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