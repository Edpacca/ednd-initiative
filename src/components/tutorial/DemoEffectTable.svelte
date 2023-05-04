<script lang="ts">
    import Speed from "../../graphics/icons/speed.svelte";
    import { entities } from "../../store";
    import { Effect, EffectType } from "../../lib/models/effect";
    import EffectRowUnlocked from "../effects/EffectRowUnlocked.svelte";
    import { onMount } from "svelte";

    const addEffect = () => {
        $entities = [...$entities, new Effect()]
    }

    $: effects = $entities.filter(e => e.type === EffectType.Effect);

    onMount(() => {
        if (effects && effects.length === 0) {
            addEffect();
        } else {
            
        }
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