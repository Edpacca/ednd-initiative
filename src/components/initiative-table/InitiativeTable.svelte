<script lang="ts">
    import { entities, isLocked } from "../../store";
    import { Entity, EntityType } from "../entity/entity";
    import Speed from "../../assets/icons/speed.svelte";
    import Heart from "../../assets/icons/heart.svelte";
    import EntityRow from "../entity/EntityRow.svelte";
    import AddRemove from "../common/AddRemove.svelte";
    
    const addEntity = () => {
        $entities = [...$entities, new Entity(EntityType.Enemy)]
    }

  const removeLastEntity = () => {
    $entities = $entities.slice(0, $entities.length - 1);
  }

    const removeEntity = (entity: Entity) => {
        $entities = $entities.filter(e => e !== entity);
    }

    let currentEntity = 0;
    
</script>

<AddRemove isDisabled={$isLocked} add={addEntity} remove={removeLastEntity}/>
<table>
    <thead class="secondary">
        <th>Name</th>
        <th class="value-col"><div class="icon-header"><Heart/></div></th>
        <th class="value-col"><div class="icon-header"><Speed/></div></th>
        <th class="value-col">Bonus</th>
        <th class="fn-col"></th>
    </thead>
    <tbody>
        {#each $entities as entity, index}
                <EntityRow {entity} removeEntity={() => removeEntity(entity)} isActive={index === currentEntity}/>
        {/each}
    </tbody>
</table>
<AddRemove isDisabled={!$isLocked} add={() => currentEntity = (currentEntity + 1) % $entities.length} remove={() => {}}/>
