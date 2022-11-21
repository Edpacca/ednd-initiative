<script lang="ts">
    import type { Entity } from "./entity";
    export let entity: Entity;
    export let removeEntity: () => void;
</script>

<td class="entity-row">
    <button class="remove" on:click={removeEntity}>x</button>
    <input type="text" bind:value={entity.name} placeholder="Entity"/>
</td>
<td>
    <input class="initiative-value" type="number" bind:value={entity.initiative}/>
</td>

<style>

    input {
        height: 2.5em;
        color: brown;
        text-align: center;
        width: 100%;
        box-sizing: border-box;
        font-size: 18px;
        font-weight: bold;
    }

    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none; 
        margin: 0; 
    }

    .entity-row {
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
