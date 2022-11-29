<script lang="ts">
    import { entities, isLocked } from "../../store";
    import type { Entity } from "./entity";
    import { dRoll } from "../../lib/dieRoll";
    import EntityInput from "./EntityInput.svelte";
    import D20Button from "../common/D20Button.svelte";
    import Speed from "../../assets/speed.svelte";
    import Heart from "../../assets/heart.svelte";
    import InitiativeValue from "./InitiativeValue.svelte";
    import BonusValue from "./BonusValue.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    
    const removeEntity = (entity: Entity) => {
        $entities = $entities.filter(e => e !== entity);
    }
</script>

<table>
    <thead>
        <th>Name</th>
        <th class="value-col secondary"><div class="icon-header"><Heart/></div></th>
        <th class="value-col secondary"><div class="icon-header"><Speed/></div></th>
        <th class="value-col">Bonus</th>
        <th class="fn-col"></th>
    </thead>
    <tbody>
        {#each $entities.sort((e1, e2) => e2.initiative - e1.initiative) as entity}
            <tr>
                <td class="entity-row">
                   <EntityInput bind:entity={entity} removeEntity={removeEntity}/>
                </td>
                <td>
                    <NumberInput bind:value={entity.hp} isDisabled={$isLocked && !!entity.quantity}/>
                </td>
                <td>
                    <InitiativeValue bind:initiative={entity.initiative} bind:bonus={entity.bonus}/>
                </td>
                <td>
                    <NumberInput bind:value={entity.bonus} showPlus={true}/>
                </td>
                <td>
                    {#if !$isLocked} 
                        <D20Button onClick={() => entity.initiative = dRoll(20)}/>
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>


<style>
    .icon-header {
        height: 1.5rem;
    }

</style>
