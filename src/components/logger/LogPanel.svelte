<script lang="ts">
    import { fly } from "svelte/transition";
    import ArrowPlain from "../../graphics/icons/arrow-plain.svelte";
    import { isLogsOpen } from "../../store";
    import Tooltip from "../common/tooltip/Tooltip.svelte";
    import LogEntries from "./LogEntries.svelte";
    const flyIn = {x: 214, duration: 400, opacity: 1};
</script>

<div class="log-panel-container">
    {#if $isLogsOpen}
        <div in:fly={flyIn} out:fly={flyIn} class="panel-button-container">
            <LogEntries/>
            <div>
                <Tooltip text="Close logs   Kw" type="help">
                    <button on:click={() => $isLogsOpen = false} class="close-arrow">
                        <ArrowPlain/>
                    </button>
                </Tooltip>
            </div>
        </div>
    {:else}
        <div in:fly={{x: 28, duration: 400, delay: 400}}>
            <Tooltip text="Open logs" type="help">
                <button on:click={() => $isLogsOpen = true} class="open-arrow">
                    <ArrowPlain class="left"/>
                </button>
            </Tooltip>
        </div>
    {/if}
</div>

<style>
    .log-panel-container {
        position: fixed;
        top: 0;
        right: 0;
        margin: var(--margin);
    }

    .panel-button-container {
        display: flex;
        flex-direction: row;
    }

    button {
        background: none;
        fill: var(--light-grey);
        border: none;
        height: 2.5rem;
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
        top: 0;
        right: 0;
    }

    .close-arrow:hover {
        transform: translateX(0.75rem);
    }
</style>