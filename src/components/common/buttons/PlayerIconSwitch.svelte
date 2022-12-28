<script lang="ts">
    import type { PlayerClass } from "../../../lib/models/playerClass";
    import IconGridSelect from "../IconGridSelect.svelte";

    export let icon: PlayerClass | undefined;
    export let isDisabled = false;
    export let onClick = () => {};

    let isIconGridOpen = false;

    const rotate = () => {
        if (isDisabled) {
            onClick();
        } else {
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
    }
</script>

<button class="entity-type-button svg-fit-container gold" on:click={() => rotate()} on:contextmenu|preventDefault={() => isIconGridOpen = !isIconGridOpen}>
    {#if icon}
        <svg
            class="relative"
            width="100%" height="100%">
            <use href={`icons/classes.svg#${icon.toLowerCase()}`}/>
        </svg>
    {/if}
</button>

{#if isIconGridOpen}
    <IconGridSelect/>
{/if}