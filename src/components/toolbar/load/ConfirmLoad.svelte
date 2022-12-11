<script lang="ts">
    import { entities } from "../../../store";
    import Modal from "../../common/Modal.svelte";
    import type { Party } from "../save/Party";

    export let party: Party | undefined = undefined;

    const loadParty = () => {
        if (party) {
            $entities = [...$entities, ...party.party]
        }
        party = undefined;
    }
</script>

<Modal isOpen={party !== undefined}>
    <p>Confirm loading {party.name} to the intiative tracker?</p>
    <p>This will not override any entities that you have stored in the tracker already</p>
    <div class="button-container">
        <button class="submit-button" on:click={loadParty} >Confirm</button>
        <button class="submit-button" on:click={() => party = undefined}>Cancel</button>
    </div>
</Modal>

<style>
    p {
        font-size: 16px;
        text-align: center;
        margin-bottom: 1rem;
    }

    .button-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 0.3rem;
    }
</style>