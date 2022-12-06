<script lang="ts">
    import { currentEntityIndex, currentRound, entities, isLocked } from "../../store";



    let damage: number;
    let healing: number;

    const apply = () => {
        if (damage > 0) {
            $entities[$currentEntityIndex].hpCurrent -= damage;
        } else if (healing > 0) {
            $entities[$currentEntityIndex].hpCurrent += damage;
        }
    }

</script>

{#if $isLocked && $currentRound > 0}
    <div class="damage-tool-container">
        <div class="damage">
            <input type="number nospinner" bind:value={damage}/>
        </div>
        <div class="heal">
            <input type="number nospinner" bind:value={healing}/>
        </div>
        <button on:click={apply}>Apply</button>
    </div>
{/if}

<style>

    .damage-tool-container {
        display: flex;
        flex-direction: row;
        row-gap: 1em;
        align-items: center;
    }

    button {
        width: 100%;
        height: 4rem;
        border-radius: 8px;
        background-color: var(--secondary);
        font-size: 20px;
        font-weight: bold;
    }

    button:hover {
        background-color: var(--white);
    }

    .damage input {
        background-color: var(--red);
        border: 6px solid var(--dark-red);
        color: var(--dark-red);
    }

    .heal input {
        background-color: var(--green);
        border: 6px solid var(--dark-green);
        color: var(--dark-green);
    }

    input {
        height: 5rem;
        width: 5rem;
        border-radius: 1rem;
        font-size: 34px;
        font-weight: bold;
    }

    input:focus {
        outline: none;
    }
</style>
