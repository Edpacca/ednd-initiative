<script lang="ts">
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import { entities } from "../../../store";
    import AddRemove from "../../common/AddRemove.svelte";
    import HealthBar from "../../common/HealthBar.svelte";
    import RemoveButton from "../../common/RemoveButton.svelte";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import Minions from "../locked/Minions.svelte";

    export let removeCreature: (e: Creature) => void;
    export let creature: Creature;
    export let index: number;

    const addMinion = () => {
        creature.quantity++;
        creature.hpCurrent = [...creature.hpCurrent, 10];
    }

    const removeMinion = () => {
        creature.quantity = Math.max(1, creature.quantity - 1)
        creature.hpCurrent = creature.hpCurrent.slice(0, -1);
    }

    $: isMinion = creature.type === CreatureType.Minion;
    $: isPlayer = creature.type === CreatureType.Player;

    $: creature, setLocalStorageEntities($entities);

</script>

<div class="entity-area" class:minion-grid={isMinion}>
    <div class="name-input-container">
        <input 
            bind:value={creature.name}
            type="text"
            class:minion-input={creature.type === CreatureType.Minion}
            placeholder={isPlayer ? creature.class : "Creature"}/>
        {#if !isMinion}
            <HealthBar max={creature.hpMax} current={creature.hpCurrent}/>
        {/if}
        <div class="xbutton">
            <RemoveButton onClick={() => removeCreature(creature)} isinverted={isMinion}/>
        </div>
        {#if isMinion}
            <Minions bind:name={creature.name} bind:quantity={creature.quantity} bind:hpMax={creature.hpMax} bind:hpCurrent={creature.hpCurrent} index={index}/>
        {/if}
    </div>
    {#if isMinion}
        <AddRemove add={addMinion} remove={removeMinion} vertical={true}/>
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
        background: var(--dark-grey);
        color: var(--secondary);
    }



    .xbutton {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.625rem;
    }
</style>