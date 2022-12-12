<script lang="ts">
    import InitiativeValue from "../../initiativeTable/InitiativeValue.svelte";
    import PlayerIcon from "../../initiativeTable/PlayerIconSwitch.svelte";
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import AcValue from "../../initiativeTable/AcValue.svelte";
    import CreatureInputLocked from "./CreatureInputLocked.svelte";
    import { entities } from "../../../store";
    import CurrentHpInput from "../../initiativeTable/CurrentHpInput.svelte";
    import CreatureIconSelect from "../../common/buttons/CreatureIconSelect.svelte";
    import type { Creature } from "../../../lib/models/creature";

    export let creature: Creature;
    export let isActive = false;
    export let index: number;
    $: creature, setLocalStorageEntities($entities);
</script>

<tr>
    <div class:active-initiative={isActive}></div>
    <td class="flex-col">
        <CreatureIconSelect type={creature.type} index={index} playerClass={creature.class ? creature.class : undefined}/>
    </td>
    <td>
       <CreatureInputLocked bind:isActive bind:creature={creature} index={index}/>
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