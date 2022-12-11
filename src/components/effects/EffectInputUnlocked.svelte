<script lang="ts">
    import AddRemove from "../common/AddRemove.svelte";
import { getThemePath } from "../toolbar/selectTheme/setTheme";
    import type { Effect } from "./effect";
    export let effect: Effect;
    
    $: themePath = effect.theme ? getThemePath(effect.theme) : "";

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

<div>
    <input class:effect-input={effect.theme} style={`--theme: ${themePath}`} placeholder="Effect" bind:value={effect.name}>
    <AddRemove add={addCounter} remove={removeCounter}/>
</div>

<style>
    .effect-input {
        background: var(--theme);
        color: var(--white);
        border: 2px solid var(--light-grey);
    }

    .effect-input::placeholder {
        color: var(--light-grey);
    }
</style>