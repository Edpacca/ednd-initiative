<script lang="ts">
    import { entities, isLocked } from "../../store";
    import type { Entity } from "./entity";
    import { dRoll } from "../../lib/dieRoll";
    import D20 from "../../assets/d20.svelte";
    import EntityTableData from "./EntityTableData.svelte";
    import EntityInput from "./EntityInput.svelte";
    
    const removeEntity = (entity: Entity) => {
        $entities = $entities.filter(e => e !== entity);
    }
</script>

<table>
    <thead>
        <th>Name</th>
        <th class="value-col">Initiative</th>
        <th class="fn-col"></th>
    </thead>
    <tbody>
        {#each $entities.sort((e1, e2) => e1.initiative - e2.initiative) as entity}
            <tr>
                <td class="entity-row">
                   <EntityInput entity={entity} removeEntity={removeEntity}/>
                </td>
                <td>
                    <input class="initiative-value" type="number" bind:value={entity.initiative}/>
                </td>
                <td>
                    {#if !$isLocked} 
                        <button on:click={() => entity.initiative = dRoll(20)} class="d20"><D20/></button>
                    {/if}
                </td>
            </tr>
        {/each}
    </tbody>
</table>


<style>

    input {
        height: 2.5em;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
    }

    input[type=number] {
        color: brown;
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    .d20 {
        width: 3em;
        height: 3em;
        border: none;
        background: none;
        fill: brown;
    }

  .d20:hover {
        background: none;
        fill: burlywood;
        outline: none;
    }
</style>
