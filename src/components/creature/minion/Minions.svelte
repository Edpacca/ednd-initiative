<script lang="ts">
    import { activeEntityContextIndex, isLocked } from "../../../store";
    import ConditionIconGridSelect from "../../common/ConditionIconGridSelect.svelte";
    import ConditionIcon from "../../common/icons/ConditionIcon.svelte";
    import HealthBar from "../../common/values/HealthBar.svelte";
    export let quantity: number;
    export let hpMax: number;
    export let hpCurrent: number[];
    export let name: string;
    export let conditions: string[][] = [];
    export let parentIndex = 0;
    export let selectedIndex = 0;
    export let isSelected = false;
    let isConditionGridOpen = false;
    $: isHighlighted = isConditionGridOpen && $activeEntityContextIndex === parentIndex;

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

    const openConditionGrid = (i: number) => {
        if (isConditionGridOpen) {
            isConditionGridOpen = false;
        } else {
            $activeEntityContextIndex = parentIndex;
            selectedIndex = i;
            isConditionGridOpen = true;
        }
    }

</script>

{#if quantity}
    {#each Array(quantity) as e, i}
        <div class="relative">
            <ConditionIconGridSelect
                isOpen={isHighlighted && i === selectedIndex}
                bind:conditions={conditions[i]}
                name={`${name} #${i + 1}`}/>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="minion-number" 
                class:selected-minion-number={(isSelected || isHighlighted) && i === selectedIndex}
                on:click={() => select(i)}
                on:contextmenu|preventDefault={() => openConditionGrid(i)}>
                #{i + 1}
            </div>
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