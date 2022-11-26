<script lang="ts">
    import Goblin from "../../assets/goblin.svelte";
import { isLocked } from "../../store";
    import PlusMinusButton from "../common/PlusMinusButton.svelte";
    import type { Entity } from "./entity";
    import SubEntities from "./SubEntities.svelte";
    export let removeEntity: (e: Entity) => void;
    export let entity: Entity;

</script>

<div class="entity-area">
    {#if !$isLocked}
        <button class="remove" on:click={() => removeEntity(entity)}>x</button>
    {/if}
    <div>
        <input class="entity-input" type="text" bind:value={entity.name} placeholder="Entity"/>
        <SubEntities bind:name={entity.name} bind:quantity={entity.quantity}/>
    </div>
    {#if !$isLocked}
        {#if !entity.quantity}
            <button class="multiply" on:click={() => entity.quantity = 1}><Goblin/></button>
        {:else}
            <div>
                <PlusMinusButton type="+" onClick={() => entity.quantity += 1}/>
                <PlusMinusButton type="-" onClick={() => entity.quantity -= 1}/>
            </div>
        {/if}
    {/if}
</div>


<style>
      input[type="text"] {
        font-style: italic;
    }

    input {
        height: 2.5em;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
    }

    .remove {
        font-weight: bold;
        background: brown;
        color: burlywood;
        border: none;
        border-radius: 4px;
        width: 1.5em;
        height: 1.5em;
    }

    .multiply {
        height: 3em;
        background: none;
        border: none;
        fill: var(--secondary)
    }

    .entity-area {
        width: 100%;
        display: grid;
        grid-template-columns: 2em 1fr 3em;
    }
</style>