<script lang="ts">
    import { getThemePath } from "../../lib/themeLib";
    import type { Effect } from "../../lib/models/effect";
    import { isLocked } from "../../store";
    export let effect: Effect;
    
    $: themePath = effect.theme ? getThemePath(effect.theme) : "";
</script>

<div class="input-counters">
    <input disabled={$isLocked} class:input-locked={$isLocked && !effect.theme} style={`--theme: ${themePath}`} placeholder="Effect" bind:value={effect.name}>
</div>

<style>

    input {
        background: var(--grey);
        background: var(--theme);
        color: var(--white);
        text-shadow: 0 0 4px black;
        font-style: italic;
    }

    input::placeholder {
        color: var(--light-grey);
    }

    .input-locked {
        background: var(--grey);
    }
</style>