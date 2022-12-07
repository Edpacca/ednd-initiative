<script lang="ts">
    import PlusMinusButton from "../common/PlusMinusButton.svelte";
    import RemoveButton from "../common/RemoveButton.svelte";
    import { EntityType, type Entity } from "./entity";
    import Minions from "./Minions.svelte";

    export let removeEntity: (e: Entity) => void;
    export let entity: Entity;

    $: isMinion = entity.type === EntityType.Minion;
    $: isPlayer = entity.type === EntityType.Player;
</script>

<div class="entity-area" class:minion-grid={isMinion}>
    <div class="name-input-container">
        <input 
            bind:value={entity.name}
            type="text"
            class:minion-input={entity.type === EntityType.Minion}
            placeholder={isPlayer ? "Player" : "Entity"}/>
        <div class="xbutton">
            <RemoveButton onClick={() => removeEntity(entity)}/>
        </div>
        {#if isMinion}
            <Minions bind:name={entity.name} bind:quantity={entity.quantity}/>
        {/if}
    </div>
    {#if isMinion}
        <div class="flex-col">
            <PlusMinusButton type="+" onClick={() => entity.quantity++}/>
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

    .minion-grid {
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