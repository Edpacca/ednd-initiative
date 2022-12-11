<script lang="ts">
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import { EntityType, type Entity } from "../entity";
    import { dRoll } from "../../../lib/dieRoll";
    import {    entities } from "../../../store";
    import D20Button from "../../common/D20Button.svelte";
    import EntityInputUnlocked from "../entityInput/EntityInputUnlocked.svelte";
    import InitiativeValue from "../../initiativeTable/InitiativeValue.svelte";
    import NumberStringInput from "../../common/NumberStringInput.svelte";
    import NumberInput from "../../common/NumberInput.svelte";
    import MaxHpInput from "../../initiativeTable/MaxHpInput.svelte";
    import PlayerIcon from "../../initiativeTable/PlayerIconSwitch.svelte";
    import EntityToggle from "../../common/EntityToggle.svelte";

    export let entity: Entity;
    export let removeEntity: () => void;
    
    const setHpCurrent = (value: number) => entity.hpCurrent.fill(value);
    $: entity, setLocalStorageEntities($entities);
</script>

<tr>
    <td class="flex-col">
        {#if entity.type === EntityType.Player}
            <PlayerIcon bind:icon={entity.class}/>
        {:else}
            <EntityToggle bind:type={entity.type} allowedTypes={[EntityType.Enemy, EntityType.Minion]}/>
        {/if}
    </td>
    <td>
        <EntityInputUnlocked bind:entity removeEntity={removeEntity}/>
    </td>
    <td>
        <MaxHpInput setHpCurrent={setHpCurrent} bind:value={entity.hpMax} entity={entity}/>
    </td>
    <td>
        <NumberInput bind:value={entity.ac}/>
    </td>
    <td>
        <NumberStringInput bind:value={entity.bonus} showPlus={true}/>
    </td>
    <td>
        <InitiativeValue bind:initiative={entity.initiative} bonus={entity.bonus}/>
    </td>
    <td>
        <D20Button onClick={() => entity.initiative = dRoll(20)}/>
    </td>
</tr>
