<script lang="ts">
    import Enemy from "../../assets/entity-types/enemy.svelte";
    import Minion from "../../assets/entity-types/minion.svelte";
    import Player from "../../assets/entity-types/player.svelte";
    import { EntityType } from "../entity/entity";


    export let type: EntityType;
    export let allowedTypes: EntityType[];
    let typeIndex = 0;

    const rotateType = () => {
        typeIndex = (typeIndex + 1) % allowedTypes.length;
        type = allowedTypes[typeIndex]
    }
</script>

<button class="entity-type-button" on:click={rotateType}>
    {#if type === EntityType.Enemy}
        <Enemy/>
    {:else if type === EntityType.Player}
        <Player/>
    {:else if type === EntityType.Minion}
        <Minion/>
    {/if}
</button>

<style>
    button {
        fill: var(--primary);
    }
</style>