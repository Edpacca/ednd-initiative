<script lang="ts">
    import Enemy from "../../assets/entity-types/enemy.svelte";
    import Minion from "../../assets/entity-types/minion.svelte";
    import Player from "../../assets/entity-types/player.svelte";
    import { isLocked } from "../../store";
    import { EntityType } from "../entity/entity";
    export let type: EntityType;

    const rotateType = () => {
        type = type === EntityType.Enemy ? type = EntityType.Minion 
            : type = EntityType.Enemy
    }
</script>

<button class="entity-type-button" disabled={$isLocked} on:click={rotateType}>
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