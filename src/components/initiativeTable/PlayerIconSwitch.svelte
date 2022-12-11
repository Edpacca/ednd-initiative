<script lang="ts">
    import { onMount } from "svelte";
    import { isLocked } from "../../store";
    import type { PlayerClass } from "../../models/PlayerClass";

    export let icon: PlayerClass | undefined;
    $: path = `classes/${icon.toLowerCase()}.svg#icon`;

    const rotate = async () => {
        icon = 
            icon === "Artificer" ? "Barbarian" :
            icon ==="Barbarian" ? "Bard" :
            icon === "Bard" ? "Cleric" :
            icon === "Cleric" ? "Druid" :
            icon === "Druid" ? "Fighter" :
            icon === "Fighter" ? "Monk" :
            icon === "Monk" ? "Paladin" :
            icon === "Paladin" ? "Ranger" :
            icon === "Ranger" ? "Rogue" :
            icon === "Rogue" ? "Sorcerer" :
            icon === "Sorcerer" ? "Warlock" :
            icon === "Warlock" ? "Wizard" :
            "Artificer";
    }
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