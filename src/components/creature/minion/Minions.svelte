<script lang="ts">
    import { isLocked } from "../../../store";
    import ConditionIcon from "../../common/icons/ConditionIcon.svelte";
    import HealthBar from "../../common/HealthBar.svelte";
    export let quantity: number;
    export let hpMax: number;
    export let hpCurrent: number[];
    export let name: string;
    export let conditions: string[][] = [];
    export let selectedIndex = 0;
    export let isSelected = false;

    const selectIndex = (i: number) => {
        selectedIndex = i;
    }

    const select = (i: number) => {
        if (isSelected) {
            selectIndex(i);
        } else {
            isSelected = true;
        }
    }

</script>

{#if quantity}
    {#each Array(quantity) as e, i}
        <div class="minion-container">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="minion-number" class:selected-minion-number={isSelected && i === selectedIndex} on:click={() => select(i)}>#{i + 1}</div>
            <input 
                type="text"
                class="minion-input"
                class:non-index-minion-input={isSelected}
                class:selected-minion-input={isSelected && i === selectedIndex}
                class:locked={$isLocked}
                disabled={$isLocked}
                value={`${name} #${i + 1}`}/>
            <HealthBar max={hpMax} current={hpCurrent[i]}/>
            {#if conditions.length === quantity && conditions[i].length > 0}
                <div class="conditions">
                    {#each conditions[i] as condition}
                        <ConditionIcon condition={condition} width="2rem"/>
                    {/each}
                </div>
            {/if}
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
        font-size: var(--fontsize-L);
        font-weight: bold;
        border: none;
    }

    input.locked {
        background-color: var(--grey);
        color: var(--white);
    }

    .non-index-minion-input {
        color: var(--mid-grey) !important;
    }

    .minion-number {
        position: absolute;
        top: 0.2em;
        left: -2em;
        font-size: 1.5em;
        font-weight: bold;
        text-align: right;
    }

    .minion-number:hover {
        color: var(--gold);
        cursor: pointer;
    }

    .selected-minion-number {
        color: var(--gold);
    }

    .selected-minion-input {
        color: var(--gold) !important;
        background: var(--mid-grey) !important;
    }
</style>