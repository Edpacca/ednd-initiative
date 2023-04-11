<script lang="ts">
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import { entities } from "../../../store";
    import AddRemove from "../../common/buttons/AddRemove.svelte";
    import HealthBar from "../../common/values/HealthBar.svelte";
    import RemoveButton from "../../common/buttons/RemoveButton.svelte";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import Minions from "../minion/Minions.svelte";
    import LegendaryActionsInput from "../../common/values/LegendaryActionsInput.svelte";
    import { CREATURES, CREATURE_NAMES, type CreatureData } from "../../../lib/creatureData";
    import InputDropdownFilter from "../../common/dropdown/InputDropdownFilter.svelte";

    export let removeCreature: (e: Creature) => void;
    export let creature: Creature;
    let input: HTMLInputElement;

    $: isMinion = creature.type === CreatureType.Minion;
    $: isPlayer = creature.type === CreatureType.Player;
    $: isBoss = creature.type === CreatureType.Boss;
    
    $: creature, setLocalStorageEntities($entities);
            
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
        if (input) {
            input.blur();
        }
    }

    const setFromCreatureName = (name: string) => {
        const creatureData = CREATURES.find(c => c.name === name);
        if (creatureData) setFromCreatureData(creatureData);
    }
</script>

<div class="entity-area" class:minion-grid={isMinion} class:boss-grid={isBoss}>
    <div class="name-input-container">
        <InputDropdownFilter
            list={CREATURE_NAMES}
            key="name"
            submit={setFromCreatureName}
            bind:value={creature.name}
            bind:input={input}
            inputPlaceholder={isPlayer ? creature.playerClass : "Creature"}
            listFocusCondition={!isPlayer}/>
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

    .xbutton {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.625rem;
    }
</style>