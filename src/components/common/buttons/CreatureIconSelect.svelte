<script lang="ts">
    import Boss from "../../../graphics/entity-types/boss.svelte";
    import Enemy from "../../../graphics/entity-types/enemy.svelte";
    import Minion from "../../../graphics/entity-types/minion.svelte";
    import { CreatureType } from "../../../lib/models/creature";
    import type { EntityType } from "../../../lib/models/entity";
    import type { PlayerClass } from "../../../lib/models/playerClass";
    import PlayerIcon from "./PlayerIcon.svelte";

    export let type: EntityType;
    export let playerClass: PlayerClass | undefined = undefined;
    export let isHighlighted = false;

    export let onClick: () => void;
    export let onRightClick: () => void = () => {};
</script>

{#if type === CreatureType.Player && playerClass}
    <PlayerIcon bind:icon={playerClass} onClick={onClick} onRightClick={onRightClick} class={isHighlighted ? "white" : "gold"}/>
{:else}
    <button class={`entity-type-button ${isHighlighted ? "white" : "primary"}`} on:click={onClick} on:contextmenu|preventDefault={onRightClick}>
        {#if type === CreatureType.Enemy}
            <Enemy/>
        {:else if type === CreatureType.Minion}
            <Minion/>
        {:else if type === CreatureType.Boss}
            <Boss/>
        {/if}
    </button>
{/if}
