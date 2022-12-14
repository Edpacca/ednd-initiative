<script lang="ts">
    import { getThemePath } from "../toolbar/selectTheme/setTheme";
    import type { Effect } from "../../lib/models/effect";
    import { isLocked } from "../../store";
    export let effect: Effect;
    
    $: themePath = effect.theme ? getThemePath(effect.theme) : "";
</script>

<div class="input-counters">
    <input class:input-locked={$isLocked && !effect.theme} style={`--theme: ${themePath}`} placeholder="Effect" bind:value={effect.name}>
</div>

<style>

    input {
        background: var(--theme);
        color: var(--white);
        font-style: italic;
    }

    input::placeholder {
        color: var(--light-grey);
    }

    .input-locked {
        background: var(--grey);
    }
</style>