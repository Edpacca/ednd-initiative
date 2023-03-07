<script lang="ts">
    import Cross from "../../../graphics/symbols/cross.svelte";
    import Undo from "../../../graphics/symbols/undo.svelte";
    export let onClick: () => void;
    export let isHidden = false;
    export let isinverted = false;
    export let isUndo = false;
</script>

<button 
    class="remove flex-col"
    class:hidden={isHidden}
    class:inverted={isinverted}
    on:click={onClick}>
    {#if isUndo}
        <Undo/>
    {:else}
        <Cross/>
    {/if}
</button>

<style>
    .remove {
        font-weight: bold;
        background-color: var(--dark-grey);
        border: none;
        border-radius: var(--border-radius);
        width: 1.5em;
        height: 1.5em;
        transition: 0.3s ease-out;
        stroke: var(--secondary);
    }

    .remove:hover {
        background-color: var(--red);
    }

    .inverted {
        background-color: var(--secondary);
        stroke: var(--dark-grey);
    }
</style>