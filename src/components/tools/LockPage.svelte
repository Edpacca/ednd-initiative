<script lang="ts">
    import { currentLog, currentRound, entities, isLocked, isStarted } from "../../store";
    import PadlockClosed from "../../graphics/icons/padlock-closed.svelte";
    import PadlockOpen from "../../graphics/icons/padlock-open.svelte";
    import { LogEntry } from "../logger/logEntry";

    let isHovered = false;
    let justToggled = false;

    const toggleLock = () => {
        if (!$isStarted) {
            $isStarted = true;
        }
        $isLocked = !$isLocked;
        justToggled = true;
    }

    $: if (justToggled === true) {
        setTimeout(() => justToggled = false, 2000);
    }

</script>

<button
    on:click={toggleLock}
    on:mouseenter={() => isHovered = true}
    on:mouseleave={() => isHovered = false}>
    {#if $isLocked}
        {#if isHovered && !justToggled}
            <PadlockOpen/>
        {:else}
            <PadlockClosed/>
        {/if}
    {:else}
        {#if isHovered && !justToggled}
            <PadlockClosed/>
        {:else}
            <PadlockOpen/>
        {/if}
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