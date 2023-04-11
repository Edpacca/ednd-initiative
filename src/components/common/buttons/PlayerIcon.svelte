<script lang="ts">
    import type { PlayerClass } from "../../../lib/models/playerClass";
    import { activeEntityContextIndex } from "../../../store";
    import IconGridSelect from "../icon-grid/PlayerIconGridSelect.svelte";

    export let icon: PlayerClass | undefined;
    export let isIconGridOpen = false;
    export let index = 0;
    export let onClick = () => {};
    export let onRightClick = () => {};
</script>

<button class={`entity-type-button svg-fit-container ${$$props.class}`} on:click={onClick} on:contextmenu|preventDefault={onRightClick}>
    {#if icon}
        <svg
            class="relative"
            width="100%" height="100%">
            <use href={`icons/classes.svg#${icon.toLowerCase()}`}/>
        </svg>
    {/if}
</button>

{#if isIconGridOpen && $activeEntityContextIndex === index}
    <IconGridSelect bind:playerClass={icon} bind:isOpen={isIconGridOpen}/>
{/if}