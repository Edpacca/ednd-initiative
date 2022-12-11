<script lang="ts">
    import { removeLocalStorageParty } from "../../../lib/persistance";
    import Modal from "../../common/Modal.svelte";
    import type { Party } from "../save/Party";

    export let party: Party | undefined = undefined;
    export let isRemoving = false;

    const deleteParty = () => {
        if (party) {
            removeLocalStorageParty(party.name);
        }
        party = undefined;
        isRemoving = false;
    }
</script>

<Modal isOpen={party !== undefined}>
    <p>Are you sure you want to delete the party named: {party.name}.</p>
    <p>There are no takebacks or divine interventions...</p>
    <div class="button-container">
        <button class="submit-button" on:click={deleteParty} >Confirm</button>
        <button class="submit-button" on:click={() => party = undefined}>Cancel</button>
    </div>
</Modal>

<style>
    p {
        font-size: 16px;
        text-align: center;
        margin-bottom: 1rem;
        color: var(--red);
    }

    .button-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 0.3rem;
    }
</style>