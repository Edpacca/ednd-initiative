<script lang="ts">
    import { isLocked } from "../../store";
    import PlusMinusButton from "../common/PlusMinusButton.svelte";
    import RemoveButton from "../common/RemoveButton.svelte";
    import { EntityType, type Entity } from "./entity";
    import Minions from "./Minions.svelte";

    export let removeEntity: (e: Entity) => void;
    export let entity: Entity;
    export let isActive = false;

    $: isMinion = entity.type === EntityType.Minion;
    $: isPlayer = entity.type === EntityType.Player;
</script>

<div class="entity-area" class:unlocked-grid={!$isLocked && isMinion}>
    <div class="name-input-container">
        <input 
            bind:value={entity.name}
            type="text"
            class:active-player={$isLocked && isActive && isPlayer}
            class:active-enemy={$isLocked && isActive && !isPlayer}
            class:minion-input={entity.type === EntityType.Minion}
            placeholder={isPlayer ? "Player" : "Entity"}/>
        <div class="xbutton" class:disabled={$isLocked}>
            <RemoveButton onClick={() => removeEntity(entity)} isHidden={$isLocked}/>
        </div>
        {#if isMinion}
            <Minions bind:name={entity.name} bind:quantity={entity.quantity}/>
        {/if}
    </div>
    {#if isMinion}
        <div class="flex-col-center" class:hidden={$isLocked}>
            <PlusMinusButton type="+" onClick={() => entity.quantity += 1}/>
            <PlusMinusButton type="-" onClick={() => {entity.quantity = Math.max(1, entity.quantity - 1)}}/>
        </div>
    {/if}
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

    .unlocked-grid {
        display: grid;
        grid-template-columns: 1fr 3em;
    }

    .minion-input {
        background: none;
        color: var(--secondary);
    }



    .xbutton {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.625rem;
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