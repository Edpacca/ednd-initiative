<script lang="ts">
    import { isLocked } from "../../store";
    import type { PlayerClass } from "../../lib/models/playerClass";

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

<button class="entity-type-button svg-fit-container gold" on:click={() => rotate()}>
    {#if icon}
        <svg
            class="relative"
            width="100%" height="100%">
            <use href={`icons/classes.svg#${icon.toLowerCase()}`}/>
        </svg>
    {/if}
</button>
