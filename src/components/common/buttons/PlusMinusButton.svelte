<script lang="ts">
    import Minus from "../../../graphics/symbols/minus.svelte";
    import Plus from "../../../graphics/symbols/plus.svelte";
    export let type: "+" | "-";
    export let onClick: () => void;
    export let width = "2rem";
    export let disabled = false;
</script>

<button on:click={onClick} style={`--width: ${width}`} disabled={disabled}>
    {#if type === "+"}
        <Plus/>
    {:else}
        <Minus/>
    {/if}
</button>

<style>
    button {
        background: var(--secondary);
        border: 2px solid var(--primary);
        font-weight: bold;
        color: var(--primary);
        border-radius: 2px;
        height: var(--width);
        width: var(--width);
        border-radius: var(--border-radius);
        stroke: var(--primary);
        transition: 0.3s ease-out;
    }

    button:disabled {
        opacity: 0.5;
    }

    button:hover:not(:disabled) {
        background: var(--white);
        outline: 1px solid var(--primary);
        transition: 0.3s ease-out;
    }
</style>
