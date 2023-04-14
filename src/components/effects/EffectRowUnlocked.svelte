<script lang="ts">
    import { dRoll } from "../../lib/dieRoll";
    import type { Effect } from "../../lib/models/effect";
    import { THEMES } from "../../data/themeData";
    import Cave from "../../graphics/icons/cave.svelte";
    import AddRemove from "../common/buttons/AddRemove.svelte";
    import D20Button from "../common/buttons/D20Button.svelte";
    import EffectInput from "./EffectInput.svelte";
    import InitiativeValue from "../common/values/InitiativeValue.svelte";
    import { setLocalStorageEntities } from "../../lib/persistance";
    import { entities, isLocked } from "../../store";
    import EffectCounter from "./EffectCounter.svelte";

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

    $: effect, setLocalStorageEntities($entities);
</script>

<tr>
    <td class="blue svg-fit-container td-icon">
        <button class="blank-button svg-fit" on:click={cycleTheme} on:contextmenu|preventDefault={() => effect.theme = undefined}>
            <Cave/>
        </button>
    </td>
    <td><EffectInput bind:effect={effect}/></td>
    <td>
        <div class="counters">
            <AddRemove add={addCounter} remove={removeCounter} center={true}/>
            {#if effect.counters}
                {#each effect.counters as counter}
                    <EffectCounter bind:value={counter} extraClasses={effect.counters.length > 3 ? "small-counter" : ""}/>
                {/each}
            {/if}
        </div>
    </td>
    <td>
        <InitiativeValue bind:initiative={effect.initiative} bonus={0}/>
    </td>
    <td>
        <D20Button onClick={() => effect.initiative = dRoll(20)}/>
    </td>
</tr>

<style>
    button:hover {
        fill: var(--white);
    }
</style>