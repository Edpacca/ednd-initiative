<script lang="ts">
    import { isLocked, entities } from "../../store";
    import Heart from "../../graphics/icons/heart.svelte";
    import Shield from "../../graphics/icons/shield.svelte";
    import { Creature, CreatureType } from "../../lib/models/creature";
    import CreatureRowUnlocked from "../creature/unlocked/CreatureRowUnlocked.svelte";
    import Speed from "../../graphics/icons/speed.svelte";
    import type { EntityType } from "../../lib/models/entity";
    import { CREATURE_TYPES } from "../../lib/models/typeFilters";
    import { onMount } from "svelte";
    
    export let disableHeaders = false;
    export let typeFilter: EntityType[];
    $: creatures = $entities.filter(e => CREATURE_TYPES.includes(e.type) && typeFilter.includes(e.type));

    const addCreature = () => {
        if (typeFilter.includes(CreatureType.Player)) {
            $entities = [...$entities, new Creature(CreatureType.Player)]
        } else if (typeFilter.includes(CreatureType.Enemy)) {
            $entities = [...$entities, new Creature(CreatureType.Enemy)]
        }
    }

    const removeLastCreature = () => {
        const lastCreature = creatures[creatures.length - 1];
        removeCreature(lastCreature);
    }

    const removeCreature = (entity: Creature) => {
        $entities = $entities.filter(e => e !== entity);
    }

    onMount(() => {
        if (creatures && creatures.length === 0) {
            addCreature();
        }
    })
</script>

<table>
    <thead class="secondary" class:disableHeaders={disableHeaders}>
            <th class="value-col"></th>
            <th>{#if !disableHeaders}Name{/if}</th>
            <th class="value-col">
                {#if !disableHeaders}
                <div class="icon-header svg-fit-container">
                    <div class="svg-fit">
                        <Heart/>
                    </div>
                    <span class="icon-text">max</span>
                </div>
                {/if}
            </th>
            <th class="value-col">
                {#if !disableHeaders}
                <div class="icon-header svg-fit-container">
                    <Shield/>
                </div>
                {/if}
            </th>
            <th class="value-col">
                {#if !disableHeaders}
                Init.
                Bonus
                {/if}
            </th>
            <th class="value-col"><div class="icon-header svg-fit-container">{#if !disableHeaders}<Speed/>{/if}</div></th>
            {#if !$isLocked}
                <th class="fn-col"></th>
            {/if}
        </thead>
    <tbody>
        {#if creatures.length > 0}
            <CreatureRowUnlocked 
                creature={creatures[0]}
                removeCreature={undefined}
                index={0}/>
        {/if}
    </tbody>
</table>

<style>
    .icon-text {
        position: inherit;
        top: -1.2em;
    }

    thead.disableHeaders, thead.disableHeaders > th {
        height: 0px;
        visibility: collapse;
    }
</style>