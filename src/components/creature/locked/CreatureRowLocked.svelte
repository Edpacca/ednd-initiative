<script lang="ts">
    import InitiativeValue from "../../common/values/InitiativeValue.svelte";
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import AcValue from "../../common/values/AcValue.svelte";
    import CreatureInputLocked from "./CreatureInputLocked.svelte";
    import { entities } from "../../../store";
    import CurrentHpInput from "../../common/values/CurrentHpInput.svelte";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import type { Creature } from "../../../lib/models/creature";
    import CreatureModal from "../creatureModal/CreatureModal.svelte";
    import ActiveEntityIndicator from "../../initiativeTable/ActiveEntityIndicator.svelte";

    export let creature: Creature;
    export let isActive = false;
    let isSelected = false;
    
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

<tr>
    <ActiveEntityIndicator isActive={isActive}/>
    <td class="flex-col">
        <CreatureIconSelect type={creature.type} playerClass={creature.playerClass} bind:isSelected/>
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
