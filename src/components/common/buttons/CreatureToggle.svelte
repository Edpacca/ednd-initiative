<script lang="ts">
    import Enemy from "../../../graphics/entity-types/enemy.svelte";
    import Minion from "../../../graphics/entity-types/minion.svelte";
    import Player from "../../../graphics/entity-types/player.svelte";
    import Boss from "../../../graphics/entity-types/boss.svelte";
    import { CreatureType } from "../../../lib/models/creature";
    import type { EntityType } from "../../../lib/models/entity";

    export let type: EntityType;
    export let allowedTypes: EntityType[];
    let typeIndex = 0;

    const rotateType = () => {
        typeIndex = (typeIndex + 1) % allowedTypes.length;
        type = allowedTypes[typeIndex]
    }
</script>

<button class="entity-type-button" on:click={rotateType}>
    {#if type === CreatureType.Enemy}
        <Enemy/>
    {:else if type === CreatureType.Player}
        <Player/>
    {:else if type === CreatureType.Minion}
        <Minion/>
    {:else if type === CreatureType.Boss}
        <Boss/>
    {/if}
</button>

<style>
    button {
        fill: var(--primary);
        filter :drop-shadow(0 0 0.75rem black)
    }
</style>