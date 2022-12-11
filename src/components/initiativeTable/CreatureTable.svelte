<script lang="ts">
    import { isLocked, entities } from "../../store";
    import Heart from "../../assets/icons/heart.svelte";
    import AddRemove from "../common/AddRemove.svelte";
    import Shield from "../../assets/icons/shield.svelte";
    import { setLocalStorageEntities } from "../../lib/persistance";
    import { Creature, CreatureType } from "../../models/creature";
    import CreatureRowUnlocked from "../creature/unlocked/CreatureRowUnlocked.svelte";
    import Speed from "../../assets/icons/speed.svelte";
    
    export let typeFilter: CreatureType[];
    $: creatures = $entities.filter(e => e instanceof Creature && typeFilter.includes(e.type)) as Creature[];

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
</script>


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
        {#each creatures as creature, index}
            <CreatureRowUnlocked {creature} removeCreature={() => removeCreature(creature)}/>
        {/each}
    </tbody>
</table>

<style>
    .icon-text {
        position: inherit;
        top: -1.2em;
    }
</style>