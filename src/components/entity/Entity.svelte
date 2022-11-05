<script lang="ts">
    import type { Entity } from "./entity";
    export let entity: Entity;
</script>

<div class="container">
    <input type="text" bind:value={entity.name} placeholder="entity"/>
    <input type="number" bind:value={entity.initiative}/>
</div>

<style>
    .container {
        display: grid;
        grid-template-columns: 90% 1fr;
        width: 100%;
    }

    input {
        margin: 0.1em 0.2em;
        height: 30px;
        color: brown;
    }
</style>
