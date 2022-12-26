<script lang="ts">
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import { CreatureType, type Creature } from "../../../lib/models/creature";
    import { dRoll } from "../../../lib/dieRoll";
    import {    entities } from "../../../store";
    import D20Button from "../../common/buttons/D20Button.svelte";
    import CreatureInputUnlocked from "./CreatureInputUnlocked.svelte";
    import InitiativeValue from "../../common/values/InitiativeValue.svelte";
    import NumberStringInput from "../../common/values/NumberStringInput.svelte";
    import NumberInput from "../../common/values/NumberInput.svelte";
    import MaxHpInput from "../../common/values/MaxHpInput.svelte";
    import PlayerIcon from "../../common/buttons/PlayerIconSwitch.svelte";
    import CreatureToggle from "../../common/buttons/CreatureToggle.svelte";

    export let creature: Creature;
    export let removeCreature: () => void;
    
    const setHpCurrent = (value: number) => creature.hpCurrent.fill(value);
    $: creature, setLocalStorageEntities($entities);
</script>

<tr>
    <td class="flex-col">
        {#if creature.type === CreatureType.Player}
            <PlayerIcon bind:icon={creature.class}/>
        {:else}
            <CreatureToggle bind:type={creature.type} allowedTypes={[CreatureType.Enemy, CreatureType.Minion, CreatureType.Boss]}/>
        {/if}
    </td>
    <td>
        <CreatureInputUnlocked bind:creature removeCreature={removeCreature}/>
    </td>
    <td>
        <MaxHpInput setHpCurrent={setHpCurrent} bind:value={creature.hpMax} entity={creature}/>
    </td>
    <td>
        <NumberInput bind:value={creature.ac}/>
    </td>
    <td>
        <NumberStringInput bind:value={creature.bonus} showPlus={true}/>
    </td>
    <td>
        <InitiativeValue bind:initiative={creature.initiative} bonus={creature.bonus}/>
    </td>
    <td>
        <D20Button onClick={() => creature.initiative = dRoll(20)}/>
    </td>
</tr>
