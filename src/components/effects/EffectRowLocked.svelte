<script lang="ts">
    import Cave from "../../graphics/icons/cave.svelte";
    import type { Effect } from "../../lib/models/effect";
    import InitiativeValue from "../common/values/InitiativeValue.svelte";
    import EffectCounter from "./EffectCounter.svelte";
    import EffectInput from "./EffectInput.svelte";
    import ActiveEntityIndicator from "../initiativeTable/ActiveEntityIndicator.svelte";
    export let effect: Effect
    export let isActive = false;
</script>

<tr>
    <ActiveEntityIndicator isActive={isActive}/>
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

