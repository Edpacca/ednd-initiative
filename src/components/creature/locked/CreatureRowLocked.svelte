<script lang="ts">
    import InitiativeValue from "../../common/values/InitiativeValue.svelte";
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import AcValue from "../../common/values/AcValue.svelte";
    import CreatureInputLocked from "./CreatureInputLocked.svelte";
    import { activeEntityContextIndex, entities } from "../../../store";
    import CurrentHpInput from "../../common/values/CurrentHpInput.svelte";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import type { Creature } from "../../../lib/models/creature";
    import CreatureModal from "../creatureModal/CreatureModal.svelte";
    import ActiveEntityIndicator from "../../initiativeTable/ActiveEntityIndicator.svelte";
    import ConditionIconGridSelect from "../../common/ConditionIconGridSelect.svelte";

    export let creature: Creature;
    export let index = 0;
    export let isActive = false;
    let isSelected = false;
    let isConditionGridOpen = false;
    $: isHighlighted = isConditionGridOpen && $activeEntityContextIndex === index;
    
    const openConditionGrid = () => {
        if (!isConditionGridOpen) {
            isConditionGridOpen = true;
            $activeEntityContextIndex = index;
        } else {
            isConditionGridOpen = false;
        }
    }

    const select = () => {
        isConditionGridOpen = false;
        isSelected = true;
    }

    const selectCreature = (event: KeyboardEvent) => {
        if (!isSelected && isActive && event.code === "Space") {
            isSelected = true;
            event.stopPropagation();
            event.preventDefault();
        } else if (event.code === "Tab") {
            event.preventDefault();
        }
    }

    $: creature, setLocalStorageEntities($entities);
</script>

<tr class="relative">
    <ActiveEntityIndicator isActive={isActive}/>
    <ConditionIconGridSelect isOpen={isHighlighted} bind:conditions={creature.conditions[0]}/>
    <td class="flex-col">
        <CreatureIconSelect 
            type={creature.type}
            playerClass={creature.playerClass}
            isHighlighted={isHighlighted}
            onClick={select}
            onRightClick={openConditionGrid}/>
    </td>
    <td>
       <CreatureInputLocked bind:isActive bind:creature={creature} bind:isSelected/>
    </td>
    <td>
        <CurrentHpInput bind:entity={creature}/>
    </td>
    <td>
        <AcValue value={creature.ac}/>
    </td>   
    <td>
        <InitiativeValue bind:initiative={creature.initiative} bind:bonus={creature.bonus}/>
    </td>
</tr>

<!-- <svelte:window on:keydown={e => selectCreature(e)}/> -->
<CreatureModal bind:isSelected bind:creature/>