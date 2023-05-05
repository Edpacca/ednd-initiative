<script lang="ts">
    import Speed from "../../graphics/icons/speed.svelte";
    import { entities } from "../../store";
    import { Effect, EffectType } from "../../lib/models/effect";
    import EffectRowUnlocked from "../effects/EffectRowUnlocked.svelte";
    import { onMount } from "svelte";

    $: effects = $entities.filter(e => e.type === EffectType.Effect);

    onMount(() => {
        const effect = $entities.find(e => e.type === EffectType.Effect);
        const newEffect: Effect = effect ? effect : new Effect();
        if (!newEffect.name) {
            newEffect.name = "Lava!";
            newEffect.theme = "lava";
        }

        $entities = $entities.filter(e => e.type !== EffectType.Effect);
        $entities = [...$entities, newEffect];
    })

</script>

<table>
    <thead class="secondary">
        <th class="value-col"></th>
        <th class="full-width">Effect </th>
        <th class="fit-content">Counters</th>
        <th class="value-col"><div class="icon-header svg-fit-container"><Speed/></div></th>
        <th class="value-col"></th>
    </thead>
    <tbody>
        {#if effects && effects.length > 0}
            <EffectRowUnlocked effect={effects[0]}/>
        {/if}
    </tbody>
</table>

<style>
    .fit-content {
        width: fit-content;
    }

    .full-width {
        width: 100%;
    }
</style>