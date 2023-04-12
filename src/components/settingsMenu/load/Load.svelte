<script lang="ts">
    import Enemy from "../../../graphics/entity-types/enemy.svelte";
    import Minion from "../../../graphics/entity-types/minion.svelte";
    import Player from "../../../graphics/entity-types/player.svelte";
    import { getLocalStorageEncounters } from "../../../lib/persistance";
    import RemoveButton from "../../common/buttons/RemoveButton.svelte";
    import { CreatureType } from "../../../lib/models/creature";
    import type { Encounter } from "../../../lib/models/encounter";
    import ConfirmDelete from "./ConfirmDelete.svelte";
    import ConfirmLoad from "./ConfirmLoad.svelte";
    import { EffectType } from "../../../lib/models/effect";
    import Cave from "../../../graphics/icons/cave.svelte";
    import type { EntityType } from "../../../lib/models/entity";

    enum State { None, Load, Delete }
    
    let state: State = State.None;
    let encounters: Encounter[];
    let slecectedEncounter: Encounter | undefined = undefined;

    const getEncounters = () => {
        encounters = getLocalStorageEncounters();
    }

    const loadEncounter = (encounter: Encounter) => {
        slecectedEncounter = encounter;
        state = State.Load;
    }

    const deleteEncounter = (encounter: Encounter) => {
        slecectedEncounter = encounter;
        state = State.Delete;
    }

    $: if (state === State.None) {
        getEncounters();
    } 

    const cancel = () => {
        slecectedEncounter = undefined;
        state = State.None;
    }

    const hasPlayers =  (encounter: EntityType[]): boolean => {
        return encounter.includes(CreatureType.Player);
    }

    const hasEffects =  (encounter: EntityType[]): boolean => {
        return encounter.includes(EffectType.Effect);
    }

    const hasEnemies =  (encounter: EntityType[]): boolean => {
        return encounter.includes(CreatureType.Enemy || CreatureType.Boss || CreatureType.Minion);
    }
    
</script>

<h2>Load Group</h2>
<div class="load-container">
    {#if encounters.length > 0}
        {#each encounters as encounter}
            <div class="party-container">
                <button class="party-button" on:click={() => loadEncounter(encounter)}>
                    <div class="name">{encounter.name}</div>
                    <div class="icons">
                       {#if hasPlayers(encounter.filteredTypes)}<Player class="gold"/>{/if}
                       {#if hasEnemies(encounter.filteredTypes)}<Enemy class="primary"/>{/if}
                       {#if hasEffects(encounter.filteredTypes)}<Cave class="blue"/>{/if}
                    </div>
                </button>
                <RemoveButton onClick={() => deleteEncounter(encounter)}/>
            </div>
        {/each}
    {:else}
        <div>No parties saved.</div>
    {/if}
</div>

<ConfirmDelete party={slecectedEncounter} isOpen={state === State.Delete} cancel={cancel}/>
<ConfirmLoad encounter={slecectedEncounter} isOpen={state === State.Load} cancel={cancel}/>

<style>
    .load-container {
        display: flex;
        flex-direction: column;
        row-gap: 0.5rem;
    }

    .icons {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        width: 100%;
        height: 1.8rem;
    }

    .party-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        column-gap: 0.2rem;
    }

    .party-button {
        width: 100%;
        display: grid;
        grid-template-columns: 75% 1fr;
        background: var(--dark-grey);
        color: var(--white);
        justify-content: center;
        align-items: center;
        height: 2.5rem;
        border: none;
        border-bottom: 2px solid var(--grey);
        border-radius: var(--border-radius);
        font-size: var(--fontsize-S);
        font-weight: bold;
    }

    .party-button:hover {
        background-color: var(--light-grey);
        color: var(--dark-grey);
        cursor: pointer;
    }

    .name {
        width: 75%;
        text-align: left;
    }
</style>