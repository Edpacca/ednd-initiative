<script lang="ts">
    import { isLocked, entities, currentEntityIndex } from "../../store";
    import { Entity, EntityType } from "../entity/entity";
    import Speed from "../../assets/icons/speed.svelte";
    import Heart from "../../assets/icons/heart.svelte";
    import AddRemove from "../common/AddRemove.svelte";
    import Shield from "../../assets/icons/shield.svelte";
    import { setLocalStorageEntities } from "../../lib/persistance";
    import EntityRowLocked from "../entity/EntityRowLocked.svelte";
    import EntityRowUnlocked from "../entity/EntityRowUnlocked.svelte";
    
    export let isPlayerTable = false;

    $: tableEntities = 
        isPlayerTable ? $entities.filter(e => e.type === EntityType.Player) :
        !$isLocked ? $entities.filter(e => e.type !== EntityType.Player) :
        $entities;

    const addEntity = () => {
        $entities = [...$entities, new Entity(isPlayerTable ? EntityType.Player : EntityType.Enemy)]
    }

    const removeLastEntity = () => {
        const lastEntity = tableEntities[tableEntities.length - 1];
        removeEntity(lastEntity);
        setLocalStorageEntities($entities);
    }

    const removeEntity = (entity: Entity) => {
        $entities = $entities.filter(e => e !== entity);
    }
</script>


<AddRemove isHidden={$isLocked} add={addEntity} remove={removeLastEntity}/>
<table>
    <thead class="secondary" class:green={isPlayerTable}>
        <th class="value-col"></th>
        <th>Name</th>
        <th class="value-col">
            <div class="icon-header svg-fit-container">
                <div class="svg-fit">
                    <Heart/>
                </div>
                {#if !$isLocked}
                    <span class="icon-text">max</span>
                {/if}
            </div>
        </th>
        <th class="value-col">
            <div class="icon-header svg-fit-container" class:hidden={$isLocked}>
                <Shield/>
            </div>
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
        {#each tableEntities as entity, index}
            {#if $isLocked}
                <EntityRowLocked {entity} isActive={index === $currentEntityIndex}/>
            {:else}
                <EntityRowUnlocked {entity} removeEntity={() => removeEntity(entity)}/>
            {/if}
        {/each}
    </tbody>
</table>

<style>
    .icon-text {
        position: inherit;
        top: -1.2em;
    }
</style>