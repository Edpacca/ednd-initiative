<script lang="ts">
    import Enemy from "../../../assets/entity-types/enemy.svelte";
    import Minion from "../../../assets/entity-types/minion.svelte";
    import Player from "../../../assets/entity-types/player.svelte";
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
        <div>BOSS</div>
    {/if}
</button>

<style>
    button {
        fill: var(--primary);
    }
</style>