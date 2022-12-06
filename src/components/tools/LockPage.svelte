<script lang="ts">
    import { isLocked, isStarted } from "../../store";
    import PadlockClosed from "../../assets/icons/padlock-closed.svelte";
    import PadlockOpen from "../../assets/icons/padlock-open.svelte";

    const toggleLock = () => {
        if (!$isStarted) $isStarted = true;
        $isLocked = !$isLocked;
    }
</script>

<button on:click={toggleLock}>
    {#if $isLocked}
        <PadlockClosed/>
    {:else}
        <PadlockOpen/>
    {/if}
</button>

<style>
    button {
        height: 3em;
        width: 3em;
        background: none;
        border: none;
        fill: var(--secondary);
    }

    button:hover {
        fill: var(--white);
    }
</style>