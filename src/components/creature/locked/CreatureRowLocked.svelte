<script lang="ts">
    import InitiativeValue from "../../initiativeTable/InitiativeValue.svelte";
    import PlayerIcon from "../../initiativeTable/PlayerIconSwitch.svelte";
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import AcValue from "../../initiativeTable/AcValue.svelte";
    import CreatureInputLocked from "./CreatureInputLocked.svelte";
    import { entities, selectedEntityIndex } from "../../../store";
    import CurrentHpInput from "../../initiativeTable/CurrentHpInput.svelte";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import { CreatureType, type Creature } from "../../../lib/models/creature";

    export let creature: Creature;
    export let isActive = false;
    export let index: number;
    $: creature, setLocalStorageEntities($entities);
    $: isSelected = $selectedEntityIndex[0] === index;
</script>

<tr>
    <div class:active-initiative={isActive}></div>
    <td class="flex-col">
        <CreatureIconSelect type={creature.type} index={index} playerClass={creature.class ? creature.class : undefined}/>
    </td>
    <td>
       <CreatureInputLocked bind:isActive bind:creature={creature} index={index} isSelected={isSelected && creature.type !== CreatureType.Minion}/>
    </td>
    <td>
        <CurrentHpInput bind:entity={creature} isSelected={isSelected}/>
    </td>
    <td>
        <AcValue value={creature.ac}/>
    </td>   
    <td>
        <InitiativeValue bind:initiative={creature.initiative} bind:bonus={creature.bonus}/>
    </td>
</tr>