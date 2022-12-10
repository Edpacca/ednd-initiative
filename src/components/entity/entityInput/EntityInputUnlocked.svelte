<script lang="ts">
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import { entities } from "../../../store";
    import HealthBar from "../../common/HealthBar.svelte";
    import PlusMinusButton from "../../common/PlusMinusButton.svelte";
    import RemoveButton from "../../common/RemoveButton.svelte";
    import { EntityType, type Entity } from "../entity";
    import Minions from "../Minions.svelte";

    export let removeEntity: (e: Entity) => void;
    export let entity: Entity;
    const addMinion = () => {
        entity.quantity++;
        entity.hpCurrent = [...entity.hpCurrent, 0];
    }

    const removeMinion = () => {
        entity.quantity = Math.max(1, entity.quantity - 1)
        entity.hpCurrent = entity.hpCurrent.slice(0, -1);
    }

    $: isMinion = entity.type === EntityType.Minion;
    $: isPlayer = entity.type === EntityType.Player;

    $: entity, setLocalStorageEntities($entities);

</script>

<div class="entity-area" class:minion-grid={isMinion}>
    <div class="name-input-container">
        <input 
            bind:value={entity.name}
            type="text"
            class:minion-input={entity.type === EntityType.Minion}
            placeholder={isPlayer ? entity.class : "Entity"}/>
        <HealthBar max={entity.hpMax} current={entity.hpCurrent}/>
        <div class="xbutton">
            <RemoveButton onClick={() => removeEntity(entity)} isinverted={isMinion}/>
        </div>
        {#if isMinion}
            <Minions bind:name={entity.name} bind:quantity={entity.quantity} bind:hpMax={entity.hpMax} bind:hpCurrent={entity.hpCurrent}/>
        {/if}
    </div>
    {#if isMinion}
        <div class="buttons">
            <PlusMinusButton type="+" onClick={addMinion}/>
            <PlusMinusButton type="-" onClick={removeMinion}/>
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

    .buttons {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    .xbutton {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.625rem;
    }
</style>