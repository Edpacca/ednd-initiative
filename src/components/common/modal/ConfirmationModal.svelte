<script lang="ts">
    import { isSettingsOpen } from "../../../store";
    import Modal from "./Modal.svelte";
    export let isOpen: boolean;
    export let text: string[];
    export let confirmaCallback: () => void;

    let confirm = () => {
        confirmaCallback();
        $isSettingsOpen = false;
    }

    export let cancelCallback: () => void = () => { 
        isOpen = false;
    }
</script>

<Modal isOpen={isOpen}>
    {#each text as line}
        <p>{@html line}</p>
    {/each}
    <div class="button-container">
        <button class="submit-button" on:click={confirm} >Confirm</button>
        <button class="submit-button" on:click={cancelCallback}>Cancel</button>
    </div>
</Modal>

<style>
    p {
        font-size: var(--fontsize-M);
        text-align: center;
        margin-bottom: 1rem;
    }

    .button-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 0.3rem;
    }
</style>