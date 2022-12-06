<script lang="ts">
    import { EntityType, type Entity } from "./entity";
    import { isLocked, isStarted } from "../../store";
    import EntityInput from "./EntityInput.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import InitiativeValue from "../initiativeTable/InitiativeValue.svelte";
    import D20Button from "../common/D20Button.svelte";
    import { dRoll } from "../../lib/dieRoll";
    import PlayerIcon from "../initiativeTable/PlayerIconSwitch.svelte";
    import EntityTypeButton from "../initiativeTable/EnemyMinionToggle.svelte";
    import NumberStringInput from "../common/NumberStringInput.svelte";
    import { onMount } from "svelte";

    export let entity: Entity;
    export let removeEntity: () => void;
    export let isActive = false;

    $: isMinion = entity.type === EntityType.Minion;
    const setHp = () => entity.hpCurrent = entity.hpMax;

    onMount(async() => {
        if (!$isStarted) setHp();
    })
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
        border: 3px solid var(--gold);
        border-radius: 8px;
        background-color: var(--dark-grey);
        z-index: -1;
    }
</style>