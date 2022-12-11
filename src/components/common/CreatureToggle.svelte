<script lang="ts">
    import Enemy from "../../assets/entity-types/enemy.svelte";
    import Minion from "../../assets/entity-types/minion.svelte";
    import Player from "../../assets/entity-types/player.svelte";
    import { CreatureType } from "../../models/creature";


    export let type: CreatureType;
    export let allowedTypes: CreatureType[];
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
    {/if}
</button>

<style>
    button {
        fill: var(--primary);
    }
</style>