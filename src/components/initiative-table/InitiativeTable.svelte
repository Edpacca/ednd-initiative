<script lang="ts">
    import { isLocked, entities } from "../../store";
    import { Entity, EntityType } from "../entity/entity";
    import Speed from "../../assets/icons/speed.svelte";
    import Heart from "../../assets/icons/heart.svelte";
    import EntityRow from "../entity/EntityRow.svelte";
    import AddRemove from "../common/AddRemove.svelte";
    import TurnTracker from "../common/TurnTracker.svelte";
    
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
    }

    const removeEntity = (entity: Entity) => {
        $entities = $entities.filter(e => e !== entity);
    }

    let currentEntity = 0;
    
</script>

<TurnTracker bind:currentTurn={currentEntity}/>

<AddRemove isHidden={$isLocked} add={addEntity} remove={removeLastEntity}/>
<table>
    <thead class="secondary" class:green={isPlayerTable}>
        <th class="value-col"></th>
        <th>Name</th>
        <th class="value-col"><div class="icon-header"><Heart/></div></th>
        <th class="value-col">Bonus</th>
        <th class="value-col"><div class="icon-header"><Speed/></div></th>
        {#if !$isLocked}
            <th class="fn-col"></th>
        {/if}
    </thead>
    <tbody>
        {#each tableEntities as entity, index}
            <EntityRow {entity} removeEntity={() => removeEntity(entity)} isActive={index === currentEntity}/>
        {/each}
    </tbody>
</table>
