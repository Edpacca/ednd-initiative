<script lang="ts">
    import { isLocked } from "../../store";
    import PlusMinusButton from "../common/PlusMinusButton.svelte";
    import RemoveButton from "../common/RemoveButton.svelte";
    import { EntityType, type Entity } from "./entity";
    import EntityTypeButton from "./EntityTypeButton.svelte";
    import SubEntities from "./SubEntities.svelte";
    export let removeEntity: (e: Entity) => void;
    export let entity: Entity;
    
    const setType = (q) => { if (q === 0) entity.type = EntityType.Enemy; }
    const setQuantity = (t) => { if (t === EntityType.Minion) entity.quantity = 1; }
    
    $: type = entity.type;
    $: quantity = entity.quantity;
    $: setQuantity(type);
    $: setType(quantity);

</script>

<div class="entity-area" class:unlocked-grid={!$isLocked}>
    <div class="xbutton" class:disabled={$isLocked}>
        <RemoveButton onClick={() => removeEntity(entity)} isDisabled={$isLocked}/>
    </div>
    <div class:minion-inputs={entity.type === EntityType.Minion}>
        <input class="entity-input" class:minion-input={entity.type === EntityType.Minion} type="text" bind:value={entity.name} placeholder="Entity"/>
        <SubEntities bind:name={entity.name} bind:quantity={entity.quantity} hp={entity.hp}/>
    </div>
    <div>
        <EntityTypeButton bind:type={entity.type}/>
        {#if entity.quantity > 0}
            <div class="pm-pad" class:disabled={$isLocked}>
                <PlusMinusButton type="+" onClick={() => entity.quantity += 1}/>
                <PlusMinusButton type="-" onClick={() => entity.quantity -= 1}/>
            </div>
        {/if}
    </div>
</div>


<style>
      input[type="text"] {
        font-style: italic;
    }


    .entity-area {
        width: 100%;
    }

    .unlocked-grid {
        display: grid;
        grid-template-columns: 1.5em 1fr 3em;
        column-gap: calc((2.5em - 1.5em) / 2);
    }

    input {
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
    }

    .minion-input {
        background: none;
        color: var(--secondary);
    }

    .minion-inputs {
        border: 1px solid var(--secondary);
    }
</style>