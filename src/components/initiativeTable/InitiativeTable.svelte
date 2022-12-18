<script lang="ts">
    import { isLocked, entities, activeEntityTurnIndex } from "../../store";
    import Heart from "../../graphics/icons/heart.svelte";
    import CreatureRowLocked from "../creature/locked/CreatureRowLocked.svelte";
    import EffectRowLocked from "../effects/EffectRowLocked.svelte";
    import Speed from "../../graphics/icons/speed.svelte";
    import { CREATURES } from "../../lib/typeFilters";
    import { EffectType } from "../../lib/models/effect";

    const sortByInitiative = () => {
        $entities.sort((a, b) => {
            const aTotal = a.initiative + a.bonus;
            const bTotal = b.initiative + b.bonus;
            
            return aTotal === bTotal ? b.bonus - a.bonus : bTotal - aTotal;
        });
    }

    $: $isLocked, sortByInitiative();

</script>

<table>
    <thead class="secondary">
        <th class="value-col"></th>
        <th>Name</th>
        <th class="value-col">
            <div class="icon-header svg-fit-container">
                <div class="svg-fit">
                    <Heart/>
                </div>
            </div>
        </th>
        <th class="value-col">
        </th>
        {#if !$isLocked}
            <th class="value-col">Bonus</th>
        {/if}
        <th class="value-col"><div class="icon-header svg-fit-containe"><Speed/></div></th>
        {#if !$isLocked}
            <th class="fn-col"></th>
        {/if}
    </thead>
    <tbody>
        {#each $entities as entity, index}
            {#if CREATURES.includes(entity.type)}
                <CreatureRowLocked bind:creature={entity} isActive={index === $activeEntityTurnIndex}/>
            {:else if entity.type === EffectType.Effect}
                <EffectRowLocked bind:effect={entity} isActive={index === $activeEntityTurnIndex}/>
            {/if}
        {/each}
    </tbody>
</table>
