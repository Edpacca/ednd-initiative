<script lang="ts">
    import { isLocked, entities } from "../../store";
    import Heart from "../../graphics/icons/heart.svelte";
    import AddRemove from "../common/buttons/AddRemove.svelte";
    import Shield from "../../graphics/icons/shield.svelte";
    import { setLocalStorageEntities } from "../../lib/persistance";
    import { Creature, CreatureType } from "../../lib/models/creature";
    import CreatureRowUnlocked from "../creature/unlocked/CreatureRowUnlocked.svelte";
    import Speed from "../../graphics/icons/speed.svelte";
    import type { EntityType } from "../../lib/models/entity";
    import { CREATURE_TYPES } from "../../lib/typeFilters";
    import IconGridSelect from "../common/IconGridSelect.svelte";
    
    export let typeFilter: EntityType[];
    let openIconGridIndex = [false, 0];
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
        setLocalStorageEntities($entities);
    }

    const setIconGridIndex = (isOpen: boolean, index: number) => {
        openIconGridIndex = [isOpen, index];
    }
</script>

<div>{openIconGridIndex[0]} {openIconGridIndex[1]}</div>
<AddRemove add={addCreature} remove={removeLastCreature}/>
<table>
    <thead class="secondary">
        <th class="value-col"></th>
        <th>Name</th>
        <th class="value-col">
            <div class="icon-header svg-fit-container">
                <div class="svg-fit">
                    <Heart/>
                </div>
                <span class="icon-text">max</span>
            </div>
        </th>
        <th class="value-col">
            <div class="icon-header svg-fit-container">
                <Shield/>
            </div>
        </th>
        <th class="value-col">
            Bonus
        </th>
        <th class="value-col"><div class="icon-header svg-fit-containe"><Speed/></div></th>
        {#if !$isLocked}
            <th class="fn-col"></th>
        {/if}
    </thead>
    <tbody>
        {#each creatures as creature, i}
            <CreatureRowUnlocked 
                {creature}
                removeCreature={() => removeCreature(creature)}
                index={i}
                bind:iconGridIndex={openIconGridIndex}
                setIconGridIndex={setIconGridIndex}/>
        {/each}
    </tbody>
</table>

<style>
    .icon-text {
        position: inherit;
        top: -1.2em;
    }
</style>