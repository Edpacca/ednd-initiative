<script lang="ts">
    import Enemy from "../../../assets/entity-types/enemy.svelte";
    import Minion from "../../../assets/entity-types/minion.svelte";
    import Player from "../../../assets/entity-types/player.svelte";
    import { getLocalStorageParties } from "../../../lib/persistance";
    import RemoveButton from "../../common/RemoveButton.svelte";
    import { EntityType } from "../../entity/entity";
    import type { Party } from "../save/Party";
    import ConfirmDelete from "./ConfirmDelete.svelte";
    import ConfirmLoad from "./ConfirmLoad.svelte";
    let parties: Party[];
    
    const getParties = () => {
        parties = getLocalStorageParties();
        console.log("got parties");
    }
    
    getParties();

    let selectedParty: Party | undefined = undefined;
    let isRemoving = false;

    const loadParty = (party: Party) => {
        selectedParty = party;
        isRemoving = false;
    }

    const deleteParty = (party: Party) => {
        selectedParty = party;
        isRemoving = true;
    }

    $: if (isRemoving === false) {
        getParties();
    } 
</script>

<div class="load-container">
    <div>Saved groups</div>
    {#if parties.length > 0}
        {#each parties as party}
            <div class="party-container">
                <button class="party-button" on:click={() => loadParty(party)}>
                    <div class="name">{party.name}</div>
                    <div class="icons">
                        {#each party.filteredTypes as type}
                            {#if type === EntityType.Player}
                                <span class="player">
                                    <Player/>
                                </span>
                            {:else if type === EntityType.Enemy}
                                <span class="enemy">
                                    <Enemy/>
                                </span>
                            {:else}
                                <span class="enemy">
                                    <Minion/>
                                </span>
                            {/if}
                        {/each}
                    </div>
                </button>
                <RemoveButton onClick={() => deleteParty(party)}/>
            </div>
        {/each}
    {:else}
        <div>No parties saved.</div>
    {/if}
</div>
{#if isRemoving}
    <ConfirmDelete bind:party={selectedParty} bind:isRemoving/>
{:else}
    <ConfirmLoad bind:party={selectedParty}/>
{/if}

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
        font-size: 14px;
        font-weight: bold;
    }

    .party-button:hover {
        background-color: var(--gold);
        color: var(--dark-grey);
    }

    .party-button:hover span {
        fill: var(--dark-grey) !important;
    }

    .name {
        width: 75%;
        text-align: left;
    }

    .player {
        fill: var(--gold);
    }

    .enemy {
        fill: var(--primary);
    }
</style>