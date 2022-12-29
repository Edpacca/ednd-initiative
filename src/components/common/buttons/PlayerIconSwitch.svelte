<script lang="ts">
    import type { PlayerClass } from "../../../lib/models/playerClass";
    import { activePlayerIndex } from "../../../store";
    import IconGridSelect from "../IconGridSelect.svelte";

    export let icon: PlayerClass | undefined;
    export let isIconGridOpen = false;
    export let index = 0;
    export let onClick = () => {};
    export let onRightClick = () => {};
</script>

<button class="entity-type-button svg-fit-container gold" on:click={onClick} on:contextmenu|preventDefault={onRightClick}>
    {#if icon}
        <svg
            class="relative"
            width="100%" height="100%">
            <use href={`icons/classes.svg#${icon.toLowerCase()}`}/>
        </svg>
    {/if}
</button>

{#if isIconGridOpen && $activePlayerIndex === index}
    <IconGridSelect bind:playerClass={icon} bind:isOpen={isIconGridOpen}/>
{/if}