<script lang="ts">
    import { isLocked } from "../../store";
    import type { Entity } from "./entity";
    import SubEntities from "./SubEntities.svelte";
    export let removeEntity: (e: Entity) => void;
    export let entity: Entity;

</script>

<div class="flex-row">
    {#if !$isLocked}
        <button class="remove" on:click={() => removeEntity(entity)}>x</button>
    {/if}
    <input class="entity-input" type="text" bind:value={entity.name} placeholder="Entity"/>
    {#if !$isLocked}
        {#if !entity.quantity}
            <button class="multiply-entities" on:click={() => entity.quantity = 1}>multiply</button>
        {:else}
            <div>
                <button on:click={() => entity.quantity += 1}>+</button>
                <button on:click={() => entity.quantity -= 1}>-</button>
            </div>
        {/if}
    {/if}
</div>
<SubEntities bind:name={entity.name} bind:quantity={entity.quantity}/>


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

    .flex-row {
        display: flex;
        align-items: center;
        column-gap: 0.5em;
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
</style>