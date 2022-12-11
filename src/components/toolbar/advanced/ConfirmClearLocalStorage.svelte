<script>
    import { clearLocalStorage } from "../../../lib/persistance";
    import { currentEntityIndex, currentTheme, entities } from "../../../store";
    import Modal from "../../common/Modal.svelte";
    export let isOpen;
    const clear = () => {
        clearLocalStorage();
        isOpen = false;
        $entities = [];
        $currentTheme = "stone";
        $currentEntityIndex = 0;
    }
</script>

<Modal isOpen>
    <p>Are you sure you want to clear all saved data?</p>
    <p>This will also remove everything currently in the tracker</p>
    <div class="button-container">
        <button class="submit-button" on:click={clear}>Confirm</button>
        <button class="submit-button" on:click={() => isOpen = false}>Cancel</button>
    </div>
</Modal>