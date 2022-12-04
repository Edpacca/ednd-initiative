<script lang="ts">
    import type { Entity } from "./entity";
    import { isLocked } from "../../store";
    import EntityInput from "./EntityInput.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import InitiativeValue from "../initiative-table/InitiativeValue.svelte";
    import D20Button from "../common/D20Button.svelte";
    import { dRoll } from "../../lib/dieRoll";

    export let entity: Entity;
    export let removeEntity: () => void;
    export let isActive = false;
</script>

<tr>
    <td class="entity-row" class:active={$isLocked && isActive}>
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

<style>
    .active {
        border: 2px solid goldenrod;
        border-radius: 8px;
        
    }
</style>