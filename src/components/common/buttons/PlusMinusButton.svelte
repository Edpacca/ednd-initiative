<script lang="ts">
    import Minus from "../../../assets/symbols/minus.svelte";
    import Plus from "../../../assets/symbols/plus.svelte";
    export let type: "+" | "-";
    export let onClick: () => void;
</script>

<button on:click={onClick}>
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
        height: 2.5em;
        width: 2.5em;
        border-radius: var(--border-radius);
        stroke: var(--primary);
        transition: 0.3s ease-out;
    }

  button:hover {
    background: blanchedalmond;
    outline: 1px solid brown;
  }

</style>
