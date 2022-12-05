<script lang="ts">
    import { isLocked } from "../../store";
    import PlusMinusButton from "../common/PlusMinusButton.svelte";
    import RemoveButton from "../common/RemoveButton.svelte";
    import { EntityType, type Entity } from "./entity";
    import Minions from "./Minions.svelte";

    export let removeEntity: (e: Entity) => void;
    export let entity: Entity;

    $: isMinion = entity.type === EntityType.Minion;
    $: isPlayer = entity.type === EntityType.Player;
</script>

<div class="entity-area" class:unlocked-grid={!$isLocked}>
    <div class="name-input-container" class:minion-inputs={entity.type === EntityType.Minion}>
        <input class:minion-input={entity.type === EntityType.Minion} type="text" bind:value={entity.name} placeholder={isPlayer ? "Player" : "Entity"}/>
        <div class="xbutton" class:disabled={$isLocked}>
            <RemoveButton onClick={() => removeEntity(entity)} isHidden={$isLocked}/>
        </div>
        {#if isMinion}
            <Minions bind:name={entity.name} bind:quantity={entity.quantity} hp={entity.hp}/>
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

    .minion-inputs {
        /* border: 1px solid var(--secondary); */
        padding: 0.5rem;
    }

    .xbutton {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.625rem;
    }
</style>