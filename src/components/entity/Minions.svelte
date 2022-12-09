<script>
    import { currentMinionIndex, isLocked } from "../../store";
    export let quantity;
    export let name;
    export let isActive = false;
</script>

{#if quantity}
    {#each Array(quantity) as e, i}
        <div class="minion-container">
            <div class="minion-number">#{i + 1}</div>
            <input 
                type="text"
                class="minion-input"
                class:locked={$isLocked}
                class:active-minion={isActive && i === $currentMinionIndex}
                value={`${name} #${i + 1}`}
                on:click={() => $currentMinionIndex = i}/>
        </div>
    {/each}
{/if}

<style>
    .minion-container {
        position: relative;
    }

    input {
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
    }

    input.locked {
        background-color: var(--grey);
        color: var(--white);
    }

    .minion-number {
        position: absolute;
        top: 0.2em;
        left: -2em;
        font-size: 1.5em;
        font-weight: bold;
        text-align: right;
    }

    .active-minion {
        color: var(--gold);
        background-color: var(--dark-grey);
    }

    input:hover:not(.active-minion) {
        background-color: var(--light-grey)
    }
</style>