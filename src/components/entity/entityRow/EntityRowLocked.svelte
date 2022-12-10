<script lang="ts">
    import { EntityType, type Entity } from "../entity";
    import EntityTypeButton from "../../initiativeTable/EnemyMinionToggle.svelte";
    import InitiativeValue from "../../initiativeTable/InitiativeValue.svelte";
    import PlayerIcon from "../../initiativeTable/PlayerIconSwitch.svelte";
    import { setLocalStorageEntities } from "../../../lib/persistance";
    import AcValue from "../../initiativeTable/AcValue.svelte";
    import EntityInputLocked from "../entityInput/EntityInputLocked.svelte";
    import { entities } from "../../../store";
    import CurrentHpInput from "../../initiativeTable/CurrentHpInput.svelte";

    export let entity: Entity;
    export let isActive = false;
    $: entity, setLocalStorageEntities($entities);
</script>

<tr>
    <div class:active={isActive}></div>
    <td class="flex-col">
        {#if entity.type === EntityType.Player}
            <PlayerIcon bind:icon={entity.class}/>
        {:else}
            <EntityTypeButton bind:type={entity.type}/>
        {/if}
    </td>
    <td>
       <EntityInputLocked bind:isActive bind:entity/>
    </td>
    <td>
        <CurrentHpInput bind:entity/>
    </td>
    <td>
        <AcValue value={entity.ac}/>
    </td>   
    <td>
        <InitiativeValue bind:initiative={entity.initiative} bind:bonus={entity.bonus}/>
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