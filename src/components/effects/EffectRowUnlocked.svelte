<script lang="ts">
    import { dRoll } from "../../lib/dieRoll";
    import type { Effect } from "./effect";
    import { THEMES } from "../toolbar/selectTheme/themes";
    import Cave from "../../assets/icons/cave.svelte";
    import AddRemove from "../common/AddRemove.svelte";
    import D20Button from "../common/D20Button.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import EffectInputUnlocked from "./EffectInputUnlocked.svelte";
    import InitiativeValue from "../initiativeTable/InitiativeValue.svelte";

    export let effect: Effect;
    let themeIndex = 0;
    const cycleTheme = () => {
        if (effect.theme) {
            themeIndex = (themeIndex + 1) % THEMES.length
            effect.theme = THEMES[themeIndex]
        } else {
            effect.theme = THEMES[themeIndex]
        }
    }

    const addCounter = () => {
        if (effect.counters) {
            effect.counters = [...effect.counters, 0]
        } else {
            effect.counters = [0]
        }
    }

    const removeCounter = () => {
        if (effect.counters.length > 0) {
            effect.counters = [...effect.counters.slice(0, -1)]
        }
    }


</script>

<tr>
    <td class="blue svg-fit-container td-icon">
        <button class="blank-button svg-fit" on:click={cycleTheme}>
            <Cave/>
        </button>
    </td>
    <td><EffectInputUnlocked effect={effect}/></td>
    <td class="counters">
        <AddRemove add={addCounter} remove={removeCounter} center={true}/>
        {#if effect.counters}
            {#each effect.counters as counter}
                <div class="counter" class:thin-counter={effect.counters.length > 3}>
                    <NumberInput bind:value={counter}/>
                </div>
            {/each}
        {/if}
    </td>
    <td>
        <InitiativeValue bind:initiative={effect.initiative} bonus={0}/>
    </td>
    <td>
        <D20Button onClick={() => effect.initiative = dRoll(20)}/>
    </td>
</tr>

<style>
    button {
        background: none;
        border: none;
    }

    .td-icon {
        min-width: 3rem !important;
    }

    button:hover {
        fill: var(--light-blue);
    }

    .counters {
        display: flex;
        flex-direction: row;
        column-gap: 0.1rem;
        width: fit-content;
    }

    .counter {
        max-width: 2.5rem;
        min-width: 2.5rem;
    }
    
    .thin-counter {
        min-width: 2rem;
    }
</style>