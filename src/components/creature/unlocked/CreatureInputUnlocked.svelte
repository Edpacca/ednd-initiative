<script lang="ts">
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import { entities } from "../../../store";
    import AddRemove from "../../common/buttons/AddRemove.svelte";
    import HealthBar from "../../common/values/HealthBar.svelte";
    import RemoveButton from "../../common/buttons/RemoveButton.svelte";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import Minions from "../minion/Minions.svelte";
    import LegendaryActionsInput from "../../common/values/LegendaryActionsInput.svelte";
    import { CREATURES, type CreatureData } from "../../../lib/creatureData";
    import FilterList from "../../common/FilterList.svelte";

    export let removeCreature: (e: Creature) => void;
    export let creature: Creature;
    let isInputFocused = false;
    let filteredIndex = 0;

    $: isMinion = creature.type === CreatureType.Minion;
    $: isPlayer = creature.type === CreatureType.Player;
    $: isBoss = creature.type === CreatureType.Boss;
    $: creature, setLocalStorageEntities($entities);
    $: filteredCreatures = CREATURES.filter(c => c.name.toLowerCase().startsWith(creature.name.toLowerCase())).slice(0, 7);

    const addMinion = () => {
        creature.quantity++;
        creature.hpCurrent = [...creature.hpCurrent, 10];
        creature.conditions = [...creature.conditions, []];
    }

    const removeMinion = () => {
        creature.quantity = Math.max(1, creature.quantity - 1)
        creature.hpCurrent = creature.hpCurrent.slice(0, -1);
        creature.conditions = creature.conditions.slice(0, -1);
    }

    const setFromCreatureData = (creatureData: CreatureData) => {
        creature.name = creatureData.name;
        creature.ac = creatureData.ac;
        creature.hpMax = creatureData.hp;
        creature.hpCurrent.fill(creatureData.hp);
        creature.bonus = Math.floor((creatureData.dex - 10) / 2);
        isInputFocused = false;
    }

    const onKeydown = (event: KeyboardEvent) => {
        if (isInputFocused) {
            if (event.key === "ArrowUp") {
                filteredIndex = Math.max(filteredIndex - 1, 0);
            } else if (event.key === "ArrowDown") {
                filteredIndex = Math.min(filteredIndex + 1, filteredCreatures.length - 1);
            } else if (event.key === "Enter" || event.key === "Tab") {
                setFromCreatureData(filteredCreatures[filteredIndex]);
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
</script>

<div class="entity-area" class:minion-grid={isMinion} class:boss-grid={isBoss}>
    {#if isBoss}
        <LegendaryActionsInput bind:valueMax={creature.laMax} bind:valueCurrent={creature.laCurrent}/>
    {/if}
    <div class="name-input-container">
        <input 
            bind:value={creature.name}
            on:focusin={() => isInputFocused = true}
            on:focusout={() => isInputFocused = false}
            on:keydown={e => onKeydown(e)}
            tabindex={1}
            type="text"
            class:minion-input={creature.type === CreatureType.Minion}
            placeholder={isPlayer ? creature.class : "Creature"}/>
        {#if !isPlayer && isInputFocused && creature.name}
            <FilterList 
                filtered={filteredCreatures}
                filteredIndex={filteredIndex}              
                key="name"
                onLiClick={setFromCreatureData}/>
        {/if}
        {#if !isMinion}
            <HealthBar max={creature.hpMax} current={creature.hpCurrent}/>
        {/if}
        <div class="xbutton">
            <RemoveButton onClick={() => removeCreature(creature)} isinverted={isMinion}/>
        </div>
        {#if isMinion}
            <Minions bind:name={creature.name} bind:quantity={creature.quantity} bind:hpMax={creature.hpMax} bind:hpCurrent={creature.hpCurrent} />
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

    .boss-grid {
        display: grid;
        grid-template-columns: 3em 1fr;
        column-gap: 0.5em;
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