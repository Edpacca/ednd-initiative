<script lang="ts">
    import Enemy from "../../../graphics/entity-types/enemy.svelte";
    import Minion from "../../../graphics/entity-types/minion.svelte";
    import { CreatureType } from "../../../lib/models/creature";
    import type { EntityType } from "../../../lib/models/entity";
    import type { PlayerClass } from "../../../lib/models/playerClass";
    import { selectEntityInput } from "../../../store";
    import PlayerIconSwitch from "../../initiativeTable/PlayerIconSwitch.svelte";

    export let type: EntityType;
    export let index: number;
    export let playerClass: PlayerClass | undefined = undefined;

    const selectEntity = () => {
        selectEntityInput([index, 0])
    }
</script>

<button class="entity-type-button" on:click={selectEntity}>
    {#if type === CreatureType.Player && playerClass}
        <PlayerIconSwitch bind:icon={playerClass}/>
    {:else if type === CreatureType.Enemy}
        <Enemy/>
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