<script lang="ts">
    import { isLocked } from "../../store";

</script>

<button class="entity-type-button svg-fit-container" on:click={() => rotate()} disabled={$isLocked}>
    {#if icon}
    <svg class="svg-fit">
        <use xlink:href={path} href={path}></use>
     </svg>
    {/if}
</button>

<style>
    button {
        fill: var(--gold);
    }
</style>