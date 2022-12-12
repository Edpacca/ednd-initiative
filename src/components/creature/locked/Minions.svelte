<script lang="ts">
    import { isLocked, selectedEntityIndex } from "../../../store";
    import HealthBar from "../../common/HealthBar.svelte";
    export let quantity: number;
    export let hpMax: number;
    export let hpCurrent: number[];
    export let name: string;
    export let index: number;
</script>

{#if quantity}
    {#each Array(quantity) as e, i}
        <div class="minion-container">
            <div class="minion-number">#{i + 1}</div>
            <input 
                type="text"
                class="minion-input"
                class:locked={$isLocked}
                class:selected-minion={$selectedEntityIndex[0] === index && $selectedEntityIndex[1] === i}
                value={`${name} #${i + 1}`}
                on:click={() => $selectedEntityIndex = [index, i]}/>
                <HealthBar max={hpMax} current={hpCurrent[i]}/>
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

    .selected-minion {
        color: var(--primary);
        background-color: var(--dark-grey);
    }

    input:hover:not(.selected-minion) {
        background-color: var(--light-grey)
    }
</style>