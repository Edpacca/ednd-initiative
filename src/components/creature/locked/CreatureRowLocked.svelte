<script lang="ts">
    import InitiativeValue from "../../common/values/InitiativeValue.svelte";
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import AcValue from "../../common/values/AcValue.svelte";
    import CreatureInputLocked from "./CreatureInputLocked.svelte";
    import { activeEntityContextIndex, entities } from "../../../store";
    import CurrentHpInput from "../../common/values/CurrentHpInput.svelte";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import CreatureModal from "../creatureModal/CreatureModal.svelte";
    import ActiveEntityIndicator from "../../initiativeTable/ActiveEntityIndicator.svelte";
    import ConditionIconGridSelect from "../../common/icon-grid/ConditionIconGridSelect.svelte";
    import { getBaseName } from "../../../lib/models/entity";

    export let creature: Creature;
    export let index = 0;
    export let isActive = false;
    
    const isMinion = creature.type === CreatureType.Minion;
    let isSelected = false;
    let selectedIndex = 0;
    let isConditionGridOpen = false;
    $: isHighlighted = isConditionGridOpen && $activeEntityContextIndex === index;
    
    const openConditionGrid = () => {
        if (creature.type !== CreatureType.Minion) {
            if (isConditionGridOpen) {
                isConditionGridOpen = false;
            } else {
                isConditionGridOpen = true;
                $activeEntityContextIndex = index;
            }
        }
    }

    const select = () => {
        isConditionGridOpen = false;
        isSelected = true;
    }

    $: creature, setLocalStorageEntities($entities);

</script>

<tr>
    <ActiveEntityIndicator isActive={isActive}/>
    <ConditionIconGridSelect
        creature={creature}
        isOpen={isHighlighted}
        bind:conditions={creature.conditions[0]}
        name={getBaseName(creature)}/>
    <td class="flex-col">
        <CreatureIconSelect 
            type={creature.type}
            playerClass={creature.playerClass}
            isHighlighted={isHighlighted}
            onClick={select}
            onRightClick={openConditionGrid}/>
    </td>
    <td>
       <CreatureInputLocked bind:isActive bind:creature={creature} bind:isSelected index={index} bind:selectedIndex/>
    </td>
    <td>
        <CurrentHpInput bind:entity={creature}/>
    </td>
    <td>
        {#if isMinion}
            <div class="minion-icon-spacer"></div>
            {#each Array(creature.quantity) as i}
                <AcValue value={creature.ac}/>
                <div class="healthbar-height-spacer"></div>
            {/each}
        {:else}
            <AcValue value={creature.ac}/>
        {/if}
    </td>   
    <td>
        <InitiativeValue bind:initiative={creature.initiative} bind:bonus={creature.bonus}/>
    </td>
</tr>

<!-- <svelte:window on:keydown={e => selectCreature(e)}/> -->
<CreatureModal bind:isSelected bind:creature bind:selectedIndex={selectedIndex}/>