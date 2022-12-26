<script lang="ts">
    import { fly } from "svelte/transition";
    import ArrowPlain from "../../graphics/icons/arrow-plain.svelte";
    import LogEntries from "./LogEntries.svelte";
    let isOpen = false;
    const flyIn = {x: 214, duration: 400, opacity: 1};
</script>

<div class="log-panel-container">
    {#if isOpen}
        <div in:fly={flyIn} out:fly={flyIn} class="panel-button-container">
            <div>
                <button on:click={() => isOpen = !isOpen} class="close-arrow">
                    <ArrowPlain/>
                </button>
            </div>
            <LogEntries/>
        </div>
    {:else}
        <div in:fly={{x: 28, duration: 400, delay: 400}}>
            <button on:click={() => isOpen = !isOpen} class="open-arrow">
                <ArrowPlain class="left"/>
            </button>
        </div>
    {/if}
</div>

<style>
    .log-panel-container {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0.5rem;
    }

    .panel-button-container {
        display: flex;
        flex-direction: row;
    }

    button {
        background: none;
        fill: var(--light-grey);
        border: none;
        width: 4rem;
        padding: 0.5rem;
        transition: var(--transition-time);
    }

    button:hover {
        fill: var(--white);
    }
    
    .open-arrow:hover {
        transform: translateX(-0.75rem);
    }

    .close-arrow {
        position: absolute;
        right: 0;
    }

    .close-arrow:hover {
        transform: translateX(0.75rem);
    }
</style>