<script lang="ts">
    import Cave from "../../assets/icons/cave.svelte";
    import { dRoll } from "../../lib/dieRoll";
    import D20Button from "../common/D20Button.svelte";
    import InitiativeValue from "../initiativeTable/InitiativeValue.svelte";
    import { THEMES } from "../toolbar/selectTheme/themes";
    import type { Effect } from "./effect";
    import EffectInputUnlocked from "./EffectInputUnlocked.svelte";
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
</script>

<tr>
    <td class="blue svg-fit-container">
        <button class="blank-button svg-fit" on:click={cycleTheme}>
            <Cave/>
        </button>
    </td>
    <td><EffectInputUnlocked effect={effect}/></td>
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

    button:hover {
        fill: var(--light-blue);
    }


</style>