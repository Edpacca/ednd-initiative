<script lang="ts">
    import { EntityType, type Entity } from "./entity";
    import { isLocked } from "../../store";
    import EntityInput from "./EntityInput.svelte";
    import NumberInput from "../common/NumberInput.svelte";
    import InitiativeValue from "../initiative-table/InitiativeValue.svelte";
    import D20Button from "../common/D20Button.svelte";
    import { dRoll } from "../../lib/dieRoll";
    import PlayerIcon from "../initiative-table/PlayerIconSwitch.svelte";
    import EntityTypeButton from "../initiative-table/EnemyMinionToggle.svelte";

    export let entity: Entity;
    export let removeEntity: () => void;
    export let isActive = false;

    $: isMinion = entity.type === EntityType.Minion;
</script>

<tr>
    <div class:active={$isLocked && isActive}></div>
    <td class="flex-col-center">
        {#if entity.type === EntityType.Player}
            <PlayerIcon bind:icon={entity.icon}/>
        {:else}
            <EntityTypeButton bind:type={entity.type}/>
        {/if}
    </td>
    <td>
       <EntityInput bind:entity={entity} removeEntity={removeEntity}/>
    </td>
    <td>
        <NumberInput bind:value={entity.hp} isHidden={$isLocked && isMinion}/>
        {#if isMinion}
            <div class="minion-hp">
                {#each Array(entity.quantity) as m}
                    <NumberInput isHidden={!$isLocked} value={entity.hp}/>
                {/each}
            </div>
        {/if}
    </td>
    <td>
        <InitiativeValue bind:initiative={entity.initiative} bind:bonus={entity.bonus}/>
    </td>
    <td>
        <NumberInput bind:value={entity.bonus} showPlus={true}/>
    </td>
    <td>
        {#if !$isLocked} 
            <D20Button onClick={() => entity.initiative = dRoll(20)}/>
        {/if}
    </td>
</tr>

<style>

    tr {
        position: relative;
    }
    .active {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 3px solid goldenrod;
        border-radius: 8px;
        background-color: var(--dark-grey);
        z-index: -1;
    }
    .minion-hp {
        padding-top: 0.5rem;
    }
</style>