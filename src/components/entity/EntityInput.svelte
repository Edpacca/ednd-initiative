<script lang="ts">
    import Goblin from "../../assets/goblin.svelte";
import { entities, isLocked } from "../../store";
    import PlusMinusButton from "../common/PlusMinusButton.svelte";
    import RemoveButton from "../common/RemoveButton.svelte";
    import type { Entity } from "./entity";
    import SubEntities from "./SubEntities.svelte";
    export let removeEntity: (e: Entity) => void;
    export let entity: Entity;

</script>

<div class="entity-area" class:unlocked-grid={!$isLocked}>
    <div class="xbutton" class:disabled={$isLocked}>
        <RemoveButton onClick={() => removeEntity(entity)} isDisabled={$isLocked}/>
    </div>
    <div class:mob-inputs={!!entity.quantity}>
        <input class="entity-input" class:mob-input={!!entity.quantity} type="text" bind:value={entity.name} placeholder="Entity"/>
        <SubEntities bind:name={entity.name} bind:quantity={entity.quantity} hp={entity.hp}/>
    </div>
    {#if !entity.quantity}
        <button class="mob-button" disabled={$isLocked} on:click={() => entity.quantity = 1}><Goblin/></button>
    {:else}
        <div class="pm-pad" class:disabled={$isLocked}>
            <PlusMinusButton type="+" onClick={() => entity.quantity += 1}/>
            <PlusMinusButton type="-" onClick={() => entity.quantity -= 1}/>
        </div>
    {/if}
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

    .mob-input {
        background: none;
        color: var(--secondary);
    }

    .mob-inputs {
        border: 1px solid var(--secondary);
    }

    .mob-button {
        height: 3em;
        background: none;
        border: none;
        fill: var(--secondary);
    }

    .xbutton {
        padding-top: calc((2.5em - 1.5em) / 2);
        text-align: center;
    }
</style>