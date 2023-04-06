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
    import DropdownFilter from "../../common/DropdownFilter.svelte";

    export let removeCreature: (e: Creature) => void;
    export let creature: Creature;

    let inputHasFocus = false;
    let listHasFocus = false;
    let filterIndex = 0;
    let nameInput: HTMLInputElement;

    const isMinion = creature.type === CreatureType.Minion;
    const isPlayer = creature.type === CreatureType.Player;
    const isBoss = creature.type === CreatureType.Boss;
    
    $: creature, setLocalStorageEntities($entities);
    $: filteredCreatures = CREATURES.filter(c => 
            c.name.toLowerCase()
            .startsWith(creature.name.toLowerCase()));
            
    const addMinion = () => {
        creature.quantity++;
        creature.hpCurrent = [...creature.hpCurrent, creature.hpMax];
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
        inputHasFocus = false;
    }

    const setFromCreatureName = (name: string) => {
        const creatureData = filteredCreatures.find(c => c.name === name);
        if (creatureData) setFromCreatureData(creatureData);
    }

    const ascendList = () => {
        filterIndex = Math.max(filterIndex - 1, 0);
    }

    const descendList = () => {
        filterIndex = Math.min(
            filterIndex + 1, filteredCreatures.length - 1);
    }

    const onKeydown = (event: KeyboardEvent) => {
        if (inputHasFocus) {
            listHasFocus = true;
            if (event.key === "ArrowUp") {
                // move up list
                filterIndex = Math.max(filterIndex - 1, 0);
            } else if (event.key === "ArrowDown") {
                // move down list
                filterIndex = Math.min(filterIndex + 1, filteredCreatures.length - 1);
            } else if (!isPlayer && (event.key === "Enter" || event.key === "Tab")) {
                setFromCreatureData(filteredCreatures[filterIndex]);
                event.preventDefault();
                event.stopPropagation();
                listHasFocus = false;
            }
        }
    }
</script>

<div class="entity-area" class:minion-grid={isMinion} class:boss-grid={isBoss}>

    <div class="name-input-container">
        <input 
            bind:this={nameInput}
            bind:value={creature.name}
            on:focusin={() => inputHasFocus = true}
            on:keydown={e => onKeydown(e)}
            on:click={() => listHasFocus = true}
            tabindex={1}
            type="text"
            class:minion-input={creature.type === CreatureType.Minion}
            placeholder={isPlayer ? creature.playerClass : "Creature"}/>
        {#if !isPlayer && listHasFocus && filteredCreatures.length > 0}
            <DropdownFilter 
                list={filteredCreatures}
                bind:highlightedIndex={filterIndex}              
                key="name"
                onLiClick={setFromCreatureName}/>
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
    {#if isBoss}
        <LegendaryActionsInput bind:valueMax={creature.laMax} bind:valueCurrent={creature.laCurrent}/>
    {/if}
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

    .minion-grid, .boss-grid {
        display: grid;
        grid-template-columns: 1fr 3em;
        column-gap: 0.5rem;
    }

    /* .boss-grid {
        display: grid;
        grid-template-columns: 3em 1fr;
        column-gap: 0.5em;
    } */

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