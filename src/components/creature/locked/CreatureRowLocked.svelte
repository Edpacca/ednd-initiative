<script lang="ts">
    import { CreatureType, type Creature } from "../../../models/creature";
    import InitiativeValue from "../../initiativeTable/InitiativeValue.svelte";
    import PlayerIcon from "../../initiativeTable/PlayerIconSwitch.svelte";
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import AcValue from "../../initiativeTable/AcValue.svelte";
    import CreatureInputLocked from "./CreatureInputLocked.svelte";
    import { entities } from "../../../store";
    import CurrentHpInput from "../../initiativeTable/CurrentHpInput.svelte";
    import CreatureToggle from "../../common/CreatureToggle.svelte";

    export let creature: Creature;
    export let isActive = false;
    $: creature, setLocalStorageEntities($entities);
</script>

<tr>
    <div class:active={isActive}></div>
    <td class="flex-col">
        {#if creature.type === CreatureType.Player}
            <PlayerIcon bind:icon={creature.class}/>
        {:else}
            <CreatureToggle bind:type={creature.type} allowedTypes={[CreatureType.Enemy, CreatureType.Minion, CreatureType.Boss]}/>
        {/if}
    </td>
    <td>
       <CreatureInputLocked bind:isActive bind:creature={creature}/>
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

<style>

    tr {
        position: relative;
    }

    .active {
        position: absolute;
        width: 100%;
        height: calc(100% - 5px);
        background-color: var(--dark-grey);
        border: 3px solid var(--gold);
        border-radius: 8px;
        z-index: -1;
    }
</style>