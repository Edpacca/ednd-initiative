<script lang="ts">
    import { onMount } from "svelte";
    import { dRoll } from "../../lib/dieRoll";
    import { EntityType, type Entity } from "./entity";
    import { entities, isLocked, isStarted } from "../../store";
    import EntityInput from "./EntityInput.svelte";
    import EntityTypeButton from "../initiativeTable/EnemyMinionToggle.svelte";
    import InitiativeValue from "../initiativeTable/InitiativeValue.svelte";
    import PlayerIcon from "../initiativeTable/PlayerIconSwitch.svelte";
    import NumberStringInput from "../common/NumberStringInput.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import D20Button from "../common/D20Button.svelte";
    import { setLocalStorageEntities } from "../../lib/persistance";

    export let entity: Entity;
    export let removeEntity: () => void;
    export let isActive = false;
    $: isMinion = entity.type === EntityType.Minion;

    const setHp = () => entity.hpCurrent = entity.hpMax;
    onMount(async() => { if (!$isStarted) setHp()});

    $: entity, setLocalStorageEntities($entities);
</script>

<tr>
    <div class:active={$isLocked && isActive}></div>
    <td class="flex-col-center">
        {#if entity.type === EntityType.Player}
            <PlayerIcon bind:icon={entity.class}/>
        {:else}
            <EntityTypeButton bind:type={entity.type}/>
        {/if}
    </td>
    <td>
       <EntityInput bind:isActive bind:entity removeEntity={removeEntity}/>
    </td>
    <td>
        {#if $isLocked}
            <NumberInput bind:value={entity.hpCurrent} isHidden={$isLocked && isMinion}/>
        {:else}
            <NumberInput bind:value={entity.hpMax} isHidden={$isLocked && isMinion} onInput={setHp}/>
        {/if}
        {#if isMinion}
            {#each Array(entity.quantity) as m}
                <NumberInput isHidden={!$isLocked} value={entity.hpCurrent}/>
            {/each}
        {/if}
    </td>
    <td>
        <NumberInput bind:value={entity.ac}/>
    </td>
    <td>
        <NumberStringInput bind:value={entity.bonus} showPlus={true}/>
    </td>
    <td>
        <InitiativeValue bind:initiative={entity.initiative} bind:bonus={entity.bonus}/>
    </td>
    {#if !$isLocked} 
        <td>
            <D20Button onClick={() => entity.initiative = dRoll(20)}/>
        </td>
    {/if}
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