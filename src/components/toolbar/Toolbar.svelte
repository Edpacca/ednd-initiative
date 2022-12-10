<script lang="ts">
    import BurgerButton from "../common/BurgerButton.svelte";
import SelectTheme from "./selectTheme/SelectTheme.svelte";
    let isOpen = false;
</script>

<div class="menu-button">
    <BurgerButton onClick={() => isOpen = !isOpen}/>
</div>
{#if isOpen}
    <div class="toolbar">
        <h1>Settings</h1>
        <SelectTheme/>
    </div>
{/if}

<style>
    .toolbar {
        position: absolute;
        padding: 2rem;
        top: 0;
        left: 0;
        border: 2px solid var(--primary);
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
        background-color: var(--dark-grey-90);
        z-index: 10;
    }

    .menu-button {
        position: absolute;
        z-index: 11;
    }
</style>