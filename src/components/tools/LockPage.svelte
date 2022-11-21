<script lang="ts">
    import { isLocked } from "../../store";
    import PadlockClosed from "../../assets/padlock-closed.svelte";
    import PadlockOpen from "../../assets/padlock-open.svelte";
</script>

<button class="lock-button" on:click={() => $isLocked = !$isLocked}>
    {#if $isLocked}
        <PadlockClosed/>
    {:else}
        <PadlockOpen/>
    {/if}
</button>

<style>
    .lock-button {
        height: 3em;
        width: 3em;
        background: none;
        border: none;
    }
</style>