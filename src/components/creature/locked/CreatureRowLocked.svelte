<script lang="ts">
    import InitiativeValue from "../../initiativeTable/InitiativeValue.svelte";
    import PlayerIcon from "../../initiativeTable/PlayerIconSwitch.svelte";
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import AcValue from "../../initiativeTable/AcValue.svelte";
    import CreatureInputLocked from "./CreatureInputLocked.svelte";
    import { entities, selectedEntityIndex } from "../../../store";
    import CurrentHpInput from "../../initiativeTable/CurrentHpInput.svelte";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import type { Creature } from "../../../lib/models/creature";
    import Modal from "../../common/modal/Modal.svelte";
    import RemoveButton from "../../common/buttons/RemoveButton.svelte";

    export let creature: Creature;
    export let isActive = false;
    export let index: number;
    let isSelected = false;
    
    $: creature, setLocalStorageEntities($entities);
</script>

<tr>
    <div class:active-initiative={isActive}></div>
    <td class="flex-col">
        <CreatureIconSelect type={creature.type} playerClass={creature.class} bind:isSelected/>
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

<div class="relative">
    <Modal bind:isOpen={isSelected} width="80vw">
        <RemoveButton onClick={() => isSelected = false}/>
        <CreatureIconSelect type={creature.type} playerClass={creature.class}/>
        <CreatureInputLocked creature={creature}/>
        <div>Helloo</div>
    </Modal>
</div>