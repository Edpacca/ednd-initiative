<script>
    import { currentEntityIndex, currentTheme, entities } from "../../../store";
    import ConfirmClearLocalStorage from "./ConfirmClearLocalStorage.svelte";

    let isConfirming = false;

    const reset = () => {
        $entities = [];
        $currentTheme = "stone";
        
        $currentEntityIndex = 0;
    }
</script>

<div class="flex-col">
    <button class="submit-button" on:click={() => isConfirming = true}>
        Clear local storage
    </button>
    <button class="submit-button" on:click={reset}>
        Reset page
    </button>
</div>
{#if isConfirming}
    <ConfirmClearLocalStorage bind:isOpen={isConfirming}/>
{/if}

<style>
    button {
        width: 80%;
        margin-bottom: 0.5rem;
    }
</style>