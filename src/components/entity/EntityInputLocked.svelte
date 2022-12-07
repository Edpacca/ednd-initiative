<script lang="ts">
    import { EntityType, type Entity } from "./entity";
    import Minions from "./Minions.svelte";

    export let entity: Entity;
    export let isActive = false;

    $: isMinion = entity.type === EntityType.Minion;
    $: isPlayer = entity.type === EntityType.Player;
</script>

<div class="entity-area">
    <div class="name-input-container">
        <input 
            bind:value={entity.name}
            type="text"
            class:active-player={isActive && isPlayer}
            class:active-enemy={isActive && !isPlayer}
            class:minion-input={entity.type === EntityType.Minion}
            placeholder={isPlayer ? "Player" : "Entity"}/>
        {#if isMinion}
            <Minions bind:name={entity.name} bind:quantity={entity.quantity}/>
        {/if}
    </div>
</div>


<style>

    .name-input-container {
        position: relative;
    }
      input[type="text"] {
        font-style: italic;
    }

    .entity-area {
        width: 100%;
    }

    .minion-input {
        background: none;
        color: var(--secondary);
    }

    .active-player {
        background-color: var(--gold);
        color: black;
    }

    .active-enemy {
        background-color: var(--primary);
        color: var(--white)
    }
</style>