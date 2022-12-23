<script lang="ts">
    import Arrow from "../../graphics/icons/arrow.svelte";
    import Cave from "../../graphics/icons/cave.svelte";
    import type { Effect } from "../../lib/models/effect";
    import NumberInput from "../common/NumberInput.svelte";
    import InitiativeValue from "../initiativeTable/InitiativeValue.svelte";
    import EffectCounter from "./EffectCounter.svelte";
    import EffectInput from "./EffectInput.svelte";
    export let effect: Effect
    export let isActive = false;
</script>

{#if isActive}
    <div class="active-icon">
        <Arrow/>
    </div>
{/if}
<tr>
    <div class:active-initiative={isActive}></div>
    <td class="blue flex-col">
        <button class="entity-type-button" disabled>
            <Cave/>
        </button>
    </td>
    <td><EffectInput effect={effect}/></td>
    <td></td>
    <td>
        <div class="counters">
            {#if effect.counters}
                {#each effect.counters as counter}
                    <EffectCounter bind:value={counter} extraClasses={effect.counters.length > 3 ? "small-counter" : ""}/>
                {/each}
            {/if}
        </div>
    </td>
    <td>
        <InitiativeValue bind:initiative={effect.initiative} bind:bonus={effect.bonus}/>
    </td>
</tr>

