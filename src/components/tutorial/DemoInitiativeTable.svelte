<script lang="ts">
    import { isLocked, entities, activeEntityTurnIndex } from "../../store";
    import Heart from "../../graphics/icons/heart.svelte";
    import CreatureRowLocked from "../creature/locked/CreatureRowLocked.svelte";
    import EffectRowLocked from "../effects/EffectRowLocked.svelte";
    import Speed from "../../graphics/icons/speed.svelte";
    import { CREATURE_TYPES } from "../../lib/models/typeFilters";
    import { EffectType } from "../../lib/models/effect";
    import { fade } from "svelte/transition";
    import Tooltip from "../common/tooltip/Tooltip.svelte";
    import { clearLogs, updateLogs } from "../../lib/logger";

    const sortByInitiative = () => {
        clearLogs();
        $activeEntityTurnIndex = 0;

        $entities.sort((a, b) => {
            const aTotal = a.initiative + a.bonus;
            const bTotal = b.initiative + b.bonus;
            
            return aTotal === bTotal ? b.bonus - a.bonus : bTotal - aTotal;
        });
        updateLogs($activeEntityTurnIndex);
    }

    $: $isLocked, sortByInitiative();
</script>

<table in:fade>
    <thead class="secondary">
        <th class="value-col"></th>
        <th>Name</th>
        <th class="value-col">
            <Tooltip text="Current HP" type="help">
                <div class="icon-header svg-fit-container">
                    <div class="svg-fit">
                        <Heart/>
                    </div>
                </div>
            </Tooltip>
        </th>
        <th class="value-col">
        </th>
        <th class="value-col">
            <Tooltip text="Initiative value" type="help">
                <div class="icon-header svg-fit-container">
                    <Speed/>
                </div>
            </Tooltip>
        </th>
    </thead>
    <tbody class="relative">
        {#each $entities as entity, i}
            {#if CREATURE_TYPES.includes(entity.type)}
                <CreatureRowLocked bind:creature={entity} isActive={i === $activeEntityTurnIndex} index={i}/>
            {:else if entity.type === EffectType.Effect}
                <EffectRowLocked bind:effect={entity} isActive={i === $activeEntityTurnIndex}/>
            {/if}
        {/each}
    </tbody>
</table>
