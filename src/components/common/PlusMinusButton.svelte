<script lang="ts">
    import Minus from "../../assets/symbols/minus.svelte";
    import Plus from "../../assets/symbols/plus.svelte";
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
        margin: 2px;
        font-weight: bold;
        color: var(--primary);
        border-radius: 2px;
        height: 32px;
        width: 32px;
        border-radius: 4px;
        stroke: var(--primary);
    }

  button:hover {
    background: blanchedalmond;
    outline: 1px solid brown;
  }

</style>
